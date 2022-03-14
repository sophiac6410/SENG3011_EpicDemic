from dateutil.parser import parse
from typing import List, Optional
from fastapi import APIRouter
from database import articles_col, reports_col, diseases_col
import re

router = APIRouter(
    prefix='/james'
)

@router.get("/reports/ids")
async def get_reports_from_id(
    report_ids: str):
    report_ids = [int(i) for i in report_ids.split(",")]
    report_docs = list(reports_col.find(
        {"_id":{"$in":report_ids}},
    ))

    reports = {}
    disease_ids = set()
    
    for doc in report_docs:
        reports[doc["_id"]] = doc
        
        # Get all the disease ids so we can look them all up in one efficient query
        for disease_id in doc["diseases"]:
            disease_ids.add(disease_id)

    # Look up all the disease in one go
    disease_docs = list(diseases_col.find(
        {"_id":{"$in":list(disease_ids)}}        
    ))

    # Map disease id to name
    diseases = {}
    for disease in disease_docs:
        diseases[disease["_id"]] = disease["name"]

    # Convert the disease ids to actual disease names
    for report in reports.values():
        new_diseases = []
        for disease_id in report["diseases"]:
            new_diseases.append(diseases[disease_id])

        report["diseases"] = new_diseases

    return {
        "status": 200,
        "data": {
            "reports": reports
        }
    }

@router.get("/reports/")
async def get_reports_from_query(
    start_date: str,
    end_date: str,
    article_ids: Optional[List[int]] = None,
    location: Optional[str] = None,
    key_terms: Optional[str] = None,
    start_range: Optional[int] = 1,
    end_range: Optional[int] = 10
):
    # TODO: Handle errors
    start_date = parse(start_date)
    end_date = parse(end_date)

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

    if location is not None:
        pass

    if key_terms is not None:
        key_terms_list = [x.strip() for x in key_terms.split(",")]
        # Key terms is a bit tricky. We will first find all the disease_ids which match
        # these keywords. Because the disease database is small, this should be quick

        # Matching disease id to disease name (only for diseases which matched a key term)
        matched_diseases = {}

        all_diseases = list(diseases_col.find())
        for disease in all_diseases:
            for key_term in key_terms_list:
                if re.match(rf".*{key_term}.*", disease["name"], re.IGNORECASE):
                    matched_diseases[disease["_id"]] = disease["name"]
                    break
                elif "regex" in disease and re.match(rf"{disease['regex']}", key_term, re.IGNORECASE):
                    matched_diseases[disease["_id"]] = disease["name"]
                    break
                else:
                    # Check if this is in the key words list
                    matched = False
                    for key_word in disease["key_words"]:
                        if re.match(rf".*{key_term}.*", key_word, re.IGNORECASE):
                            matched_diseases[disease["_id"]] = disease["name"]
                            matched = True
                            break
                    if matched:
                        break

        matched_disease_ids = list(matched_diseases.keys())

        key_terms_query = {
            "diseases": {"$in": matched_disease_ids}
        }
        queries.append(key_terms_query)


    report_docs = list(reports_col.find(
        {
            "$and": queries
        }
    ).skip(start_range - 1).limit(end_range + 1 - start_range))

    print(report_docs)

    return {
        "status": 200,
        "data": {
            "start_range": start_range,
            "end_range": end_range,
            "reports": report_docs
        }
    }
