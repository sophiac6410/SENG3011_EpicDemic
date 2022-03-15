from fastapi import APIRouter, FastAPI, Query, HTTPException, status
from fastapi.responses import JSONResponse
from database import articles_col, locations_col, reports_col, diseases_col
import re
from datetime import datetime, time
from pydantic import BaseModel # datetime has format yyyy-mm-ddTHH:mm:ss
import pytz
from typing import Optional, List, Dict
import pymongo

router = APIRouter(
	prefix="/articles"
)

############### ARTICLE RESPONSE MODELS ##############
class Article(BaseModel):
	_id: int
	url: str
	date_of_publication: datetime
	headline: str
	main_text: str
	reports: List[int]

	class Config:
		schema_extra = {
            "example": {
                "_id": 1,
				"url": "https://promedmail.org/promed-post/?id=8701909",
				"date_of_publication": "2022-03-10T02:08:51",
				"headline": "PRO/AH/EDR> Chronic wasting disease - North America (02): (USA) deer",
				"main_text": "The Iowa Department of Natural Resources reports 36 positive chronic wasting disease (CWD) tests from some 5000 deer samples this hunting season.<br/><br/>The DNR's Tyler Harms, who oversees the deer management program, says 2 new counties were added to the list of counties in which CWD has been detected in the wild. Greene County in central Iowa and Fremont County in southwest Iowa brings the total number of counties to 12.",
				"reports": [1, 2, 3]
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
				"articles": [{"_id": 1,
				"url": "https://promedmail.org/promed-post/?id=8701909",
				"date_of_publication": "2022-03-10T02:08:51",
				"headline": "PRO/AH/EDR> Chronic wasting disease - North America (02): (USA) deer",
				"main_text": "The Iowa Department of Natural Resources reports 36 positive chronic wasting disease (CWD) tests from some 5000 deer samples this hunting season.<br/><br/>The DNR's Tyler Harms, who oversees the deer management program, says 2 new counties were added to the list of counties in which CWD has been detected in the wild. Greene County in central Iowa and Fremont County in southwest Iowa brings the total number of counties to 12.",
				"reports": [1]}]
			}
		}

class ArticleIdResponse(BaseModel):
	articles: Dict[int, Article]

	class Config:
		schema_extra = {
			"example": {
				"articles": {
					1: {
						"_id": 1,
						"url": "https://promedmail.org/promed-post/?id=8701909",
						"date_of_publication": "2022-03-10T02:08:51",
						"headline": "PRO/AH/EDR> Chronic wasting disease - North America (02): (USA) deer",
						"main_text": "The Iowa Department of Natural Resources reports 36 positive chronic wasting disease (CWD) tests from some 5000 deer samples this hunting season.<br/><br/>The DNR's Tyler Harms, who oversees the deer management program, says 2 new counties were added to the list of counties in which CWD has been detected in the wild. Greene County in central Iowa and Fremont County in southwest Iowa brings the total number of counties to 12.",
						"reports": [1]
					}
				}
			}
		}

class Error(BaseModel):
	error: str

############## GET ARTICLES BY QUERY ###############
@router.get("/articles", status_code=status.HTTP_200_OK, response_model=ArticleQueryResponse, tags=["articles"], responses={400: {"model": Error}})
async def get_articles_by_query(
	*, # including this allows parameters to be defined in any order
	start_date: datetime = Query(
		..., # no default, is required
		description="Requests articles published after the start_date. Format: 'yyyy-MM-ddTHH:mm:ss'",
		example="2021-01-01T10:10:10"
	),
	end_date: datetime = Query(
		...,
		description="Requests articles published before the end_date. Format: 'yyyy-MM-ddTHH:mm:ss'",
		example="2022-01-01T10:10:10"
	),
	key_terms: Optional[str] = Query(
		None, # is optional, default is None
		description="Requests articles that include the key terms. Key words must be separated by a commas, e.g. 'Anthrax,Zika'",
		example="Anthrax,Zika"
	),
	timezone: Optional[str] = Query(
		"Australia/Sydney",
		description="The timezone of the start_date and end_date. Must be in the pytz format.",
		example="Australia/Sydney"
	),
	start_range: Optional[int] = Query(
		1,
		description="Specifies the position of the article to start from.",
		example="1",
		ge=1
	),
	end_range: Optional[int] = Query(
		10,
		description="Specifies the position of the last article to return. If the position is out of range, the API will return up to the last article.",
		example="10",
		ge=1
	)
):
	if timezone not in pytz.all_timezones:
		return JSONResponse(status_code=400, content={"error": "Timezone is not in the correct format and/or cannot be found."})
	if end_range < start_range:
		return JSONResponse(status_code=400, content={"error": "Invalid start and end range."})
	if end_date < start_date:
		return JSONResponse(status_code=400, content={"error": "End date must be after start date."})
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
		{"$project": {"diseases": False}},
		{"$skip":start_range-1},
		{"$limit": end_range-start_range+1},
		{"$sort": {"date_of_publication": -1}}
	]))
	for a in articles:
		reports = list(reports_col.find(
			{"article_id": a["_id"]},
			{"_id": True}
		))
		report_list = []
		for r in reports:
			report_list.append(r["_id"])
		a.update({"reports": report_list})
	
	return {
		"start_range": start_range,
		"end_range": end_range,
		"articles": articles
	}


############## GET ARTICLES BY IDS ###############
@router.get("/ids", status_code=status.HTTP_200_OK, response_model=ArticleIdResponse, tags=["articles"])
async def get_articles_by_ids(
	article_ids: str = Query(
		...,
		description="The articles' unique id's, separated by commas.",
		example="1,2",
	)
):
	id_list = [int(i) for i in article_ids.split(",")]
	articles = articles_col.aggregate([
		{"$match": {"_id": {"$in": id_list}}},
		{"$project": {"diseases": False}},
	])
	articles_dict = {}
	for a in articles:
		reports = list(reports_col.find(
			{"article_id": a["_id"]},
			{"_id": True}
		))
		report_list = []
		for r in reports:
			report_list.append(r["_id"])
		a.update({"reports": report_list})
		articles_dict.update({a["_id"]: a})
	return {
		"articles": articles_dict
	}