from django.conf.urls import url

from backlog_management.views.backlog_views import *


urlpatterns = [
    url(r'^(?P<backlog_uid>[\s\w\d\-]+)/$', BacklogAPI.as_view()),
    url(r'^add$', BacklogAPI.as_view()),
    url(r'^update$', BacklogAPI.as_view()),
    url(r'^update/actual_start_date$', UpdateActualStartDateAPI.as_view()),
    url(r'^update/actual_end_date$', UpdateActualEndDateAPI.as_view()),
    url(r'^update/actual_efforts$', UpdateActualEffortsAPI.as_view()),
    url(r'^project/(?P<project_uid>[\s\w\d\-]+)/$', GetAllBacklogbyProjectUIdAPI.as_view()),
    url(r'^projects/employees/(?P<employee_id>[\s\w\d]+)/$', GetProjectAPI.as_view()),
    url(r'^iterations/(?P<iteration_uid>[\s\w\d\-]+)/$', GetAllBacklogbyIterationUIdAPI.as_view()),
    url(r'^assign$', AssignMemberAPI.as_view()),
    url(r'^verify', GetByBacklogNameAndProjectUIdAPI.as_view()),
    url(r'^is_notified/(?P<backlog_uid>[\s\w\d\-]+)/$', AssigneeNotificationAPI.as_view()),
    url(r'^comments/add', CommentAPI.as_view()),
    url(r'^comments/update', CommentAPI.as_view()),
    url(r'^comments/(?P<comment_uid>[\s\w\d\-]+)/$', CommentAPI.as_view()),
    url(r'^comments/all/(?P<backlog_uid>[\s\w\d\-]+)/$', GetCommentsAPI.as_view()),
   

]
