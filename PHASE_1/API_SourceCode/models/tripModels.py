from datetime import datetime
from pydantic import BaseModel, Field
from typing import List
from models import baseModels

class City(BaseModel):
    id: int = Field(..., description="The unique id of the trip's city", example=2)
    city_name: str = Field(..., description="The name of the city", example='Paris')
    latitude: float = Field(..., description="The latitude of the city", example=2.3522)
    longitude: float = Field(..., description="The longitude of the city", example=48.8566)
    start_date: datetime or None = Field(None, description="The date of arrival in the city", example='2022-07-01T00:00:00.000+00:00')
    end_date: datetime or None = Field(None, description="The date of departure from the city", example='2022-10-01T00:00:00.000+00:00')
    country_name: str = Field(..., description="The name of the country", example="France")
    country_code: str = Field(..., description="The ISO code of the city's country", example="FR")
    activities: List[int] = Field(..., description="The list of activities to do in the city. Activities are referenced by their id, which corresponds to Amadeus API's activity ids.", example=[49488, 265211, 298635, 106708])

class Trips(BaseModel):
    id: int = Field(..., description="The unique id of the trip", example=1)
    name: str = Field(..., description="The name of the trip", example="Tiana's Europe Adventures")
    start_date: datetime = Field(..., description="The date of departure for the trip", example='2022-06-01T00:00:00.000+00:00')
    end_date: datetime = Field(..., description="The return date of the trip", example='2022-12-01T00:00:00.000+00:00')
    travellers: int = Field(..., description="The number of travellers on the trip", example=6)
    cities: List[City] = Field(..., description="The list of cities to visit in the trip")

class User(BaseModel):
    email: str = Field(..., description="The email of the user", example='jess@mail.com')
    name: str = Field(..., description="The first and last name of the user", example='Jessica Smith')

class TripId(BaseModel):
    id: int = Field(..., description="The id of the newly created trip or city", example=1)

class TripResponse(baseModels.Response):
    data: List[Trips]

class TripByIdResponse(baseModels.Response):
    data: Trips

class TripIdResponse(baseModels.Response):
    data: TripId

class UserResponse(baseModels.Response):
    data: User