from dotenv import dotenv_values
from pymongo import MongoClient

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
users_col = db['Users']
locations_col = db["Locations"]
diseaseLocations_col = db["DiseaseLocations"]
updates_col = db["Updates"]
safety_col = db["Safety"]
travel_col = db["Travel"]

