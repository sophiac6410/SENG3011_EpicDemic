from datetime import datetime
from email.header import Header
from lib2to3.pgen2 import token
from dateutil.parser import parse
from fastapi import APIRouter, status, Header, Query, Path
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from datetime import datetime, timedelta
from typing import Optional, List
from database import trip_col, tripCities_col, users_col
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
    city_name: str = Field(..., description="The name of the city", example='Paris')
    latitude: float = Field(..., description="The latitude of the city", example=2.3522)
    longitude: float = Field(..., description="The longitude of the city", example=48.8566)
    start_date: datetime = Field(..., description="The date of arrival in the city", example='2022-07-01T00:00:00.000+00:00')
    end_date: datetime = Field(..., description="The date of departure from the city", example='2022-10-01T00:00:00.000+00:00')
    country_code: str = Field(..., description="The ISO code of the city's country", example="FR")

class Activity(BaseModel):
    activityId: int = Field(..., description="The unique id of the activity being added", example=1)
    cityId: int = Field(..., description="The unique id of the city that the activity is held in", example=1)
    tripId: int = Field(..., description="The unique id of the trip the activity is being added to", example=1)

@router.get("/trips", status_code=status.HTTP_200_OK, tags=['trips'], response_model=tripModels.TripResponse)
async def get_saved_trips (
    Authorization: str = Header(..., example=token_example),
):
    user = auth.get_current_user(Authorization)
    trips = list(trip_col.aggregate([
        {"$match": {"_id": {"$in": user['saved_trips']}}},
        {"$project": {"id": "$_id", "name": 1, "start_date": 1, "end_date": 1, "travellers": 1, "cities": 1 }}
    ]))
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
                    "activities": 1
                }
            )

    return baseModels.createResponse(True, 200, trips)

@router.delete("/trips/{tripId}", status_code=status.HTTP_200_OK, tags=['trips'], response_model=baseModels.Response)
async def delete_saved_trip (
    Authorization: str = Header(..., example=token_example),
    tripId: int = Path(..., description="The unique id of the trip")
):
    user = auth.get_current_user(Authorization)
    users_col.update_one(
        {"email": user['email']},
        {"$pull": {"saved_trips": tripId}}
    )
    for c in trip_col.find_one({"_id": tripId})['cities']:
        tripCities_col.delete_one({"_id": c})

    trip_col.delete_one({"_id": tripId})

    return baseModels.createResponse(True, 200, {})


@router.post("/trips/new", status_code=status.HTTP_200_OK, tags=['trips'], response_model=tripModels.TripIdResponse)
async def add_new_trip (
    trip: Trip,
    Authorization: str = Header(..., example=token_example),
):
    user = auth.get_current_user(Authorization)
    id = 1
    if (len(list(trip_col.find())) == 0):
        id = 1
    else:
        id = trip_col.find().limit(1).sort([('$natural',-1)])['_id'] + 1

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

@router.post("/trips/new/city", status_code=status.HTTP_200_OK, tags=['trips'], response_model=tripModels.TripIdResponse, responses={401: {"model": baseModels.ErrorResponse}})
async def add_new_city_to_trip (
    city: City,
    tripId: int = Query(..., description="The unique id of the trip the city is being added to", example=1),
    Authorization: str = Header(..., example=token_example),
):
    user = auth.get_current_user(Authorization)
    if tripId not in user['saved_trips']:
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={"error": "Not authorised to add city to trip"})

    id = 1
    if (len(list(tripCities_col.find())) == 0):
        id = 1
    else:
        id = tripCities_col.find().limit(1).sort([('$natural',-1)])['_id'] + 1
    
    tripCities_col.insert_one({
        "_id": id,
        "city_name": city.name,
        "latitude": city.latitude,
        "longitude": city.longitude,
        "start_date": city.start_date,
        "end_date": city.end_date,
        "country_code": city.country_code,
        "activities": []
    })

    trip_col.update_one(
        {"_id": tripId},
        {"$push": {"cities": id}}
    )

    return baseModels.createResponse(True, 200, {"id": id})


@router.post("/trips/new/activity", status_code=status.HTTP_200_OK, tags=['trips'], response_model=baseModels.Response)
async def add_new_city_to_trip (
    activity: Activity,
    Authorization: str = Header(..., example=token_example),
):
    user = auth.get_current_user(Authorization)
    if activity.tripId not in user['saved_trips']:
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={"error": "Not authorised to add activity to trip"})
    
    tripCities_col.update_one(
        {"_id": activity.cityId},
        {"$push": {"activities": activity.activityId}}
    )
    return baseModels.createResponse(True, 200, {})

   