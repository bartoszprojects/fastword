from flask import Flask
from .words import mod_words
from flasgger import Swagger


def create_app():
    app = Flask(__name__)
    swagger = Swagger(app)

    #Blueprints
    app.register_blueprint(mod_words)

    return app
