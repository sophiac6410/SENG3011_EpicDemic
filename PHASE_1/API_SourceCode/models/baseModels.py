from fastapi import APIRouter, FastAPI, Query, HTTPException, status
from fastapi.responses import JSONResponse
from datetime import date, datetime, time
from pydantic import BaseModel, Field # datetime has format yyyy-mm-ddTHH:mm:ss
from typing import Optional, List, Dict, Any
from API_Documentation import metadata

class Response(BaseModel):
	team_name: str = Field("EpicDemic", description=metadata.response["desc"]["team_name"])
	version: str = Field(metadata.api_data["version"], description=metadata.response["desc"]["version"])
	accessed_time: datetime = Field(..., description=metadata.response["desc"]["accessed_time"])
	data_source: str = Field("promedmail.org", description=metadata.response["desc"]["data_source"])
	ok: bool = Field(..., description=metadata.response["desc"]["ok"])
	code: int = Field(..., description=metadata.response["desc"]["code"])
	data: Any = Field(..., description=metadata.response["desc"]["data"])

	class Config:
		schema_extra = {
			"example": metadata.response["example"]
		}

class Error(BaseModel):
	error: str = Field(..., description=metadata.error["desc"])

	class Config:
		schema_extra = {
			"example": metadata.error["example"]
		}