from datetime import datetime
from dateutil.parser import parse
from typing import Dict, List, Optional
from fastapi import APIRouter, Query, status
from fastapi.responses import JSONResponse
from httplib2 import Response
from pydantic import BaseModel, Field
import pytz
from util import DATETIME_REGEX, parse_datetime_string, generate_query
from database import reports_col, diseases_col, locations_col
import re
from geonames import get_location_ids

router = APIRouter(
    prefix='/v1/reports'
)

class Location(BaseModel):
    id: int
    country: str
    city: str
    state: str
    latitude: float
    longitude: float
    geonames_id: int

class Report(BaseModel):
    id: int
    article_id: int
    diseases: List[str]
    confirmed: bool
    syndromes: List[str]
    event_date: datetime
    locations: List[Location]

    class Config:
        schema_extra = {
            "example": {
                "id": 1,
                "article_id": 4,
                "diseases": [ "other" ],
                "confirmed": True,
                "cases": 1,
                "syndromes": [],
                "event_date": "2022-01-02T00:00:00+11:00",
                "locations": [ 
                    {
                        "id": 13,
                        "country": "Australia",
                        "city": "",
                        "state": "New South Wales",
                        "latitude": -32.713139,
                        "longitude": 152.066223,
                        "geonames_id": 2152652
                    } 
                ]
            }
        }

class ReportIdResponse(BaseModel):
    reports: Dict[int, Report]
    class Config:
        schema_extra = {
            "example": {
                1: Response(
                    {
                        "id": 1,
                        "article_id": 4,
                        "diseases": [ "other" ],
                        "confirmed": True,
                        "syndromes": [],
                        "event_date": "2022-01-02T00:00:00+11:00",
                        "locations": [ 
                            {
                                "id": 13,
                                "country": "Australia",
                                "city": "",
                                "state": "New South Wales",
                                "latitude": -32.713139,
                                "longitude": 152.066223,
                                "geonames_id": 2152652
                            } 
                        ]
                    }
                )
            }
        }

class ReportQueryResponse(BaseModel):
    start_range: int = Field(..., description="The starting position of the reports")
    end_range: int = Field(..., description="The last position of the reports")
    reports: List[Report] = Field(..., description="The list of reports")

    class Config:
        schema_extra = {
            "example": {
                "start_range": 1,
                "end_range": 10,
                "reports": [{
                    "id": 3,
                    "article_id": 3,
                    "diseases": [
                        "other"
                    ],
                    "confirmed": True,
                    "syndromes": [],
                    "event_date": "2022-03-13T00:00:00",
                    "locations": [ 
                        {
                            "id": 13,
                            "country": "Australia",
                            "city": "",
                            "state": "New South Wales",
                            "latitude": -32.713139,
                            "longitude": 152.066223,
                            "geonames_id": 2152652
                        } 
                    ]
                }]
            }
        }

class Error(BaseModel):
	error: str = Field(..., description="The error message")

	class Config:
		schema_extra = {
			"example": {
				"error": "Date must be in the format yyyy-mm-ddTHH:mm:ss"
			}
		}

@router.get(
    "/ids",
    status_code=status.HTTP_200_OK,
    response_model=ReportIdResponse, 
    tags=["reports"],
    responses={422: {"model": Error}})
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
        return JSONResponse(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, content={"error": "Report ids must be comma separated integers"})

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
    location_docs = list(locations_col.find(
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

    return {
        "reports": reports
    }

@router.get("/", status_code=status.HTTP_200_OK, response_model=ReportQueryResponse, tags=["reports"], responses={400: {"model": Error}})
async def get_reports_by_query(
    *, # including this allows parameters to be defined in any order
    start_date: str = Query(
    	..., # no default, is required
    	description="Requests reports published after the start_date. Format: 'yyyy-MM-ddTHH:mm:ss'",
    	example="2021-01-01T10:10:10"
    ),
    end_date: str = Query(
		...,
	    description="Requests reports published before the end_date. Format: 'yyyy-MM-ddTHH:mm:ss'",
	    example="2023-01-01T10:10:10"
	),
    article_ids: Optional[List[int]] = Query(
        [],
        description="List of articles reports of interest should belong to.",
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
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={"error": "Date must be in the format yyyy-mm-ddTHH:mm:ss"})
    if timezone not in pytz.all_timezones:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={"error": "Timezone is not in the correct format and/or cannot be found."})

    start_date = parse_datetime_string(start_date, timezone)
    end_date = parse_datetime_string(end_date, timezone)
    
    if end_range < start_range:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={"error": "Start range must be less than end range."})
    if end_date < start_date:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={"error": "Start date must be earlier than end date."})
    

    # First get a list of all the locations objects from their ids
    locations = {}
    location_ids = None
    if location is not None:
        response = get_location_ids(location)
        if response["success"]:
            locations = response["location_ids"]
            location_ids = list(locations.keys())
            
    # Get a list of all matching disease ids from the keywords
    matched_disease_ids = []
    if key_terms is not None:
        key_terms_list = [x.strip() for x in key_terms.split(",")]
        # Key terms is a bit tricky. We will first find all the disease_ids which match
        # these keywords. Because the disease database is small, this should be quick

        # Matching disease id to disease name (only for diseases which matched a key term)
        matched_diseases = {}

        all_diseases = list(diseases_col.find())
        for disease in all_diseases:
            for key_term in key_terms_list:
                if re.match(rf".*{key_term}.*", disease["name"], re.IGNORECASE):
                    matched_diseases[disease["_id"]] = disease["name"]
                    break
                elif "regex" in disease and re.match(rf"{disease['regex']}", key_term, re.IGNORECASE):
                    matched_diseases[disease["_id"]] = disease["name"]
                    break
                else:
                    # Check if this is in the key words list
                    matched = False
                    for key_word in disease["key_words"]:
                        if re.match(rf".*{key_term}.*", key_word, re.IGNORECASE):
                            matched_diseases[disease["_id"]] = disease["name"]
                            matched = True
                            break
                    if matched:
                        break

        matched_disease_ids = list(matched_diseases.keys())

    query = generate_query(start_date, end_date, article_ids, location_ids, matched_disease_ids)

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

    return {
        "start_range": start_range,
        "end_range": end_range,
        "reports": reports
    }
