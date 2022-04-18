from pymongo import MongoClient
import requests
# import geocoder
import json
# from amadeus import Client, ResponseError

def parser(data):
    vaccine_info = {
        'entry_status': data['lockdownInfo']['vaccinatedAllowed'],
        'info': data['lockdownInfo']['vaccineInfo'],
        'source': data['lockdownInfo']['vaccineSource'],
        'last_updated': data['lockdownInfo']['lastUpdated']
    }

    entry_info = {
        'entry_status': data['lockdownInfo']['events'],
        'info': data['lockdownInfo']['eventMoreInfo'],
        'last_updated': data['lockdownInfo']['lastUpdated']
    }

    event_info = {
        'entry_status': data['lockdownInfo']['restaurantsAndBars'],
        'last_updated': data['lockdownInfo']['lastUpdated']
    }

    shopping_info = {
        'entry_status': data['lockdownInfo']['shopping'],
        'last_updated': data['lockdownInfo']['lastUpdated']
    }

    attractions_info = {
        'entry_status': data['lockdownInfo']['touristAttractions'],
        'last_updated': data['lockdownInfo']['lastUpdated']
    }

    return {
        'vaccine_info': vaccine_info,
        'entry_info': entry_info,
        'event_info': event_info,
        'shopping_info': shopping_info,
        'attractions_info': attractions_info,
        'tourist_entry': data['lockdownInfo']['touristEntry']
    }

def covid_controls_itineraries(country_id):
    apiKey = 'GbHl378d8f4L1y1MdQB0HoCpGj8mzBCwjMbSnshBFWFymm7LNClDzQ0e69ZUzioyb95U4W5RdYbY'
    url = f"https://prod.greatescape.co/api/travel/countries/{country_id}/corona"
    header = {
        'authorization': f'Bearer {apiKey}',
    }

    try:
        x = requests.get(url, headers=header)
        data = x.json()
        return parser(data)
    except Exception as e: 
        return f'NO DATA COUNTRY {country_id}'



c = {}
sample_list = ['AT','BE','BG','CY','CZ','DE','DK','EE','ES','FI','FR','GR','HR','HU','IE','IT','LT','LU','LV','MT','NL','PT','RO','SE','SI','SK']
for country in sample_list:
    c[country] = (covid_controls_itineraries(country))
