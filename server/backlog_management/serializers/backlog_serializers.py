from rest_framework_mongoengine.serializers import DynamicDocumentSerializer
from backlog_management.models.backlog import Backlog,Comment

class BacklogRequestSerializer(DynamicDocumentSerializer):
    class Meta(object):
        model = Backlog
        exclude =('planned_start_date','actual_start_date','planned_end_date','actual_end_date',)


class BacklogResponseSerializer(DynamicDocumentSerializer):
    class Meta(object):
        model = Backlog
        fields = ('backlog_name','backlog_uid','project_uid','iteration_uid','backlog_description',
                    'created_at','date_modified','completed_at','assigned_to','planned_start_date','actual_start_date',
                    'planned_end_date','actual_end_date','estimated_efforts','actual_efforts','is_notified',
                    'comments','status',)
        


