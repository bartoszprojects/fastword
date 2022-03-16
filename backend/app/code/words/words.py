from . import mod_words
from flasgger import swag_from
from ..db import *
from flask import jsonify, request

@mod_words.route('/words', methods=['GET', 'POST'])
@swag_from('./schemes/words.get.yml', methods=['GET'])
@swag_from('./schemes/words.post.yml', methods=['POST'])
def words():
    # GET METHOD
    if request.method == 'GET':
        response = {'words': []}
        words = Word.select()
        for elem in words.dicts():
            foreign_list = {"data": []}
            query = TranslationList.select().where(TranslationList.for_word == elem['id'])
            for subelem in query.dicts():
                foreign_list['data'].append(subelem)
            response['words'].append({'id': elem['id'],'word_name': elem['word_name'],'foreign_list': foreign_list})
        return jsonify(response)
    # POST METHOD
    if request.method == 'POST':
        payload = request.get_json(force=True)
        Word.post_data(payload)
        return (request.json)


@mod_words.route('/translations', methods=['GET', 'POST'])
@swag_from('./schemes/translations.get.yml', methods=['GET'])
@swag_from('./schemes/translations.post.yml', methods=['POST'])
def translations():
    # GET METHOD
    if request.method == 'GET':
        response = {'translations': []}
        translations = TranslationList.select()
        for elem in translations.dicts():
            response['translations'].append(elem)
        return jsonify(response)
    # POST METHOD
    if request.method == 'POST':
        payload = request.get_json(force=True)
        TranslationList.post_data(payload)
        return (request.json)
