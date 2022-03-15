from . import mod_words
from flask import jsonify
from flasgger import swag_from
from ..db.base_model import *
from ._model import Word
@mod_words.route('/colors/<palette>/')
@swag_from('./schemes/test.yml')
def test(palette):
    all_colors = {
        'cmyk': ['cyan', 'magenta', 'yellow', 'black'],
        'rgb': ['red', 'green', 'blue']
    }
    if palette == 'all':
        result = all_colors
    else:
        result = {palette: all_colors.get(palette)}

    return jsonify(result)

@mod_words.route('/words')
@swag_from('./schemes/words.get.yml')
def words():
    response = {'authors': []}

    authors = Word.select()

    for author in authors.dicts():
        response['authors'].append(author)
    return jsonify(response)
