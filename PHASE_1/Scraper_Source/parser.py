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

db = cluster["epicdemic_db"]

# processes data from scraper to create articles, reports + locations


def process_data(data):
    if data == None:
        return
    article_id = create_article(data)
    syndromes = get_syndromes(article_id)
    create_reports(data, article_id, syndromes)

# populates article data and inserts into database


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

# creates datetime object for article issue date


def get_date(dt_string):
    return datetime.strptime(dt_string, "%Y-%m-%d %H:%M:%S")

# matches an article headline to the disease based on key words + regex


def get_diseases(headline):

    disease_collection = db["Diseases"]

    # get list of all diseases in dtabase except 'other' or 'unknown'
    diseases = disease_collection.find(
        {"name": {'$nin': ["other", "unknown"]}})
    disease_list = []

    # loop through diseases and check if disease name or key words appears in headline
    # if regex stored against the disease, do regex match against the headline to associate it with the disease
    for disease in diseases:
        for word in disease['key_words']:
            if re.search(word, headline, re.I):
                disease_list.append(disease['_id'])
        if ('regex' in disease.keys() and re.search(disease['regex'], headline, re.I)):
            disease_list.append(disease['_id'])
        if re.search(disease['name'], headline, re.I):
            disease_list.append(disease['_id'])

    # if article doesn't match any diseases in the database either unknown or other
    if disease_list == []:
        unknown = disease_collection.find_one({"name": "unknown"})
        if re.search("unknown", headline, re.I):
            disease_list.append(unknown['_id'])
            return disease_list

        for word in unknown["key_words"]:
            if re.search(word, headline, re.I):
                disease_list.append(unknown['_id'])
                return disease_list
        other = disease_collection.find_one({"name": "other"})
        disease_list.append(other['_id'])

    # remove duplicate ids
    disease_list = list(set(disease_list))
    return disease_list

# create a report for each marker in the article


def create_reports(data, article_id, syndromes):
    report_collection = db["Reports"]

    for report in data['contents']:
        report_headline = data['contents'][report][0]
        report_data = {
            "_id": report_collection.count_documents({}) + 1,
            "article_id": article_id,
            "diseases": get_diseases(report_headline),
            "confirmed": True,
            "syndromes": syndromes,
            "event_date": get_event_date(report_headline),
            "locations": get_locations(data['markers'][report][1], data['markers'][report][2], data['markers'][report][3]),
        }
        report_collection.insert_one(report_data)

# use report details to scrape event date


def get_event_date(headline):
    date_string = headline.split('<')
    date_string = date_string[0].rstrip(' ')
    return datetime.strptime(date_string, "%d %b %Y")

# get syndromes for an article by matching against the main_text


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

# get location from database or create new location using geonames


def get_locations(loc_string, lat, long):

    location_collection = db["Locations"]
    location_list = []

    # if Worldwide, defaults coordinates to 0
    if loc_string == 'Worldwide':
        lat = 0
        long = 0

    db_loc = location_collection.find_one({"latitude": lat, "longitude": long})

    if db_loc:
        location_list.append(db_loc["_id"])

    # if no worldwide value is on the database yet
    elif loc_string == 'Worldwide':
        location_data = handle_err_location()
        location_list.append(location_data["_id"])

    # creates a new location
    else:
        location = create_location(loc_string, lat, long)
        location_list.append(location["_id"])

    # print(location_list)
    return location_list

# if geonames unable to find location - store as unkown (worldwide reports)


def handle_err_location():
    location_collection = db["Locations"]
    location_data = {
        "_id":  location_collection.count_documents({}) + 1,
        "country": "",
        "city": "",
        "state": "",
        "latitude": 0,
        "longitude": 0,
        "geonames_id": 0
    }
    location_collection.insert_one(location_data)

    return location_data

# create the location object using geonames and location data


def create_location(loc_string, lat, longitude):
    location_collection = db["Locations"]
    try:
        geo_data = geocoder.geonames(loc_string, key='epicdemic')
        location_data = {
            "_id":  location_collection.count_documents({}) + 1,
            "country": geo_data.country,
            "city": geo_data.address,
            "state": geo_data.state,
            "latitude": lat,
            "longitude": longitude,
            "geonames_id": geo_data.geonames_id
        }
        if 'city' not in geo_data.class_description:
            location_data['city'] = ""

        location_collection.insert_one(location_data)

    except:
        f = open("errorlocations.txt", "a")
        try:
            f.write(f"{loc_string}\n")
            print(f'-- unable to find exact location {loc_string}----\n')
            if ("," in loc_string):
                country_name = loc_string.split(', ')[-1]
                db_loc = location_collection.find_one(
                    {"country": country_name})
                if db_loc:
                    f.write(f"-- country found {db_loc['country']}\n")
                    f.close()
                    return db_loc
                else:
                    location_data = create_location(
                        country_name, lat, longitude)
                    f.write(f"-- new location {location_data['country']}\n")
                    f.close()
                    return location_data
            else:
                return handle_err_location()
        except:
            print("ello")
            # if all comes to fail, default value is Worldwide
            db_loc = location_collection.find_one(
                {"latitude": 0, 'longitude': 0})
            f.write("-- unknown: worldwide location\n")
            f.close()
            if db_loc:
                return db_loc
            else:  # if there is no Worldwide attribute yet, creates worldwide
                return handle_err_location()

    return location_data

# test helper:


def get_db():
    return db
