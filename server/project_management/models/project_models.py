from mongoengine import DynamicDocument, fields, EmbeddedDocument,EmbeddedDocumentField
import json

class Activity(EmbeddedDocument):
    '''Activity model with following attribute
        activity_uid = String
        content = String
        author = String
        created_at = DateTime

    '''
    activity_uid = fields.StringField()
    content = fields.StringField()
    author = fields.StringField()
    created_at = fields.DateTimeField()


class Project(DynamicDocument):

    '''
    Project model with following attributes
    project_name = String
    project_uid = String
    owned_by = String
    project_description = String
    created_at = DateTime
    date_modified = DateTime
    start_date = Date
    estimated_completion_date = Date
    actual_completion_date = Date
    status = String
    activity_timeline = Activity
        
    '''
    
    project_name = fields.StringField()
    project_uid = fields.StringField()
    owned_by = fields.StringField()
    project_description = fields.StringField()
    created_at = fields.DateTimeField()
    date_modified = fields.DateTimeField()
    start_date = fields.DateTimeField()
    estimated_completion_date = fields.DateTimeField()
    actual_completion_date = fields.DateTimeField()
    status = fields.StringField()
    activity = fields.ListField(EmbeddedDocumentField(Activity))
