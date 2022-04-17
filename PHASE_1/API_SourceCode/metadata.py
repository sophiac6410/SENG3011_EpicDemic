api = {
    "title": "SENG3011 EpicDemic",
    "team": "EpicDemic",
    "version": "0.0.1",
    "description": "The EpicDemic API allows you to retrieve articles and reports from ProMed (promedmail.org).",
    "data_source": "promedmail.org"
}

tags = [
    {
        "name": "articles",
        "description": """
        Retrieve articles published by ProMed.
        Articles can be filtered by:   
            * publish date
            * key terms
        """
    },
    {
        "name": "reports",
        "description": """
        Retrieve reports in articles.
        Reports can be filtered by:
            * event date
            * key terms
            * location
        """
    },
    {
        "name": "status",
        "description": """
        Status checks for the server
        """
    },
    {
        "name": "users",
        "description": """
        Users on EpicDemic. Includes registering, logging in, and saving location, notifications, and trips for users
        """
    },
    {
        "name": "updates",
        "description": """
        The recent updates for each destination, including on travel restrictions and diseases
        """
    }
]