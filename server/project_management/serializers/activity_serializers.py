from rest_framework_mongoengine.serializers import DynamicDocumentSerializer

from project_management.models.project_models import Activity


class ActivitySerializer(DynamicDocumentSerializer):
    class Meta(object):
        model = Activity
        fields = ('activity_uid','author','content','created_at',)

