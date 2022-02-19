"""
The module for friend unittest
"""
import unittest
import requests
import responses
from dotenv import load_dotenv, find_dotenv
import os
from os.path import join, dirname


class TestFriends(unittest.TestCase):
    """
    Test friends class
    """

    def setUp(self):
        """
        Setup. Get base url and test id
        """
        dotenv_path = join(dirname(__file__), '../.env')
        load_dotenv(dotenv_path)
        self.base_url = os.environ.get("TEST_BASE_URL")
        self.id = os.environ.get("TEST_ID")

    def test_get_friends(self):
        """
        Test get friends api call with given user id
        """
        res_check = [{'_id': {'$oid': '608274812d0b3325e4b67851'}, 'cur_id': '60826ffd2d0b3325e4b67845', 'friend_id': '6066e384e3b44ae7b0bbfcc6'}, {
            '_id': {'$oid': '6082748a2d0b3325e4b67852'}, 'cur_id': '60826ffd2d0b3325e4b67845', 'friend_id': '607dbce9908f0418d55874a7'}]

        response = requests.get(
            self.base_url+'friend_user/' + self.id)
        self.assertEqual(res_check, response.json())
        self.assertEqual(200, response.status_code)

    def test_add_delete_friend_valid(self):
        """
        Test add and delete a friend to a user valid
        """
        data = {
            "friend_email": "frank@gmail.com",
            "cur_id": self.id,
        }
        url1 = self.base_url + "friends"
        response1 = requests.post(url=url1, json=data)
        self.assertEqual('Successful add a new friend',
                         response1.json()['message'])
        self.assertEqual(200, response1.status_code)

        id = response1.json()['id']
        data2 = {
            "user_id": self.id
        }
        url2 = self.base_url + "friend/" + id
        response2 = requests.delete(url=url2, json=data2)
        self.assertEqual('Successful delete friend with id ' +
                         id, response2.json()['message'])
        self.assertEqual(200, response2.status_code)

    def test_add_delete_friend_invalid(self):
        """
        Test add and delete a friend to a user invalid
        """
        # invalid email post
        data = {
            "friend_email": "frasfadsgwe@gmail.com",
            "cur_id": self.id,
        }
        url1 = self.base_url + "friends"
        response = requests.post(url=url1, json=data)
        self.assertEqual('Given email does not exist',
                         response.json()['message'])
        self.assertEqual(400, response.status_code)

        # valid post
        data1 = {
            "friend_email": "frank@gmail.com",
            "cur_id": self.id,
        }
        response1 = requests.post(url=url1, json=data1)
        self.assertEqual('Successful add a new friend',
                         response1.json()['message'])
        self.assertEqual(200, response1.status_code)

        id = response1.json()['id']

        # invalid delete
        data2 = {
            "user_id": "6066e384e3b44ae7b0okfcc7"
        }
        url2 = self.base_url + "friend/" + id
        response2 = requests.delete(url=url2, json=data2)
        self.assertEqual('Given user cannot perform this action',
                         response2.json()['message'])
        self.assertEqual(400, response2.status_code)

        # Valid deleted, with the correct user
        data3 = {
            "user_id": self.id
        }

        response3 = requests.delete(url=url2, json=data3)
        self.assertEqual('Successful delete friend with id ' +
                         id, response3.json()['message'])
        self.assertEqual(200, response3.status_code)


if __name__ == '__main__':
    unittest.main()
