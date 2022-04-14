from datetime import datetime
from email.header import Header
from lib2to3.pgen2 import token
from dateutil.parser import parse
from fastapi import APIRouter, status, Header
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from datetime import datetime, timedelta
from typing import Optional
from database import users_col
from models import userModels, baseModels
import auth

router = APIRouter(
    prefix='/v1/users'
)

class User(BaseModel):
    email: str = Field(..., description="The user's email", example="example@email.com")
    password: str = Field(..., description="The user's password", example="password")

class RegisterUser(User):
    name: str = Field(..., description="The user's name", example="John Doe")


@router.post("/login", status_code=status.HTTP_200_OK, tags=["users"], response_model=userModels.AuthResponse, responses={401: {"model": baseModels.ErrorResponse}})
async def login(user: User):
    authUser = auth.authenticate_user(user.email, user.password);
    if not authUser:
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={"error": "Email or password is incorrect"})
    else:
        return baseModels.createResponse(True, 200, {"token": auth.create_access_token(user.email)})

@router.post("/register", status_code=status.HTTP_200_OK, tags=["users"], response_model=userModels.AuthResponse, responses={400: {"model": baseModels.ErrorResponse}})
async def register(user: RegisterUser):
    if (users_col.find_one({"email": user.email})):
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={"error": "Email already registered"})
    else:
        users_col.insert_one({
            "name": user.name,
            "email": user.email,
            "password": user.password,
            "saved_locations": [],
            "saved_trips": []
        })
    return baseModels.createResponse(True, 200, {"token": auth.create_access_token(user.email)})

# @router.get("/saved", status_code=status.HTTP_200_OK, tags=["users"], response_model=userModels.SavedResponse, responses={401: {"model": baseModels.ErrorResponse}})
# async def getSaved(Authorization: str = Header(None)):
#     user = auth.get_current_user(Authorization)
#     saved = {
#         "saved_locations": user["saved_locations"],
#         "saved_trips": user["saved_trips"]
#     }
#     return baseModels.createResponse(True, 200, {"saved": saved})

# @router.put("/saved", status_code=status.HTTP_200_OK, tags=["users"], response_model=userModels.SavedResponse, responses={401: {"model": baseModels.ErrorResponse}})
# async def putSaved (
#     Authorization: str = Header(None)
#     location: str = Field(None, description="The ISO-2 code of the location that is being saved", example="PH")
#     trip: int = Field(None, description="The id of the trip that is being saved")
#     ):
#     user = auth.get_current_user(Authorization)
#     saved = {
#         "saved_locations": user["saved_locations"],
#         "saved_trips": user["saved_trips"]
#     }
#     return baseModels.createResponse(True, 200, {"saved": saved})
# )