# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase
from user_management.services.user_services import *


# Create your tests here.

class UserTestCase(TestCase):

    def test_add_user(self):
        '''
        Test to create new user
        '''
        data = {
                    "name" : "Alice",
                    "employee_id" : "100100",
                    "username" : "alice",
                    "password" : "alice",
                    "role" : "engineer",
                    "dob" : "1990-01-20",
                    "phone" : "9876543210",
                    "email" : "alice@abc.com"
                    }
        user = add_user(data)
        self.assertIsNotNone(user)


    def test_get_user(self):
        '''
        Test to get user details
        '''
        data = {
                    "name" : "Alice",
                    "employee_id" : "100101",
                    "username" : "alice",
                    "password" : "alice",
                    "role" : "engineer",
                    "dob" : "1990-01-20",
                    "phone" : "9876543210",
                    "email" : "alice@abc.com"
                    }
        user_obj = add_user(data)
        employee_id = user_obj['employee_id']
        user = get_user(employee_id)
        self.assertEquals(employee_id,user['employee_id'])
    
    def test_update_user(self):
        '''
        Test to update user details
        '''
        data = {    "name" : "Alice",
                    "employee_id" : "100100",
                    "username" : "alice",
                    "password" : "alice",
                    "role" : "engineer",
                    "dob" : "1990-01-20",
                    "phone" : "9876543210",
                    "email" : "alice@abc.com"
                    }
        user_obj = add_user(data)
        employee_id = user_obj['employee_id']
        updated_data = {
                    "employee_id" : employee_id,
                    "role" : "Manager"
        }
        self.assertIsNotNone(update_user(updated_data))


    def test_delete_user(self):
        '''
        Test to delete user details
        '''
        data = {
                    "name" : "Alice",
                    "employee_id" : "100100",
                    "username" : "alice",
                    "password" : "alice",
                    "role" : "engineer",
                    "dob" : "1990-01-20",
                    "phone" : "9876543210",
                    "email" : "alice@abc.com"
                    }
        user_obj = add_user(data)
        employee_id = user_obj['employee_id']
        self.assertIsNotNone(delete_user(employee_id))

    def test_get_all_user(self):
        '''
        Test to get all user present
        '''
        data_1 = {
                    "name" : "Alice",
                    "employee_id" : "100100",
                    "username" : "alice",
                    "password" : "alice",
                    "role" : "engineer",
                    "dob" : "1990-01-20",
                    "phone" : "9876543210",
                    "email" : "alice@abc.com"
                    }
        data_2 = {
                    "name" : "Bob",
                    "employee_id" : "100200",
                    "username" : "bob",
                    "password" : "bob",
                    "role" : "manager",
                    "dob" : "1990-01-20",
                    "phone" : "9812122210",
                    "email" : "bob@abc.com"
                    }
        add_user(data_1)
        add_user(data_2)
        test_users = get_all_user()
        test_users_name_list = []
        for test_user in test_users:
            test_users_name_list.append(test_user['username'])
        self.assertEquals(data_1['username'],test_users_name_list[0])
        self.assertEquals(data_2['username'],test_users_name_list[1])
   
        

        
