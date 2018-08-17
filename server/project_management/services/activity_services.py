from project_management.models.project_models import Project,Activity
from datetime import datetime
import uuid

''' 
Activity Service has following method
1. Get activity details
2. add activity 
3. update activity details
4. delete activity
5. get all activity details
'''	
def add_activity(project_uid,message,author):
    '''
    Add activity to particular project
    '''
    print "reaching add"
    activity_uid = str(uuid.uuid1())
    created_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    activity = Activity(activity_uid = activity_uid,content = message, author = author,created_at = created_at)
    
    try:
        project_obj = Project.objects.get(project_uid=project_uid)
        project_obj.activity.append(activity)
        project = project_obj.save()
    except(Exception):
        print(Exception.message)
    else:
        for act in project['activity']:
            if act['activity_uid'] == activity_uid:
                return act
    return None


def update_activity(input_data):
    '''
    Update activity data
    ''' 
    try:
        project = Project.objects.filter(project_uid=input_data.get('project_uid'),activity__activity_uid=input_data.get('activity_uid')).update(set__activity__S__content= input_data.get('content'))
    except(Exception):
        print(Exception.message)
    else:
        return project
    return None



def get_activities(project_uid):
    '''
    Get activities using activity uid 
    '''
    try :
        project = Project.objects.get(project_uid= project_uid)
    except(Exception):
        print (Exception.message)
    else:
        return project['activity']
    return None

def get_activity(activity_uid):
    '''
    Get activity using activity_uid
    '''
    try:
        project = Project.objects.get(activity__activity_uid=activity_uid)
    except(Exception):
        print(Exception.message)
    else:
        for act in project['activity']:
            if act['activity_uid'] == activity_uid:
                return act
    return None



def delete_activity(activity_uid):
    '''
    Delete activity using activity_uid
    '''
    try:
        project = Project.objects.get(activity__activity_uid=activity_uid)
        result = project.update(pull__activity__activity_uid=activity_uid) 
    except(Exception):
        print(Exception.message)
    else:
        return True
    return None


