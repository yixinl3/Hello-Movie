"""
The module for initializing MongoDB
"""
from flask_mongoengine import MongoEngine

db = MongoEngine()


def create_db(app):
    """
    Initializing MongoDB
    """
    db.init_app(app)
