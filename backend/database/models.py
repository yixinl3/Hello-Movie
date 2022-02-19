"""
The module for storing all models
"""
from .db import db
from flask_bcrypt import generate_password_hash, check_password_hash


class Review(db.Document):
    """
    A Review has a Boolean like/dislike, String content,  user id, user name, and movie ID.
    """
    movie_id = db.IntField(required=True)
    like = db.BooleanField(required=True)
    content = db.StringField(required=True, min_length=1)
    user_id = db.StringField(required=True)
    user_name = db.StringField(required=True)


class WatchingListItem(db.Document):
    """
    A watchingList Item contains movie id and user id
    """
    movie_id = db.IntField(required=True)
    user_id = db.StringField(required=True)


class Friends(db.Document):
    """
    A Friends Item contains current user id and friend user id(Similar to following)
    """
    cur_id = db.StringField(required=True)
    friend_id = db.StringField(required=True)


class User(db.Document):
    """
    A User has name, email and password.
    """
    name = db.StringField(required=True)
    email = db.EmailField(required=True, unique=True)
    password = db.StringField(required=True, min_length=6)
    # watching_list = db.ListField()

    def hash_password(self):
        """
        Encrypt password
        """
        self.password = generate_password_hash(self.password).decode('utf8')

    def check_password(self, password):
        """
        Check if password is correct
        """
        return check_password_hash(self.password, password)
