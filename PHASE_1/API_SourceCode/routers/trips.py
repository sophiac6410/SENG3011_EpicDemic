from datetime import datetime
from email.header import Header
from lib2to3.pgen2 import token
from dateutil.parser import parse
from numpy import array
from fastapi import APIRouter, status, Header, Query, Path
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from datetime import datetime, timedelta
from typing import Optional, List
from database import trip_col, tripCities_col, users_col, travel_col
from models import tripModels, baseModels
import auth

router = APIRouter(
    prefix='/v1/trips'
)

token_example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb2huLmRvZUBlbWFpbC5jb20iLCJleHAiOjE2NDk5OTc4NTJ9.bkGLfoU3AUHUNf46ctdFsoHlC7mYfFE1Rl6P97Xt8Uc"

class Trip(BaseModel):
    name: str = Field(..., description="The name of the trip", example="Tiana's Europe Adventures")
    start_date: datetime = Field(..., description="The date of departure for the trip", example='2022-06-01T00:00:00.000+00:00')
    end_date: datetime = Field(..., description="The return date of the trip", example='2022-12-01T00:00:00.000+00:00')
    travellers: int = Field(..., description="The number of travellers on the trip", example=6)

class City(BaseModel):
    trip_id: int = Field(..., description="The unique id of the trip the city is being added to", example=1)
    city_name: str = Field(..., description="The name of the city", example='Paris')
    latitude: float = Field(..., description="The latitude of the city", example=2.3522)
    longitude: float = Field(..., description="The longitude of the city", example=48.8566)
    start_date: Optional[datetime] = Field(None, description="The date of arrival in the city", example='2022-07-01T00:00:00.000+00:00')
    end_date: Optional[datetime] = Field(None, description="The date of departure from the city", example='2022-10-01T00:00:00.000+00:00')
    country_name: str = Field(..., description="The name of the country", example='France')
    country_code: str = Field(..., description="The ISO code of the city's country", example="FR")

class Activity(BaseModel):
    activityId: int = Field(..., description="The unique id of the activity being added", example=49488)
    cityId: int = Field(..., description="The unique id of the city that the activity is held in", example=1)
    tripId: int = Field(..., description="The unique id of the trip the activity is being added to", example=1)

class CheckListItem(BaseModel):
    item: str = Field(..., description="The name of the item in the checklist")
    groups = List[str] = Field(..., description="A list of the groups the item is being added to")

@router.get("/", status_code=status.HTTP_200_OK, tags=['trips'], response_model=tripModels.TripResponse)
async def get_saved_trips (
    Authorization: str = Header(..., example=token_example),
):
    user = auth.get_current_user(Authorization)
    trips = list(trip_col.aggregate([
        {"$match": {"_id": {"$in": user['saved_trips']}}},
        {"$project": {"id": "$_id", "name": 1, "start_date": 1, "end_date": 1, "travellers": 1, "cities": 1 }}
    ]))
    print(trips)
    for t in trips:
        for i in range(len(t['cities'])):
            t['cities'][i] = tripCities_col.find_one(
                {"_id": t['cities'][i]},
                { 
                    "id": "$_id",
                    "city_name": 1,
                    "latitude": 1,
                    "longitude": 1,
                    "start_date": 1,
                    "end_date": 1,
                    "country_code": 1,
                    "country_name": 1,
                    "activities": 1,
                    "checklist": 1,
                }
            )
    print(trips)

    return baseModels.createResponse(True, 200, trips)

@router.get("/{tripId}", status_code=status.HTTP_200_OK, tags=['trips'], response_model=tripModels.TripByIdResponse, responses={401: {"model": baseModels.ErrorResponse}})
async def get_trip_by_id (
    Authorization: str = Header(..., example=token_example),
    tripId: int = Path(..., description="The unique id of the trip")
):
    user = auth.get_current_user(Authorization)
    if tripId not in user['saved_trips']:
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content=baseModels.createResponse(False, 401, {"error": "Not authorised to view trip"}))

    trip = trip_col.find_one(
        {"_id": tripId},
        {"id": "$_id", "name": 1, "start_date": 1, "end_date": 1, "travellers": 1, "cities": 1 }
    )
    for i in range(len(trip['cities'])):
        trip['cities'][i] = tripCities_col.find_one(
            {"_id": trip['cities'][i]},
            { 
                "id": "$_id",
                "city_name": 1,
                "latitude": 1,
                "longitude": 1,
                "start_date": 1,
                "end_date": 1,
                "country_code": 1,
                "country_name": 1,
                "activities": 1,
                "checklist": 1,
            }
        )

    return baseModels.createResponse(True, 200, trip)


@router.delete("/{tripId}", status_code=status.HTTP_200_OK, tags=['trips'], response_model=baseModels.Response, responses={401: {"model": baseModels.ErrorResponse}})
async def delete_saved_trip (
    Authorization: str = Header(..., example=token_example),
    tripId: int = Path(..., description="The unique id of the trip")
):
    user = auth.get_current_user(Authorization)
    if tripId not in user['saved_trips']:
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content=baseModels.createResponse(False, 401, {"error": "Not authorised to delete trip"}))

    users_col.update_one(
        {"email": user['email']},
        {"$pull": {"saved_trips": tripId}}
    )
    for c in trip_col.find_one({"_id": tripId})['cities']:
        tripCities_col.delete_one({"_id": c})

    trip_col.delete_one({"_id": tripId})

    return baseModels.createResponse(True, 200, {})


@router.post("/new", status_code=status.HTTP_200_OK, tags=['trips'], response_model=tripModels.TripIdResponse)
async def add_new_trip (
    trip: Trip,
    Authorization: str = Header(..., example=token_example),
):
    user = auth.get_current_user(Authorization)
    id = 1
    if (len(list(trip_col.find())) == 0):
        id = 1
    else:
        id = list(trip_col.find().limit(1).sort([('$natural',-1)]))[0]['_id'] + 1

    trip_col.insert_one({
        "_id": id,
        "name": trip.name,
        "start_date": trip.start_date,
        "end_date": trip.end_date,
        "travellers": trip.travellers,
        "cities": []
    })

    users_col.update_one(
        {"email": user['email']},
        {"$push": {"saved_trips": id}}
    )
    
    return baseModels.createResponse(True, 200, {"id": id})

@router.post("/new/city", status_code=status.HTTP_200_OK, tags=['trips'], response_model=tripModels.TripIdResponse, responses={401: {"model": baseModels.ErrorResponse}})
async def add_new_city_to_trip (
    city: City,
    Authorization: str = Header(..., example=token_example),
):
    user = auth.get_current_user(Authorization)
    if city.trip_id not in user['saved_trips']:
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content=baseModels.createResponse(False, 401, {"error": "Not authorised to add city to trip"}))

    id = 1
    if (len(list(tripCities_col.find())) == 0):
        id = 1
    else:
        id = list(tripCities_col.find().limit(1).sort([('$natural',-1)]))[0]['_id'] + 1

    # find documents needed for checklist
    travel = travel_col.find_one({"_id": city.country_code})
    documents = []
    if (travel != None):
        if (travel['declaration']['documentRequired']):
            documents.append({'item': travel['declaration']['text'], 'checked': False})
        if (travel['testing']['isRequired']):
            documents.append({'item': travel['testing']['text'], 'checked': False})
    
    tripCities_col.insert_one({
        "_id": id,
        "city_name": city.city_name,
        "latitude": city.latitude,
        "longitude": city.longitude,
        "start_date": city.start_date,
        "end_date": city.end_date,
        "country_code": city.country_code,
        "country_name": city.country_name,
        "activities": [],
        "checklist": [
            {'name': 'Documents', 'items': documents},
            {'name': 'Bookings', 'items': [
                {'item': 'Book incoming flight',
                'checked': False},
                {'item': 'Book outgoing flight',
                'checked': False},
                {'item': 'Book accommodation',
                'checked': False},
            ]},
            {'name': 'Activities', 'items': []}
        ],
    })

    trip_col.update_one(
        {"_id": city.trip_id},
        {"$push": {"cities": id}}
    )

    return baseModels.createResponse(True, 200, {"id": id})


@router.post("/new/activity", status_code=status.HTTP_200_OK, tags=['trips'], response_model=baseModels.Response)
async def add_new_city_to_trip (
    activity: Activity,
    Authorization: str = Header(..., example=token_example),
):
    user = auth.get_current_user(Authorization)
    if activity.tripId not in user['saved_trips']:
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content=baseModels.createResponse(False, 401, {"error": "Not authorised to add activity to trip"}))
    
    trip = trip_col.find_one({"_id": activity.tripId}) 
    if (trip == None or activity.cityId not in trip['cities']):
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content=baseModels.createResponse(False, 400, {"error": "City does not exist in trip"}))
    
    tripCities_col.update_one(
        {"_id": activity.cityId},
        {"$push": {"activities": activity.activityId}}
    )
    return baseModels.createResponse(True, 200, {})

@router.put("/new/city/{cityId}/checklist/item", status_code=status.HTTP_200_OK, tags=['trips'], response_model=baseModels.Response)
async def add_new_item_to_checklist (
    item: CheckListItem,
    cityId: int = Path(..., description="The id of the city the item is being added to"),
    Authorization: str = Header(..., example=token_example),
):
    user = auth.get_current_user(Authorization)
    
    city = tripCities_col.find_one({"_id": cityId})
    if (city == None):
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content=baseModels.createResponse(False, 400, {"error": "City does not exist"}))
    for c in city['checklist']:
        if (c['name'] in item.groups):
            c['items'].append(item)

    tripCities_col.update({"_id": cityId}, {"$set": {"checklist": city['checklist']}})
    return baseModels.createResponse(True, 200, {})

@router.post("/new/city/{cityId}/checklist/group", status_code=status.HTTP_200_OK, tags=['trips'], response_model=baseModels.Response)
async def add_new_group_to_checklist (
    group: str = Query(..., description="The new group being added"),
    cityId: int = Path(..., description="The id of the city the item is being added to"),
    Authorization: str = Header(..., example=token_example),
):
    user = auth.get_current_user(Authorization)
    tripCities_col.update_one({"_id": cityId}, {"$push": {"checklist": {"name": group, "items": []}}})
    return baseModels.createResponse(True, 200, {})
