from datetime import datetime
from pydantic import BaseModel, Field # datetime has format yyyy-mm-ddTHH:mm:ss
from typing import List, Dict
from models import baseModels

############### ARTICLE RESPONSE MODELS ##############
class Article(BaseModel):
	id: int = Field(..., description="The unique id of the article", 
                    example=1)
	url: str = Field(..., description="The url to the article on ProMed", 
                    example="https://promedmail.org/promed-post/?id=8701909")
	date_of_publication: datetime = Field(..., description="The article's date of publication on ProMed",
                    example="2022-03-10T02:08:51")
	headline: str = Field(..., description="The article's headline on ProMed",
                    example="PRO/AH/EDR> Chronic wasting disease - North America (02): (USA) deer")
	main_text: str = Field(..., description="The article's body of text",
                    example="The Iowa Department of Natural Resources reports 36 positive chronic wasting disease (CWD) tests from some 5000 deer samples this hunting season.<br/><br/>The DNR's Tyler Harms, who oversees the deer management program, says 2 new counties were added to the list of counties in which CWD has been detected in the wild. Greene County in central Iowa and Fremont County in southwest Iowa brings the total number of counties to 12.")
	reports: List[int] = Field(..., description="The id's of the disease reports contained in the article", 
                    example=[1, 2, 3])

class ArticleQuery(BaseModel):
	start_range: int = Field(..., description="The starting position of the articles", example=1)
	end_range: int = Field(..., description="The last position of the articles", example=10)
	articles: List[Article] = Field(..., description="The list of articles")

class ArticleQueryResponse(baseModels.Response):
	data: ArticleQuery

class ArticleIds(BaseModel):
    articles: Dict[int, Article] = Field(..., description="A dictionary of articles with the article id as the key")
    
    class Config:
        schema_extra = {
            "example": {
                1: {
                    "id": 1,
                    "url": "https://promedmail.org/promed-post/?id=8701909",
                    "date_of_publication": "2022-03-10T02:08:51",
                    "headline": "PRO/AH/EDR> Chronic wasting disease - North America (02): (USA) deer",
                    "main_text": "The Iowa Department of Natural Resources reports 36 positive chronic wasting disease (CWD) tests from some 5000 deer samples this hunting season.<br/><br/>The DNR's Tyler Harms, who oversees the deer management program, says 2 new counties were added to the list of counties in which CWD has been detected in the wild. Greene County in central Iowa and Fremont County in southwest Iowa brings the total number of counties to 12.",
                    "reports": [1, 2, 3]
                }
            }
        }
class ArticleIdResponse(baseModels.Response):
	data: ArticleIds