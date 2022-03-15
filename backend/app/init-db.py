from code.db import *

def create_tables():
    psql_db.create_tables(TABLES, safe=True)

def drop_tables():
    psql_db.drop_tables(TABLES, safe=True)

def add_example_data():
    Word.create(word="dog", translated_word="pies")


def make_migrate():
    drop_tables()
    create_tables()


if __name__ == '__main__':
    make_migrate()
