from dotenv import dotenv_values
from pymongo import MongoClient
from geonames import get_location_ids
from util import DATETIME_REGEX, parse_datetime_string, generate_query
import datetime
from dateutil import tz

try:
    config = dotenv_values(".env")
    # client = MongoClient(
    #     f'mongodb+srv://{config.get("USERNAME")}:{config.get("PASSWORD")}@epicdemic.ul8sw.mongodb.net/EpicDemic?retryWrites=true&w=majority')
    client = MongoClient(
        "mongodb+srv://EpicDemic:EpicDemic123!@epicdemic.ul8sw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    )
    print("Connected to database.")

except Exception as e:
    print("Unable to connect to database.")
    print(e.message)
    exit(1)


disease_db = client["epicdemic_db"]
db = client["parser_test_db"]

articles_col = disease_db["Articles"]
reports_col = disease_db["Reports"]
diseases_col = disease_db["Diseases"]
syndromes_col = disease_db["Syndromes"]
locations_promed_col = disease_db["Locations"]
users_col = db['Users']
locations_col = db["Locations"]
diseaseLocations_col = db["DiseaseLocations"]
updates_col = db["Updates"]
safety_col = db["Safety"]
travel_col = db["Travel"]
trip_col = db["Trips"]
tripCities_col = db["TripCities"]

"""
tripId=28
members = list(trip_col.find({ "_id": tripId }))[0]['members']

mem_list = []
for member in members:
    mem_list.append({
        'email': member,
        'name': list(users_col.find({ "email": member }))[0]['name']
    })

# print(mem_list)
    


# First get a list of all the locations objects from their ids
location="Belgium"
locations = {}
location_ids = None
if location is not None:
    response = get_location_ids(location)
    if response["success"]:
        locations = response["location_ids"]
        location_ids = list(locations.keys())

# print(location_ids)
        
# Get a list of all matching disease ids from the keywords
key_terms="Influenza A/H5N1"
matched_disease_ids = None
if key_terms is not None:
    key_terms_list = [x.strip() for x in key_terms.split(",")]
    key_terms_regex = "|".join(key_terms_list)

    matched_diseases = list(diseases_col.find({
        "$or": [
            {"name": {
                "$regex": key_terms_regex,
                "$options": "i"
            }},
            {"regex": {
                "$regex": key_terms_regex,
                "$options": "i"
            }},
            {"key_words": {
                "$in": key_terms_list
            }}
        ]
    }))

    matched_disease_ids = [x["_id"] for x in matched_diseases]

# print(matched_diseases)
start_date = parse_datetime_string("1990-01-01T10:10:10", "Australia/Sydney")
end_date = parse_datetime_string("2023-01-01T10:10:10", "Australia/Sydney")
article_ids = []
query = generate_query(start_date, end_date, article_ids, location_ids, matched_disease_ids)
# print(query)
time=tz.gettz('Australia/Sydney')
q=[{'locations': {'$in': [52, 387, 418, 613, 1027, 1516, 1535, 1545, 1598, 1821, 1871, 2160, 2199, 2646]}}, {'diseases': {'$in': [15]}}]

report_docs = list(reports_col.find(
    {
        "$and": q
    }
))

print(report_docs)

"""