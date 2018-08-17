import logging

from django.http import HttpResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from iteration_management.serializers.iteration_serializers import IterationSerializer
from iteration_management.services.iteration_services import *

LOGGER = logging.getLogger(__name__)

class IterationAPI(APIView):
    """
    API for CRUD operations of Iteration.
    Create/Read/Update/Delete
    """

    def get(self, request, iteration_uid, format=None):
        """
        Request-type: GET
        Method for fetching iteration details using 'iteration_name'
        """
        result = get_iteration_by_iteration_uid(iteration_uid)
        if result:
            response_serializer = IterationSerializer(result,many=True)
            return Response(response_serializer.data, status=status.HTTP_200_OK)
        return Response({"message": "No Data Found"}, status=status.HTTP_200_OK)

    def delete(self, request, iteration_uid, format=None):
        """
        Request-type: DELETE
        Method to remove an Iteration
        """
        result = delete_iteration(iteration_uid)
        if result:
            return Response({"message": "Deleted Successfully."}, status=status.HTTP_200_OK)
        return Response({"message": "No Data Found."}, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        """
        Request-type: POST
        Method for Creating an Iteration
        """
        data = request.data
        request_serializer = IterationSerializer(data=data)
        if request_serializer.is_valid():
            result = create_iteration(data)
            if result:
                response_serializer = IterationSerializer(result)
                return Response(response_serializer.data, status=status.HTTP_201_CREATED)
            return Response({"message": "Operation failed."}, status=status.HTTP_417_EXPECTATION_FAILED)
        return Response({"message": "Invalid Data"}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, format='json'):
        """
        Request-type: PUT
        Method for Updating an Iteration Details
        """
        data = request.data
        request_serializer = IterationSerializer(data=data)
        if request_serializer.is_valid():
            result = update_iteration(data)
            if result:
                return Response({"message":"Updated Successfully."}, status=status.HTTP_200_OK)
            return Response({"message": "No Data Found."}, status=status.HTTP_200_OK)
        return Response({"message":"Invalid Data."},status=status.HTTP_400_BAD_REQUEST)

class GetAllIterationsAPI(APIView):
    """
    API for getting All Iterations Details
    """

    def get(self, request, format=None):
        """
        Request-type: GET
        Method to fetch All Iterations Details
        """
        result = get_all_iterations()
        if result:
            response_serializer = IterationSerializer(result,many=True)
            return Response(response_serializer.data, status=status.HTTP_200_OK)
        return Response({"message": "No Data Found."}, status=status.HTTP_200_OK)

class GetByProjectUidAPI(APIView):
    """
    API for getting Iteration using 'project_id'
    """
    def get(self, request,project_uid,format=None):
        """
        Request-type: POST
        Method to fetch an Iteration detail using 'project_id'
        """
        if project_uid == None:
            return Response({"message": "Invalid Data"}, status=status.HTTP_200_OK)
        result = get_iteration_by_project_uid(project_uid)
        if result:
            response_serializer = IterationSerializer(result,many= True)
            return Response(response_serializer.data, status=status.HTTP_200_OK)
        return Response({"message":"Not Found"},status=status.HTTP_200_OK)

class GetByIterationUidAPI(APIView):
    """
    API for getting Iteration using 'iteration_id'
    """
    def get(self, request,iteration_uid,format=None):
        """
        Request-type: GET
        Method to fetch an Iteration detail using 'iteration_id'
        """
        result = get_iteration_by_iteration_uid(iteration_uid)
        if result:
            response_serializer = IterationSerializer(result)
            return Response(response_serializer.data, status=status.HTTP_200_OK)
        return Response({"message":"Not Found"},status=status.HTTP_404_NOT_FOUND)

class GetByIterationNameAndProjectUidAPI(APIView):
    """
    API for getting Iteration using 'iteration_name' and 'project_uid'
    """
    def post(self, request,format=None):
        """
        Request-type: POST
        Method to fetch an Iteration detail using 'iteration_name' and 'project_uid'
        """
        print (request.data)
        if request.data.get('iteration_name') == None or request.data.get('project_uid') == None:
            return Response({"message": "Invalid Data"}, status=status.HTTP_200_OK)
        result = get_iteration_by_name_and_projectuid(request,request.data)
        if result:
            response_serializer = IterationSerializer(result,many=True)
            return Response(response_serializer.data, status=status.HTTP_200_OK)
        return Response({"message":"Not Found"},status=status.HTTP_200_OK)