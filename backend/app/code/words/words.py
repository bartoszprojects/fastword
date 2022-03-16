from . import mod_words
from flasgger import swag_from
from ..db import *
from flask import jsonify, request

@mod_words.route('/words', methods=['GET', 'POST'])
@swag_from('./schemes/words.get.yml', methods=['GET'])
@swag_from('./schemes/words.post.yml', methods=['POST'])
def words():
    # GET
    if request.method == 'GET':
        response = {'words': [], 'foreign_key': []}
        words = Word.select()
        for author in words.dicts():
            foreign_list = {"data": []}
            query = TranslationList.select().where(TranslationList.for_word == author['id'])
            for elem in query.dicts():
                foreign_list['data'].append(elem)
            response['words'].append(
                {'id': author['id'],
                'word_name': author['word_name'],
                 'foreign_list': foreign_list})
        return jsonify(response)
    # POST
    if request.method == 'POST':
        payload = request.get_json(force=True)
        Word.post_data(payload)
        return (request.json)


@mod_words.route('/translations', methods=['GET', 'POST'])
@swag_from('./schemes/translations.get.yml', methods=['GET'])
@swag_from('./schemes/translations.post.yml', methods=['POST'])
def translations():
    # GET
    if request.method == 'GET':
        response = {'translations': []}
        translations = TranslationList.select()
        for author in translations.dicts():
            response['translations'].append(author)
        return jsonify(response)
    # POST
    if request.method == 'POST':
        payload = request.get_json(force=True)
        TranslationList.post_data(payload)
        return (request.json)
