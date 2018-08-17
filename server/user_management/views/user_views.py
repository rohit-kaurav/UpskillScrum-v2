# -*- coding: utf-8 -*-
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from user_management.serializers.user_serializers import UserRequestSerializer, UserResponseSerializer
from user_management.services.user_services import *
import uuid


class UserAPI(APIView):
    """
    API for CRUD operations of Project.
    Create/Read/Update/Delete
    """

    def get(self, request, employee_id, format=None):
        '''
        Request-type: GET
        Method for fetching User details using 'employee_id'
        ---
        request_serializer = UserRequestSerializer
        response_serializer = UserResponseSerializer
        '''
        result = get_user(employee_id)
        if result:
            response_serializer = UserResponseSerializer(result)
            return Response(response_serializer.data, status=status.HTTP_200_OK)
        return Response({"message": "No Data Found"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, format=None):
        '''
        Request-type: POST
        Method for Creating User
         ---
        request_serializer = UserRequestSerializer
        response_serializer = UserResponseSerializer
        '''
        user_data = request.data
        request_service = UserRequestSerializer(data=user_data)
        if request_service.is_valid():
            result = add_user(user_data)
            if result :
                response_serializer = UserResponseSerializer(result)
                return Response(response_serializer.data, status=status.HTTP_200_OK)
            return Response({"message": "Operation failed."}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"message": "Invalid Data"}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, format=None):
        '''
        Request-type: PUT
        Method for Updating User Details
        ---
        request_serializer = UserRequestSerializer
        response_serializer = UserResponseSerializer
        '''
        user_data = request.data
        request_service = UserRequestSerializer(data=user_data)
        if request_service.is_valid:
            result = update_user(user_data)
            if result:
                return Response({"message":"Updated Successfully."}, status=status.HTTP_200_OK)
            return Response({"message": "No Data Found."}, status=status.HTTP_404_NOT_FOUND)
        return Response({"message":"Invalid Data."},status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, employee_id, format=None):
        '''
        Request-type: DELETE
        Method to remove a User
        '''

        result = delete_user(employee_id)
        if result:
            return Response({"message": "Deleted Successfully."}, status=status.HTTP_200_OK)
        return Response({"message": "No Data Found."}, status=status.HTTP_404_NOT_FOUND)


class GetAllUserAPI(APIView):
    """
    API for getting All Project Details
    """

    def get(self, request, format=None):
        '''
        Request-type: GET
        Method to fetch All Projects Details
        ---
        request_serializer = UserRequestSerializer
        response_serializer = UserResponseSerializer
        '''

        result = get_all_user()
        if result:
            response_serializer = UserResponseSerializer(result, many=True)

            return Response(response_serializer.data, status=status.HTTP_200_OK)
        return Response({"message": "No Data Found"}, status=status.HTTP_404_NOT_FOUND)

class GetAllUserByRoleAPI(APIView):
    """
    API for getting All Project Details
    """

    def get(self, request,role, format=None):
        '''
        Request-type: GET
        Method to fetch All Projects Details
        ---
        request_serializer = UserRequestSerializer
        response_serializer = UserResponseSerializer
        '''

        result = get_users_by_role(role)
        if result:
            response_serializer = UserResponseSerializer(result, many=True)
            return Response(response_serializer.data, status=status.HTTP_200_OK)
        return Response({"message": "No Data Found"}, status=status.HTTP_200_OK)

class VerifyUserAPI(APIView):

    def get(self, request, username, format=None):
        ''' 
        Request-type: GET
        Method to fetch user by matching username
        ---
        request_serializer = UserRequestSerializer
        response_serializer = UserResponseSerializer
        '''

        user = get_user_by_username(request, username)
        if user :
            return Response({"message": "Found"}, status.HTTP_200_OK)
        return Response({"message": "Not Found"}, status.HTTP_200_OK)

class VerifyEmployeeIdAPI(APIView):

    def get(self, request, employee_id, format=None):
        ''' 
        Request-type: GET
        Method to fetch user by matching employee_id
        '''

        user = get_user(employee_id)
        if user :
            return Response({"message": "Found"}, status.HTTP_200_OK)
        return Response({"message": "Not Found"}, status.HTTP_200_OK)

class AuthorizeUserAPI(APIView):

    def post(self, request, format=None):
        """
        Request-type: POST
        Method to authorize User with Username and Password
        ---
        request_serializer = UserRequestSerializer
        response_serializer = UserResponseSerializer
        """
        result = authorize_user(request.data)
        if result:
            response_serializer = UserResponseSerializer(result)
            return Response(response_serializer.data, status=status.HTTP_200_OK)
        return Response({"invalid": True}, status=status.HTTP_400_BAD_REQUEST)

class UpdateUserRoleAPI(APIView):

    def put(self, request, format=None):
        """
        Request-type: PUT
        Method to update User role
        ---
        request_serializer = UserRequestSerializer
        response_serializer = UserResponseSerializer
        """
        request_serializer = UserRequestSerializer(data=request.data)
        if request_serializer.is_valid():            
            result = update_role(request.data)
            if result:
                return Response({"message":"Updated Role Successfully."}, status=status.HTTP_200_OK)
            return Response({"message": "No Data Found."}, status=status.HTTP_404_NOT_FOUND)
        return Response({"message":"Invalid Data."},status=status.HTTP_400_BAD_REQUEST)

