from curses import meta
from fastapi import APIRouter, FastAPI, Query, HTTPException, status
from fastapi.responses import JSONResponse
from datetime import date, datetime, time
from pydantic import BaseModel, Field, HttpUrl # datetime has format yyyy-mm-ddTHH:mm:ss
from typing import Optional, List, Dict, Any
from models import baseModels
from API_Documentation import metadata, article_metadata
class Article(BaseModel):
	id: int = Field(..., description=metadata.article["desc"]["id"])
	url: HttpUrl = Field(..., description=metadata.article["desc"]["url"])
	date_of_publication: datetime = Field(..., description=metadata.article["desc"]["date"])
	headline: str = Field(..., description=metadata.article["desc"]["headline"])
	main_text: str = Field(..., description=metadata.article["desc"]["text"])
	reports: List[int] = Field(..., description=metadata.article["desc"]["reports"])

	class Config:
		schema_extra = {
            "example": metadata.article["example"]
        }

class ArticleIdResponse(baseModels.Response):
    articles: Dict[int, Article] = Field(..., description=article_metadata.article_ids["desc"]["articles"])

    class Config:
        schema_extra = {
			"example": article_metadata.response_article_id
		}

class ArticleQueryResponse(baseModels.Response):
	start_range: int = Field(..., description=article_metadata.article_query["desc"]["start_range"])
	end_range: int = Field(..., description=article_metadata.article_query["desc"]["end_range"])
	articles: List[Article] = Field(..., description=article_metadata.article_query["desc"]["articles"])

	class Config:
		schema_extra = {
            "example": article_metadata.response_article_query
		}