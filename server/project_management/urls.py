from django.conf.urls import url
from project_management.views.project_views import *

urlpatterns = [
    url(r'^$', GetAllProjectsAPI.as_view()),
    url(r'^(?P<project_uid>[\s\w\d\-]+)/$', ProjectAPI.as_view()),
    url(r'^manager/(?P<employee_id>[\s\w\d\-]+)/$',GetAllProjectsByEmployeeId.as_view()),
    url(r'^add',ProjectAPI.as_view()),
    url(r'^update', ProjectAPI.as_view()),
    url(r'^activity/add', ActivityAPI.as_view()),
    url(r'^activity/update', ActivityAPI.as_view()),
    url(r'^activity/(?P<activity_uid>[\s\w\d\-]+)/$', ActivityAPI.as_view()),
    url(r'^activity/all/(?P<project_uid>[\s\w\d\-]+)/$', GetActivityAPI.as_view()),
]