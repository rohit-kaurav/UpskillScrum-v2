from backlog_management.models.backlog import Backlog
from backlog_management.serializers.backlog_serializers import BacklogResponseSerializer
from project_management.services.project_services import get_project,update_project_status
from project_management.services.project_services import get_project
from project_management.services.activity_services import add_activity
from project_management.serializers.project_serializers import ProjectResponseSerializer
from iteration_management.services.iteration_services import update_iteration_status
from datetime import datetime
from django.utils.dateparse import parse_date
import uuid

''' 
Backlog Service has following method
1. Get backlog details
2. add backlog 
3. update backlog details
4. delete backlog
5. get all backlog details
'''


def get_backlog(backlog_uid):
    '''
    Get backlog details
    '''
    try:
        backlog_obj = Backlog.objects.get(backlog_uid=backlog_uid)
    except(Exception):
        print (Exception.message)
    else:
        return backlog_obj
    return None

def add_backlog(input_data):
    '''
    Add new backlog
    '''
    
    backlog_uid = str(uuid.uuid1())
    created_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    date_modified = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    status = "New"
    assigned_to = "Unassigned"
    iteration_uid = ""
    actual_start_date = None
    actual_end_date = None
    actual_efforts= None
    is_notified = False
    completed_at=None
    
    try:
        backlog_obj = Backlog(backlog_name =input_data.get('backlog_name'),backlog_uid= backlog_uid, project_uid=input_data.get('project_uid'),
                        iteration_uid= iteration_uid, backlog_description=input_data.get('backlog_description'), assigned_to=assigned_to,
                        created_at= created_at, date_modified=date_modified,planned_start_date=input_data.get('planned_start_date'),
                        actual_start_date = actual_start_date,planned_end_date=str(input_data.get('planned_end_date')), actual_end_date= actual_end_date,
                        estimated_efforts=input_data.get('estimated_efforts'),actual_efforts=actual_efforts, is_notified = is_notified,
                        completed_at=completed_at,status=status).save()
        project_data = ProjectResponseSerializer(get_project(input_data.get("project_uid"))).data
        add_activity(input_data.get("project_uid"),
                    " added backlog '"+input_data.get("backlog_name")+"' in this project.",
                    project_data['owned_by'])
    except(Exception):
        print(Exception.message)
    else:
        return backlog_obj
    
        

def update_backlog(input_data):
    '''
    Update Backlog
    '''
    date_modified = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    try:
        date_modified = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        if (input_data.get('status') == "Completed"):
            completed_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            is_backlog_updated = Backlog.objects(backlog_uid=input_data.get('backlog_uid')).update(
                backlog_name=input_data.get('backlog_name'), backlog_description=input_data.get('backlog_description'),
                iteration_uid=input_data.get('iteration_uid'), date_modified=date_modified, completed_at=completed_at, status=input_data.get('status'))
            
            puid = get_projectuid_by_backloguid(input_data.get('backlog_uid'))
            if project_status_should_update(puid):
                update_project_status(puid,"Completed")
        else:
            iter_uid = ""
            if(input_data.get('iteration_uid')):
                iter_uid = input_data.get('iteration_uid')
            is_backlog_updated = Backlog.objects(backlog_uid=input_data.get('backlog_uid')).update(
                backlog_name=input_data.get('backlog_name'), backlog_description=input_data.get('backlog_description'),
                iteration_uid=iter_uid, date_modified=date_modified, status=input_data.get('status'))
        if (input_data.get('iteration_uid') != ""):
            update_iteration_status(input_data.get('iteration_uid'))
        
        # backlog_data = BacklogResponseSerializer(get_backlog(input_data.get("backlog_uid"))).data
        # add_activity(backlog_data['project_uid'],
        #             " modified backlog '"+input_data['backlog_name']+"'.",
        #             backlog)
    except(Exception):
        print(Exception.message)
    else:
        return is_backlog_updated
    return None



def delete_backlog(backlog_uid):
    '''
    Delete backlog
    '''
    try:
        backlog_obj = Backlog.objects(backlog_uid=backlog_uid)
        backlog_data = BacklogResponseSerializer(get_backlog(backlog_uid)).data
        result = backlog_obj.delete()
        project_data = ProjectResponseSerializer(get_project(backlog_data['project_uid'])).data
        add_activity(backlog_data['project_uid'],
                    " deleted backlog '"+backlog_data['backlog_name']+"'.",
                    project_data['owned_by'])
    except(Exception):
        print(Exception.message)
    else:
        return result
    return None

def get_all_backlogs_by_project_uid(project_uid):
    '''
     Get all backlogs by project_uid
    '''
    try:
        backlog_list = Backlog.objects(project_uid=project_uid)
    except(Exception):
        print (Exception.message)
    else:
        return backlog_list
    return None


def get_all_backlogs_by_iteration_uid(iteration_uid):
    '''
     Get all backlogs by project_uid
    '''
    try:
        backlog_list = Backlog.objects(iteration_uid=iteration_uid)
    except(Exception):
        print (Exception.message)
    else:
        return backlog_list
    return None


def assign_member_to_backlog(input_data):
    '''
    Assign member to backog
    '''
    try:
        date_modified = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        is_member_assigned = Backlog.objects(backlog_uid=input_data.get('backlog_uid')).update(
            assigned_to=input_data.get('assigned_to'), date_modified=date_modified)
    except(Exception):
        print(Exception.message)
    else:
        return is_member_assigned
    return None


def get_project_using_employee_id(employee_id):
    '''
     Get Projects assigned to member
    '''
    my_project_list = []
    my_project_uid_list = []
    try:
        backlog_list = Backlog.objects(assigned_to=employee_id)
    except(Exception):
        print (Exception.message)
    else:
        for backlog in backlog_list:
            project_uid = backlog['project_uid']
            if project_uid not in my_project_uid_list:
                my_project_uid_list.append(project_uid)
        for project_uid in my_project_uid_list:
            project = get_project(project_uid)
            my_project_list.append(project)
        return my_project_list
    return None

def get_backlog_by_name_and_projectuid(input_data):
    '''
    Get backlog by backlog_name and project_uid
    '''
    try:
        backlog_obj = Backlog.objects(backlog_name=input_data.get('backlog_name'), project_uid=input_data.get('project_uid'))
    except(Exception):
        print(Exception)
    else:
        return backlog_obj
    return None

def get_projectuid_by_backloguid(backlog_uid):
    '''
    Returns project_uid of the backlog
    '''
    try:
        b_list = Backlog.objects(backlog_uid=backlog_uid)
    except(Exception):
        print(Exception.message)
    else:
        for backlog in b_list:
            return backlog['project_uid']
    return None

def project_status_should_update(project_uid):
    '''
    Checks All Backlogs status and returns true/false
    '''
    backlogs_list = get_all_backlogs_by_project_uid(project_uid)
    for backlog in backlogs_list:
        print ("backlog status ",backlog['status'])
        if backlog['status']!='Completed':
            return False
    return True

def update_actual_start_date(input_data):
    '''
    Update Backlog  actual start date
    '''

    date_modified = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
   
    try:
        is_actual_start_date_set = Backlog.objects(backlog_uid=input_data.get('backlog_uid')).update(
            actual_start_date = input_data.get('actual_start_date'), date_modified=date_modified)
    
    except(Exception):
        print(Exception.message)
    else:
        return is_actual_start_date_set
    return None

def update_actual_end_date(input_data):
    '''
    Update Backlog actual end date
    '''

    date_modified = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
   
    try:
         is_actual_end_date_set = Backlog.objects(backlog_uid=input_data.get('backlog_uid')).update(
            actual_end_date = input_data.get('actual_end_date'), date_modified=date_modified,status = "Completed")
    except(Exception):
        print(Exception.message)
    else:
        return is_actual_end_date_set
    return None


def update_actual_efforts(input_data):
    '''
    Update Backlog actual end date
    '''

    date_modified = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    try:
         is_actual_efforts_set = Backlog.objects(backlog_uid=input_data.get('backlog_uid')).update(
            actual_efforts = input_data.get('actual_efforts'), date_modified=date_modified)
    except(Exception):
        print(Exception.message)
    else:
        return is_actual_efforts_set
    return None

def is_assignee_notified(backlog_uid):
    '''
    Whether assignee has seen notification or not
    '''
    date_modified = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    try:
         is_assignee_notified_set = Backlog.objects(backlog_uid=backlog_uid).update(
            is_notified = True, date_modified=date_modified)
    except(Exception):
        print(Exception.message)
    else:
        return is_assignee_notified_set
    return None


