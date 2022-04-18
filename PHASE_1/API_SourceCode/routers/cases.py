from fastapi import APIRouter, Query, status, Path
from fastapi.responses import JSONResponse
from util import DATETIME_REGEX, parse_datetime_string
from database import locations_col, diseaseLocations_col
from datetime import datetime
from typing import Optional
from models import baseModels, locationModels

router = APIRouter(
	prefix="/v1/cases"
)

@router.get("/", status_code=status.HTTP_200_OK, response_model=locationModels.LocationCovidResponse)
async def get_covid_cases():
	data = list(diseaseLocations_col.find())
	cases_per_country = []

	for country in data:
		print(f"-- {country['location']} --")
		loc_data = list(locations_col.find({'_id': country['location']}))
		# print(loc_data)
		if len(loc_data) > 0:
			loc_data = loc_data[0]
			cases_per_country.append({
				'country': loc_data['country'],
				'longitude': loc_data['longitude'],
				'latitude': loc_data['latitude'],
				'cases': country['cases']['confirmed']
			})

	return baseModels.createResponse(True, 200, {
		"cases_per_country": cases_per_country
	})