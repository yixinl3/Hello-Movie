"""
The module for stroing all the errors
"""


class InternalServerError(Exception):
    pass


class SchemaValidationError(Exception):
    pass


class EmailAlreadyExistsError(Exception):
    pass


class UnauthorizedError(Exception):
    pass


class UpdatingUserError(Exception):
    pass


class DeletingUserError(Exception):
    pass


class UserNotExistsError(Exception):
    pass


class ReviewsNotExistsError(Exception):
    pass


class ReviewNotExistsError(Exception):
    pass


class InvalidUserActionError(Exception):
    pass


class EmailDoesNotExistError(Exception):
    pass


errors = {
    "InternalServerError": {
        "message": "Something went wrong",
        "status": 500
    },
    "SchemaValidationError": {
        "message": "Request is missing required fields",
        "status": 400
    },
    "EmailAlreadyExistsError": {
        "message": "User with given email address already exists",
        "status": 400
    },
    "UnauthorizedError": {
        "message": "Invalid username or password",
        "status": 401
    },
    "UpdatingUserError": {
        "message": "User not exist. Cannot update",
        "status": 403
    },
    "DeletingUserError": {
        "message": "User not exist. Cannot delete",
        "status": 403
    },
    "UserNotExistsError": {
        "message": "User with given id doesn't exists",
        "status": 400
    },
    "ReviewsNotExistsError": {
        "message": "Get Reviews Fail",
        "status": 400
    },
    "ReviewNotExistsError": {
        "message": "Review with given id doesn't exists",
        "status": 400
    },
    "InvalidUserActionError": {
        "message": "Given user cannot perform this action",
        "status": 400
    },
    "EmailDoesNotExistError": {
        "message": "Given email does not exist",
        "status": 400
    },
}
