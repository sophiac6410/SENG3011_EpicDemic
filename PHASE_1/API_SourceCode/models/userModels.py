from datetime import datetime
from email.mime import base
from pydantic import BaseModel, Field
from typing import List, Dict
from models import baseModels

############### USER RESPONSE MODELS ##############
class Auth(BaseModel):
    token: str = Field(..., description="The unique token for an authenticated user", 
                    example="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb2huLmRvZUBlbWFpbC5jb20iLCJleHAiOjE2NDk5OTc4NTJ9.bkGLfoU3AUHUNf46ctdFsoHlC7mYfFE1Rl6P97Xt8Uc")

class AuthResponse(baseModels.Response):
    data: Auth

class Saved(BaseModel):
    saved_locations: List[str] = Field(..., description="A list of the ISO codes corresponding to the locations that the user has saved", example=['PH', 'AT'])
    saved_trips: List[int] = Field(..., description="A list of all the id's of trips that the user has saved", example=[1, 2, 3])

class SavedResponse(baseModels.Response):
    data: Saved