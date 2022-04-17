from models import baseModels
from pydantic import BaseModel, Field # datetime has format yyyy-mm-ddTHH:mm:ss
from typing import List
from datetime import datetime

class Location(BaseModel):
	_id: str = Field(..., description="The unique ISO code of the country", 
                    example='FR')
	country: str = Field(..., description="The name of the country", 
                    example='France')
	capital: str = Field(..., description="The capital of the country", 
                    example="Paris")
	longitude: str = Field(..., description="The longitude of the country according to geocoder",
                    example=46.2276)
	latitude: str = Field(..., description="The latitude of the country according to geocoder",
                    example=2.2137)
	geonames_id: int = Field(..., description="The id of the country according to geonames API",
                    example=3017382)
	region: str = Field(..., description="The continent of the country",
                    example="Europe")
	entry_description: str = Field(..., description="The summary of the country entry rules",
                    example="Must be adminestered with a booster shot")
	disease_risk: int = Field(..., description="The integer between 0 and 4, correlating low (0) to high (4) disease risk in a location.",
                    example=2)
	safety_score: int = Field(..., description="The overall safety rating of a country: 0 (Safest) - 100 (Dangerous)",
                    example=30)
	travel_status: int = Field(..., description="The integer representation of travel condition 0 (Allowed) - 2 (Banned)",
                    example=2)
	advice_level: int = Field(..., description="Calculated by the percentage of disease_risk, safety_score + travel_status. 0 (Safest) - 4 (Do not travel)",
                    example=3)
	last_update: datetime = Field(..., description="The date of the last update on the location's travel requirements", example="2022-04-02")

class LocationCovid(BaseModel):
	country: str = Field(..., description="The name of the country", 
                    example='France')
	longitude: str = Field(..., description="The longitude of the country according to geocoder",
                    example=46.2276)
	latitude: str = Field(..., description="The latitude of the country according to geocoder",
                    example=2.2137)
	cases: int = Field(..., description="The total number of covid cases in the country",
                    example=300000000)


class LocationCovidQuery(BaseModel):
	cases_per_country: List[LocationCovid] = Field(..., description="The list of dict containing countries coordinates and their cases")

class LocationResponse(baseModels.Response):
	data: Location

class LocationCovidResponse(baseModels.Response):
	data: LocationCovidQuery
