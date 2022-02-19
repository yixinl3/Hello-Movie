"""
The module for Friends API implementation
"""
from flask import Response, request
from database.models import User, Friends
from flask_restful import Resource
from mongoengine.errors import FieldDoesNotExist, NotUniqueError, DoesNotExist, InvalidQueryError
from resources.errors import SchemaValidationError, UnauthorizedError, InternalServerError, InvalidUserActionError, EmailDoesNotExistError


class FriendsApi(Resource):
    """
    FriendsApi
    """

    def post(self):
        """
        Post method. Create a new friend.
        """
        try:
            body = request.get_json()
            user = User.objects.get(email=body.get('friend_email'))
            friend_id = user.id
            print(friend_id)
            print(body)
            temp = {
                'cur_id': body.get('cur_id'),
                'friend_id': str(friend_id)
            }
            print(temp)
            friend = Friends(**temp)
            friend.save()
            id = friend.id
            return {'message': 'Successful add a new friend', 'id': str(id)}, 200
        except DoesNotExist:
            raise EmailDoesNotExistError
        except FieldDoesNotExist:
            raise SchemaValidationError
        except Exception as e:
            print(e)
            raise InternalServerError


class FriendsWithUserApi(Resource):
    """
    Friends with user id Api
    """

    def get(self, user_id):
        """
        Get method. Get all friends with a user id.
        """
        try:

            friends = Friends.objects(cur_id=user_id).to_json()
            return Response(friends, mimetype="application/json", status=200)

        except Exception as e:
            print(e)
            raise InternalServerError


class FriendApi(Resource):
    """
    Friend Api
    """

    def delete(self, id):
        """
        Delete method. Delete a friend with given id.
        """
        try:
            friend = Friends.objects.get(id=id)
            body = request.get_json()
            if (body.get('user_id') != friend.cur_id):
                raise InvalidUserActionError
            friend.delete()
            return {'message': 'Successful delete friend with id ' + id}, 200
        except (InvalidUserActionError, DoesNotExist):
            raise InvalidUserActionError
        except Exception as e:
            raise InternalServerError
