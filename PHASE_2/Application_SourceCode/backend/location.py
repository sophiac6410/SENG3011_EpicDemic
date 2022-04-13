from pymongo import MongoClient
import requests
import geocoder
import json
from amadeus import Client, ResponseError


COUNTRY_CODES=["AF", "AX", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG", "AR",
"AM", "AW", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", "BY", "BE",
"BZ", "BJ", "BM", "BT", "BO", "BQ", "BA", "BW", "BV", "BR", "IO",
"BN", "BG", "BF", "BI", "CV", "KH", "CM", "CA", "KY", "CF", "TD",
"CL", "CN", "CX", "CC", "CO", "KM", "CG", "CD", "CK", "CR", "CI",
"HR", "CU", "CW", "CY", "CZ", "DK", "DJ", "DM", "DO", "EC", "EG",
"SV", "GQ", "ER", "EE", "ET", "FK", "FO", "FJ", "FI", "FR", "GF",
"PF", "TF", "GA", "GM", "GE", "DE", "GH", "GI", "GR", "GL", "GD",
"GP", "GU", "GT", "GG", "GN", "GW", "GY", "HT", "HM", "VA", "HN",
"HK", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IM", "IL", "IT",
"JM", "JP", "JE", "JO", "KZ", "KE", "KI", "KP", "KR", "KW", "KG",
"LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MO", "MK",
"MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ", "MR", "MU", "YT",
"MX", "FM", "MD", "MC", "MN", "ME", "MS", "MA", "MZ", "MM", "NA",
"NR", "NP", "NL", "NC", "NZ", "NI", "NE", "NG", "NU", "NF", "MP",
"NO", "OM", "PK", "PW", "PS", "PA", "PG", "PY", "PE", "PH", "PN",
"PL", "PT", "PR", "QA", "RE", "RO", "RU", "RW", "BL", "SH", "KN",
"LC", "MF", "PM", "VC", "WS", "SM", "ST", "SA", "SN", "RS", "SC",
"SL", "SG", "SX", "SK", "SI", "SB", "SO", "ZA", "GS", "SS", "ES",
"LK", "SD", "SR", "SJ", "SZ", "SE", "CH", "SY", "TW", "TJ", "TZ",
"TH", "TL", "TG", "TK", "TO", "TT", "TN", "TR", "TM", "TC", "TV",
"UG", "UA", "AE", "GB", "US", "UM", "UY", "UZ", "VU", "VE", "VN",
"VG", "VI", "WF", "EH", "YE", "ZM", "ZW"]

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


    f = open('safetydata.json')
    data = json.load(f)
    index=test_data.index(city)
    data = data[index]

    print(data['safetyScores']['overall'])
    return data['safetyScores']['overall']
    


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
        print(data['name'])
        # GeoCode for longitude and latitude 
        geo_data = geocoder.geonames(data['name'], key='epicdemic')
        coord = geo_data.latlng
        if coord: print(f'- geocode api: collected -- {coord}')
        

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
        'entry_description': amadeus_data[index]['areaAccessRestriction']['entry']['text'] if index != -1 else '',
        'disease_risk': disease_parser(amadeus_data[index]['diseaseInfection']['level']) if index != -1 else '',
        # 'travel_status': covid_controls(country_id),
        'travel_status': -1,
        'safety_score': amadeus_safety(data['capital']['name']) if index != -1 else '',
    }
    body['advice_level'] = advice_level(body['disease_risk'], body['safety_score'], body['travel_status']) if index != -1 else ''
    return body



try:
    cluster = MongoClient(
        "mongodb+srv://EpicDemic:EpicDemic123!@epicdemic.ul8sw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    myclient = MongoClient('localhost', 27017)
    sample_list = ['AT','BE','BG','CY','CZ','DE','DK','EE','ES','FI','FR','GR','HR','HU','IE','IT','LT','LU','LV','MT','NL','PT','RO','SE','SI','SK']
    index = 0
    db = cluster['parser_test_db']
    location_collection = db["Locations"]
    
    # this is for sample data
    for country in sample_list:
        print(f'-- inserting {country} --')
        try: 
            if db.Locations.count_documents( { "_id": country } ) == 0:
                data = insert_locations(country, index)
                # print(data)
                location_collection.insert_one( data )
                index += 1
            else:
                print('already in locations db')
        except Exception as e:
            raise e 
    
    '''

    # this is to populate location db with all countries 
    for country in COUNTRY_CODES:
        print(f'-- inserting {country} --')

        try:
            if db.Locations.count_documents( { "_id": country } ) == 0:
                location_collection.insert_one(insert_locations(country, -1))
        except Exception as e:
            raise e 
    '''

        

except Exception as e:
    print(e)
# print(body)


