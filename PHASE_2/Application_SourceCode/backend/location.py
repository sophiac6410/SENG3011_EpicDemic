from pymongo import MongoClient
import requests
import geocoder
import json
from amadeus import Client, ResponseError


sample_list = ['AT','BE','BG','CY','CZ','DE','DK','EE','ES','FI','FR','GR','HR','HU','IE','IT','LT','LU','LV','MT','NL','PO','PT','RO','SE','SI','SK']
country_id = sample_list[0]
index = 0

def disease_parser(str):
    if str == 'Low': return 0 
    elif str == 'Moderate': return 1
    elif str == 'Medium': return 2 
    elif str == 'High': return 3 
    elif str == 'Extreme': return 4
    else: return -1                         # for non-valid strings?


def entry_level(entry): 
    if entry == 'Allowed': return 0
    elif entry == 'Partially Allowed': return 1 
    elif entry == 'Banned': return 2
    else: return -1 


"""
location_db: 
    "travel_status": int,
    "advice_level": int
"""

# CovidControls 

def covid_controls():
    apiKey = 'GbHl378d8f4L1y1MdQB0HoCpGj8mzBCwjMbSnshBFWFymm7LNClDzQ0e69ZUzioyb95U4W5RdYbY'
    url = f"https://prod.greatescape.co/api/travel/countries/{country_id}/corona"
    header = {
        'authorization': f'Bearer {apiKey}',
    }

    try:
        x = requests.get(url, headers=header)
        covidc_data = x.json()
        lockdown_num=entry_level(covidc_data['lockdownInfo']['touristEntry'])
        print(covidc_data['lockdownInfo']['touristInfo'])
        return lockdown_num
    except: 
        print('Error in calling API: Covidcontrols')
        return -1



# AMADEUS: Safety Level
def amadeus_safety(long, lat):
    print('accessing amadeus')
    amadeus = Client(
        client_id='mGjZ7901nb0kV25dnkj2WZy1tEtLqVbp',
        client_secret='zzyRaxseNwed0V0D'
    )
    response = amadeus.safety.safety_rated_locations.get(latitude=lat, longitude=long)
    print(response.data)


def insert_locations():
    country_id = sample_list[index]
    url = f"https://countries-cities.p.rapidapi.com/location/country/{country_id}"

    headers = {
        "X-RapidAPI-Host": "countries-cities.p.rapidapi.com",
        "X-RapidAPI-Key": "69d21f284emshb912c8ba4a42b64p1ad654jsn9431e93b4766"
    }

    # Country Details
    response = requests.request("GET", url, headers=headers)
    data = response.json()

    # GeoCode for longitude and latitude 
    geo_data = geocoder.geonames(data['name'], key='epicdemic')
    coord = geo_data.latlng

    # Amadeus dataset
    f = open('travel.json')
    amadeus_data = json.load(f)
    f.close()

    body = {
        '_id': country_id,
        'country': data['name'],
        'capital': data['capital']['name'],
        'geonames_id': data['geonameid'],
        'longitude': coord[1],
        'latitude': coord[0],
        'region': data['continent']['name'],
        'disease_risk': disease_parser(amadeus_data[index]['diseaseInfection']),
        'travel_status': covid_controls()
    }
    print(body)
    amadeus_safety(coord[1], coord[0])




try:
    cluster = MongoClient(
        "mongodb+srv://EpicDemic:EpicDemic123!@epicdemic.ul8sw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    myclient = MongoClient('localhost', 27017)
    insert_locations()

except Exception as e:
    print(e)
# print(body)

