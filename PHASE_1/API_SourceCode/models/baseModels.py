from datetime import datetime, time
from pydantic import BaseModel, Field # datetime has format yyyy-mm-ddTHH:mm:ss
from typing import Dict, Any
import metadata

class Response(BaseModel):
    team_name: str = Field(metadata.api["team"], description="The name of our SENG3011 team")
    version: str = Field(metadata.api["version"], description="The current version of the API")
    accessed_time: datetime = Field(..., description="The time that the API endpoint was accessed. Format: yyyy-mm-dd HH:mm:ss",
                                    example="2022-03-10T02:08:51")
    data_source: str = Field(metadata.api["data_source"], description="The data source of the articles and reports")
    ok: bool = Field(..., description="True if the request was successful, and false if the request was unsuccessful",
                            example=True)
    code: int = Field(..., description="The status code of the response", example=200)
    data: Dict[Any, Any] = Field(..., description="The data returned from the request")

class Error(BaseModel):
	error: str = Field(..., description="The error message", example="Date must be in the format yyyy-mm-ddTHH:mm:ss")

class ErrorResponse(Response):
    data: Error

    class Config:
        schema_extra = {
            "example": {
                "team_name": "EpicDemic",
                "version": "0.0.1",
                "accessed_time": "2022-03-10 02:08:51",
                "data_source": "promedmail.org",
                "ok": False,
                "code": 400,
                "data": {"error": "Date must be in the format yyyy-mm-ddTHH:mm:ss"},
            }
        }

def createResponse(ok, code, data):
    return {
        "team_name": "EpicDemic",
        "version": "0.0.1",
        "accessed_time": str(datetime.now()),
        "data_source": "promedmail.org",
        "ok": ok,
        "code": code,
        "data": data,
    }