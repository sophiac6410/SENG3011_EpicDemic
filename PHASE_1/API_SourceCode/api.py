from datetime import datetime, time
import re
from pydantic import BaseModel # datetime has format yyyy-mm-ddTHH:mm:ss
import pytz
from typing import Optional, List
from database import articles_col, locations_col, reports_col, diseases_col
from fastapi import FastAPI, Query, HTTPException

app = FastAPI()
# run 'uvicorn main:app --reload'
# http://127.0.0.1:8000/docs - swagger UI docs

description_start_date = "Requests articles published after the start_date. Format: 'yyyy-MM-ddTHH:mm:ss'"
description_end_date = "Requests articles published before the end_date. Format: 'yyyy-MM-ddTHH:mm:ss'"
description_key_terms = "Requests articles that include the key terms. Key words must be separated by a commas, e.g. 'Anthrax,Zika'"
description_timezone = "The timezone of the start_date and end_date. Must be in the pytz format."
description_start_range = "Specifies the position of the article to start from."
description_end_range = "Specifies the position of the last article to return. If the position is out of range, the API will return up to the last article."

class Report(BaseModel):
	report_id: int
	event_date: str
	locations: list[str]
	diseases: list[str]
	syndrome: list[str]
	cases: int
	report_type: str

	class Config:
		schema_extra = {
			"example": {
				"report_id": 1,
				"event_date": "2021-11-08 xx:xx:xx to 2021-11-25 xx:xx:xx",
				"locations": [
					{
						"country": "Estonia",
						"location": "Kardla, Hiiu"
					},
				],
				"diseases": [
					"influenza a/h5n1"
				],
				"syndromes": [
				],
				"cases": 3,
				"type": "Immediate Notification",
			}
        }

reports = {
	"first": {
		"report_id": 1,
		"event_date": "2021-11-08 to 2021-11-25",
		"locations": [
			{
				"country": "Estonia",
				"location": "Kardla, Hiiu"
			},
		],
		"diseases": [
			"influenza a/h5n1"
		],
		"syndromes": [
		],
		"cases": 3,
		"type": "Immediate Notification",
	},
	"second": {
		"report_id": 1,
		"event_date": "2021-11-08 to 2021-11-25",
		"locations": [
			{
				"country": "Australia",
				"location": "Kardla, Hiiu"
			},
		],
		"diseases": [
			"influenza a/h5n1"
		],
		"syndromes": [
		],
		"cases": 3,
		"type": "Immediate Notification",
	}
}

class Article(BaseModel):
	article_id: int
	url: str
	date_of_publication: str
	headline: str
	main_text: str
	reports: list[int]
	
	class Config:
		schema_extra = {
            "example": {
				"article_id": 8700432,
				"url": "http://www.promedmail.org/post/8700432",
				"date_of_publication": "2021-12-23 03:32:10",
				"headline": "Avian influenza (180): Europe (Estonia) fox, HPAI H5N1, OIE",
				"main_text": "AVIAN INFLUENZA (180): EUROPE (ESTONIA) FOX, HPAI H5N1, OIE\n***********************************************************\nA ProMED-mail post\n<http://www.promedmail.org>\nProMED-mail is a program of the\nInternational Society for Infectious Diseases\n<http://www.isid.org>\n\nDate: Mon 20 Dec 2021\r\nSource: OIE-WAHIS (World Animal Health Information System) 2021 [edited]\r\n<https://wahis.oie.int/#/report-info?reportId=44804>\r\n\r\n\r\nHighly pathogenic influenza A viruses (inf. with) (non-poultry including wild birds), Estonia\r\n--------------------------------------------------------------------------------\r\nSummary\r\nReport type: immediate notification\r\nStarted: 8 Nov 2021\r\nConfirmed: 25 Nov 2021\r\nEnded: 25 Nov 2021\r\nReported: 17 Dec 2021\r\nReason for notification: unusual host species\r\nCausal agent: Highly pathogenic avian influenza virus\r\nSerotype: H5N1\r\nNature of diagnosis: clinical, laboratory\r\nThis event pertains to the whole country.\r\n\r\nNew outbreaks (1)\r\nTotal outbreaks (6)\r\nOutbreak location 1: Kardla, Hiiu\r\nStarted: 8 Nov 2021\r\nEnded: 25 Nov 2021\r\nEpidemiological unit: not applicable\r\nTotal animals affected:\r\nSpecies / Susceptible / Cases / Deaths / Killed and disposed of / Slaughtered or killed for commercial use / Vaccinated\r\nRed fox (_Vulpes vulpes_): Canidae-Carnivora / - / 1 / 1 / - / - / -\r\n\r\nEpidemiology\r\nSource of the outbreak(s) or origin of infection: contact with wild species.\r\n\r\nDiagnostic test results\r\nLaboratory name and type: Estonian Veterinary and Food Laboratory (VFL) National Laboratory\r\nSpecies / Outbreaks / Test / Test date / Result\r\nRed fox / real-time polymerase chain reaction (real-time PCR) / 1 / [25 Nov 2021] / positive\r\n\r\n[The location of the outbreak can be seen on the interactive map included in the OIE report at the source URL above.]\r\n\r\n--\r\nCommunicated by:\r\nProMED\n\n[From 2014 onwards HPAI H5 clade 2.3.4.4 viruses caused outbreaks across the Eurasian region, affecting both poultry and wild birds, with abundant genetic reassortments yielding subtypes H5N1, H5N2, H5N3, H5N4, H5N5, H5N6, and H5N8. Regarding infection of these viruses in mammals, recently, HPAI H5N8 infections were reported in humans in Russia (see ProMED post 20210221.8204014). Several subtypes of AI viruses (H7N7, H4N5, H4N6, H3N3, and H10N7) have caused epidemics in harbour seals and gray seals, but they do not appear to become established in these carnivore species. Regarding terrestrial carnivores, red foxes have been shown to be susceptible to infection by HPAI H5N1, and there was recent documentation of a spill-over of HPAI H5N8 to wild carnivores. Virus evolution and adaptive mutations must be closely monitored to rapidly identify viruses with increased potential to infect mammals. - Mod.PMB\n\nProMED map:\nKärdla, Hiiumaa, Estonia: <https://promedmail.org/promed-post?place=8700432,68643>]\n\n[See Also:\nAvian influenza (133): Europe (Netherlands) fox HPAI H5N1 20211101.8699389\r\nAvian influenza (117): Europe (Germany) seal, HPAI H5N8 20210924.8698675\r\nAvian influenza (82): Europe (Germany, Estonia) wild bird, HPAI H5N1, OIE 20210614.8446706\r\nAvian influenza, human (02): Russia, H5N8, 1st rep 20210221.8204014\r\nAvian influenza (45): Europe (UK, Croatia) seal, fox, wild bird, HPAI H5N8, OIE 20210317.8252821\r\nAvian influenza (37): Estonia (LV), poultry, HPAI H5N8, OIE 20210222.8206662]\n.................................................crd/pmb/mj/jh",
				"reports": [1, 2, 3, 4]
            }
        }

articles = {
	"first": {
		"article_id": 8700432,
		"url": "http://www.promedmail.org/post/8700432",
		"date_of_publication": "2021-12-23 03:32:10",
		"headline": "Avian influenza (180): Europe (Estonia) fox, HPAI H5N1, OIE",
		"main_text": "AVIAN INFLUENZA (180): EUROPE (ESTONIA) FOX, HPAI H5N1, OIE\n***********************************************************\nA ProMED-mail post\n<http://www.promedmail.org>\nProMED-mail is a program of the\nInternational Society for Infectious Diseases\n<http://www.isid.org>\n\nDate: Mon 20 Dec 2021\r\nSource: OIE-WAHIS (World Animal Health Information System) 2021 [edited]\r\n<https://wahis.oie.int/#/report-info?reportId=44804>\r\n\r\n\r\nHighly pathogenic influenza A viruses (inf. with) (non-poultry including wild birds), Estonia\r\n--------------------------------------------------------------------------------\r\nSummary\r\nReport type: immediate notification\r\nStarted: 8 Nov 2021\r\nConfirmed: 25 Nov 2021\r\nEnded: 25 Nov 2021\r\nReported: 17 Dec 2021\r\nReason for notification: unusual host species\r\nCausal agent: Highly pathogenic avian influenza virus\r\nSerotype: H5N1\r\nNature of diagnosis: clinical, laboratory\r\nThis event pertains to the whole country.\r\n\r\nNew outbreaks (1)\r\nTotal outbreaks (6)\r\nOutbreak location 1: Kardla, Hiiu\r\nStarted: 8 Nov 2021\r\nEnded: 25 Nov 2021\r\nEpidemiological unit: not applicable\r\nTotal animals affected:\r\nSpecies / Susceptible / Cases / Deaths / Killed and disposed of / Slaughtered or killed for commercial use / Vaccinated\r\nRed fox (_Vulpes vulpes_): Canidae-Carnivora / - / 1 / 1 / - / - / -\r\n\r\nEpidemiology\r\nSource of the outbreak(s) or origin of infection: contact with wild species.\r\n\r\nDiagnostic test results\r\nLaboratory name and type: Estonian Veterinary and Food Laboratory (VFL) National Laboratory\r\nSpecies / Outbreaks / Test / Test date / Result\r\nRed fox / real-time polymerase chain reaction (real-time PCR) / 1 / [25 Nov 2021] / positive\r\n\r\n[The location of the outbreak can be seen on the interactive map included in the OIE report at the source URL above.]\r\n\r\n--\r\nCommunicated by:\r\nProMED\n\n[From 2014 onwards HPAI H5 clade 2.3.4.4 viruses caused outbreaks across the Eurasian region, affecting both poultry and wild birds, with abundant genetic reassortments yielding subtypes H5N1, H5N2, H5N3, H5N4, H5N5, H5N6, and H5N8. Regarding infection of these viruses in mammals, recently, HPAI H5N8 infections were reported in humans in Russia (see ProMED post 20210221.8204014). Several subtypes of AI viruses (H7N7, H4N5, H4N6, H3N3, and H10N7) have caused epidemics in harbour seals and gray seals, but they do not appear to become established in these carnivore species. Regarding terrestrial carnivores, red foxes have been shown to be susceptible to infection by HPAI H5N1, and there was recent documentation of a spill-over of HPAI H5N8 to wild carnivores. Virus evolution and adaptive mutations must be closely monitored to rapidly identify viruses with increased potential to infect mammals. - Mod.PMB\n\nProMED map:\nKärdla, Hiiumaa, Estonia: <https://promedmail.org/promed-post?place=8700432,68643>]\n\n[See Also:\nAvian influenza (133): Europe (Netherlands) fox HPAI H5N1 20211101.8699389\r\nAvian influenza (117): Europe (Germany) seal, HPAI H5N8 20210924.8698675\r\nAvian influenza (82): Europe (Germany, Estonia) wild bird, HPAI H5N1, OIE 20210614.8446706\r\nAvian influenza, human (02): Russia, H5N8, 1st rep 20210221.8204014\r\nAvian influenza (45): Europe (UK, Croatia) seal, fox, wild bird, HPAI H5N8, OIE 20210317.8252821\r\nAvian influenza (37): Estonia (LV), poultry, HPAI H5N8, OIE 20210222.8206662]\n.................................................crd/pmb/mj/jh",
		"reports": [1, 2, 3, 4]
	}
}



############## GET ARTICLES BY QUERY ###############
@app.get("/articles", response_model=Article)
async def get_articles(
	*, # including this allows parameters to be defined in any order
	start_date: datetime = Query(
		..., # no default, is required
		description=description_start_date,
		example="2021-01-01T10:10:10"
	),
	end_date: datetime = Query(
		...,
		description=description_end_date,
		example="2022-01-01T10:10:10"
	),
	key_terms: Optional[str] = Query(
		None, # is optional, default is None
		description=description_key_terms,
		example="Anthrax,Zika"
	),
	timezone: Optional[str] = Query(
		"Australia/Sydney",
		description=description_timezone,
		example="US/Central"
	),
	start_range: Optional[int] = Query(
		1,
		description=description_start_range,
		example="5",
		ge=1
	),
	end_range: Optional[int] = Query(
		10,
		description=description_end_range,
		example="50",
		ge=1
	)
):
	if timezone not in pytz.all_timezones:
		raise HTTPException(status_code=400, detail="Timezone is not in the correct format and/or cannot be found.")
	if end_range < start_range:
		raise HTTPException(status_code=400, detail="Invalid start and end range.")
	if end_date < start_date:
		raise HTTPException(status_code=400, detail="End date must be after start date.")
	new_start_date = start_date.replace(tzinfo=pytz.timezone(timezone))
	new_end_date = end_date.replace(tzinfo=pytz.timezone(timezone))
	terms_list = []
	if key_terms != None:
		terms_list = key_terms.split(',')
	return {
		"start_date": new_start_date,
		"end_date": new_end_date,
		"key_terms": terms_list,
		"timezone": timezone,
		"start_range": start_range,
		"end_range": end_range
	}


############## GET ARTICLES BY IDS ###############
@app.get("/articles/ids")
async def get_article_ids(
	article_ids: List[int] = Query(
		...,
		description="A list of the articles' unique id's.",
		example="[8700432, 3892133]",
	)
):
	### check if article_id is in the database, if not, raise error
	return {
		"article_ids": article_ids
	}


############## GET REPORTS BY QUERY ###############
@app.get("/reports")
async def get_reports(
	article_ids: Optional[List[int]] = Query(
		None,
		description="List of article ids that the reports must come from. If empty, reports can come from all articles.",
		example="[8700432, 3892133]"
	),
	location: Optional[str] = Query(
		None,
		description="The city, state or country where the event occurred",
		example="Brazil"
	),
	key_terms: Optional[str] = Query(
		None,
		description=description_key_terms,
		example="Anthrax,Zika"
	),
	start_date: Optional[datetime] = Query(
		None,
		description=description_start_date,
		example="2021-01-01T10:10:10"
	),
	end_date: Optional[datetime] = Query(
		None,
		description=description_end_date,
		example="2022-01-01T10:10:10"
	),
	timezone: Optional[str] = Query(
		"Australia/Sydney",
		description=description_timezone,
		example="US/Central"
	),
	start_range: Optional[int] = Query(
		1,
		description=description_start_range,
		example="5",
		ge=1
	),
	end_range: Optional[int] = Query(
		10,
		description=description_end_range,
		example="50",
		ge=1
	)

):
	### check if article ids are valid
	### check if location is in database
	if timezone not in pytz.all_timezones:
		raise HTTPException(status_code=400, detail="Timezone is not in the correct format and/or cannot be found.")
	if end_range < start_range:
		raise HTTPException(status_code=400, detail="Invalid start and end range.")
	if end_date < start_date:
		raise HTTPException(status_code=400, detail="End date must be after start date.")
	new_start_date = start_date.replace(tzinfo=pytz.timezone(timezone))
	new_end_date = end_date.replace(tzinfo=pytz.timezone(timezone))
	terms_list = []
	if key_terms != None:
		terms_list = key_terms.split(',')
	return {
		"article_ids": article_ids,
		"location": location,
		"start_date": new_start_date,
		"end_date": new_end_date,
		"key_terms": terms_list,
		"timezone": timezone,
		"start_range": start_range,
		"end_range": end_range
	}
	


############## GET REPORTS BY IDS ###############
@app.get("/reports/ids")
async def get_report_ids(
	report_ids: List[int] = Query(
		...,
		description="A list of the reports' unique ids.",
		example="[1, 2, 3]"
	)
):
	### check if report ids exist, if not raise error
	return {
		"report_ids": report_ids
	}
