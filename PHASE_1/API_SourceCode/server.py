from fastapi import FastAPI, BackgroundTasks, Depends
from routers import reports, articles, status
import uvicorn
from API_Documentation import metadata

app = FastAPI(
    title=metadata.api_data["title"],
    description=metadata.api_data["description"],
    version=metadata.api_data["version"],
    openapi_tags=metadata.api_data["tags"]
)

app.include_router(reports.router)
app.include_router(articles.router)
app.include_router(status.router)

@app.get('/')
async def index():
    return "At index inside server.py"


if __name__ == "__main__":
	uvicorn.run(app)