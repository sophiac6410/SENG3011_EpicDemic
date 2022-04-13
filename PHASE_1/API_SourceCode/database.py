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

db = client["parser_test_db"]

articles_col = db["Articles"]
locations_col = db["Locations"]
reports_col = db["Reports"]
diseases_col = db["Diseases"]
syndromes_col = db["Syndromes"]
users_col = db['Users']
