# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase
from backlog_management.services.backlog_services import *
from backlog_management.services.comment_services import *
from rest_framework.response import Response

# Create your tests here.

class BacklogTestCase(TestCase):

    def test_add_backlog(self):
        '''
        Test to create new Backlog
        '''
        
        test_project_uid = str(uuid.uuid1())
        test_planned_start_date = datetime.now().strftime("%Y-%m-%d")
        test_planned_end_date = datetime.now().strftime("%Y-%m-%d")

        my_data = {
                    "backlog_name" : "backlog1",
                    "backlog_description" : "This is test backlog",
                    "project_uid" : test_project_uid,
                    "planned_start_date" : test_planned_start_date, 
                    "planned_end_date" : test_planned_end_date,
                    "actual_efforts" : "30"
                    }
        backlog_obj = add_backlog(my_data)
        self.assertIsNotNone(backlog_obj)


    def test_get_backlog(self):
        '''
        Test to get Backlog details
        '''
        
        test_project_uid = str(uuid.uuid1())
        test_planned_start_date = datetime.now().strftime("%Y-%m-%d")
        test_planned_end_date = datetime.now().strftime("%Y-%m-%d")

        data = {
                    "backlog_name" : "backlog1",
                    "backlog_description" : "This is test backlog",
                    "project_uid" : test_project_uid,
                    "planned_start_date" : test_planned_start_date, 
                    "planned_end_date" : test_planned_end_date,
                    "actual_efforts" : "30"
                    }
        backlog_obj = add_backlog(data)
        backlog_uid = backlog_obj['backlog_uid']
        backlog = get_backlog(backlog_uid)
        self.assertEquals(backlog_uid,backlog['backlog_uid'])
    
    def test_update_backlog(self):
        '''
        Test to update Backlog details
        '''
        
        test_project_uid = str(uuid.uuid1())
        test_planned_start_date = datetime.now().strftime("%Y-%m-%d")
        test_planned_end_date = datetime.now().strftime("%Y-%m-%d")

        data = {
                    "backlog_name" : "backlog1",
                    "backlog_description" : "This is test backlog",
                    "project_uid" : test_project_uid,
                    "planned_start_date" : test_planned_start_date, 
                    "planned_end_date" : test_planned_end_date,
                    "actual_efforts" : "30"
                    }
        backlog_obj = add_backlog(data)
        backlog_uid = backlog_obj['backlog_uid']
        updated_data = {
                    "backlog_uid" : backlog_uid,
                    "backlog_description" : "Updating test backlog"
        }
        self.assertIsNotNone(update_backlog(updated_data))


    def test_delete_backlog(self):
        '''
        Test to delete Backlog details
        '''
        
        test_project_uid = str(uuid.uuid1())
        test_planned_start_date = datetime.now().strftime("%Y-%m-%d")
        test_planned_end_date = datetime.now().strftime("%Y-%m-%d")

        data = {
                    "backlog_name" : "backlog1",
                    "backlog_description" : "This is test backlog",
                    "project_uid" : test_project_uid,
                    "planned_start_date" : test_planned_start_date, 
                    "planned_end_date" : test_planned_end_date,
                    "actual_efforts" : "30"
                    }
        backlog_obj = add_backlog(data)
        backlog_uid = backlog_obj['backlog_uid']
        self.assertIsNotNone(delete_backlog(backlog_uid))

    def test_get_all_backlog(self):
        '''
        Test to get all Backlog present in a project
        '''
        
        test_project_uid = str(uuid.uuid1())
        test_planned_start_date = datetime.now().strftime("%Y-%m-%d")
        test_planned_end_date = datetime.now().strftime("%Y-%m-%d")

        data_1 = {
                    "backlog_name" : "backlog_1",
                    "backlog_description" : "This is test backlog_1",
                    "project_uid" : test_project_uid,
                    "planned_start_date" : test_planned_start_date, 
                    "planned_end_date" : test_planned_end_date,
                    "actual_efforts" : "30"
                    }
        data_2 = {
                    "backlog_name" : "backlog_2",
                    "backlog_description" : "This is test backlog_2",
                    "project_uid" : test_project_uid,
                    "planned_start_date" : test_planned_start_date, 
                    "planned_end_date" : test_planned_end_date,
                    "actual_efforts" : "30"
                    }
        add_backlog(data_1)
        add_backlog(data_2)
        test_backlogs = get_all_backlogs_by_project_uid(test_project_uid)
        test_backlog_name_list = []
        for test_backlog in test_backlogs:
            test_backlog_name_list.append(test_backlog['backlog_name'])
        self.assertEquals(data_1['backlog_name'],test_backlog_name_list[0])
        self.assertEquals(data_2['backlog_name'],test_backlog_name_list[1])
   
        

        
