from fastapi import APIRouter, FastAPI, Query, HTTPException, status
from pydantic import BaseModel

router = APIRouter(
    prefix="/status"
)

############## HEALTH CHECK ###############
class HealthCheck(BaseModel):
	healthcheck: str

	class Config:
		schema_extra = {
			"example": {
				"healthcheck": "Everything OK!"
			}
		}
@router.get('/healthcheck', status_code=status.HTTP_200_OK, response_model=HealthCheck, tags=["status"])
def perform_healthcheck():
    return {'healthcheck': 'Everything OK!'}