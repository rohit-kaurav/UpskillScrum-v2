# -*- coding: utf-8 -*-
from mongoengine import DynamicDocument, fields

class User (DynamicDocument) :
    
    ''' User model with following attributes
        name = String
        employee_id = String
        username = String
        password = String
        role = String
        dob = Date
        phone = String
        email = Email
        }
    '''
    name = fields.StringField()
    employee_id = fields.StringField()
    username = fields.StringField()
    password = fields.StringField()
    role = fields.StringField()
    dob = fields.DateTimeField()
    phone = fields.StringField()
    email = fields.EmailField()
