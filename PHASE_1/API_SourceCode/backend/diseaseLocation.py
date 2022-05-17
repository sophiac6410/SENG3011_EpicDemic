from pymongo import MongoClient
from datetime import datetime
import json


AMADEUS='travel.json'

def get_latest(dates):
    now = datetime.now()
    return max(dt for dt in dates if dt < now)


def parse(country, index):

    body = {
        "_id": index,
        "location": country['area']['iataCode'],
        "disease": 45,
        "condition": 'declining',   # for now
        "hotspots": country['hotspots'] if 'hotspots' in country else '',
        "trends": {
            "rate": country['diseaseInfection']['rate'],
            "level": country['diseaseInfection']['level'],
            "infectionMapLink": country['diseaseInfection']['infectionMapLink'] if 'infectionMapLink' in country['diseaseInfection'] else '',
            # "date": datetime.strptime(country['diseaseInfection']['date'], '%Y-%m-%d')
            "date": country['diseaseInfection']['date']
        },
        "cases": country['diseaseCases'],
        "vaccinated": country['areaVaccinated']
    }
    body['latest_updated'] = get_latest([ datetime.fromisoformat(country['diseaseInfection']['date']), datetime.fromisoformat(country['diseaseCases']['date']) ])

    return body

if __name__ == "__main__":

    try:
        cluster = MongoClient(
            "mongodb+srv://EpicDemic:EpicDemic123!@epicdemic.ul8sw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
        myclient = MongoClient('localhost', 27017)

        db = cluster['parser_test_db']
        location_collection = db["DiseaseLocations"]

        f = open(AMADEUS)
        amadeus_data = json.load(f)
        index =  location_collection.count_documents({}) + 1,
        index=index[0]
        print(index)

        for country in amadeus_data:
            data=parse(country, index)
            # print(data)
            location_collection.insert_one( data )
            index += 1

        f.close()
    except Exception as e:
        raise e
