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

class HealthCheck(BaseModel):
	healthcheck: str

	class Config:
		schema_extra = {
			"example": {
				"healthcheck": "Everything OK!"
			}
		}
@router.get('/healthcheck', status_code=status.HTTP_200_OK, response_model=HealthCheck)
def perform_healthcheck():
    return {'healthcheck': 'Everything OK!'}

# @router.get("/test/{key_term}", status_code=status.HTTP_200_OK)
# async def get_test(
# 	key_term: str
# ):
#     documents = list(articles_col.find(
# 		{"headline": re.compile(key_term, re.IGNORECASE)}, 
# 		{"_id": False}))

#     print(documents[0]["date_of_publication"])
#     print(documents[0]["date_of_publication"] > documents[1]["date_of_publication"])
    
#     result = []
#     for document in documents:
#         result.append(document["article_id"])

# 	# for document in documents:
# 	# 	print(document)

#     return {
# 		"status": 200,
# 		"data": {
# 			"article_ids": result
# 		}
# 	}

############## GET ARTICLES BY QUERY ###############
class ReportIds(BaseModel):
	report_id: int

	class Config:
		schema_extra = {
            "example": {
                "report_id": 0
            }
        }

class Article(BaseModel):
	article_id: int
	url: str
	date_of_publication: datetime
	headline: str
	main_text: str
	reports: List[ReportIds]

	class Config:
		schema_extra = {
            "example": {
                "article_id": 8701909,
				"url": "https://promedmail.org/promed-post/?id=8701909",
				"date_of_publication": "2022-03-10T02:08:51",
				"headline": "PRO/AH/EDR> Chronic wasting disease - North America (02): (USA) deer",
				"main_text": "The Iowa Department of Natural Resources reports 36 positive chronic wasting disease (CWD) tests from some 5000 deer samples this hunting season.<br/><br/>The DNR's Tyler Harms, who oversees the deer management program, says 2 new counties were added to the list of counties in which CWD has been detected in the wild. Greene County in central Iowa and Fremont County in southwest Iowa brings the total number of counties to 12.",
				"reports": [{"report_id": 0}, {"report_id": 1}]
            }
        }

class ArticleQueryResponse(BaseModel):
	start_range: int
	end_range: int
	articles: List[Article]

	class Config:
		schema_extra = {
            "example": {
				"start_range": 1,
				"end_range": 10,
				"articles": [{"article_id": 8701909,
				"url": "https://promedmail.org/promed-post/?id=8701909",
				"date_of_publication": "2022-03-10T02:08:51",
				"headline": "PRO/AH/EDR> Chronic wasting disease - North America (02): (USA) deer",
				"main_text": "The Iowa Department of Natural Resources reports 36 positive chronic wasting disease (CWD) tests from some 5000 deer samples this hunting season.<br/><br/>The DNR's Tyler Harms, who oversees the deer management program, says 2 new counties were added to the list of counties in which CWD has been detected in the wild. Greene County in central Iowa and Fremont County in southwest Iowa brings the total number of counties to 12.",
				"reports": [{"report_id": 0}]}]
			}
		}

description_start_date = "Requests articles published after the start_date. Format: 'yyyy-MM-ddTHH:mm:ss'"
description_end_date = "Requests articles published before the end_date. Format: 'yyyy-MM-ddTHH:mm:ss'"
description_key_terms = "Requests articles that include the key terms. Key words must be separated by a commas, e.g. 'Anthrax,Zika'"
description_timezone = "The timezone of the start_date and end_date. Must be in the pytz format."
description_start_range = "Specifies the position of the article to start from."
description_end_range = "Specifies the position of the last article to return. If the position is out of range, the API will return up to the last article."

@router.get("/articles", status_code=status.HTTP_200_OK, response_model=ArticleQueryResponse)
async def get_articles_by_query(
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
		{"$project": {"diseases": 0, "_id": 0}},
		{"$skip":start_range-1},
		{"$limit": end_range-start_range+1},
		{"$sort": {"date_of_publication": -1}},
		{"$lookup": {
			"from": "Reports",
			"localField": "article_id",
			"foreignField": "article_id",
			"pipeline": [
				# {"$group": {"_id": None, "reports": {"$push": "$report_id"}}},
				{"$project": {"_id": 0, "report_id": 1}}
			],
			"as": "reports"
			}
		}
	]))
	
	return {
		"start_range": start_range,
		"end_range": end_range,
		"articles": articles
	}



############## GET ARTICLES BY IDS ###############
class ArticleIdResponse(BaseModel):
	articles: List[Article]

@router.get("/articles/ids", status_code=status.HTTP_200_OK, response_model=ArticleIdResponse)
async def get_articles_by_ids(
	article_ids: str = Query(
		...,
		description="The articles' unique id's, separated by commas.",
		example="8700432,3892133",
	)
):
	id_list = [int(i) for i in article_ids.split(",")]
	articles = list(articles_col.aggregate([
		{"$match": {"article_id": {"$in": id_list}}},
		{"$project": {"diseases": False, "_id": False}},
		{"$lookup": {
			"from": "Reports",
			"localField": "article_id",
			"foreignField": "article_id",
			"pipeline": [
				# {"$group": {"_id": None, "reports": {"$push": "$report_id"}}},
				{"$project": {"_id": 0, "report_id": 1}}
			],
			"as": "reports"
			}
		}
	]))
	return {
		"articles": articles
	}