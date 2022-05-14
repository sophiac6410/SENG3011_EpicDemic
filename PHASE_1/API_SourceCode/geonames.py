from threading import local
import geocoder
from pymongo import MongoClient

cluster = MongoClient(
    "mongodb+srv://EpicDemic:EpicDemic123!@epicdemic.ul8sw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

db = cluster["epicdemic_db"]

def update_locations_dict(locations, docs):
    """
    Insert location document into a locations dictionary, mapping id to doc
    """
    for doc in docs:
        locations[doc["_id"]] = doc

def get_location_ids(loc_string):
    try:
        g = geocoder.geonames(loc_string, key='epicdemic')
        location_collection = db["Locations"]

        locations = {}

        # handling each case
        if 'country' in g.class_description:
            return_docs = list(location_collection.find({"country": g.country}))
            update_locations_dict(locations, return_docs)
        if 'state' in g.class_description:
            return_docs = list(location_collection.find({"country": g.country, "state": g.state}))
            update_locations_dict(locations, return_docs) 
        if 'city' in g.class_description:
            return_docs = list(location_collection.find({"country": g.country, "state": g.state, "city": g.address}))
            update_locations_dict(locations, return_docs) 

    except:
        #print('Issue with geonames API')
        return {
            "success": False,
            "error": "Unknown location"
        }

    return {
        "success": True,
        "location_ids": locations
    }


def main():
    # get_location_ids("Sydney, Australia")
    # res = get_location_ids("Belgium")
    print(res)

if __name__ == "__main__":
    main()

