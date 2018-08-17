# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from mongoengine import DynamicDocument, fields

# Create your models here.
class Iteration(DynamicDocument):
    ''' 
    Iteration model with following attributes
    iteration_uid = String
    project_uid = String
    iteration_name = String
    created_at = String
    date_modified = String
    completed_at = String
    status = String
        }
    '''
    iteration_uid = fields.StringField()
    project_uid = fields.StringField()
    iteration_name = fields.StringField()
    iteration_description = fields.StringField()
    created_at = fields.StringField()
    date_modified = fields.StringField()
    completed_at = fields.StringField()
    status = fields.StringField()