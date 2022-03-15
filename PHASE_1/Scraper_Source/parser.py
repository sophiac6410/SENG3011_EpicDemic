import sys
import json
from pymongo import MongoClient
from datetime import datetime
import pytz
import re
import string
import geocoder 

cluster = MongoClient(
    "mongodb+srv://EpicDemic:EpicDemic123!@epicdemic.ul8sw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

db = cluster["parser_test_db"]


def process_data(data):
    article_id = create_article(data)
    syndromes = get_syndromes(article_id)
    create_reports(data, article_id)


def create_article(data):
    article_collection = db["Articles"]
    article_data = {
        "_id": article_collection.count_documents({}) + 1,
        "date_of_publication": get_date(data['postinfo']['issue_date']),
        "headline": data['postinfo']['summary'],
        "main_text": data['postinfo']['content'],
        "diseases": get_diseases(data['postinfo']['summary']),
        "url": "https://promedmail.org/promed-post/?id={}".format(data['postinfo']['alert_id'])
    }

    # article_collection.insert_one(article_data)

    return article_data['_id']


def get_date(dt_string):
    return datetime.strptime(dt_string, "%Y-%m-%d %H:%M:%S")


def get_diseases(headline):
    disease_collection = db["Diseases"]
    diseases = disease_collection.find(
        {"name": {'$nin': ["other", "unknown"]}})
    disease_list = []

    for disease in diseases:
        for word in disease['key_words']:
            if re.search(word, headline, re.I):
                disease_list.append(disease['_id'])
        if ('regex' in disease.keys() and re.search(disease['regex'], headline, re.I)):
            disease_list.append(disease['_id'])
        if re.search(disease['name'], headline, re.I):
            disease_list.append(disease['_id'])

    if disease_list == []:
        if re.search("unknown", headline, re.I):
            unknown = disease_collection.find_one({"name": "unknown"})
            for word in unknown['key_words']:
                if re.search(word, headline, re.I):
                    disease_list.append(unknown['id'])
        else:
            other = disease_collection.find_one({"name": "other"})
            if other:
                disease_list.append(other['_id'])
    return disease_list


def create_reports(data, article_id):
    report_collection = db["Reports"]

    for report in data['contents']:
        report_headline = data['contents'][report][0]
        report_data = {
            "_id": report_collection.count_documents({}) + 1,
            "article_id": article_id,
            "diseases": get_diseases(report_headline),
            "confirmed": True,
            "syndromes": get_syndromes(report_headline),
            "event_date": datetime.now(),
            "cases": get_cases(report_headline),
            "locations": get_locations(data['markers'][report][1], data['markers'][report][2], data['markers'][report][3]),
        }
        print(report)
        print(report_data)


def get_cases(report_headline):
    cases = re.search("\([0-9]+\)", report_headline, re.I)
    if cases:
        match = cases.group(0)
        match = match.lstrip('(').rstrip(')').lstrip('0')
        return int(match)
    else:
        return 1


def get_syndromes(article_id):
    syndrome_collection = db["Syndromes"]
    syndromes = syndrome_collection.find()
    syndrome_list = []

    article_collection = db["Articles"]
    article = article_collection.find_one({"_id": article_id})

    for syndrome in syndromes:
        if re.search(syndrome["name"], article["headline"], re.I) or re.search(syndrome["name"], article["main_text"], re.I):
            syndrome_list.append(syndrome["name"])

    return syndrome_list


def get_locations(loc_string, lat, long):

    location_collection = db["Locations"]
    location_list = []

    db_loc = location_collection.find_one({"latitude": lat, "longitude": long})

    if db_loc:
        location_list.append(db_loc["_id"])
    else:
        location = create_location(loc_string, lat, long)
        location_list.append(location["_id"])

    return location_list


def create_location(loc_string, lat, longitude):
    # call the geocoder to get the geonames id
    try: 
        g = geocoder.geonames(loc_string, key='epicdemic')
        location_collection = db["Locations"]
        location_data = {
            "_id":  location_collection.count_documents({}) + 1,
            "country": g.country,
            "city": g.address,
            "state": g.state,
            "latitude": lat,
            "longitude": longitude
        }

        # handling edge cases
        if 'country' in g.class_description:
            location_data['city'] = None 
            location_data['state'] = None 
        
        if 'state' in g.class_description:
            location_data['city'] = None

        if 'city' not in g.class_description:
            location_data['city'] = None 

        location_collection.insert_one(location_data)

    except: 
        print('Issue with geonames API')

    # print(location_data)
    return location_data