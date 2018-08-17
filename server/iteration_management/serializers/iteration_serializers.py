from rest_framework_mongoengine.serializers import DynamicDocumentSerializer

from iteration_management.models.iteration_models import Iteration


class IterationSerializer(DynamicDocumentSerializer):
    class Meta(object):
        model = Iteration
        fields = ('iteration_uid','project_uid','iteration_name','iteration_description','created_at','date_modified','completed_at','status')
