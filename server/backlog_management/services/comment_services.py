from backlog_management.models.backlog import Backlog,Comment
from backlog_management.services.backlog_services import get_backlog
from backlog_management.serializers.backlog_serializers import BacklogResponseSerializer
from backlog_management.serializers.comment_serializers import CommentSerializer
from project_management.services.activity_services import add_activity
from datetime import datetime
import uuid

''' 
Comment Service has following method
1. Get comment details
2. add comment 
3. update comment details
4. delete comment
5. get all comment details
'''	
def add_comment(input_data):
    '''
    Add comment to particular backlog
    '''

    comment_uid = str(uuid.uuid1())
    created_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    comment = Comment(comment_uid = comment_uid,content = input_data.get("content"), author = input_data.get("author"),created_at = created_at)
    
    try:
        backlog_obj = Backlog.objects.get(backlog_uid=input_data.get("backlog_uid"))
        backlog_obj.comments.append(comment)
        backlog = backlog_obj.save()
        backlog_data = BacklogResponseSerializer(get_backlog(input_data.get('backlog_uid'))).data
        add_activity(backlog_data['project_uid'],
                    " added comment '"+input_data.get("content")+"' in backlog '"+backlog_data['backlog_name']+"'.",
                    input_data.get('author'))
    except(Exception):
        print(Exception.message)
    else:
        for comment in backlog['comments']:
            if comment['comment_uid'] == comment_uid:
                return comment
    return None

def update_comment(input_data):
    '''
    Update Comments data
    ''' 
    try:
        backlog = Backlog.objects.filter(backlog_uid=input_data.get('backlog_uid'),comments__comment_uid=input_data.get('comment_uid')).update(set__comments__S__content= input_data.get('content'))
    except(Exception):
        print(Exception.message)
    else:
        return backlog
    return None

def get_comments(backlog_uid):
    '''
    Get comments using backlog uid 
    '''
    try :
        backlog = Backlog.objects.get(backlog_uid= backlog_uid)
    except(Exception):
        print (Exception.message)
    else:
        return backlog['comments']
    return None

def get_comment(comment_uid):
    '''
    Get comment using comment_uid
    '''
    try:
        backlog = Backlog.objects.get(comments__comment_uid=comment_uid)
    except(Exception):
        print(Exception.message)
    else:
        for comment in backlog['comments']:
            if comment['comment_uid'] == comment_uid:
                return comment
    return None



def delete_comment(comment_uid):
    '''
    Delete comment using comment_uid
    '''
    try:
        backlog = Backlog.objects.get(comments__comment_uid=comment_uid)
        comment_data = CommentSerializer(get_comment(comment_uid)).data
        backlog_data = BacklogResponseSerializer(backlog).data
        result = backlog.update(pull__comments__comment_uid=comment_uid)
        add_activity(backlog_data['project_uid'],
                    " deleted comment '"+comment_data['content']+"' in backlog '"+backlog_data['backlog_name']+"'.",
                    comment_data['author'])     
    except(Exception):
        print(Exception.message)
    else:
        return True
    return None