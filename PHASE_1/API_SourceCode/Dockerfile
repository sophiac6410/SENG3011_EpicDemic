FROM tiangolo/uvicorn-gunicorn-fastapi:python3.9
WORKDIR /app
COPY . /app
RUN pip install -r requirements.txt
EXPOSE 8888
CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8888"]