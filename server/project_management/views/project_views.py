import logging

from django.http import HttpResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from project_management.serializers.project_serializers import ProjectRequestSerializer,ProjectResponseSerializer
from project_management.serializers.activity_serializers import ActivitySerializer
from project_management.services.project_services import *
from project_management.services.activity_services import *

class ProjectAPI(APIView):
    """
    API for CRUD operations of Project.
    Create/Read/Update/Delete
    """

    def get(self, request, project_uid, format=None):
        """
        Request-type: GET
        Method for fetching Project details using 'project_name'
        ---
        request_serializer = ProjectSerializer
        response_serializer = ProjectSerializer
        """
        result = get_project(project_uid)
        if result:
            response_serializer = ProjectResponseSerializer(result)
            return Response(response_serializer.data, status=status.HTTP_200_OK)
        return Response({"message": "No Data Found"}, status=status.HTTP_200_OK)

    def delete(self, request, project_uid, format='json'):
        """
        Request-type: DELETE
        Method to remove a Project
        """
        result = delete_project(project_uid)
        if result:
            return Response({"message": "Deleted Successfully."}, status=status.HTTP_200_OK)
        return Response({"message": "No Data Found."}, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        """
        Request-type: POST
        Method for Creating Project
        ---
        request_serializer = ProjectSerializer
        response_serializer = ProjectSerializer
        """
        data = request.data
        request_serializer = ProjectRequestSerializer(data=data)
        if request_serializer.is_valid():
            result = create_project(data)
            if result:
                response_serializer = ProjectResponseSerializer(result)
                return Response(response_serializer.data, status=status.HTTP_200_OK)
            return Response({"message": "Operation failed."}, status=status.HTTP_200_OK)
        return Response({"message": "Invalid Data"}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, format='json'):
        """
        Request-type: PUT
        Method for Updating Project Details
        ---
        request_serializer = ProjectSerializer
        response_serializer = ProjectSerializer
        """
        data = request.data
        request_serializer = ProjectRequestSerializer(data=data)
        if request_serializer.is_valid():
            result = update_project(data)
            if result:
                return Response({"message":"Updated Successfully."}, status=status.HTTP_200_OK)
            return Response({"message": "No Data Found."}, status=status.HTTP_200_OK)
        return Response({"message":"Invalid Data."},status=status.HTTP_400_BAD_REQUEST)

class GetAllProjectsAPI(APIView):
    """
    API for getting All Project Details
    """

    def get(self, request, format=None):
        """
        Request-type: GET
        Method to fetch All Projects Details
        ---
        request_serializer = ProjectSerializer
        response_serializer = ProjectSerializer
        """
        result = get_all_projects()
        if result:
            response_serializer = ProjectResponseSerializer(result, many=True)
            return Response(response_serializer.data, status=status.HTTP_200_OK)
        return Response({"message": "No Data Found."}, status=status.HTTP_200_OK)

class GetAllProjectsByEmployeeId(APIView):
    """
    API for getting All Project Details
    """
    def get(self, request,employee_id, format=None):
        """
        Request-type: GET
        Method to fetch All Projects Details
        ---
        request_serializer = ProjectSerializer
        response_serializer = ProjectSerializer
        """
        result = get_project_using_employee_id(employee_id)
        if result:
            response_serializer = ProjectResponseSerializer(result, many=True)
            return Response(response_serializer.data, status=status.HTTP_200_OK)
        return Response({"message": "No Data Found."}, status=status.HTTP_200_OK)

class ActivityAPI(APIView):
    """
    API for Activity
    """

    def get(self,request,activity_uid,format = None):
        '''
        Request-type: GET
        Method for fetching Activity details using activity_uid
        ---
         request_serializer = ActivityRequestSerializer
        response_serializer = ActivityResponseSerializer
        '''
        result = get_activity(activity_uid)
        if result :
            response_serializer = ActivitySerializer(result)
            return Response(response_serializer.data, status=status.HTTP_200_OK)
        return Response({"message": "No Data Found"}, status=status.HTTP_200_OK)

    def post(self,request,format = None):
        '''
        Request-type: POST
        Method for creating activity
        ---
         request_serializer = ActivitySerializer
        response_serializer = ActivitySerializer
        '''
        data = request.data
        request_serializer = ActivitySerializer(data = data)
        if request_serializer.is_valid():
            activity_data = add_activity(data)
            if activity_data:
                response_serializer = ActivitySerializer(activity_data)
                return Response(response_serializer.data, status=status.HTTP_200_OK)
            return Response({"message": "Invalid data"}, status=status.HTTP_200_OK)
        return Response({"message": "Operation failed"}, status=status.HTTP_400_BAD_REQUEST)
        
    def put(self,request,format = None):
        '''
        Request-type: PUT
        Method for Updating activity using activity_uid
        ---
         request_serializer = ActivitySerializer
        response_serializer = ActivitySerializer
        '''
        data = request.data
        request_serializer = ActivitySerializer(data = data)
        if request_serializer.is_valid():
            activity_data = update_activity(request.data)
            if activity_data:
                return Response({"message":"Updated Successfully."}, status=status.HTTP_200_OK)
            return Response({"message": "No Data Found."}, status=status.HTTP_200_OK)
        return Response({"message":"Invalid Data."},status=status.HTTP_400_BAD_REQUEST)

    def delete(self,request,activity_uid,format = None):
        '''
        Request-type: DELETE
        Method to remove a activity
        ---
         request_serializer = ActivitySerializer
        response_serializer = ActivitySerializer
        '''

        result = delete_activity(activity_uid)
        if result :
            return Response({"message": "Deleted Successfully."}, status=status.HTTP_200_OK)
        return Response({"message": "No Data Found."}, status=status.HTTP_200_OK)


class GetActivityAPI(APIView):
    '''
    API for getting project activities
    '''

    def get(self,request,project_uid,format=None):
        '''
        Request-type: GET
        Method for Fetching activities
        ---
        request_serializer = ActivitySerializer
        response_serializer = ActivitySerializer
        '''

        activities = get_activities(project_uid)
        if activities:
            response_serializer = ActivitySerializer(activities,many=True)
            return Response(response_serializer.data, status=status.HTTP_200_OK)
        return Response({"message": "No Data Found"}, status=status.HTTP_200_OK)
