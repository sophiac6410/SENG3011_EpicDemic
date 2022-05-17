from gettext import NullTranslations
from pkg_resources import declare_namespace
from pymongo import MongoClient
from datetime import datetime
import re
import json

def regex(str):
  br = re.compile(r'<br>')
  str= br.sub('. ', str)
  p = re.compile(r'<.*?>')
  str= p.sub('', str)
  q = re.compile(r'&.*?;')
  str= q.sub('', str)
  return str


def remove_tags():
  for doc in list(travel_col.find()):
    id=doc['_id']
    no_list = ['HU', 'BG', 'IE', 'NL']
    if id in no_list:
      continue
    data=doc
    print(f'-- updating {id} --')
    if doc['declaration']['text']:
      data['declaration']['text'] = regex(doc['declaration']['text'])

    if doc['testing']['text']:
      data['testing']['text'] = regex(doc['testing']['text'])

    if doc['quarantine']['text']:
      data['quarantine']['text'] = regex(doc['quarantine']['text'])

    if doc['mask']['text']:
      data['mask']['text'] = regex(doc['mask']['text'])

    if doc['tracing']['text']:
      data['tracing']['text'] = regex(doc['tracing']['text'])

    if doc['area_policy']['text']:
      data['area_policy']['text'] = regex(doc['area_policy']['text'])

    for city in doc['area_restrction']:
      city['text'] = regex(city['text'])

    # if not doc['date']:
    #   f = {
    #     'text': regex(doc['text']),
    #     'date': datetime.now()
    #   }
    # else: 
    #   f = {
    #     'text': regex(doc['text'])
    #   }
    db.Travel.update_one( { "_id": id } , { "$set" : data })

def remove_entry_tags():
  for doc in list(loc_col.find()):
    id=doc['_id']
    data=doc
    print(f'-- updating {id} --')
    if doc['entry_description']:
      data['entry_description'] = regex(doc['entry_description'])


    db.Locations.update_one( { "_id": id } , { "$set" : data })

def safety_avg():
  for doc in list(safety_col.find()):
    id=doc['location_id']
    print(f'-- updating {id} --')

    f = {
      'safety_score': round((doc['lgbtq'] + doc['women'] + doc['medical'] + doc['physicalHarm'] + doc['politicalFreedom'] + doc['theft']) / 6 )
    }

    db.Locations.update_one( { "_id": id } , { "$set" : f })

if __name__ == "__main__":

    try:
      cluster = MongoClient(
        "mongodb+srv://EpicDemic:EpicDemic123!@epicdemic.ul8sw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
      myclient = MongoClient('localhost', 27017)

      db = cluster['parser_test_db']
      travel_col = db['Travel']
      loc_col = db['Locations']
      safety_col = db['Safety']
      # remove_entry_tags()
      remove_tags()
      # safety_avg()

    except Exception as e:
        raise e
