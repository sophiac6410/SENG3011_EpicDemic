from datetime import datetime, time # datetime has format yyyy-mm-ddTHH:mm:ss
import pytz
from typing import Optional, List

from fastapi import FastAPI, Query, HTTPException

app = FastAPI()
# run 'uvicorn main:app --reload'
# http://127.0.0.1:8000/docs - swagger UI docs

description_start_date = "Requests articles published after the start_date. Format: 'yyyy-MM-ddTHH:mm:ss'"
description_end_date = "Requests articles published before the end_date. Format: 'yyyy-MM-ddTHH:mm:ss'"
description_key_terms = "Requests articles that include the key terms. Key words must be separated by a commas, e.g. 'Anthrax,Zika'"
description_timezone = "The timezone of the start_date and end_date. Must be in the pytz format."
description_start_range = "Specifies the position of the article to start from."
description_end_range = "Specifies the position of the last article to return. If the position is out of range, the API will return up to the last article."

############## GET ARTICLES BY QUERY ###############
@app.get("/articles")
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
	terms_list = []
	if key_terms != None:
		terms_list = key_terms.split(',')
	return {
		"start_date": new_start_date,
		"end_date": new_end_date,
		"key_terms": terms_list,
		"timezone": timezone,
		"start_range": start_range,
		"end_range": end_range
	}


############## GET ARTICLES BY IDS ###############
@app.get("/articles/ids")
async def get_article_ids(
	article_ids: List[int] = Query(
		...,
		description="A list of the articles' unique id's.",
		example="[8700432, 3892133]",
	)
):
	### check if article_id is in the database, if not, raise error
	return {
		"article_ids": article_ids
	}


############## GET REPORTS BY QUERY ###############
@app.get("/reports")
async def get_reports(
	article_ids: Optional[List[int]] = Query(
		None,
		description="List of article ids that the reports must come from. If empty, reports can come from all articles.",
		example="[8700432, 3892133]"
	),
	location: Optional[str] = Query(
		None,
		description="The city, state or country where the event occurred",
		example="Brazil"
	),
	key_terms: Optional[str] = Query(
		None,
		description=description_key_terms,
		example="Anthrax,Zika"
	),
	start_date: Optional[datetime] = Query(
		None,
		description=description_start_date,
		example="2021-01-01T10:10:10"
	),
	end_date: Optional[datetime] = Query(
		None,
		description=description_end_date,
		example="2022-01-01T10:10:10"
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
	### check if article ids are valid
	### check if location is in database
	if timezone not in pytz.all_timezones:
		raise HTTPException(status_code=400, detail="Timezone is not in the correct format and/or cannot be found.")
	if end_range < start_range:
		raise HTTPException(status_code=400, detail="Invalid start and end range.")
	if end_date < start_date:
		raise HTTPException(status_code=400, detail="End date must be after start date.")
	new_start_date = start_date.replace(tzinfo=pytz.timezone(timezone))
	new_end_date = end_date.replace(tzinfo=pytz.timezone(timezone))
	terms_list = []
	if key_terms != None:
		terms_list = key_terms.split(',')
	return {
		"article_ids": article_ids,
		"location": location,
		"start_date": new_start_date,
		"end_date": new_end_date,
		"key_terms": terms_list,
		"timezone": timezone,
		"start_range": start_range,
		"end_range": end_range
	}
	


############## GET REPORTS BY IDS ###############
@app.get("/reports/ids")
async def get_report_ids(
	report_ids: List[int] = Query(
		...,
		description="A list of the reports' unique ids.",
		example="[1, 2, 3]"
	)
):
	### check if report ids exist, if not raise error
	return {
		"report_ids": report_ids
	}

	