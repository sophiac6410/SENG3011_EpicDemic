from random import sample
from pymongo import MongoClient
import requests
import geocoder
import json


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
        if coord: print(f'- geocode api: collected -- {coord}')
    except Exception as e:
        raise e

    amadeus_data=getAmadeus(country_id)
    safety=getAmadeusSafety(country_id)

    body = {
        '_id': country_id,
        'country': data['name'],
        'capital': data['capital']['name'],
        'geonames_id': data['geonameid'],
        'longitude': coord[1],
        'latitude': coord[0],
        'region': data['continent']['name'],
        'entry_description': amadeus_data['areaAccessRestriction']['entry']['text'] if index != -1 else '',
        'disease_risk': disease_parser(amadeus_data['diseaseInfection']['level']) if index != -1 else '',
        'travel_status': entry_level(covid_controls(country_id)['tourist_entry']),
        'safety_score': safety['overall']
    }
    body['advice_level'] = advice_level(body['disease_risk'], body['safety_score'], body['travel_status'])
    return body

def getAmadeus(code):
    f = open('travel.json')
    amadeus_data = json.load(f)
    f.close()
    return amadeus_data[code]

def insert_travel(id, index):
    new_data=covid_controls(id)
    amadeus_data=getAmadeus(id)
    body = {
        '_id': id,
        'declaration': amadeus_data['areaAccessRestriction']['declarationDocuments'],
        'testing': amadeus_data['areaAccessRestriction']['diseaseTesting'],
        'quarantine': amadeus_data['areaAccessRestriction']['quarantineModality'],
        'mask': amadeus_data['areaAccessRestriction']['mask'],
        'tracing': amadeus_data['areaAccessRestriction']['tracingApplication'],
        'area_policy': amadeus_data['areaPolicy'],
        'area_restrction': amadeus_data['areaRestrictions'],
        'vaccine_info': new_data['vaccine_info'],
        'entry_info': new_data['entry_info'],
        'event_info': new_data['event_info'],
        'shopping_info': new_data['shopping_info'],
        'attractions_info': new_data['attractions_info']
    }

    return body

def getAmadeusSafety(id):
    f = open('safety.json')
    amadeus_data = json.load(f)
    loc_dic= amadeus_data[id]
    f.close()
    return loc_dic

def insert_safety(id):
    loc_dic=getAmadeusSafety(id)
    loc_dic.update( {
        'updated': '2022-05-17',
        'location_id': id
    } )
    return loc_dic

def covid_controls(country_id):
    f = open('cc2.json')
    data = json.load(f)
    f.close()
    return data[country_id]



try:
    cluster = MongoClient(
        "mongodb+srv://EpicDemic:EpicDemic123!@epicdemic.ul8sw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    myclient = MongoClient('localhost', 27017)
    # sample_list = ['AT','BE','BG','CY','CZ','DE','DK','EE','ES','FI','FR','GR','HR','HU','IE','IT','LT','LU','LV','MT','NL','PT','RO','SE','SI','SK']
    sample_list = ['CN', 'EG', 'MG', 'NG']
    index = 0
    db = cluster['parser_test_db']
    location_collection = db["Locations"]
    travel_collection = db["Travel"]
    safety_collection = db["Safety"]
    
    '''
    # inserting into database
    for country in sample_list:
        print(f'-- inserting {country} --')
        try: 
            if db.Locations.count_documents( { "_id": country } ) == 0:
                data = insert_locations(country, index)
                location_collection.insert_one( data )
                index += 1
            else:
                print('already in locations db')
        except Exception as e:
            raise e 
    
    '''

    for id in sample_list:
        print(f'-- inserting {id} --')

        if db.Locations.count_documents( { "_id": id } ) == 0:
            data = insert_locations(id, index)
            location_collection.insert_one( data )
        else:
            print('already in locations db')
 

        if db.Travel.count_documents( { "_id": id } ) == 0:
            data=insert_travel(id, 1)
            travel_collection.insert_one( data )
        else:
            print('already in travel db')

        if db.Safety.count_documents( { "location_id": id } ) == 0:
            data=insert_safety(id)
            safety_collection.insert_one( data )
        else:
            print('already in safety db')

        index += 1



except Exception as e:
    print(e)
# print(body)


