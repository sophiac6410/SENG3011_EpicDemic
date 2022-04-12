from datetime import datetime
from email.mime import base
from pydantic import BaseModel, Field # datetime has format yyyy-mm-ddTHH:mm:ss
from typing import List, Dict
from models import baseModels

############### USER RESPONSE MODELS ##############
class Auth(BaseModel):
    token: str = Field(..., description="The unique token for an authenticated user", 
                    example=1)

class AuthResponse(baseModels.Response):
    data: Auth