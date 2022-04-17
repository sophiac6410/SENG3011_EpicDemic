from datetime import datetime
from pydantic import BaseModel, Field
from typing import List
from models import baseModels

class Update(BaseModel):
    location_id: str = Field(..., description="The ISO code of the location for the update", example="AT")
    country: str = Field(..., description="The country name that the update refers to", example="Austria")
    text: str = Field(..., description="The description of the update", example="Wearing FFP2 face masks is mandatory in all indoor public spaces na...")
    date: datetime = Field(..., description="The date of the update", example="2022-03-02")
    collection_type: str = Field(..., description="The category of the update. Possible values are 'quarantine', 'testing', 'document', 'mask', 'tracing', 'policies', 'Others'", example="mask")

class UpdateResponse(BaseModel):
    start: int = Field(..., description="The starting index for the returned updates", example=1)
    end: int = Field(..., description="The end index for the returned updates", example=5)
    updates: List[Update] = Field(..., description="A list of the updates")

class Response(baseModels.Response):
    data: UpdateResponse