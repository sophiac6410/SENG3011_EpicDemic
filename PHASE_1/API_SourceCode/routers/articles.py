from fastapi import APIRouter, Query, status
from fastapi.responses import JSONResponse
from util import DATETIME_REGEX, parse_datetime_string
from database import articles_col, reports_col
import re
from datetime import datetime
import pytz
from typing import Optional
from models import articleModels, baseModels

router = APIRouter(
	prefix="/v1/articles"
)

############## GET ARTICLES BY QUERY ###############
@router.get("/", status_code=status.HTTP_200_OK, tags=["articles"], response_model=articleModels.ArticleQueryResponse, responses={400: {"model": baseModels.ErrorResponse}})
async def get_articles_by_query(
	*, # including this allows parameters to be defined in any order
	start_date: str = Query(
		..., # no default, is required
		description="Requests articles published after the start_date. Format: 'yyyy-MM-ddTHH:mm:ss'",
		example="2021-01-01T10:10:10"
	),
	end_date: str = Query(
		...,
		description="Requests articles published before the end_date. Format: 'yyyy-MM-ddTHH:mm:ss'",
		example="2023-01-01T10:10:10"
	),
	key_terms: Optional[str] = Query(
		None, # is optional, default is None
		description="Requests articles that include the key terms. Key words must be separated by a commas, e.g. 'Anthrax,Zika'",
		example="Corona"
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
	if re.fullmatch(DATETIME_REGEX, start_date) == None or re.fullmatch(DATETIME_REGEX, end_date) == None:
		return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content=baseModels.createResponse(False, 400, {"error": "Date must be in the format yyyy-mm-ddTHH:mm:ss"}))
	if timezone not in pytz.all_timezones:
		return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content=baseModels.createResponse(False, 400, {"error": "Timezone is not in the correct format and/or cannot be found."}))
	
	start_date = parse_datetime_string(start_date, timezone)
	end_date = parse_datetime_string(end_date, timezone)

	if start_date > end_date:
		return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content=baseModels.createResponse(False, 400, {"error": "Start date must be earlier than end date."}))
	if end_range < start_range:
		return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content=baseModels.createResponse(False, 400, {"error": "Start range must be less than end range."}))
	
	terms_list = [".*"]
	if key_terms != None and key_terms != "":
		terms_list = key_terms.split(',')

	articles = list(articles_col.aggregate([
		{"$match": {
			"date_of_publication": {"$gte": start_date, "$lte": end_date},
			"$or": [
				{"headline": {"$in":[re.compile(x, re.IGNORECASE) for x in terms_list]}},
				{"main_text": {"$in":[re.compile(x, re.IGNORECASE) for x in terms_list]}}
			]}
		},
		{"$project": {"diseases": False}},
		{"$project": {"id": "$_id", "url":1, "date_of_publication":1, "headline":1, "main_text":1}},
		{"$skip": start_range-1},
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
	
	return baseModels.createResponse(True, 200, {
			"start_range": start_range,
			"end_range": end_range,
			"articles": articles
		})


############## GET ARTICLES BY IDS ###############
@router.get("/ids", status_code=status.HTTP_200_OK, response_model=articleModels.ArticleIdResponse, tags=["articles"], responses={422: {"model": baseModels.ErrorResponse}})
async def get_articles_by_ids(
	article_ids: str = Query(
		...,
		description="The articles' unique id's, separated by commas.",
		example="1,2",
	)
):
	try:
		article_ids = [int(i) for i in article_ids.split(",")]
	except:
		return JSONResponse(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, content=baseModels.createResponse(False, 422, {"error": "Article id's must be comma separated integers"}))

	articles = articles_col.aggregate([
		{"$match": {"_id": {"$in": article_ids}}},
		{"$project": {"diseases": False}},
		{"$project": {"id":"$_id", "url":1, "date_of_publication":1, "headline":1, "main_text":1}}
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

	return baseModels.createResponse(True, 200, {
		"articles": articles_dict
	})