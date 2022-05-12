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

class User(BaseModel):
    email: str = Field(..., description="The email of the user", example='jess@mail.com')

@router.get("/", status_code=status.HTTP_200_OK, tags=['trips'], response_model=tripModels.TripResponse)
async def get_saved_trips (
    Authorization: str = Header(..., example=token_example),
):
    user = auth.get_current_user(Authorization)
    trips = list(trip_col.aggregate([
        {"$match": {"_id": {"$in": user['saved_trips']}}},
        {"$project": {"id": "$_id", "name": 1, "start_date": 1, "end_date": 1, "travellers": 1, "cities": 1, "members": 1, "owner": 1 }}
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
                    "activities": 1
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
                "activities": 1
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
        "cities": [],
        "members": []
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
    
    tripCities_col.insert_one({
        "_id": id,
        "city_name": city.city_name,
        "latitude": city.latitude,
        "longitude": city.longitude,
        "start_date": city.start_date,
        "end_date": city.end_date,
        "country_code": city.country_code,
        "country_name": city.country_name,
        "activities": []
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


@router.post("/{tripId}/new/member", status_code=status.HTTP_200_OK, tags=['trips'], response_model=tripModels.UserResponse, responses={401: {"model": baseModels.ErrorResponse}, 400: {"model": baseModels.ErrorResponse}})
async def add_user_to_trip (
    user: User,
    tripId: int = Path(..., description="The unique id of the trip"),
    Authorization: str = Header(..., example=token_example),
):
    owner = list(trip_col.find({ "_id": tripId }))[0]['owner']
    if auth.get_current_user(Authorization)['email'] != owner:
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content=baseModels.createResponse(False, 401, {"error": "Not authorised to add members to trip"}))

    members = list(trip_col.find({ "_id": tripId }))[0]['members']
    if owner == user.email or user.email in members:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content=baseModels.createResponse(False, 400, {"error": "Cannot add existing members"}))

    if auth.get_user(user.email): 
        trip_col.update_one(
            {"_id": tripId},
            {"$push": {"members": user.email}}
        )
        users_col.update_one(
            {"email": user.email},
            {"$push": {"saved_trips": tripId}}
        )
    else:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content=baseModels.createResponse(False, 400, {"error": "Email not found in the database"}))

    ret = {
        'email': user.email,
        'name': list(users_col.find({ "email": user.email }))[0]['name']
    }

    return baseModels.createResponse(True, 200, ret)
    


@router.get("/{tripId}/members", status_code=status.HTTP_200_OK, tags=['trips'], response_model=tripModels.UsersResponse, responses={401: {"model": baseModels.ErrorResponse}, 400: {"model": baseModels.ErrorResponse}})
async def get_user_to_trip (
    tripId: int = Path(..., description="The unique id of the trip"),
    Authorization: str = Header(..., example=token_example),
):
    members = list(trip_col.find({ "_id": tripId }))[0]['members']

    mem_list = []
    for member in members:
        mem_list.append({
            'email': member,
            'name': list(users_col.find({ "email": member }))[0]['name']
        })

    return baseModels.createResponse(True, 200, mem_list)


@router.get("/{tripId}/owner", status_code=status.HTTP_200_OK, tags=['trips'], response_model=tripModels.UserResponse, responses={401: {"model": baseModels.ErrorResponse}, 400: {"model": baseModels.ErrorResponse}})
async def get_owner (
    tripId: int = Path(..., description="The unique id of the trip"),
    Authorization: str = Header(..., example=token_example),
):

    try:
        owner = list(trip_col.find({ "_id": tripId }))[0]['owner']
        name = list(users_col.find({ "email": owner }))[0]['name']
    except:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content=baseModels.createResponse(False, 400, {"error": "Error"}))

    return baseModels.createResponse(True, 200, {
        'email': owner,
        'name': name
    })


@router.delete("/{tripId}/delete/member", status_code=status.HTTP_200_OK, tags=['trips'], response_model=baseModels.Response, responses={401: {"model": baseModels.ErrorResponse}})
async def delete_member (
    user: User,
    Authorization: str = Header(..., example=token_example),
    tripId: int = Path(..., description="The unique id of the trip")
):


    if auth.get_current_user(Authorization): 
        trip_col.update_one(
            {"_id": tripId},
            {"$pull": {"members": user.email}}
        )
        users_col.update_one(
            {"email": user.email},
            {"$pull": {"saved_trips": tripId}}
        )
    else:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content=baseModels.createResponse(False, 400, {"error": "Email not found in the database"}))

    return baseModels.createResponse(True, 200, {})
   