from datetime import datetime
from pydantic import BaseModel, Field # datetime has format yyyy-mm-ddTHH:mm:ss
from typing import List, Dict
from models import baseModels

class Location(BaseModel):
    id: int = Field(..., description="The unique id of the location", example=13)
    country: str = Field(..., description="The country that the report occurred in", example="Australia")
    city: str = Field(..., description="The city that the report occurred in. Empty string if the city is unknown.", example="")
    state: str = Field(..., description="The state that the report occurred in. Empty string if the state is unknown.", example="New South Wales")
    latitude: float = Field(..., description="The latitude of the location", example=-32.713139)
    longitude: float = Field(..., description="The longitude of the location", example=152.066223)
    geonames_id: int = Field(..., description="The location's geonames id", example=2152652)

class Report(BaseModel):
    id: int = Field(..., description="The unique id of the report", example=1)
    article_id: int = Field(..., description="The id of the article that the report is published in", example=4)
    diseases: List[str] = Field(..., description="The diseases that are mentioned in the report", example=["other"])
    confirmed: bool = Field(..., description="True if the report is confirmed, false if not", example=True)
    syndromes: List[str] = Field(..., description="The syndromes of the disease mentioned in the report", example=[])
    event_date: datetime = Field(..., description="The date that the report occurred", example="2022-01-02T00:00:00+11:00")
    locations: List[Location]

class ReportIds(BaseModel):
    reports: Dict[int, Report] = Field(..., description="A dictionary of reports ids mapped to the report summary")

    class Config:
        schema_extra = {
            "example": {
                1: {
                    "id": 1,
                    "article_id": 4,
                    "diseases": [ "other" ],
                    "confirmed": True,
                    "syndromes": [],
                    "event_date": "2022-01-02T00:00:00+11:00",
                    "locations": [ 
                        {
                            "id": 13,
                            "country": "Australia",
                            "city": "",
                            "state": "New South Wales",
                            "latitude": -32.713139,
                            "longitude": 152.066223,
                            "geonames_id": 2152652
                        } 
                    ]
                }
            }
        }
class ReportQuery(BaseModel):
    start_range: int = Field(..., description="The starting position of the reports", example=1)
    end_range: int = Field(..., description="The last position of the reports", example=10)
    reports: List[Report] = Field(..., description="The list of reports")

class ReportIdResponse(baseModels.Response):
    data: ReportIds

class ReportQueryResponse(baseModels.Response):
    data: ReportQuery