from amadeus import Client, ResponseError
from pymongo import MongoClient

import requests
import geocoder

amadeus = Client(
    hostname='production',
    client_id='LwLbO6Ao6Gq2AdfFXsGAGlNuLoy9l1Fb',
    client_secret='TRQA07tq1ZtPAZEg'
)


# const amadeus = new Amadeus({
#   clientId: 'LwLbO6Ao6Gq2AdfFXsGAGlNuLoy9l1Fb',
#   clientSecret: 'TRQA07tq1ZtPAZEg',
#   hostname: 'production'
# });

res_list={}
# res_list=[]
sample_list = ['CN', 'EG', 'ET', 'MG', 'NG']

try:
    cluster = MongoClient(
        "mongodb+srv://EpicDemic:EpicDemic123!@epicdemic.ul8sw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    myclient = MongoClient('localhost', 27017)
    db = cluster['parser_test_db']
    locations_col = db["Locations"]
    # response = amadeus.safety.safety_rated_locations.get(latitude=52.541755, longitude=13.354201)
    
    # response = amadeus.shopping.flight_offers_search.get(
    #     originLocationCode='MAD',
    #     destinationLocationCode='ATH',
    #     departureDate='2022-11-01',
    #     adults=1)

    #before travel

    #quarantine
    #vaccination
    #testing
    #documentation

    '''
    for country in sample_list:
        response = amadeus.duty_of_care.diseases.covid19_area_report.get(countryCode=country)
        res_list[country]= response.data
    '''

    cities=['Beijing', 'Cairo', 'Addis Ababa', 'Antananarivo', 'Abuja']
    index = 0
    for city in cities:
        country=sample_list[index]
        geo_data = geocoder.geonames(city, key='epicdemic')
        coord = geo_data.latlng
        if coord: print(f'- geocode api: collected -- {coord}')
        response = amadeus.safety.safety_rated_locations.get(latitude=coord[0], longitude=coord[1])
        res_list[country]=(response.data[0]["safetyScores"])
        index += 1
    # '''

except ResponseError as error:
    print(error)

print(res_list)