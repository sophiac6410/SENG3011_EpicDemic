from datetime import datetime
from lib2to3.pgen2 import token
from dateutil.parser import parse
from SENG3011_EpicDemic.PHASE_1.API_SourceCode.Auth import authenticate_user
from fastapi import APIRouter, status
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


@router.post("/login", status_code=status.HTTP_200_OK, tag=["users"], response_model=userModels.AuthResponse, responses={400: {"model": baseModels.ErrorResponse}})
async def login(user: User):
    authUser = authenticate_user(user.email, user.password);
    if not authUser:
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={"error": "Email or password is incorrect"})
    else:
        return baseModels.createResponse(True, 200, {"token": auth.create_access_token(user.email)})

@router.post("/register", status_code=status.HTTP_200_OK, tag=["users"], response_model=userModels.AuthResponse, responses={400: {"model": baseModels.ErrorResponse}})
async def register(user: RegisterUser):
    for u in users_col:
        if (u["email"] == user.email and u["password"] == user.password):
            return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={"error": "Email already registered"})
    else:
        users_col.update({
            "name": user.name,
            "email": user.email,
            "hashed_password": auth.get_password_hash(user.password)
        })
        return baseModels.createResponse(True, 200, {"token": auth.create_access_token(user.email)})
