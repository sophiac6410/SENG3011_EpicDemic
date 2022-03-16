from fastapi import APIRouter, FastAPI, Query, HTTPException, status
from fastapi.responses import JSONResponse
from datetime import date, datetime, time
from pydantic import BaseModel, Field # datetime has format yyyy-mm-ddTHH:mm:ss
from typing import Optional, List, Dict, Any

class Log(BaseModel):
    # id: int = Field(..., description="The unique id of the log")
    team_name: str = Field("EpicDemic", description="The name of the SENG3011 team")
    accessed_time: datetime = Field(..., description="The time that the API endpoint was accessed. Format: yyyy-mm-ddTHH:mm:ss")
    data_source: str = Field("promedmail.org", description="The data source of the articles and reports")

    class Config:
        schema_extra = {
            "example": {
                "id": 1,
                "team_name": "EpicDemic",
                "accessed_time": "2022-03-10T02:08:51",
                "data_source": "promedmail.org"
            }
        }

class Response(BaseModel):
    ok: bool = Field(..., description="True if the request was successful, and false if the request was unsuccessful")
    code: int = Field(..., description="The status code")
    data: Any = Field(..., description="The data for the request")
    log: Log = Field(..., description="A log for the response")

    class Config:
        schema_extra = {
            "successful": {
                "ok": True,
				"code": 200,
				"data": "",
				"log": {
                    "id": 1,
                    "team_name": "EpicDemic",
                    "accessed_time": "2022-03-10T02:08:51",
                    "data_source": "promedmail.org"
                }
            },
            "unsuccessful": {
                "ok": False,
                "code": 400,
                "data": {"error": "Date must be in the format yyyy-mm-ddTHH:mm:ss"},
                "log": {
                    "id": 1,
                    "team_name": "EpicDemic",
                    "accessed_time": "2022-03-10T02:08:51",
                    "data_source": "promedmail.org"
                }
            }
        }


class Error(BaseModel):
	error: str = Field(..., description="The error message")

	class Config:
		schema_extra = {
			"example": {
				"error": "Date must be in the format yyyy-mm-ddTHH:mm:ss"
			}
		}