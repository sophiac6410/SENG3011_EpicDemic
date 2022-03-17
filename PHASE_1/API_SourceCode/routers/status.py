from fastapi import APIRouter, status
from models import statusModels, baseModels

router = APIRouter(
    prefix="/status"
)

############## HEALTH CHECK ###############
@router.get('/healthcheck', status_code=status.HTTP_200_OK, response_model=statusModels.HealthCheckResponse, tags=["status"])
def perform_healthcheck():
    return baseModels.createResponse(True, 200, {'healthcheck': 'Everything OK!'})