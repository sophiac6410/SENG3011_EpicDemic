from dotenv import dotenv_values
from os import access
from fastapi import FastAPI, Request, status
from fastapi.exceptions import RequestValidationError
from routers import locations, reports, articles, users, updates, cases, trips
import uvicorn
import time
from datetime import datetime
import os
import metadata
from models import statusModels, baseModels
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title=metadata.api["title"],
    description=metadata.api["description"],
    version=metadata.api["version"],
    openapi_tags=metadata.tags
)

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
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
app.include_router(users.router)
app.include_router(locations.router)
app.include_router(updates.router)
app.include_router(cases.router)
app.include_router(trips.router)

@app.get('/', status_code=status.HTTP_200_OK, response_model=statusModels.HealthCheckResponse, tags=["status"])
async def index():
    return baseModels.createResponse(True, 200, {'healthcheck': 'Everything OK!'})

if __name__ == "__main__":
	uvicorn.run(app)
