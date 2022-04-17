from fastapi import APIRouter, Query, status, Path
from fastapi.responses import JSONResponse
from util import DATETIME_REGEX, parse_datetime_string
from database import locations_col, diseaseLocations_col, updates_col, safety_col, travel_col
import re
from datetime import datetime
import pytz
from typing import Optional
from models import baseModels, locationModels

router = APIRouter(
	prefix="/v1/locations"
)

############## GET LOCATION BY IDS ###############
@router.get("/{id}", status_code=status.HTTP_200_OK, response_model=locationModels.LocationResponse)
async def get_location_by_id(
	id: str = Path(
		...,
		description="The country's unique ISO code",
		example="PH",
	)
):
	data = list(locations_col.find({'_id': id}))
	if (len(data) == 0):
		return JSONResponse(status_code=status.HTTP_204_NO_CONTENT, content={"error": "No data for country"})
	else:
		data = data[0]
		updates = list(updates_col.find({"location_id": id}).sort("date", -1))
		if (len(updates) == 0):
			data.update({"last_update": datetime.now()})
		else:
			data.update({"last_update": updates[0].get("date")})
	return baseModels.createResponse(True, 200, data)




############## GET covid cases on all available countries ###############
@router.get("/covidcases", status_code=status.HTTP_200_OK, response_model=locationModels.LocationCovidResponse)
async def get_covid_cases():

	data = list(diseaseLocations_col.find())
	cases_per_country = []

	for country in data:
		# print(f"-- {country['location']} --")
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


############## GET SAEFTY SCORE OF A COUNTRY ###############
@router.get("/{id}/safety", status_code=status.HTTP_200_OK, response_model=locationModels.LocationSafetyResponse)
async def get_location_by_id(
	id: str = Path(
		...,
		description="The country's unique ISO code",
		example="PH",
	)
):
    data = list(safety_col.find({'location_id': id}))
    data = data[0]

    return baseModels.createResponse(True, 200, {
		'lqbtq': data['lgbtq'],
		'medical': data['medical'],
		'theft': data['theft'],
		'physical_harm': data['physicalHarm'],
		'political_freedom': data['politicalFreedom'],
		'women': data['women'],
		'last_updated': data['updated']
	})


############## GET TRAVEL OVERVIEW OF THE COUNTRY ###############
@router.get("/{id}/travel", status_code=status.HTTP_200_OK, response_model=locationModels.LocationTravelOverviewResponse)
async def get_travel_overview(
	id: str = Path(
		...,
		description="The country's unique ISO code",
		example="PH",
	)
):
	data = list(travel_col.find({'_id':id}))[0]
	area_list = []
	print('--area restriction--')
	for a in data['area_restrction'][0]:
		area_list.append(a)

	return baseModels.createResponse(True, 200, {
			'declaration': data['declaration'],
			'quarantine': data['quarantine'],
			'area_restriction': area_list,
			'testing': data['testing'],
			'mask': data['mask'],
			'area_policy': data['area_policy'],
			'tracing': {
				'date': data['tracing']['date'],
				'text': data['tracing']['text'],
				'isRequired': data['tracing']['isRequired'],
				'androidLink': data['tracing']['androidUrl'][0],
				'iosLink': data['tracing']['iosUrl'][0]
			},
			'attractions_info': data['attractions_info'],
			'entry_info': data['entry_info'],
			'event_info': data['event_info'],
			'shopping_info': data['shopping_info'],
			'vaccine_info': data['vaccine_info']
		})








