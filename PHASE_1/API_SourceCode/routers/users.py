from datetime import datetime
from lib2to3.pgen2 import token
from dateutil.parser import parse
from typing import Dict, List, Optional
from fastapi import APIRouter, Query, status
from fastapi.responses import JSONResponse
from httplib2 import Response
from pydantic import BaseModel, Field
import pytz
from util import DATETIME_REGEX, parse_datetime_string, generate_query
from database import users_col
import re
from geonames import get_location_ids
from models import userModels, baseModels

router = APIRouter(
    prefix='/v1/users'
)

class User(BaseModel):
    email: str
    password: str

class RegisterUser(User):
    email: str

def createToken():
    return

@router.post("/login", status_code=status.HTTP_200_OK, tag=["users"], response_model=baseModels.Response, responses={400: {"model": baseModels.ErrorResponse}})
async def login(user: User):
    for u in users_col:
        if (u["email"] == user.email and u["password"] == user.password):
            return baseModels.createResponse(True, 200, {})
    else:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={"error": "Email or password is incorrect"})

@router.post("/register", status_code=status.HTTP_200_OK, tag=["users"], response_model=baseModels.Response, responses={400: {"model": baseModels.ErrorResponse}})
async def register(user: RegisterUser):
    for u in users_col:
        if (u["email"] == user.email and u["password"] == user.password):
            return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={"error": "Email already registered"})
    else:
        users_col.update({
            "name": user.name,
            "email": user.email,
            "password": user.password
        })
        return baseModels.createResponse(True, 200, {})
