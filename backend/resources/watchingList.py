"""
The module for WatchingList API implementation
"""
from flask import Response, request
from database.models import WatchingListItem
from flask_restful import Resource
from mongoengine.errors import FieldDoesNotExist, NotUniqueError, DoesNotExist, InvalidQueryError
from resources.errors import SchemaValidationError, EmailAlreadyExistsError, UnauthorizedError, InternalServerError,   InvalidUserActionError


class WatchingListsApi(Resource):
    """
    WatchingListsApi
    """

    def post(self):
        """
        Post method. Create a new watching list.
        """
        try:
            body = request.get_json()
            watchingListItem = WatchingListItem(**body)
            watchingListItem.save()
            id = watchingListItem.id
            return {'message': 'Successful add a new watching list item', 'id': str(id)}, 200
        except FieldDoesNotExist:
            raise SchemaValidationError
        except Exception:
            raise InternalServerError


class WatchingListWithUserApi(Resource):
    """
    Watching with user id Api
    """

    def get(self, user_id):
        """
        Get method. Get all watching list item with a user id.
        """
        try:

            watchingList = WatchingListItem.objects(user_id=user_id).to_json()
            return Response(watchingList, mimetype="application/json", status=200)

        except Exception as e:
            print(e)
            raise InternalServerError


class WatchingListItemApi(Resource):
    """
    WatchingListItemApi Api
    """

    def delete(self, id):
        """
        Delete method. Delete a WatchingListItemApi with given id.
        """
        try:
            watchingListItem = WatchingListItem.objects.get(id=id)
            body = request.get_json()
            if (body.get('user_id') != watchingListItem.user_id):
                raise InvalidUserActionError
            watchingListItem.delete()
            return {'message': 'Successful delete watchingListItem with id ' + id}, 200
        except (InvalidUserActionError, DoesNotExist):
            raise InvalidUserActionError
        except Exception as e:
            raise InternalServerError
