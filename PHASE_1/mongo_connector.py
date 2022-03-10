from pymongo import MongoClient

cluster = MongoClient(
    "mongodb+srv://EpicDemic:EpicDemic123!@epicdemic.ul8sw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

db = cluster["epicdemic_db"]
collection = db["diseases"]

# Accessing diseases collection
collection = db["diseases"]

collection.insert_one(post)
