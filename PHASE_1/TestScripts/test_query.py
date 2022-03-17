from datetime import datetime

from PHASE_1.API_SourceCode.util import generate_query

def test_query_start_end_date():
    start_date = datetime.fromisoformat("2021-01-01T10:10:10")
    end_date = datetime.fromisoformat("2023-01-01T10:10:10")

    query = generate_query(start_date, end_date)

    assert len(query) == 1
    assert query[0] == {
        "event_date": {
            "$gte": start_date,
            "$lte": end_date,
        }
    }


def test_query_start_end_date_article_ids():
    start_date = datetime.fromisoformat("2021-01-01T10:10:10")
    end_date = datetime.fromisoformat("2023-01-01T10:10:10")
    article_ids = [1, 2, 3]

    query = generate_query(start_date, end_date, article_ids)
    
    assert len(query) == 2
    assert query[0] == {
        "event_date": {
            "$gte": start_date,
            "$lte": end_date,
        }
    }
    assert query[1] == {
        "article_id": {
            "$in": [1, 2, 3]
        }
    }

def test_query_start_end_date_article_ids_location_ids():
    start_date = datetime.fromisoformat("2021-01-01T10:10:10")
    end_date = datetime.fromisoformat("2023-01-01T10:10:10")
    article_ids = [1, 2, 3]
    location_ids = [5, 6, 7]

    query = generate_query(start_date, end_date, article_ids, location_ids)
    
    assert len(query) == 3
    assert query[0] == {
        "event_date": {
            "$gte": start_date,
            "$lte": end_date,
        }
    }
    assert query[1] == {
        "article_id": {
            "$in": [1, 2, 3]
        }
    }
    assert query[2] == {
        "locations": {
            "$in": [5, 6, 7]
        }
    }
    
def test_query_start_end_date_article_ids_location_ids_disease_ids():
    start_date = datetime.fromisoformat("2021-01-01T10:10:10")
    end_date = datetime.fromisoformat("2023-01-01T10:10:10")
    article_ids = [1, 2, 3]
    location_ids = [5, 6, 7]
    disease_ids = [9, 10, 11]

    query = generate_query(start_date, end_date, article_ids, location_ids, disease_ids)
    
    assert len(query) == 4
    assert query[0] == {
        "event_date": {
            "$gte": start_date,
            "$lte": end_date,
        }
    }
    assert query[1] == {
        "article_id": {
            "$in": [1, 2, 3]
        }
    }
    assert query[2] == {
        "locations": {
            "$in": [5, 6, 7]
        }
    }
    assert query[3] == {
        "diseases": {
            "$in": [9, 10, 11]
        }
    }