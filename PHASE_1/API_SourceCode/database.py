from dotenv import dotenv_values
from pymongo import MongoClient

try:
    config = dotenv_values(".env")
    client = MongoClient(
        f'mongodb+srv://{config.get("USERNAME")}:{config.get("PASSWORD")}@epicdemic.ul8sw.mongodb.net/EpicDemic?retryWrites=true&w=majority')
    print("Connected to database.")
except Exception as e:
    print("Unable to connect to database.")
    print(e.message)
    exit(1)

# db = client["epicdemic_db"]
db = client["parser_test_db"]

articles_col = db["Articles"]
reports_col = db["Reports"]
diseases_col = db["Diseases"]
syndromes_col = db["Syndromes"]
users_col = db['Users']
locations_col = db["Locations"]
diseaseLocations_col = db["DiseaseLocations"]
