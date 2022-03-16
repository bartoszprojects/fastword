from peewee import Model, Field
from playhouse.postgres_ext import PostgresqlExtDatabase
from peewee import CharField, ForeignKeyField, BooleanField, IntegerField
from ..db import BaseModel

class Word(BaseModel):
    word_name = CharField()

    @staticmethod
    def post_data(data):
        post_data = Word.create(word_name=data['word'])
        return post_data

class TranslationList(BaseModel):
    translated_word = CharField()
    for_word = ForeignKeyField(Word, to_field='id', on_delete='CASCADE')
    @staticmethod
    def post_data(data):
        post_data = TranslationList.create(translated_word=data['translated_word'], for_word=data['for_word'])
        return post_data


class WordsCategory(BaseModel):
    category_title = CharField()
    category = CharField()

