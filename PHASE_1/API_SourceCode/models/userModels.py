from datetime import datetime
from email.mime import base
from pydantic import BaseModel, Field
from typing import List, Dict
from models import baseModels

############### USER RESPONSE MODELS ##############
class Auth(BaseModel):
    token: str = Field(..., description="The unique token for an authenticated user", 
                    example="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9")

class AuthResponse(baseModels.Response):
    data: Auth

# class Saved(BaseModel):
#     saved_locations: List(int) = Field(..., description="A list of all the id's of locations that the user has saved", example=[1, 2, 3])
#     saved_trips: List(int) = Field(..., description="A list of all the id's of trips that the user has saved", example=[1, 2, 3])

# class SavedResponse(baseModels.Response):
#     data: Saved