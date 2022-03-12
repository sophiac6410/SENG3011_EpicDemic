from fastapi import APIRouter
from database import articles_col
import re

router = APIRouter(
    prefix='/james'
)

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