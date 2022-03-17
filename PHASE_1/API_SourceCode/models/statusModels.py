from pydantic import BaseModel, Field # datetime has format yyyy-mm-ddTHH:mm:ss
from models import baseModels

class HealthCheck(BaseModel):
	healthcheck: str = Field("Everything OK!", description="A health check message.")

class HealthCheckResponse(baseModels.Response):
    data: HealthCheck