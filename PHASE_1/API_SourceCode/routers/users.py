from fastapi import APIRouter, status, Header, Path
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from database import users_col
from models import userModels, baseModels
import auth

router = APIRouter(
    prefix='/v1/users'
)

token_example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb2huLmRvZUBlbWFpbC5jb20iLCJleHAiOjE2NDk5OTc4NTJ9.bkGLfoU3AUHUNf46ctdFsoHlC7mYfFE1Rl6P97Xt8Uc"

class User(BaseModel):
    email: str = Field(..., description="The user's email", example="john.doe@email.com")
    password: str = Field(..., description="The user's password", example="john")

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

@router.get("/saved", status_code=status.HTTP_200_OK, tags=["users"], response_model=userModels.SavedResponse, responses={401: {"model": baseModels.ErrorResponse}})
async def get_saved_locations_and_trips(Authorization: str = Header(..., example=token_example)):
    user = auth.get_current_user(Authorization)
    saved = {
        "saved_locations": user["saved_locations"],
        "saved_trips": user["saved_trips"]
    }
    return baseModels.createResponse(True, 200, saved)

@router.put("/location/{ISO_Code}", status_code=status.HTTP_200_OK, tags=["users"], response_model=baseModels.Response, responses={401: {"model": baseModels.ErrorResponse}})
async def add_saved_location (
    Authorization: str = Header(..., example=token_example),
    ISO_Code: str = Path(..., description="The ISO code of the location that is being saved", example="PH"),
    ):
    user = auth.get_current_user(Authorization)
    users_col.update_one(
        {"email": user['email']},
        {"$push": {"saved_locations": ISO_Code}}
    )
    return baseModels.createResponse(True, 200, {})

@router.delete("/location/{ISO_Code}", status_code=status.HTTP_200_OK, tags=["users"], response_model=baseModels.Response, responses={401: {"model": baseModels.ErrorResponse}})
async def delete_saved_location (
    Authorization: str = Header(..., example=token_example),
    ISO_Code: str = Path(..., description="The ISO code of the location that is being saved", example="PH"),
    ):
    user = auth.get_current_user(Authorization)
    users_col.update_one(
        {"email": user['email']},
        {"$pull": {"saved_locations": ISO_Code}}
    )
    return baseModels.createResponse(True, 200, {})

