"""
The module for user auth unittest
"""
import unittest
import requests
import responses
from dotenv import load_dotenv, find_dotenv
import os
from os.path import join, dirname


class TestAuth(unittest.TestCase):
    """
    Test auth class
    """
    def setUp(self):
        """
        Setup. Get base url and test id
        """
        dotenv_path = join(dirname(__file__), '../.env')
        load_dotenv(dotenv_path)
        self.base_url = os.environ.get("AUTH_URL")
        self.id = os.environ.get("AUTH_TEST_ID")

    def test_get_user_valid(self):
        """
        Test valid get user api call
        """
        res_check = {
            "_id": {
                "$oid": "6066e384e3b44ae7b0bbfcc6"
            },
            "name": "sam",
            "email": "yixinl3@illinois.edu",
            "password": "$2b$12$M8dWyO1Fclh6C0LyrSgg.OclIv8BqUAIz5Uf9Of7Odvvr2MyMx1sm"
        }

        response = requests.get(
            self.base_url+'user/' + self.id)
        self.assertEqual(res_check, response.json())
        self.assertEqual(200, response.status_code)

    def test_get_user_invalid(self):
        """
        Test invalid get user api call
        """
        res_check = {
            'message': "User with given id doesn't exists",
            'status': 400
        }

        response = requests.get(
            self.base_url+'user/6066c49cb28df30b23e034b3')
        # print(response.json())
        self.assertEqual(res_check, response.json())
        self.assertEqual(400, response.status_code)

    def test_signup_valid(self):
        """
        Test valid signup api call
        """

        data = {"name": "TestUser",
                "email": "test@illinois.edu",
                "password": "test123"
                }
        url1 = self.base_url + "signup"
        response1 = requests.post(url=url1, json=data)
        # print(response1.json())
        self.assertEqual('Successful Signup', response1.json()['message'])
        self.assertEqual(200, response1.status_code)

        id = response1.json()['id']
        url2 = self.base_url + "user/" + id
        response2 = requests.delete(url=url2)
        # print(response2.json())
        self.assertEqual('Successful delete user with id ' +
                         id, response2.json()['message'])
        self.assertEqual(200, response2.status_code)

    def test_signup_invalid(self):
        """
        Test invalid signup api call
        """
        res_check = {
            'message': 'User with given email address already exists', 'status': 400}
        data = {"name": "TestUser",
                "email": "yixinl3@illinois.edu",
                "password": "test123"
                }
        url1 = self.base_url + "signup"
        response1 = requests.post(url=url1, json=data)
        # print(response1.json())
        self.assertEqual(res_check, response1.json())
        self.assertEqual(400, response1.status_code)

    def test_login_valid(self):
        """
        Test valid login api call
        """
        data = {
            "email": "yixinl3@illinois.edu",
            "password": "123456"
        }
        url1 = self.base_url + "login"
        response = requests.post(url=url1, json=data)
        # print(response.json())
        self.assertEqual('Successful Login', response.json()['message'])
        self.assertEqual(200, response.status_code)

    def test_login_email_invalid(self):
        """
        Test invalid login api call, email not correct
        """
        res_check = {'message': 'Invalid username or password', 'status': 401}
        data = {
            "email": "yixinl4@illinois.edu",
            "password": "123456"
        }
        url1 = self.base_url + "login"
        response = requests.post(url=url1, json=data)
        # print(response.json())
        self.assertEqual(res_check, response.json())
        self.assertEqual(401, response.status_code)

    def test_login_password_invalid(self):
        """
        Test invalid login api call, password not correct
        """
        res_check = {'message': 'Invalid username or password', 'status': 401}
        data = {
            "email": "yixinl3@illinois.edu",
            "password": "1234567"
        }
        url1 = self.base_url + "login"
        response = requests.post(url=url1, json=data)
        # print(response.json())
        self.assertEqual(res_check, response.json())
        self.assertEqual(401, response.status_code)

    def test_update_user_valid(self):
        """
        Test valid update user api call
        """
        # Create new user
        data = {
            "name": "TestUser",
            "email": "test@illinois.edu",
            "password": "test123"
        }
        url1 = self.base_url + "signup"
        response1 = requests.post(url=url1, json=data)
        # print(response1.json())
        self.assertEqual('Successful Signup', response1.json()['message'])
        self.assertEqual(200, response1.status_code)

        id = response1.json()['id']

        # Update user information, change name and password
        url2 = self.base_url + "user/" + id
        data1 = {
            "name": "TestUserUpdate",
            "email": "test@illinois.edu",
            "password": "test124"
        }
        response2 = requests.put(url=url2, json=data1)
        # print(response1.json())
        self.assertEqual('Successful update user with id ' +
                         id, response2.json()['message'])
        self.assertEqual(200, response2.status_code)

        # Get user to check if info is correct
        response3 = requests.get(
            url2)
        self.assertEqual("TestUserUpdate", response3.json()['name'])
        self.assertEqual(200, response3.status_code)

        # Can successfully login with new password
        data2 = {
            "email": "test@illinois.edu",
            "password": "test124"
        }
        url3 = self.base_url + "login"
        response4 = requests.post(url=url3, json=data2)
        # print(response.json())
        self.assertEqual('Successful Login', response4.json()['message'])
        self.assertEqual(200, response4.status_code)

        # Delete test user
        response5 = requests.delete(url=url2)
        # print(response2.json())
        self.assertEqual('Successful delete user with id ' +
                         id, response5.json()['message'])
        self.assertEqual(200, response5.status_code)

if __name__ == '__main__':
    unittest.main()
