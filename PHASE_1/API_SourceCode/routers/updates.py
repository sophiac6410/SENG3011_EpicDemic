from datetime import datetime
from email.header import Header
from lib2to3.pgen2 import token
from dateutil.parser import parse
from fastapi import APIRouter, status, Header, Query, Path
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from datetime import datetime, timedelta
from typing import Optional, List
from database import updates_col
from models import updateModels, baseModels

router = APIRouter(
    prefix='/v1/updates'
)

@router.get("/", status_code=status.HTTP_200_OK, response_model=updateModels.Response)
async def get_updates(
    location: Optional[str] = Query("", description="The ISO code for the country of the updates. To get multiple locations, separate ISO codes by a comma ", example="AT, BG"),
    category: Optional[str] = Query("", description="The categories of the update, separated by commas. Possible values are 'quarantine', 'testing', 'document', 'mask', 'tracing', 'policies', 'Others'", example="mask,testing"),
    start: Optional[int] = Query(1, description="The starting index for the returned updated"),
    end: Optional[int] = Query(20, description="The end index for the returned update")
):
    updates = []
    print("location is " + location)
    print("category is " + category)
    if location == "" and category == "":
        updates = list(
            updates_col.find({},{"_id": False})
            .skip(start-1)
            .limit(end-start+1)
            .sort("date", -1)
        )
        print(updates)
    elif location == "":
        updates = list(updates_col.aggregate([
            {"$match": {"collection_type": {"$in": category.split(",")}}},
            {"$project": {"_id": False}},
            {"$skip": start-1},
		    {"$limit": end-start+1},
            {"$sort": {"date": -1}}
        ]))
    elif category == "":
        updates = list(updates_col.aggregate([
            {"$match": {"location_id": {"$in": location.split(",")}}},
            {"$project": {"_id": False}},
            {"$skip": start-1},
		    {"$limit": end-start+1},
            {"$sort": {"date": -1}}
        ]))
    else:
        updates = list(updates_col.aggregate([
            {"$match": {
                "$and": [
                    {"location_id": {"$in": location.split(",")}},
                    {"collection_type": {"$in": category.split(",")}},
                ]
            }},
            {"$project": {"_id": False}},
            {"$skip": start-1},
		    {"$limit": end-start+1},
            {"$sort": {"date": -1}}
        ]))
    print(updates)
    if updates == None:
        updates == []
    return baseModels.createResponse(True, 200, {
        "start": start,
        "end": end,
        "updates": updates
    })