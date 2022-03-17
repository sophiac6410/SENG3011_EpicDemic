from pymongo import MongoClient
import geocoder

cluster = MongoClient(
    "mongodb+srv://EpicDemic:EpicDemic123!@epicdemic.ul8sw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
myclient = MongoClient('localhost', 27017)

db = cluster["parser_test_db"]

# Accessing diseases collection
collection = db["Diseases"]
articles = db["Articles"]
reports = db["Reports"]
locations = db["Locations"]

articles.delete_many({})
reports.delete_many({})
locations.delete_many({})

g = geocoder.geonames('Sydney', key='epicdemic')
print(g.address + g.state + g.country + g.class_description)
print(g.geonames_id)
if ('city' not in g.class_description):
    print("how bizzare")

g2 = geocoder.geonames('New South Wales, Australia', key='epicdemic')
print(g2.address + g2.state + g2.country + ", " + g2.class_description)
print(g2.geonames_id)

if ('city' not in g2.class_description):
    print("how bizzare")

g3 = geocoder.geonames('VIC, Australia', key='epicdemic')
print(g3.address + g3.state + g3.country + ", " + g3.class_description)
print(g3.geonames_id)


# post = {"_id": 4, "date_of_publication": "2022-03-12 17:14:11",
# "headline": "COVID Worldwide", "main_text": "lots of bs", "diseases": [1], "url": "https://promedmail.org/promed-post/?id=5944"}
# articles.insert_one(post)

#results = collection.find({})
# for res in results:
#    print(res)

#print(collection.count_documents({}) + 1)
#other = collection.find_one({"name": "other"})
#disease_list = []
# disease_list.append(other['_id'])
# print(disease_list)

# EXAMPLE 1: HOW TO ADD A DISEASE TO DATABASE
# post = {"_id": 41, "name": "zika"}
# collection.insert_one(post)

# EXAMPLE 2: HOW TO FIND A DISEASE IN THE DATABASE
# results = collection.find({"name": "zika"})
# for result in results:
#   print(result["_id"])

# results = collection.find({"name": "/regex expression/"} -> will return anything that meets that criteria

# result = collection.find_one("_id":0)
