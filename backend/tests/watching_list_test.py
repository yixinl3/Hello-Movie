"""
The module for watching list unittest
"""
import unittest
import requests
import responses
from dotenv import load_dotenv, find_dotenv
import os
from os.path import join, dirname


class TestWatchingList(unittest.TestCase):
    """
    Test watchingList class
    """

    def setUp(self):
        """
        Setup. Get base url and test id
        """
        dotenv_path = join(dirname(__file__), '../.env')
        load_dotenv(dotenv_path)
        self.base_url = os.environ.get("TEST_BASE_URL")
        self.id = os.environ.get("TEST_ID")

    def test_get_watchingList(self):
        """
        Test get watchingList api call with given user id
        """
        res_check = [{'_id': {'$oid': '608270072d0b3325e4b67846'}, 'movie_id': 399566, 'user_id': '60826ffd2d0b3325e4b67845'},
                     {'_id': {'$oid': '6082700a2d0b3325e4b67847'},
                         'movie_id': 615678, 'user_id': '60826ffd2d0b3325e4b67845'},
                     {'_id': {'$oid': '6082700d2d0b3325e4b67848'}, 'movie_id': 460465, 'user_id': '60826ffd2d0b3325e4b67845'}]

        response = requests.get(
            self.base_url+'watching_user/' + self.id)
        self.assertEqual(res_check, response.json())
        self.assertEqual(200, response.status_code)

    def test_add_delete_MovieToWatchingList_valid(self):
        """
        Test add and delete a movie to a user's watching list valid
        """
        data = {
            "movie_id": "2",
            "user_id": self.id,
        }
        url1 = self.base_url + "watchingLists"
        response1 = requests.post(url=url1, json=data)
        self.assertEqual('Successful add a new watching list item',
                         response1.json()['message'])
        self.assertEqual(200, response1.status_code)

        id = response1.json()['id']
        data2 = {
            "user_id": self.id
        }
        url2 = self.base_url + "watchingListItem/" + id
        response2 = requests.delete(url=url2, json=data2)
        self.assertEqual('Successful delete watchingListItem with id ' +
                         id, response2.json()['message'])
        self.assertEqual(200, response2.status_code)

    def test_add_delete_MovieToWatchingList_invalid(self):
        """
        Test add and delete a movie to a user's watching list invalid. Invalid delete, delete by a different user
        """
        data = {
            "movie_id": "2",
            "user_id": self.id,
        }
        url1 = self.base_url + "watchingLists"
        response1 = requests.post(url=url1, json=data)
        self.assertEqual('Successful add a new watching list item',
                         response1.json()['message'])
        self.assertEqual(200, response1.status_code)

        id = response1.json()['id']
        # invalid delete
        data2 = {
            "user_id": "6066e384e3b44ae7b0okfcc7"
        }
        url2 = self.base_url + "watchingListItem/" + id
        response2 = requests.delete(url=url2, json=data2)
        self.assertEqual('Given user cannot perform this action',
                         response2.json()['message'])
        self.assertEqual(400, response2.status_code)

        # Valid deleted, with the correct user
        data3 = {
            "user_id": self.id
        }
        url2 = self.base_url + "watchingListItem/" + id
        response3 = requests.delete(url=url2, json=data3)
        self.assertEqual('Successful delete watchingListItem with id ' +
                         id, response3.json()['message'])
        self.assertEqual(200, response3.status_code)


if __name__ == '__main__':
    unittest.main()
