FROM tiangolo/uvicorn-gunicorn-fastapi:python3.9

WORKDIR /server
COPY . /server
RUN pip install -r requirements.txt
EXPOSE 8080
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8080"]