import logging

from iteration_management.models.iteration_models import Iteration
from iteration_management.serializers.iteration_serializers import IterationSerializer
from project_management.services.project_services import update_project_status,add_activity,get_project
from project_management.serializers.project_serializers import ProjectResponseSerializer
from datetime import datetime
import uuid
import json

LOGGER = logging.getLogger(__name__)


def get_iteration_by_name_and_projectuid(request, input_data):
    """
    Get a Iteration detail.
    """
    try:
        obj = Iteration.objects(iteration_name=input_data.get('iteration_name'), project_uid=input_data.get('project_uid'))
    except(Exception):
        print (Exception.message)
    else:
        return obj
    return None

def get_all_iterations():
    """
    Get Details of all iterations here.
    """
    try:
        obj = Iteration.objects.all()
    except(Exception):
        print (Exception.message)
    else:
        return obj
    return None


def create_iteration(input_dict):
    """
    Add a New iteration to the database here.
    """
    now = datetime.now().isoformat()
    iteration_uid = str(uuid.uuid1())
    completed_at = ""
    try:
        iteration_obj = Iteration(iteration_uid,input_dict.get('project_uid'),input_dict.get('iteration_name'),
                                input_dict.get('iteration_description'),now,now,completed_at,"New").save()
        update_project_status(input_dict.get('project_uid'),"In Progress")
        project_data = ProjectResponseSerializer(get_project(input_dict.get("project_uid"))).data
        add_activity(input_dict.get("project_uid"),
                    " added an iteration '"+input_dict.get("iteration_name")+"'.",
                    project_data['owned_by'])
    except(Exception):
        print (Exception.message)
    else:
        return iteration_obj
    return None

def update_iteration(input_dict):
    """
    Editing and updating required fields of iteration.
    """
    date_modified = datetime.now().isoformat()
    try:
        if (input_dict.get('status') == "Completed"):
            completed_at = datetime.now().isoformat()
            iteration_obj = Iteration.objects(iteration_uid=input_dict.get('iteration_uid')).update(
            iteration_name=input_dict.get('iteration_name'),iteration_description=input_dict.get('iteration_description'),
            date_modified=date_modified,completed_at= completed_at,status= input_dict.get('status'))
        
        elif (input_dict.get('status') == "Hold"):
            completed_at = datetime.now().isoformat()
            iteration_obj = Iteration.objects(iteration_uid=input_dict.get('iteration_uid')).update(
            iteration_name=input_dict.get('iteration_name'),iteration_description=input_dict.get('iteration_description'),
            date_modified=date_modified,completed_at= completed_at,status= input_dict.get('status'))
        
        else :
            iteration_obj = Iteration.objects(iteration_uid=input_dict.get('iteration_uid')).update(
            iteration_name=input_dict.get('iteration_name'),iteration_description=input_dict.get('iteration_description'),
            date_modified=date_modified,status= "In Progress")

        iteration_data = IterationSerializer(get_iteration_by_iteration_uid(input_dict.get('iteration_uid'))).data
        project_data = ProjectResponseSerializer(get_project(iteration_data['project_uid'])).data
        add_activity(iteration_data['project_uid'],
                    " modified iteration '"+input_dict.get("iteration_name")+"'.",
                    project_data['owned_by'])
    except(Exception):
        print (Exception.message)
    else:
        return iteration_obj
    return None

def delete_iteration(iteration_uid):
    """
    Deleting a Iteration from database here.
    """
    try:
        iteration_obj = Iteration.objects(iteration_uid=iteration_uid)
        iteration_data = IterationSerializer(get_iteration_by_iteration_uid(iteration_uid)).data
        iteration_obj = iteration_obj.delete()
        project_data = ProjectResponseSerializer(get_project(iteration_data['project_uid'])).data
        add_activity(iteration_data['project_uid'],
                    " deleted iteration '"+iteration_data['iteration_name']+"'.",
                    project_data['owned_by'])
    except(Exception):
        print (Exception.message)
    else:
        return iteration_obj
    return None

def get_iteration_by_project_uid(project_uid):
    """
    Fetching Iteration data using 'project_uid'
    """
    try:
        iteration_obj = Iteration.objects(project_uid= project_uid)
    except(Exception):
        print (Exception.message)
    else:
        return iteration_obj
    return None

def get_iteration_by_iteration_uid(iteration_uid):
    """
    Fetching Iteration data using 'iteration_uid'
    """ 
    try:
        iteration_obj = Iteration.objects.get(iteration_uid= iteration_uid)
    except(Exception):
        print (Exception.message)
    else:
        return iteration_obj
    return None

def update_iteration_status(iteration_uid):
    """
    Updates Iteration status='In Progress' when backlog is added to it
    """
    try:
        iteration_obj = Iteration.objects(iteration_uid=iteration_uid).update(status="In Progress")
    except(Exception):
        print(Exception)
    else:
        return iteration_obj
    return None
