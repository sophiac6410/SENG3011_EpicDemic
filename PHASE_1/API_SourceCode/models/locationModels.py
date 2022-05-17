from models import baseModels
from pydantic import BaseModel, Field # datetime has format yyyy-mm-ddTHH:mm:ss
from typing import List
from datetime import datetime

class Location(BaseModel):
	id: str = Field(..., description="The unique ISO code of the country", 
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

class LocationSafetyScores(BaseModel):
	lqbtq: int = Field(..., description="The likelihood of discrimination against the LBTQ+ community from 0 (Least) to 100 (Most likely)", 
                    example=23)
	medical: int = Field(..., description="The likelihood of illness or disease, assessment of water and air quality, and access to reliable medical care 0 (least likely) - 100 (most likely)", 
                    example=23)
	women: int = Field(..., description="Likelihood of inappropriate behavior against females 0 (least likely) - 100 (most likely)", 
                    example=23)
	theft: int = Field(..., description="The likelihood of theft 0 (least likely) - 100 (most likely)", 
                    example=23)
	physical_harm: int = Field(..., description="The likelihood of injury due to harmful intent 0 (least likely) - 100 (most likely)", 
                    example=23)
	political_freedom: int = Field(..., description="Potential for infringement of political rights or political unrest 0 (least likely) - 100 (most likely)", 
                    example=23)
	last_updated: str = Field(..., description="The date the scores are last updated",
                    example="2022-04-14")

class LocationTravelOverview(BaseModel):
	_id: str = Field(..., description="The unique ISO code of the country", 
                    example='FR')
	country: str = Field(..., description="The name of the country", 
                    example='France')
	# declaration: dict = Field(..., description="The travel declaration of the country", 
  #                   example={
	# 					"date": "2022-04-07",
	# 					"text" : "<p><strong>Other document</strong><br>Travellers who don&#39;t comply ...",
	# 					"documentRequired": "Yes"
	# 				})
	# declaration: dict = Field(..., description="The travel declaration of the country", 
  #                   example={
	# 					"date": "2022-04-07",
	# 					"text" : "<p><strong>Other document</strong><br>Travellers who don&#39;t comply ...",
	# 					"documentRequired": "Yes"
	# 				})
	# declaration: dict = Field(..., description="The travel declaration of the country", 
  #                   example={
	# 					"date": "2022-04-07",
	# 					"text" : "<p><strong>Other document</strong><br>Travellers who don&#39;t comply ...",
	# 					"documentRequired": "Yes"
	# 				})
	# declaration: dict = Field(..., description="The travel declaration of the country", 
  #                   example={
	# 					"date": "2022-04-07",
	# 					"text" : "<p><strong>Other document</strong><br>Travellers who don&#39;t comply ...",
	# 					"documentRequired": "Yes"
	# 				})

class LocationDeclaration(BaseModel):
	date: str = Field(..., description="The date the declaration was created", 
                    example="2022-04-07")
	text: str = Field(..., description="The description of the declaration", 
                    example="Those who do not comply will get deported")
	documentRequired: str  = Field(..., description="If documents are required in travel entry", 
                    example="No") 
	travelDocumentation: str or None = None

class LocationTesting(BaseModel):
	when: str = Field(..., description="When the test should be conducted", 
                    example="Before travel")
	requirement: str = Field(..., description="Mandatory or not", 
                    example="Mandatory")
	text: str = Field(..., description="The description of the declaration", 
                    example="Test has to be PCR")
	rules: str = Field(..., description="The link to the official website containing all specific rules", 
                    example="No")
	date: str = Field(..., description="The date the rule was created", 
                    example="2022-04-07")
	isRequired: str = Field(..., description="if testing is required", 
                    example="No")

class LocationQuarantine(BaseModel):
	duration: str = Field(..., description="Length (days) of the quarantine", 
                    example=10)
	eligiblePerson: str = Field(..., description="Who are required to travel", 
                    example="Some travellers")
	text: str = Field(..., description="The description of the declaration", 
                    example="Test has to be PCR")
	rules: str = Field(..., description="The link to the official website containing all specific rules", 
                    example="No")
	date: str = Field(..., description="The date the rule was created", 
                    example="2022-04-07")
	quarantineType: str = Field(..., description="the type of quarantine, self or not", 
                    example="self")

class LocationMask(BaseModel):
	text: str = Field(..., description="The description of the declaration", 
                    example="Test has to be PCR")
	date: str = Field(..., description="The date the rule was created", 
                    example="2022-04-07")
	isRequired: str = Field(..., description="if mask is mandatory", 
                    example="No")

class LocationAreaPolicy(BaseModel):
	status: str = Field(..., description="Length (days) of the quarantine", 
                    example="Opening")
	text: str = Field(..., description="The description of the declaration", 
                    example="Test has to be PCR")
	referenceLink: str or None = None
	date: str = Field(..., description="The date the rule was created", 
                    example="2022-04-07")
	startDate: str = Field(..., description="The date the rule began", 
                    example="2022-04-07")
	endDate: str = Field(..., description="The date the rule is set to end/change", 
                    example="na")

class LocationTracing(BaseModel):
	isRequired: str = Field(..., description="if mask is mandatory", 
                    example="No")
	text: str = Field(..., description="The description of the declaration", 
                    example="Test has to be PCR")
	androidLink: str = Field(..., description="The link to the official website containing all specific rules", 
                    example="https://www.gouvernement.fr/en/coronavirus-covid-19")
	iosLink: str = Field(..., description="The link to the official website containing all specific rules", 
                    example="https://www.gouvernement.fr/en/coronavirus-covid-19")
	date: str = Field(..., description="The date the rule was created", 
                    example="2022-04-07")

class LocationAreaRestriction(BaseModel):
	text: str or None = None
	date: str or None = None
	restrictionType: str or None = None

class LocationAttractions(BaseModel):
	entry_status: str = Field(..., description="The description of the entry status", 
                    example="Allowed")
	last_updated: str = Field(..., description="The date the rule was last updated", 
                    example="2022-04-07")

class LocationEvents(BaseModel):
	entry_status: str = Field(..., description="The description of the entry status", 
                    example="Allowed")
	last_updated: str = Field(..., description="The date the rule was last updated", 
                    example="2022-04-07")

class LocationEntry(BaseModel):
	entry_status: str = Field(..., description="The description of the entry status", 
                    example="Allowed")
	info: str = Field(..., description="More information of what establishments are open", 
                    example="Cultural events such as theatre, cinema and concerts are also allowed")
	last_updated: str = Field(..., description="The date the rule was last updated", 
                    example="2022-04-07")

class LocationShopping(BaseModel):
	entry_status: str = Field(..., description="The description of the entry status", 
                    example="Allowed")
	last_updated: str = Field(..., description="The date the rule was last updated", 
                    example="2022-04-07")

class LocationVaccine(BaseModel):
	entry_status: str = Field(..., description="The description of the entry status", 
                    example="Allowed")
	info: str = Field(..., description="More information of the vaccines", 
                    example="Fully vaccinated people who have received both doses of a two-series ")
	last_updated: str = Field(..., description="The date the rule was last updated", 
                    example="2022-04-07")
	source: str = Field(..., description="More information of what establishments are open", 
                    example="https://www.covidpasscertificate.com/covid-vaccines-for-travel-to-euro")
	

class LocationCovidQuery(BaseModel):
	cases_per_country: List[LocationCovid] = Field(..., description="The list of dict containing countries coordinates and their cases")

class LocationTravelOverview(BaseModel):
	declaration: LocationDeclaration
	testing: LocationTesting
	quarantine: LocationQuarantine
	mask: LocationMask
	area_policy: LocationAreaPolicy
	tracing: LocationTracing
	area_restriction: List[LocationAreaRestriction]
	attractions_info: LocationAttractions
	entry_info: LocationEntry
	event_info: LocationEvents
	shopping_info: LocationShopping
	vaccine_info: LocationVaccine

class LocationResponse(baseModels.Response):
	data: Location


class LocationCovidResponse(baseModels.Response):
	data: LocationCovidQuery

class LocationSafetyResponse(baseModels.Response):
	data: LocationSafetyScores

class LocationTravelOverviewResponse(baseModels.Response):
	data: LocationTravelOverview

class LocationAllResponse(baseModels.Response):
	data: List[Location]

class LocationDiseaseResponse(baseModels.Response):
	data: List[str]