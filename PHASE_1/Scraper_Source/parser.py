import sys
import json
from pymongo import MongoClient
from datetime import datetime
import pytz
import re

cluster = MongoClient(
    "mongodb+srv://EpicDemic:EpicDemic123!@epicdemic.ul8sw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

db = cluster["parser_test_db"]


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
    print(article_data)
    article_collection.insert_one(article_data)


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
            #print(re.search(disease['regex'], headline))

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


def main():
    create_article(sys.argv[0])


if __name__ == "__main__":
    main()
