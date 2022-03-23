from peewee import Model, Field
from playhouse.postgres_ext import PostgresqlExtDatabase
from peewee import CharField, ForeignKeyField, BooleanField, IntegerField
from ..db import BaseModel

class Word(BaseModel):
    word_name = CharField()

    @staticmethod
    def post_data(data):
        post_data = Word.create(word_name=data['word_name'])
        print ('id of created record: ', post_data.id)
        return post_data

    @staticmethod
    def validate(data_to_check):
        query = Word.select().where(Word.word_name == data_to_check)
        if query.exists():
            return 'Word with this name exists in Database. You have to put other value'
        else:
            return False

class TranslationList(BaseModel):
    translated_word = CharField()
    for_word = ForeignKeyField(Word, to_field='id', on_delete='CASCADE')

    @staticmethod
    def post_data(data):
        post_data = TranslationList.create(translated_word=data['translated_word'], for_word=data['for_word'])
        return post_data

    @staticmethod
    def validate(data_to_check):
        check_foreign_key = Word.select().where(Word.id == data_to_check['for_word'])
        check_is_exist = TranslationList.select().where(TranslationList.translated_word == data_to_check['translated_word'])

        if not check_foreign_key.exists():
            return 'There is no ForeignKey ID (Word) that you want to connect TranslationList record'
        if check_is_exist.exists():
            return 'Translation with this name exists in Database. You have to put other value'
        if not data_to_check['translated_word']:
            return 'Given value is empty. It must has at least one character'
        return False




class WordsCategory(BaseModel):
    category_title = CharField()
    category = CharField()

