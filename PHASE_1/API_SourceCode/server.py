from os import access
from fastapi import FastAPI, Request
from routers import reports, articles, status
import uvicorn
import time
from datetime import datetime
import os

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
    },
    {
        "name": "status",
        "description": """
        Status checks for the server
        """
    }
]

app = FastAPI(
    title="SENG3011 EpicDemic",
    description=description,
    version="0.0.1",
    openapi_tags=tags_metadata
)


@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = datetime.now()
    response = await call_next(request)
    process_time = datetime.timestamp(datetime.now()) - datetime.timestamp(start_time)
    log = """
    Timestamp: {}
    Accessed Time: {}
    Client: {}:{}
    """.format(datetime.timestamp(start_time), start_time, request.client.host, request.client.port)

    query_params = ""
    for key, value in request.query_params.items():
        query_params += ('\n\t\t\t' + key + '=' + value)
    if query_params == "": query_params = None
    path_params = ""
    for key, value in request.path_params.items():
        path_params += ('\n\t\t\t' + key + '=' + value)
    if path_params == "": path_params = None

    log += """
    Request: {} {}
    Request Query Param: {}
    Request Path Param: {}
   
    Response Code: {}
    Process Time: {}
    ----------------------------------------
    """.format(request.method, request.url.path, query_params, path_params, response.status_code, process_time)
    
    
    if not os.path.exists('logs'):
        os.makedirs('logs')
    log_file = open("logs/{}.log".format(start_time.date()), "a")
    log_file.write(log)
    log_file.close()

    return response


app.include_router(reports.router)
app.include_router(articles.router)
app.include_router(status.router)

@app.get('/')
async def index():
    return "At index inside server.py"


if __name__ == "__main__":
	uvicorn.run(app)