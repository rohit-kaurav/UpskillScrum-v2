
import uuid
from user_management.models.user import User
''' Services available for users are :
    1. add new user 
    2. update user details
    3. get user details
    4. delete user
    5. get all user details
'''

def get_user(employee_id):
    ''' 
    Get user detail for employee using employee_id 
    '''
    try :
        user = User.objects.get(employee_id = employee_id)
    except(Exception):
        print(Exception.message)
    else:
        return user
    return None

def get_users_by_role(role):
    '''
    Get users by role
    '''
    try :
        users = User.objects(role = role)
    except(Exception):
        print(Exception.message)
    else:
        return users
    return None

def add_user(input_data):
    '''
    Add new user
    '''
    try:
        user_obj = User(name=input_data.get('name'),
                        employee_id=input_data.get('employee_id'),
                        role=input_data.get('role'),
                        dob=input_data.get('dob'),
                        phone=input_data.get('phone'),
                        email=input_data.get('email'),
                        username=input_data.get('username'),
                        password=input_data.get('password')).save()
    except(Exception):
        print(Exception.message)
    else :
        return user_obj
    return None

def update_user(input_data):
    '''
    Update user details
    '''

    try :
        if input_data.get('password'):
            is_user_updated = User.objects(employee_id = input_data.get('employee_id')).update(password = input_data.get('password'))
        else:
            is_user_updated = User.objects(employee_id = input_data.get('employee_id'))\
                                  .update(name = input_data.get('name'),
                                          username = input_data.get('username'),
                                          dob=input_data.get('dob'),
                                          phone=input_data.get('phone'),
                                          email=input_data.get('email'))
    except(Exception):
        print(Exception.message)
    else :
        return is_user_updated
    return None


def delete_user(employee_id):
    '''
    Delete user
    '''
    try :
        user_obj = User.objects(employee_id = employee_id)
        result = user_obj.delete()
    except(Exception):
        print(Exception.message)
    else:
        return result
    return None


def get_all_user():
    '''
     Get all user details
    '''
    try:
        users_list = User.objects.all()
    except(Exception):
        print(Exception.message)
    else:
        return users_list
    return None

def get_user_by_username(request,username):
    ''' 
    Get user detail for employee using username 
    '''
    try :
        user = User.objects.get(username = username)
    except(Exception):
        print(Exception.message)
    else:
        return user
    return None


def authorize_user(credentials):
    """
    Verify User and return User data.
    """
    try:
        user = User.objects.get(username=credentials.get('username'),password=credentials.get('password'))
    except(Exception):
        print(Exception.message)
    else:
        return user
    return None

def update_role(input_data):
    '''
    Update user role
    '''
    try :
        is_user_role_updated = User.objects(employee_id = input_data.get('employee_id')).update(
            role = input_data.get('role'))
    except(Exception):
        print(Exception.message)
    else :
        return is_user_role_updated
    return None
