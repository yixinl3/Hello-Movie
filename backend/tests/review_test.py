"""
The module for review unittest
"""
import unittest
import requests
import responses
from dotenv import load_dotenv, find_dotenv
import os
from os.path import join, dirname


class TestReview(unittest.TestCase):
    """
    Test review class
    """

    def setUp(self):
        """
        Setup. Get base url and test id
        """
        dotenv_path = join(dirname(__file__), '../.env')
        load_dotenv(dotenv_path)
        self.base_url = os.environ.get("REVIEW_URL")
        self.id = os.environ.get("REVIEW_TEST_ID")

    def test_get_review_valid(self):
        """
        Test valid get reviews api call
        """
        res_check = {
            "_id": {
                "$oid": "607d58749a1fa7171151a3a0"
            },
            "movie_id": 1,
            "like": True,
            "content": "heyhey!!",
            "user_id": "6066e384e3b44ae7b0bbfcc6",
            "user_name": "sam"
        }

        response = requests.get(
            self.base_url+'review/' + self.id)
        self.assertEqual(res_check, response.json())
        self.assertEqual(200, response.status_code)

    def test_get_review_invalid(self):
        """
        Test invalid get reviews api call
        """
        res_check = {
            'message': "Review with given id doesn't exists", 'status': 400}
        response = requests.get(
            self.base_url+'review/' + '607d58749a1fa7171151a3a1')
        # print(response.json())
        self.assertEqual(res_check, response.json())
        self.assertEqual(400, response.status_code)

    def test_post_delete_review_valid(self):
        """
        Test valid post and delete reviews api call
        """
        # Create new review
        data = {
            "movie_id": "2",
            "like": True,
            "content": "new review",
            "user_id": "6066e384e3b44ae7b0bbfcc6",
            "user_name": "sam"
        }
        url1 = self.base_url + "reviews"
        response1 = requests.post(url=url1, json=data)
        # print(response1.json())
        self.assertEqual('Successful post a new review',
                         response1.json()['message'])
        self.assertEqual(200, response1.status_code)

        id = response1.json()['id']
        data2 = {
            "user_id": "6066e384e3b44ae7b0bbfcc6"
        }
        url2 = self.base_url + "review/" + id
        response2 = requests.delete(url=url2, json=data2)
        # print(response2.json())
        self.assertEqual('Successful delete review with id ' +
                         id, response2.json()['message'])
        self.assertEqual(200, response2.status_code)

    def test_post_delete_review_invalid(self):
        """
        Test invalid post and delete reviews api call
        """
        # Create new review
        data = {
            "movie_id": "2",
            "like": True,
            "content": "new review",
            "user_id": "6066e384e3b44ae7b0bbfcc6",
            "user_name": "sam"
        }
        url1 = self.base_url + "reviews"
        response1 = requests.post(url=url1, json=data)

        self.assertEqual('Successful post a new review',
                         response1.json()['message'])
        self.assertEqual(200, response1.status_code)

        id = response1.json()['id']

        # Invalid delete. Because review can only be deleted by its creator
        data2 = {
            "user_id": "6066e384e3b44ae7b0bbfcc7"
        }
        url2 = self.base_url + "review/" + id
        response2 = requests.delete(url=url2, json=data2)
        self.assertEqual('Given user cannot perform this action',
                         response2.json()['message'])
        self.assertEqual(400, response2.status_code)

        # Valid deleted, with the correct user
        data3 = {
            "user_id": "6066e384e3b44ae7b0bbfcc6"
        }
        url2 = self.base_url + "review/" + id
        response3 = requests.delete(url=url2, json=data3)
        self.assertEqual('Successful delete review with id ' +
                         id, response3.json()['message'])
        self.assertEqual(200, response3.status_code)

    def test_get_reviewWithMovieID_valid(self):
        """
        Test valid get reviews with movie id api call
        """
        res_check = [{
            "_id": {
                "$oid": "607d58749a1fa7171151a3a0"
            },
            "movie_id": 1,
            "like": True,
            "content": "heyhey!!",
            "user_id": "6066e384e3b44ae7b0bbfcc6",
            "user_name": "sam"
        }]

        response = requests.get(
            self.base_url+'movie_reviews/1')
        self.assertEqual(res_check, response.json())
        self.assertEqual(200, response.status_code)

    def test_review_put_valid(self):
        """
        Test put review api call valid
        """
        # Create new review
        data = {
            "movie_id": "2",
            "like": True,
            "content": "new review",
            "user_id": "6066e384e3b44ae7b0bbfcc6",
            "user_name": "sam"
        }
        url1 = self.base_url + "reviews"
        response1 = requests.post(url=url1, json=data)
        self.assertEqual('Successful post a new review',
                         response1.json()['message'])
        self.assertEqual(200, response1.status_code)

        # Update review information
        id = response1.json()['id']
        url2 = self.base_url + "review/" + id
        data3 = {
            "movie_id": "2",
            "like": True,
            "content": "new review put",
            "user_id": "6066e384e3b44ae7b0bbfcc6",
            "user_name": "sam"
        }
        response3 = requests.put(url=url2, json=data3)
        self.assertEqual('Successful update review with id ' + id,
                         response3.json()['message'])
        self.assertEqual(200, response3.status_code)

        # Check put success
        res_check = {
            "_id": {
                "$oid": id
            },
            "movie_id": 2,
            "like": True,
            "content": "new review put",
            "user_id": "6066e384e3b44ae7b0bbfcc6",
            "user_name": "sam"
        }
        response4 = requests.get(
            self.base_url+'review/' + id)
        self.assertEqual(res_check, response4.json())
        self.assertEqual(200, response4.status_code)

        # Delete new review
        data2 = {
            "user_id": "6066e384e3b44ae7b0bbfcc6"
        }

        response2 = requests.delete(url=url2, json=data2)
        self.assertEqual('Successful delete review with id ' +
                         id, response2.json()['message'])
        self.assertEqual(200, response2.status_code)

    def test_review_put_invalid(self):
        """
        Test put review api call
        """
        # Create new review
        data = {
            "movie_id": "2",
            "like": True,
            "content": "new review",
            "user_id": "6066e384e3b44ae7b0bbfcc6",
            "user_name": "sam"
        }
        url1 = self.base_url + "reviews"
        response1 = requests.post(url=url1, json=data)
        self.assertEqual('Successful post a new review',
                         response1.json()['message'])
        self.assertEqual(200, response1.status_code)
        # Invalid put request, user_id not valid
        id = response1.json()['id']
        url2 = self.base_url + "review/" + id
        data3 = {
            "movie_id": "2",
            "like": True,
            "content": "new review put",
            "user_id": "6066e384e3b44ae7b0bbfcc7",
            "user_name": "sam"
        }
        response3 = requests.put(url=url2, json=data3)
        self.assertEqual('Given user cannot perform this action',
                         response3.json()['message'])
        self.assertEqual(400, response3.status_code)

        # Delete new review
        data2 = {
            "user_id": "6066e384e3b44ae7b0bbfcc6"
        }

        response2 = requests.delete(url=url2, json=data2)
        self.assertEqual('Successful delete review with id ' +
                         id, response2.json()['message'])
        self.assertEqual(200, response2.status_code)


if __name__ == '__main__':
    unittest.main()
