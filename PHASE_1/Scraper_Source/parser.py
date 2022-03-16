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

    if data == None:
        return
    article_id = create_article(data)
    syndromes = get_syndromes(article_id)
    create_reports(data, article_id, syndromes)


def create_article(data):
    if data == None:
        return

    article_collection = db["Articles"]
    article_data = {
        "_id": article_collection.count_documents({}) + 1,
        "date_of_publication": get_date(data['postinfo']['issue_date']),
        "headline": data['postinfo']['summary'],
        "main_text": data['postinfo']['content'],
        "diseases": get_diseases(data['postinfo']['summary']),
        "url": "https://promedmail.org/promed-post/?id={}".format(data['postinfo']['alert_id'])
    }

    article_collection.insert_one(article_data)

    return article_data["_id"]


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


def create_reports(data, article_id, syndromes):
    report_collection = db["Reports"]

    for report in data['contents']:
        report_headline = data['contents'][report][0]
        diseases = get_diseases(report_headline)
        event_date = get_event_date(report_headline)
        cases = get_cases(report_headline)
        location = get_location(
            data['markers'][report][1], data['markers'][report][2], data['markers'][report][3])

        existing_report = report_collection.find_one(
            {"article_id": article_id, "diseases": diseases, "syndromes": syndromes, "event_date": event_date})

        if existing_report:
            report_collection.update_one({"_id": existing_report["_id"]}, {
                                         "$addToSet": {"locations": location}})
            report_collection.update_one(
                {"_id": existing_report["_id"]}, {"$inc": {"cases": cases}})
            print(existing_report)

        else:
            report_data = {
                "_id": report_collection.count_documents({}) + 1,
                "article_id": article_id,
                "diseases": diseases,
                "confirmed": True,
                "syndromes": syndromes,
                "event_date": event_date,
                "cases": cases,
                "locations": [location],
            }
            report_collection.insert_one(report_data)


def get_cases(report_headline):
    cases = re.search("\([0-9]+\)", report_headline, re.I)
    if cases:
        match = cases.group(0)
        match = match.lstrip('(').rstrip(')').lstrip('0')
        return int(match)
    else:
        return 1


def get_event_date(headline):
    date_string = headline.split('<')
    date_string = date_string[0].rstrip(' ')
    return datetime.strptime(date_string, "%d %b %Y")


def get_syndromes(article_id):
    syndrome_collection = db["Syndromes"]
    syndromes = syndrome_collection.find({})
    syndrome_list = []

    article_collection = db["Articles"]
    article = article_collection.find_one({"_id": article_id})

    for syndrome in syndromes:
        if re.search(syndrome['name'], article['headline'], re.I) or re.search(syndrome["name"], article["main_text"], re.I):
            syndrome_list.append(syndrome["name"])

    return syndrome_list


def get_location(loc_string, lat, long):

    location_collection = db["Locations"]
    location_id = 0

    db_loc = location_collection.find_one({"latitude": lat, "longitude": long})

    if db_loc:
        location_id = db_loc["_id"]
    else:
        location = create_location(loc_string, lat, long)
        location_id = location["_id"]

    return location_id


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
            "longitude": longitude,
            "geonames_id": g.geonames_id
        }

        # handling edge cases
        if 'city' not in g.class_description:
            location_data['city'] = ""

        location_collection.insert_one(location_data)

    except:
        print('Issue with geonames API')

    return location_data
