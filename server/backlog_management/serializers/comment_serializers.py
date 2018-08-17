from rest_framework_mongoengine.serializers import DynamicDocumentSerializer
from backlog_management.models.backlog import Comment

class CommentSerializer(DynamicDocumentSerializer):
    class Meta(object):
        model = Comment
        fields = ('comment_uid','content','author','created_at',)