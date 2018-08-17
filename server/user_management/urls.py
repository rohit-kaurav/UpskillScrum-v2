from django.conf.urls import url

from user_management.views.user_views import *


urlpatterns = [
    url(r'^(?P<employee_id>[\s\w\d]+)/$', UserAPI.as_view()),
    url(r'^add$', UserAPI.as_view()),
    url(r'^update$', UserAPI.as_view()),
    url(r'^$', GetAllUserAPI.as_view()),
    url(r'^verify/(?P<username>[\s\w\d]+)/$', VerifyUserAPI.as_view()),
    url(r'^employeeId/(?P<employee_id>[\s\w\d]+)/$', VerifyEmployeeIdAPI.as_view()),
    url(r'^authorize$', AuthorizeUserAPI.as_view()),
    url(r'^update/role$', UpdateUserRoleAPI.as_view()),
    url(r'^role/(?P<role>[\s\w]+)/$',GetAllUserByRoleAPI.as_view()),
]
