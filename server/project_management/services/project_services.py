import logging

from project_management.models.project_models import Project
from project_management.services.activity_services import add_activity
from datetime import datetime
import uuid
import json


def get_project(project_uid):
    """
    Get a Project detail.
    """
    try:
        obj = Project.objects.get(project_uid=project_uid)
    except(Exception):
        print (Exception.message)
    else:
        return obj
    return None


def get_all_projects():
    """
    Get Details of all Projects here.
    """
    try:
        obj = Project.objects.all()
    except(Exception):
        print (Exception.message)
    else:
        return obj

def get_project_using_employee_id(employee_id):
    '''
     Get Projects assigned to member
    '''
    my_project_list = []
    my_project_uid_list = []
    try:
        project_list = Project.objects(owned_by=employee_id)
    except(Exception):
        print (Exception.message)
    else:
        for project in project_list:
            project_uid = project['project_uid']
            if project_uid not in my_project_uid_list:
                my_project_uid_list.append(project_uid)
        for project_uid in my_project_uid_list:
            project = get_project(project_uid)
            my_project_list.append(project)
        return my_project_list
    return None

def create_project(input_dict):
    """
    Add a New Project to the database here.
    """
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    actual_completion_date = None
    project_uid = str(uuid.uuid1())
    try:
        project_obj = Project(project_name=input_dict.get('project_name'), project_uid=project_uid, 
                            owned_by=input_dict.get('owned_by'),project_description=input_dict.get('project_description'), 
                            created_at=now, date_modified=now,start_date = input_dict.get('start_date'),
                            estimated_completion_date= input_dict.get('estimated_completion_date'),
                            actual_completion_date= actual_completion_date, status="New").save()
    except(Exception):
        print (Exception)
    else:
        return project_obj
    return None


def update_project(input_dict):
    """
    Editing and updating required fields of project.
    """
    date_modified = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    try:
        project_obj = Project.objects(project_uid=input_dict.get('project_uid'))\
                                    .update(project_name=input_dict.get('project_name'),
                                            project_description=input_dict.get('project_description'),
                                            start_date = input_dict.get('start_date'),
                                            date_modified=date_modified,
                                            owned_by=input_dict.get('owned_by'))
        add_activity(input_dict.get('project_uid')," modified this project.",input_dict.get('owned_by'))
    except(Exception):
        print (Exception)
    else:
        return project_obj
    return None


def delete_project(project_uid):
    """
    Deleting a Project from database here.
    """
    try:
        project_obj = Project.objects(project_uid=project_uid).delete()
    except(Exception):
        print (Exception)
    else:
        return project_obj
    return None

def update_project_status(project_uid,project_status):
    '''
    Updates project status when iteration is created
    '''
    try:
        project_obj = Project.objects(project_uid=project_uid).update(status=project_status)
    except(Exception):
        print(Exception)
    else:
        return project_obj
    return None