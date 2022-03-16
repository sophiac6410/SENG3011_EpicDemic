
api_data = {
    "title": "SENG3011 EpicDemic",
    "version": "0.0.1",
    "data_source": "promedmail.org",
    "description": "The EpicDemic API allows you to retrieve articles and reports from ProMed (promedmail.org)",
    "tags": [
        {
            "name": "articles",
            "description": "Retrieve articles published by ProMed. Articles can be filtered by publish date, and key terms."
        },
        {
            "name": "reports",
            "description": "Retrieve disease reports in articles. Reports can be filtered by event date, key terms, and location."
        },
        {
            "name": "status",
            "description": "Status checks for the server."
        }
    ]
}

error = {
    "desc": "A description of the error",
    "example": {"error": "Date must be in the format yyyy-mm-ddTHH:mm:ss"}
}

response = {
    "desc": {
        "team_name": "The name of the SENG3011 team",
        "version": "The current version of the API",
        "accessed_time": "The time that the API endpoint was accessed. Format: yyyy-mm-ddTHH:mm:ss",
        "data_source": "The data source of the articles and reports",
        "ok": "True if the request was successful, and false if the request was unsuccessful",
        "code": "The status code",
        "data": "The data for the request"
    },
    "example": {
        "successful": {
            "team_name": "EpicDemic",
            "version": "0.0.1",
            "accessed_time": "2022-03-10T02:08:51",
            "data_source": "promedmail.org",
            "ok": True,
            "code": 200,
            "data": "",
        },
        "unsuccessful": {
            "team_name": "EpicDemic",
            "version": "0.0.1",
            "accessed_time": "2022-03-10T02:08:51",
            "data_source": "promedmail.org",
            "ok": False,
            "code": 400,
            "data": error["example"],
        }
    }
}