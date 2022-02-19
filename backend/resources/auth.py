"""
The module for Auth API implementation
"""
from flask import Response, request
from database.models import User
from flask_restful import Resource
from mongoengine.errors import FieldDoesNotExist, NotUniqueError, DoesNotExist, InvalidQueryError
from resources.errors import SchemaValidationError, EmailAlreadyExistsError, UnauthorizedError, InternalServerError, UserNotExistsError, DeletingUserError, UpdatingUserError
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token


class SignupApi(Resource):
    """
    Signup Api
    """

    def post(self):
        """
        Post method. Create a new user
        """
        try:
            data = request.get_json()
            user = User(**data)
            user.hash_password()
            user.save()
            id = user.id
            return {'message': 'Successful Signup', 'id': str(id)}, 200
        except FieldDoesNotExist:
            raise SchemaValidationError
        except NotUniqueError:
            raise EmailAlreadyExistsError
        except Exception:
            raise InternalServerError


class LoginApi(Resource):
    """
    Login Api
    """

    def post(self):
        """
        Post method. Check user and create access token.
        """
        try:
            data = request.get_json()
            user = User.objects.get(email=data.get('email'))
            is_authorized = user.check_password(data.get('password'))
            if not is_authorized:
                raise UnauthorizedError
            token = create_access_token(
                identity=str(user.id))
            return {'message': 'Successful Login', 'token': token, 'id': str(user.id)}, 200
        except (UnauthorizedError, DoesNotExist):
            raise UnauthorizedError
        except Exception as e:
            print(e)
            raise InternalServerError


class UserApi(Resource):
    """
    User Api
    """

    def get(self, id):
        """
        Get method. Return user info with given id.
        """
        try:
            user = User.objects.get(id=id).to_json()
            return Response(user, mimetype="application/json", status=200)
        except DoesNotExist:
            raise UserNotExistsError
        except Exception:
            raise InternalServerError

    def delete(self, id):
        """
        Delete method. Delete a user with given id.
        """
        try:
            user = User.objects.get(id=id)
            user.delete()
            return {'message': 'Successful delete user with id ' + id}, 200
        except DoesNotExist:
            raise DeletingUserError
        except Exception:
            raise InternalServerError

    def put(self, id):
        """
        Put method. Update user info with given id.
        """
        try:
            user = User.objects.get(id=id)
            data = request.get_json()
            name = data.get('name')
            user.modify(name=name)
            password = data.get('password', 0)
            if password != 0:
                unchanged_pwd = user.check_password(data.get('password'))
                if not unchanged_pwd:
                    user.modify(password=password)
                    user.hash_password()
            user.save()
            return {'message': 'Successful update user with id ' + id}, 200
        except InvalidQueryError:
            raise SchemaValidationError
        except DoesNotExist:
            raise UpdatingUserError
        except Exception as e:
            print(e)
            raise InternalServerError
