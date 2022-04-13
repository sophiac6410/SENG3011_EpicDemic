from pymongo import MongoClient
import requests
import geocoder
import json
from amadeus import Client, ResponseError


def disease_parser(str):
    print(str)
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

def advice_level(disease, safety, entry):

    # if entry is banned, default to cannot travel
    if entry == 2: return 3

    # calculate percentage for advice level
    if safety == -1: 
        num=(disease+entry) / 8
    else:
        num=(disease+safety+entry) / 108

    num=round((num*100)/25)
    return num

# CovidControls 

def covid_controls(country_id):
    apiKey = 'GbHl378d8f4L1y1MdQB0HoCpGj8mzBCwjMbSnshBFWFymm7LNClDzQ0e69ZUzioyb95U4W5RdYbY'
    url = f"https://prod.greatescape.co/api/travel/countries/{country_id}/corona"
    header = {
        'authorization': f'Bearer {apiKey}',
    }

    try:
        x = requests.get(url, headers=header)
        covidc_data = x.json()
        lockdown_num=entry_level(covidc_data['lockdownInfo']['touristEntry'])
        # print(covidc_data['lockdownInfo']['touristInfo'])
        return lockdown_num
    except Exception as e: 
        raise e 



# AMADEUS: Safety Level
def amadeus_safety(city):

    test_data = [ "Bangalore", "Barcelona", "Berlin", "Dallas", "London", "Paris", "San Francisco" ]
    
    # no safety score
    if city not in test_data:
        return -1

    # print(' -- accessing amadeus --')
    amadeus = Client(
        client_id='mGjZ7901nb0kV25dnkj2WZy1tEtLqVbp',
        client_secret='zzyRaxseNwed0V0D'
    )

    f = open('safety_test.json')
    data = json.load(f)
    data = data[city]

    
    try:
        response = amadeus.safety.safety_rated_locations.by_square.get(north=data['north'], south=data['south'], east=data['east'], west=data['west'])
        return response.data[0]['safetyScores']['overall']
    except ResponseError as error:
        raise error
    


def insert_locations(country_id, index):
    url = f"https://countries-cities.p.rapidapi.com/location/country/{country_id}"

    headers = {
        "X-RapidAPI-Host": "countries-cities.p.rapidapi.com",
        "X-RapidAPI-Key": "69d21f284emshb912c8ba4a42b64p1ad654jsn9431e93b4766"
    }

    # Country Details
    try:
        response = requests.request("GET", url, headers=headers)
        data = response.json()
        if data: print('- rapidapi: data collected')

        # GeoCode for longitude and latitude 
        geo_data = geocoder.geonames(data['name'], key='epicdemic')
        coord = geo_data.latlng
        if coord: print('- geocode api: collected')

        # Amadeus dataset
        f = open('travel.json')
        amadeus_data = json.load(f)
        f.close()
    except Exception as e:
        raise e

    body = {
        '_id': country_id,
        'country': data['name'],
        'capital': data['capital']['name'],
        'geonames_id': data['geonameid'],
        'longitude': coord[1],
        'latitude': coord[0],
        'region': data['continent']['name'],
        'disease_risk': disease_parser(amadeus_data[index]['diseaseInfection']['level']),
        # 'travel_status': covid_controls(country_id),
        'travel_status': -1,
        'safety_score': amadeus_safety(data['capital']['name']),
    }
    # body['advice_level'] = advice_level(body['disease_risk'], body['safety_score'], body['travel_status'])
    return body

'''
# test cases
# advice_level(disease (0-4), safety(0-100), entry(0-2))

print( advice_level(3, 21, 2) )
print( advice_level(4, 75, 1) )
print( advice_level(4, 56, 1) )
'''

try:
    cluster = MongoClient(
        "mongodb+srv://EpicDemic:EpicDemic123!@epicdemic.ul8sw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    myclient = MongoClient('localhost', 27017)
    sample_list = ['AT','BE','BG','CY','CZ','DE','DK','EE','ES','FI','FR','GR','HR','HU','IE','IT','LT','LU','LV','MT','NL','PT','RO','SE','SI','SK']
    index = 0
    db = cluster['parser_test_db']
    location_collection = db["Locations"]

    for country in sample_list:
        print(f'-- inserting {country} --')
        try: 
            data = insert_locations(country, index)
            print(data)
            # location_collection.insert_one( data )
            index += 1
        except Exception as e:
            raise e 

except Exception as e:
    print(e)
# print(body)


