from datetime import datetime
from dateutil.parser import parse
from typing import Dict, List, Optional
from fastapi import APIRouter, Query, status
from fastapi.responses import JSONResponse
from httplib2 import Response
from pydantic import BaseModel, Field
import pytz
from util import DATETIME_REGEX, parse_datetime_string, generate_query
from database import reports_col, diseases_col, locations_promed_col
import re
from geonames import get_location_ids
from models import reportModels, baseModels

router = APIRouter(
    prefix='/v1/reports'
)

@router.get(
    "/ids",
    status_code=status.HTTP_200_OK,
    response_model=reportModels.ReportIdResponse, 
    tags=["reports"],
    responses={422: {"model": baseModels.ErrorResponse}})
async def get_reports_by_id(
    report_ids: str = Query(
        ...,
        description="The reports' unique id's, separated by commas.",
        example="1,2",
    )
):
    try:
        report_ids = [int(i) for i in report_ids.split(",")]
    except:
        return JSONResponse(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, content=baseModels.createResponse(False, 422, {"error": "Report ids must be comma separated integers"}))

    report_docs = list(reports_col.find(
        {"_id":{"$in":report_ids}},
    ))

    reports = {}
    disease_ids = set()
    location_ids = set()

    for doc in report_docs:
        reports[doc["_id"]] = doc
        
        # Get all the disease and location ids so we can look them all up in one efficient query
        for disease_id in doc["diseases"]:
            disease_ids.add(disease_id)
        for location_id in doc["locations"]:
            location_ids.add(location_id)

    # Look up all the disease in one go
    # Map disease id to name
    disease_docs = list(diseases_col.find(
        {"_id":{"$in":list(disease_ids)}}        
    ))
    diseases = {}
    for disease in disease_docs:
        diseases[disease["_id"]] = disease["name"]

    # Look up all the locations in one go
    # Map location id to location object
    location_docs = list(locations_promed_col.find(
        {"_id":{"$in": list(location_ids)}}
    ))
    locations = {}
    for location in location_docs:
        location["id"] = location["_id"]
        del location["_id"]
        locations[location["id"]] = location

    # Convert the disease ids to actual disease names
    # Convert the location ids into location objects
    for report in reports.values():
        new_diseases = []
        for disease_id in report["diseases"]:
            new_diseases.append(diseases[disease_id])
        report["diseases"] = new_diseases
        
        new_locations = []
        for location_id in report["locations"]:
            new_locations.append(locations[location_id])
        report["locations"] = new_locations

    for report in reports.values():
        report["id"] = report["_id"]
        del report["_id"]

    return baseModels.createResponse(True, 200, {
        "reports": reports
    })

@router.get("/", status_code=status.HTTP_200_OK, response_model=reportModels.ReportQueryResponse, tags=["reports"], responses={400: {"model": baseModels.ErrorResponse}})
async def get_reports_by_query(
    *, # including this allows parameters to be defined in any order
    start_date: str = Query(
    	..., # no default, is required
    	description="Requests reports event dates occuring after the start_date. Format: 'yyyy-MM-ddTHH:mm:ss'",
    	example="2021-01-01T10:10:10"
    ),
    end_date: str = Query(
		...,
	    description="Requests reports event dates occuring before the end_date. Format: 'yyyy-MM-ddTHH:mm:ss'",
	    example="2023-01-01T10:10:10"
	),
    article_ids: str = Query(
        None,
        description="Articles' id's that reports of interest should belong to. Ids are separated by commas.",
        example="1,2,3"
    ),
    location: Optional[str] = Query(
        None,
        description="A location the report should have occurred in (note that ambiguous search terms might match on multiple locations)",
        example="Australia"
    ),
    key_terms: Optional[str] = Query(
        None,
        description="Requests reports that include the key terms. Key words must be separated by a commas, e.g. 'Anthrax,Zika'",
        example="virus"
    ),
	timezone: Optional[str] = Query(
		"Australia/Sydney",
		description="The timezone of the start_date and end_date. Must be in the pytz format.",
		example="Australia/Sydney"
	),
    start_range: Optional[int] = Query(
        1,
        description="Specifies the position of the report to start from.",
        example="1",
        ge=1
    ),
    end_range: Optional[int] = Query(
        10,
        description="Specifies the position of the last report to return. If the position is out of range, the API will return up to the last report.",
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
    
    if end_range < start_range:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content=baseModels.createResponse(False, 400, {"error": "Start range must be less than end range."}))
    if end_date < start_date:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content=baseModels.createResponse(False, 400, {"error": "Start date must be earlier than end date."}))
    
    try:
        if article_ids != None and article_ids != "":
            article_ids = [int(i) for i in article_ids.split(",")]
        else:
            article_ids = []
    except:
        return JSONResponse(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, content=baseModels.createResponse(False, 422, {"error": "Article id's must be comma separated integers"}))

    # First get a list of all the locations objects from their ids
    locations = {}
    location_ids = None
    if location is not None:
        response = get_location_ids(location)
        if response["success"]:
            locations = response["location_ids"]
            location_ids = list(locations.keys())
            
    # Get a list of all matching disease ids from the keywords
    matched_disease_ids = None
    if key_terms is not None:
        key_terms_list = [x.strip() for x in key_terms.split(",")]
        key_terms_regex = "|".join(key_terms_list)

        matched_diseases = list(diseases_col.find({
            "$or": [
                {"name": {
                    "$regex": key_terms_regex,
                    "$options": "i"
                }},
                {"regex": {
                    "$regex": key_terms_regex,
                    "$options": "i"
                }},
                {"key_words": {
                    "$in": key_terms_list
                }}
            ]
        }))

        matched_disease_ids = [x["_id"] for x in matched_diseases]

    # query = generate_query(start_date, end_date, article_ids, location_ids, matched_disease_ids)
    query=[{'locations': {'$in': location_ids}}, {'diseases': {'$in': matched_disease_ids}}]

    report_docs = list(reports_col.find(
        {
            "$and": query
        }
    ).skip(start_range - 1).limit(end_range + 1 - start_range))

    reports = sorted(report_docs, key=lambda d: d["event_date"])

    # Replace _id with id and also add the location...
    for loc in locations.values():
        loc["id"] = loc["_id"]
        del loc["_id"]

    for report in reports:
        report["id"] = report["_id"]
        del report["_id"]

        location_objs = []
        for loc_id in report["locations"]:
            if loc_id in locations:
                location_objs.append(locations[loc_id])
        report["locations"] = location_objs                

    return baseModels.createResponse(True, 200, {
        "start_range": start_range,
        "end_range": end_range,
        "reports": reports
    })
