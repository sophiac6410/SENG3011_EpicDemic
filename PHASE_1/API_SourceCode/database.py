from dateutil.parser import parse
import json
from dotenv import load_dotenv
import os
from pymongo import MongoClient

try:
    load_dotenv()
    client = MongoClient(f'mongodb+srv://{os.environ["USERNAME"]}:{os.environ["PASSWORD"]}@epicdemic.ul8sw.mongodb.net/EpicDemic?retryWrites=true&w=majority')
    print("Connected to database.")
except:
    print("Unable to connect to database.")
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

            # requests.append(file_data[19])
            for data in file_data:
                if "date_of_publication" in data:
                    data["date_of_publication"] = parse(data["date_of_publication"])
                requests.append(data)            

            # print(collection_name)
            db[collection_name].insert_many(requests)
            print(f"Finished overwriting {collection_name}")
        except:
            print(f"Failed to load and overwrite {collection_name}")




overwrite_collection("Articles")
overwrite_collection("Diseases")