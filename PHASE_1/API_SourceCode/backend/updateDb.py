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
  for doc in list(updates_col.find()):
    id=doc['_id']
    print(f'-- updating {id} --')
    if not doc['date']:
      f = {
        'text': regex(doc['text']),
        'date': datetime.now()
      }
    else: 
      f = {
        'text': regex(doc['text'])
      }
    db.Updates.update_one( { "_id": id } , { "$set" : f })

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
      updates_col = db['Updates']
      safety_col = db['Safety']
      # remove_tags()
      safety_avg()

    except Exception as e:
        raise e