from amadeus import Client, ResponseError
from database import locations_col, safety_col
import requests
import geocoder

amadeus = Client(
    client_id='LwLbO6Ao6Gq2AdfFXsGAGlNuLoy9l1Fb',
    client_secret='TRQA07tq1ZtPAZEg'
)


# const amadeus = new Amadeus({
#   clientId: 'LwLbO6Ao6Gq2AdfFXsGAGlNuLoy9l1Fb',
#   clientSecret: 'TRQA07tq1ZtPAZEg',
#   hostname: 'production'
# });

res_list=[]
sample_list = ['US', 'CA']

try:
    # response = amadeus.safety.safety_rated_locations.get(latitude=52.541755, longitude=13.354201)
    
    # response = amadeus.shopping.flight_offers_search.get(
    #     originLocationCode='MAD',
    #     destinationLocationCode='ATH',
    #     departureDate='2022-11-01',
    #     adults=1)

    #before travel

    # to get lat and long


    #quarantine
    #vaccination
    #testing
    #documentation
    print('connected to amadeus')
    for id in sample_list:

        data = list(locations_col.find({'_id': id}))[0]
        geo_data = geocoder.geonames(data['capital'], key='epicdemic')
        coord = geo_data.latlng
        if coord: print(f'- geocode api: collected -- {coord}')
        response = amadeus.safety.safety_rated_locations.get(latitude=coord[0], longitude=coord[1])
        # response = amadeus.duty_of_care.diseases.covid19_area_report.get(countryCode=country)
        res_list.append(response.data)
except ResponseError as error:
    print(error)

print(res_list)
['AT','BE','BG','CY','CZ','DE','DK','EE','ES','FI','FR','GR','HR','HU','IE','IT','LT','LU','LV','MT','NL','PO','PT','RO','SE','SI','SK']