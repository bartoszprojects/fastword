from peewee import Model, Field
from playhouse.postgres_ext import PostgresqlExtDatabase
from peewee import CharField, ForeignKeyField, BooleanField, IntegerField
from ..db.base_model import BaseModel

class TranslationList(BaseModel):
    translated_word = CharField()

class Word(BaseModel):
    word = CharField()
    translation_list = ForeignKeyField(TranslationList)

class WordsCategory(BaseModel):
    category_title = CharField()
    category = CharField()

