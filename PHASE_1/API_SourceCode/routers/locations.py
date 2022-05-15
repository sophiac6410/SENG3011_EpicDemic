from email.mime import base
from django.forms import BaseModelFormSet
from fastapi import APIRouter, Query, status, Path
from fastapi.responses import JSONResponse
from util import DATETIME_REGEX, parse_datetime_string
from database import locations_col, diseaseLocations_col, updates_col, safety_col, travel_col, reports_col, diseases_col, locations_promed_col
import re
from datetime import datetime
from typing import Optional
from models import baseModels, locationModels

router = APIRouter(
	prefix="/v1/locations"
)

############## GET LOCATION BY IDS ###############
@router.get("/", status_code=status.HTTP_200_OK, tags=["locations"], response_model=locationModels.LocationAllResponse)
async def get_all_locations():
	data = list(locations_col.find({}, {
		"id": "$_id",
		"country" : 1,
		"capital" : 1,
		"geonames_id" : 1,
		"longitude": 1,
		"latitude": 1,
		"region": 1,
		"entry_description": 1,
		"disease_risk": 1,
		"travel_status": 1,
		"safety_score": 1,
		"advice_level": 1,
	}).sort("country", 1))
	for d in data:
		updates = list(updates_col.find({"location_id": d.get("_id")}).sort("date", -1))
		if (len(updates) == 0):
			d.update({"last_update": datetime.now()})
		else:
			d.update({"last_update": updates[0].get("date")})
	
	return baseModels.createResponse(True, 200, data)


############## GET LOCATION BY IDS ###############
@router.get("/{id}", status_code=status.HTTP_200_OK, tags=["locations"], response_model=locationModels.LocationResponse)
async def get_location_by_id(
	id: str = Path(
		...,
		description="The country's unique ISO code",
		example="PH",
	)
):
	data = list(locations_col.find({'_id': id}, {
		"id": "$_id",
		"country" : "$country",
		"capital" : "$capital",
		"geonames_id" : "$geonames_id",
		"longitude": "$longitude",
		"latitude": "$latitude",
		"region": "$region",
		"entry_description": "$entry_description",
		"disease_risk": "$disease_risk",
		"travel_status": "$travel_status",
		"safety_score": "$safety_score",
		"advice_level": "$advice_level",
	}))
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


############## GET SAEFTY SCORE OF A COUNTRY ###############
@router.get("/{id}/safety", status_code=status.HTTP_200_OK, tags=["locations"], response_model=locationModels.LocationSafetyResponse)
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
@router.get("/{id}/travel", status_code=status.HTTP_200_OK, tags=["locations"], response_model=locationModels.LocationTravelOverviewResponse)
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
	for a in data['area_restrction']:
		area_list.append(a)
		print(a)

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


### GET DISEASES IN LOCATION ###
@router.get('/{id}/diseases', status_code=status.HTTP_200_OK, tags=["locations"], response_model=locationModels.LocationDiseaseResponse)
async def get_diseases_in_location(
	id: str = Path(
		...,
		description="The country's unique ISO code",
		example="PH",
	)
):
	countryName = locations_col.find_one({"_id": id})['country']
	locations = locations_promed_col.find({"country": countryName}, {"_id": True})
	locationIds = []
	for l in locations:
		locationIds.append(l['_id'])
	print('locations' + str(locationIds))
	reports = list(reports_col.find(
		{"locations": {"$in": locationIds}},
		{"diseases": True, "_id": False}
	))
	diseaseIds = set(())
	for r in reports:
		print(r['diseases'])
		diseaseIds.update(r['diseases'])
	print(diseaseIds)
	diseases = list(diseases_col.find({"_id": {"$in": list(diseaseIds)}}).sort("name", 1))
	diseaseList = []
	for d in diseases:
		diseaseList.append(str.title(d['name']))
	print(diseaseList)


	return baseModels.createResponse(True, 200, diseaseList)

	






