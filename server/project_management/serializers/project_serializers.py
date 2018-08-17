from rest_framework_mongoengine.serializers import DynamicDocumentSerializer

from project_management.models.project_models import Project


class ProjectRequestSerializer(DynamicDocumentSerializer):
    class Meta(object):
        model = Project
        exclude = ('created_at','date_modified','start_date','estimated_completion_date','actual_completion_date',)

class ProjectResponseSerializer(DynamicDocumentSerializer):
    class Meta(object):
        model = Project
        fields = '__all__'
