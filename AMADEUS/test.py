from amadeus import Client, ResponseError

amadeus = Client(
    client_id='mGjZ7901nb0kV25dnkj2WZy1tEtLqVbp',
    client_secret='zzyRaxseNwed0V0D'
)

try:
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
    response = amadeus.duty_of_care.diseases.covid19_area_report.get(countryCode="CN")
    print(response.data)
except ResponseError as error:
    print(error)


['AT','BE','BG','CY','CZ','DE','DK','EE','ES','FI','FR','GR','HR','HU','IE','IT','LT','LU','LV','MT','NL','PO','PT','RO','SE','SI','SK']