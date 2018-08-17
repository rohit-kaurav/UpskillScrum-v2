# -*- coding: utf-8 -*-
from mongoengine import DynamicDocument,EmbeddedDocument,EmbeddedDocumentField, fields


class Comment(EmbeddedDocument):
    '''Comment model with following attribute

        comment_uid = String
        author = String
        content = String
        created_at = DateTime

    '''
    comment_uid = fields.StringField()
    author = fields.StringField()
    content = fields.StringField()
    created_at = fields.DateTimeField()


class Backlog(DynamicDocument):
    '''Backlog model with following attribute

        backlog_name = String
        backlog_uid = String		
        project_uid = String			
        iteration_uid = String			
        backlog_description = String			
        assigned_to = String			
        created_at = DateTime (time)
        date_modified =DateTime (time)
        planned_start_date = Date
        actual_start_date = Date
        planned_end_date = Date
        actual_end_date = Date
        estimated_efforts = Integer
        actual_efforts =  Integer
        is_notified = Boolean			
        completed_at = DateTime (time)			
        comments = List of Comment Objects
        status = String 
    '''

    backlog_name = fields.StringField()
    backlog_uid = fields.StringField()
    project_uid = fields.StringField()
    iteration_uid = fields.StringField()
    backlog_description = fields.StringField()
    assigned_to = fields.StringField()
    created_at = fields.DateTimeField()
    date_modified = fields.DateTimeField()
    completed_at = fields.DateTimeField()
    planned_start_date = fields.DateTimeField()
    actual_start_date = fields.DateTimeField()
    planned_end_date = fields.DateTimeField()
    actual_end_date = fields.DateTimeField()
    estimated_efforts = fields.IntField()
    actual_efforts =  fields.IntField()
    is_notified = fields.BooleanField()
    comments = fields.ListField(EmbeddedDocumentField(Comment))
    status = fields.StringField()
    