from rest_framework_mongoengine.serializers import DynamicDocumentSerializer
from user_management.models.user import User

class UserRequestSerializer(DynamicDocumentSerializer):
    class Meta(object):
        model = User
        #fields = '__all__'
        exclude =('dob',)
             
        


class UserResponseSerializer(DynamicDocumentSerializer):
    class Meta(object):
        model = User
        exclude =('password',)