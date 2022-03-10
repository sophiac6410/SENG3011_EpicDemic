from pymongo import MongoClient

cluster = MongoClient(
    "mongodb+srv://EpicDemic:EpicDemic123!@epicdemic.ul8sw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

db = cluster["epicdemic_db"]

# Accessing diseases collection
collection = db["diseases"]

# EXAMPLE: HOW TO ADD A DISEASE TO DATABASE
# post = {"_id": 0, "name": "zika"}
# collection.insert_one(post)
