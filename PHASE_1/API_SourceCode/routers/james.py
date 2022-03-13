from typing import List
from fastapi import APIRouter
from database import articles_col, reports_col, diseases_col
import re

router = APIRouter(
    prefix='/james'
)

@router.post("/reports/ids")
async def get_reports(
    report_ids: List[int]):
    report_docs = list(reports_col.find(
        {"report_id":{"$in":report_ids}},
        {"_id": False}
    ))
    
    reports = {}
    disease_ids = set()
    
    for doc in report_docs:
        reports["report_id"] = doc
        
        # Get all the disease ids so we can look them all up in one efficient query
        for disease_id in doc["diseases"]:
            disease_ids.add(disease_id)

    disease_docs = list(diseases_col.find(
        {"_id":{"$in":disease_ids}}
    ))


    return {
        "status": 200,
        "data": {
            "reports": reports
        }
    }


@router.get("/test/{key_term}")
async def get_test(
	key_term: str
):
	documents = list(articles_col.find(
		{"headline": re.compile(key_term, re.IGNORECASE)}, 
		{"_id": False}))

	result = []
	for document in documents:
		result.append(document["article_id"])

	# for document in documents:
	# 	print(document)

	return {
		"status": 200,
		"data": {
			"article_ids": result
		}
	}