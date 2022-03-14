from fastapi import FastAPI
from routers import articles, james
import uvicorn

description="""
The EpicDemic API allows you to retrieve articles and reports from ProMed (promedmail.org).
"""

tags_metadata = [
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
    }
]
app = FastAPI(
    title="SENG3011 EpicDemic",
    description=description,
    version="0.0.1",
    openapi_tags=tags_metadata
)

app.include_router(james.router)
app.include_router(articles.router)

@app.get('/')
async def index():
    return "At index inside server.py"


if __name__ == "__main__":
	uvicorn.run(app)