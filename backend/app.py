"""
The module for Flask APP api implementation
"""
# Reference: https://dev.to/paurakhsharma/flask-rest-api-part-5-password-reset-2f2e
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_restful import Api
from flask_jwt_extended import JWTManager
from resources.routes import create_routes
from database.db import create_db
from resources.errors import errors
from dotenv import load_dotenv, find_dotenv
import os
from os.path import join, dirname
dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)
MONGO_HOST = os.environ.get("MONGO_HOST")


app = Flask(__name__)
# run export ENV_FILE_LOCATION=./.env
app.config.from_envvar('ENV_FILE_LOCATION')
api = Api(app, errors=errors)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)


app.config['MONGODB_SETTINGS'] = {
    'host': MONGO_HOST
}

create_db(app)
create_routes(api)


if __name__ == "__main__":
    app.run()
