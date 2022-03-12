from fastapi import FastAPI
from routers import james, sophia
import uvicorn

app = FastAPI()

app.include_router(james.router)
app.include_router(sophia.router)

@app.get('/')
async def index():
    return "At index inside server.py"


if __name__ == "__main__":
	uvicorn.run(app)