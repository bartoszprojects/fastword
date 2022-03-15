from peewee import Model, Field
from playhouse.postgres_ext import PostgresqlExtDatabase

psql_db = PostgresqlExtDatabase(
    'postgres',
    user='postgres',
    password='postgres',
    port=5432,
    host='fw-database')


class BaseModel(Model):
    """A base model that will use our Postgresql database"""
    class Meta:
        database = psql_db
