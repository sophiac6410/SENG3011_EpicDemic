from fastapi import APIRouter, FastAPI, Query, HTTPException, status
from database import articles_col, locations_col, reports_col, diseases_col
import re
from datetime import datetime, time
from pydantic import BaseModel # datetime has format yyyy-mm-ddTHH:mm:ss
import pytz
from typing import Optional, List
import pymongo

router = APIRouter(
    prefix='/sophia'
)

@router.get('/healthcheck', status_code=status.HTTP_200_OK)
def perform_healthcheck():
    return {'healthcheck': 'Everything OK!'}

@router.get("/test/{key_term}", status_code=status.HTTP_200_OK)
async def get_test(
	key_term: str
):
    documents = list(articles_col.find(
		{"headline": re.compile(key_term, re.IGNORECASE)}, 
		{"_id": False}))

    print(documents[0]["date_of_publication"])
    print(documents[0]["date_of_publication"] > documents[1]["date_of_publication"])
    
    result = []
    for document in documents:
        result.append(document["article_id"])

	# for document in documents:
	# 	print(document)

    return {
		"status": 200,
		"data": {
			"article_ids": result
		}
	}

############## GET ARTICLES BY QUERY ###############
# class Article(BaseModel):
# 	article_id: int
# 	url: int
# 	date_of_publication: str
# 	headline: str
# 	main_text: str
# 	reports: List(int)

description_start_date = "Requests articles published after the start_date. Format: 'yyyy-MM-ddTHH:mm:ss'"
description_end_date = "Requests articles published before the end_date. Format: 'yyyy-MM-ddTHH:mm:ss'"
description_key_terms = "Requests articles that include the key terms. Key words must be separated by a commas, e.g. 'Anthrax,Zika'"
description_timezone = "The timezone of the start_date and end_date. Must be in the pytz format."
description_start_range = "Specifies the position of the article to start from."
description_end_range = "Specifies the position of the last article to return. If the position is out of range, the API will return up to the last article."

@router.get("/articles", status_code=status.HTTP_200_OK)
async def get_articles(
	*, # including this allows parameters to be defined in any order
	start_date: datetime = Query(
		..., # no default, is required
		description=description_start_date,
		example="2021-01-01T10:10:10"
	),
	end_date: datetime = Query(
		...,
		description=description_end_date,
		example="2022-01-01T10:10:10"
	),
	key_terms: Optional[str] = Query(
		None, # is optional, default is None
		description=description_key_terms,
		example="Anthrax,Zika"
	),
	timezone: Optional[str] = Query(
		"Australia/Sydney",
		description=description_timezone,
		example="US/Central"
	),
	start_range: Optional[int] = Query(
		1,
		description=description_start_range,
		example="5",
		ge=1
	),
	end_range: Optional[int] = Query(
		10,
		description=description_end_range,
		example="50",
		ge=1
	)
):
	if timezone not in pytz.all_timezones:
		raise HTTPException(status_code=400, detail="Timezone is not in the correct format and/or cannot be found.")
	if end_range < start_range:
		raise HTTPException(status_code=400, detail="Invalid start and end range.")
	if end_date < start_date:
		raise HTTPException(status_code=400, detail="End date must be after start date.")
	new_start_date = start_date.replace(tzinfo=pytz.timezone(timezone))
	new_end_date = end_date.replace(tzinfo=pytz.timezone(timezone))
	terms_list = [".*"]
	if key_terms != None and key_terms != "":
		terms_list = key_terms.split(',')

	articles = list(articles_col.aggregate([
		{"$match": {
			"date_of_publication": {"$gte": new_start_date, "$lte": new_end_date},
			"headline": {"$in":[re.compile(x, re.IGNORECASE) for x in terms_list]}
			}
		},
		{"$project": {
			"diseases": False,
			"_id": False,
			}
		},
		{"$skip":start_range-1},
		{"$limit": end_range-start_range+1},
		{"$sort": {"date_of_publication": -1}},
		{"$lookup": {
			"from": "Reports",
			"localField": "article_id",
			"foreignField": "article_id",
			"pipeline": [
				{"$group": {"_id": None, "reports": {"$push": "$report_id"}}},
				{"$project": {"_id": 0, "reports": 1}}
			],
			"as": "reports"
			}
		}
	]))
	
	return {
		"status": 200,
		"data": {
			"start_range": start_range,
			"end_range": end_range,
			"articles": articles
		}
	}



############## GET ARTICLES BY IDS ###############
@router.get("/articles/ids", status_code=status.HTTP_200_OK)
async def get_article_ids(
	article_ids: str = Query(
		...,
		description="The articles' unique id's, separated by commas.",
		example="8700432,3892133",
	)
):
	id_list = [int(i) for i in article_ids.split(",")]
	articles = list(articles_col.aggregate([
		{"$match": {"article_id": {"$in": id_list}}},
		{"$project": {"_id": False, "diseases": False}},
		{"$lookup": {
			"from": "Reports",
			"localField": "article_id",
			"foreignField": "article_id",
			"pipeline": [
				{"$group": {"_id": None, "reports": {"$push": "$report_id"}}},
				{"$project": {"_id": 0, "reports": 1}}
			],
			"as": "reports"
			}
		}
	]))
	status = 200
	if articles == []:
		status = 204
	return {
		"status": status,
		"data": {
			"articles": articles
		}
	}