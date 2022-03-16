from API_Documentation import metadata

article = {
    "desc": {
        "id": "The unique id of the article",
        "url": "The url to the article on ProMed",
        "date": "The article's date of publication on ProMed",
        "headline": "The article's headline on ProMed",
        "text": "The article's body of text",
        "reports": "The id's of the disease reports contained in the article"
    },
    "example": {
        "id": 1,
        "url": "https://promedmail.org/promed-post/?id=8701909",
        "date_of_publication": "2022-03-10T02:08:51",
        "headline": "PRO/AH/EDR> Chronic wasting disease - North America (02): (USA) deer",
        "main_text": "The Iowa Department of Natural Resources reports 36 positive chronic wasting disease (CWD) tests from some 5000 deer samples this hunting season.<br/><br/>The DNR's Tyler Harms, who oversees the deer management program, says 2 new counties were added to the list of counties in which CWD has been detected in the wild. Greene County in central Iowa and Fremont County in southwest Iowa brings the total number of counties to 12.",
        "reports": [1, 2, 3]
    }
}

article_ids = {
    "desc": {
        "articles": "A dictionary of articles with the article id as the key"
    },
    "example": {
        "articles": {
            1: article["example"]
        }
    }
}

response_article_id = metadata.response["example"]["successful"]
response_article_id["data"] = article_ids["example"]
response_article_id = {
    "example": response_article_id
}

article_query = {
    "desc": {
        "start_range": "The starting position of the articles",
        "end_range": "The last position of the articles",
        "articles": "The list of articles"
    },
    "example": {
        "start_range": 1,
        "end_range": 10,
        "articles": [article["example"]]
    }
}

response_article_query = metadata.response["example"]["successful"]
response_article_query["data"] = article_query["example"]
response_article_query = {
    "example": response_article_query
}
