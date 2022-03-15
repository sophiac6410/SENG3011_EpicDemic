from threading import local
import geocoder
from pymongo import MongoClient

cluster = MongoClient(
    "mongodb+srv://EpicDemic:EpicDemic123!@epicdemic.ul8sw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

db = cluster["epicdemic_db"]


def get_location_ids(loc_string):
    try:
        g = geocoder.geonames(loc_string, key='epicdemic')
        location_collection = db["Locations"]
        print(g.address + g.class_description)
        return_data = []

        # handling each case
        if 'country' in g.class_description:
            return_data = location_collection.find({"country": g.country})
            print(location_collection.count_documents({"country": g.country}))
        if 'state' in g.class_description:
            return_data = location_collection.find(
                {"country": g.country, "state": g.state})
        if 'city' in g.class_description:
            return_data = location_collection.find(
                {"country": g.country, "state": g.state, "city": g.address})
            print(location_collection.count_documents(
                {"country": g.country, "state": g.state, "city": g.address}))

        print(return_data)
    except:
        print('Issue with geonames API')
        return_data = {
            "error": "Unknown location"
        }

    return return_data


def main():
    get_location_ids("Sydney, Australia")


if __name__ == "__main__":
    main()
