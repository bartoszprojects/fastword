from flask import Blueprint

mod_words = Blueprint('words', __name__)

from . words import *
