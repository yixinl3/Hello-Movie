"""
The module for Review API implementation
"""
from flask import Response, request
from database.models import Review, User
from flask_restful import Resource
from mongoengine.errors import FieldDoesNotExist, NotUniqueError, DoesNotExist, InvalidQueryError
from resources.errors import SchemaValidationError, UnauthorizedError, InternalServerError, ReviewsNotExistsError, ReviewNotExistsError,  InvalidUserActionError


class ReviewsApi(Resource):
    """
    Reviews Api
    """

    def get(self):
        """
        Get method. Get all reviews.
        """
        try:
            reviews = Review.objects().to_json()
            return Response(reviews, mimetype="application/json", status=200)
        except DoesNotExist:
            raise ReviewsNotExistsError
        except Exception:
            raise InternalServerError

    def post(self):
        """
        Post method. Create a new review.
        """
        try:
            body = request.get_json()
            review = Review(**body)
            review.save()
            id = review.id
            return {'message': 'Successful post a new review', 'id': str(id)}, 200
        except FieldDoesNotExist:
            raise SchemaValidationError
        except Exception:
            raise InternalServerError


class ReviewWithMovieApi(Resource):
    """
    Reviews with movie id Api
    """

    def get(self, movie_id):
        """
        Get method. Get all reviews with a movie id.
        """
        try:
            # review = Review.objects.get(movie_id=movie_id)
            reviews = Review.objects(movie_id=movie_id).to_json()
            return Response(reviews, mimetype="application/json", status=200)

        except Exception as e:
            print(e)
            raise InternalServerError


class ReviewApi(Resource):
    """
    Reviews Api
    """

    def put(self, id):
        """
        Put method. Update a review with given id.
        """
        try:
            review = Review.objects.get(id=id)
            body = request.get_json()
            if (body.get('user_id') != review.user_id):
                raise InvalidUserActionError
            Review.objects.get(id=id).update(**body)
            return {'message': 'Successful update review with id ' + id}, 200
        except (InvalidUserActionError, DoesNotExist):
            raise InvalidUserActionError
        except InvalidQueryError:
            raise SchemaValidationError
        except Exception as e:
            raise InternalServerError

    def delete(self, id):
        """
        Delete method. Delete a review with given id.
        """
        try:
            review = Review.objects.get(id=id)
            body = request.get_json()
            if (body.get('user_id') != review.user_id):
                raise InvalidUserActionError
            review.delete()
            return {'message': 'Successful delete review with id ' + id}, 200
        except (InvalidUserActionError, DoesNotExist):
            raise InvalidUserActionError
        except Exception as e:
            raise InternalServerError

    def get(self, id):
        """
        Get method. Get a review with given id.
        """
        try:
            review = Review.objects.get(id=id).to_json()
            return Response(review, mimetype="application/json", status=200)
        except DoesNotExist:
            raise ReviewNotExistsError
        except Exception:
            raise InternalServerError
