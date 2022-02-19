"""
The module for routes implementation
"""
from .auth import SignupApi, LoginApi, UserApi
from .review import ReviewApi,ReviewsApi,ReviewWithMovieApi
from .watchingList import WatchingListItemApi, WatchingListsApi, WatchingListWithUserApi
from .friends import FriendsApi, FriendsWithUserApi, FriendApi

def create_routes(api):
    """
    Create routes with corresponding Api
    """
    api.add_resource(SignupApi, '/api/auth/signup')
    api.add_resource(LoginApi, '/api/auth/login')
    api.add_resource(UserApi, '/api/auth/user/<id>')

    api.add_resource(ReviewsApi, '/api/reviews')
    api.add_resource(ReviewApi, '/api/review/<id>')
    api.add_resource(ReviewWithMovieApi, '/api/movie_reviews/<movie_id>')


    api.add_resource(WatchingListsApi, '/api/watchingLists')
    api.add_resource(WatchingListItemApi, '/api/watchingListItem/<id>')
    api.add_resource(WatchingListWithUserApi, '/api/watching_user/<user_id>')

    api.add_resource(FriendsApi, '/api/friends')
    api.add_resource(FriendApi, '/api/friend/<id>')
    api.add_resource(FriendsWithUserApi, '/api/friend_user/<user_id>')