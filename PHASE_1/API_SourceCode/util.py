from datetime import datetime

import pytz

DATETIME_REGEX = "^(19|20)\d\d-(0[1-9]|1[012])-([012]\d|3[01])T([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$"

def parse_datetime_string(date_str, timezone):
    """
    input_str must be a valid date time regex
    timezone must be valid timezone
    """
    date = datetime.fromisoformat(date_str)
    return date.replace(tzinfo=pytz.timezone(timezone))

def generate_query(start_date, end_date, article_ids=None, location_ids=None, disease_ids=None):
    """
    Generates a mongodb query given the parameters
    """
    queries = []
    
    # Get all the reports which lie within the start and end dates
    event_date_query = {
        "event_date":{
            "$gte": start_date,
            "$lte": end_date,
        }
    }
    queries.append(event_date_query)

    if article_ids is not None:
        article_id_query = {
            "article_id": {
                "$in": article_ids
            }
        }
        queries.append(article_id_query)

    if location_ids is not None:
        location_id_query = {
            "locations": {
                "$in": location_ids
            }
        }
        queries.append(location_id_query)

    if disease_ids is not None:
        key_terms_query = {
            "diseases": {
                "$in": disease_ids
            }
        }
        queries.append(key_terms_query)

    return queries