from dateutil.parser import parse
import json
from dotenv import dotenv_values
import os
from pymongo import MongoClient

try:
    config = dotenv_values(".env")
    client = MongoClient(f'mongodb+srv://{config.get("USERNAME")}:{config.get("PASSWORD")}@epicdemic.ul8sw.mongodb.net/EpicDemic?retryWrites=true&w=majority')
    # client = MongoClient('mongodb+srv://EpicDemic:EpicDemic123!@epicdemic.ul8sw.mongodb.net/EpicDemic?retryWrites=true&w=majority')
    print("Connected to database.")
except Exception as e:
    print("Unable to connect to database.")
    print(e.message)
    exit(1)


db = client["epicdemic_db"]


articles_col = db["Articles"]
locations_col = db["Locations"]
reports_col = db["Reports"]
diseases_col = db["Diseases"]

def overwrite_collection(collection_name):
    file_name = "./dummy_data/" + collection_name.lower() + ".json"

    with open(file_name) as f:
        try:
            db[collection_name].drop()
            file_data = json.load(f)
            requests = []

            for data in file_data:
                if "date_of_publication" in data:
                    data["date_of_publication"] = parse(data["date_of_publication"])
                elif "event_date" in data: 
                    data["event_date"] = parse(data["event_date"])
                requests.append(data)            

            db[collection_name].insert_many(requests)
            print(f"Finished overwriting {collection_name}")
        except:
            print(f"Failed to load and overwrite {collection_name}")

# overwrite_collection("Articles")
# overwrite_collection("Diseases")
# overwrite_collection("Reports")
# overwrite_collection("Locations")
