import json
import os
from pymongo import MongoClient

try:
    client = MongoClient(f'mongodb+srv://{os.environ["USERNAME"]}:{os.environ["PASSWORD"]}@epicdemic.ul8sw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'))
    print("Connected to database.")
except:
    print("Unable to connect to database.")
    exit(1)

db = client["epicdemic_db"]

articles_col = db["Articles"]
locations_col = db["Locations"]
reports_col = db["Reports"]
diseases_col = db["diseases"]

def overwrite_articles():
    