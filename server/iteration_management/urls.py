from django.conf.urls import url
from iteration_management.views.iteration_views import *

urlpatterns = [
    url(r'^$', GetAllIterationsAPI.as_view()),
    url(r'^(?P<iteration_uid>[\s\w\d\-]+)/$', IterationAPI.as_view()),
    url(r'^add',IterationAPI.as_view()),
    url(r'^update', IterationAPI.as_view()),
    url(r'^project/(?P<project_uid>[\s\w\d\-]+)/$', GetByProjectUidAPI.as_view()),
    url(r'^iteration_uid/(?P<iteration_uid>[\s\w\d\-]+)/$', GetByIterationUidAPI.as_view()),
    url(r'^verify', GetByIterationNameAndProjectUidAPI.as_view())
]