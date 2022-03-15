FROM python:latest

WORKDIR /app

COPY ./app /app

RUN pip install -r requirements.txt
RUN pip install psycopg2-binary

CMD export FLASK_APP=run.py ; export FLASK_ENV=development ; flask run --host=0.0.0.0



