# -*- coding: utf-8 -*-
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from backlog_management.serializers.backlog_serializers import BacklogRequestSerializer,BacklogResponseSerializer
from backlog_management.serializers.comment_serializers import CommentSerializer
from backlog_management.services.backlog_services import *
from backlog_management.services.comment_services import *
from project_management.serializers.project_serializers import ProjectResponseSerializer
import uuid

class BacklogAPI(APIView):
    """
    API for CRUD operations of Backlog.
    Create/Read/Update/Delete
    """
    def get(self,request,backlog_uid,format = None):
        '''
        Request-type: GET
        Method for fetching User details using backlog_uid
        ---
        request_serializer = BacklogRequestSerializer
        response_serializer = BacklogResponseSerializer
        '''
        result = get_backlog(backlog_uid)
        if result :
            response_serializer = BacklogResponseSerializer(result)
            return Response(response_serializer.data, status=status.HTTP_200_OK)
        return Response({"message": "No Data Found"}, status=status.HTTP_200_OK)

    def post(self,request,format = None):
        '''
        Request-type: POST
        Method for Creating Backlog
        ---
        request_serializer = BacklogRequestSerializer
        response_serializer = BacklogResponseSerializer
       ''' 
        request_data = request.data
        request_service = BacklogRequestSerializer(data = request.data)
        if request_service.is_valid():
            backlog_data = add_backlog(request_data)
            if backlog_data:
                response_serializer= BacklogResponseSerializer(backlog_data)
                return Response(response_serializer.data, status=status.HTTP_200_OK)
            return Response({"message": "Operation failed."}, status=status.HTTP_200_OK)
        return Response({"message": "Invalid Data"}, status=status.HTTP_400_BAD_REQUEST)

    def put(self,request,format = None):
        ''' 
        Request-type: PUT
        Method for Updating Backlog Details
        ---
        request_serializer = BacklogRequestSerializer
        response_serializer = BacklogResponseSerializer
        '''
        request_data = request.data
        # request_serializer = BacklogRequestSerializer(data = request_data)
        # if request_serializer.is_valid():
        backlog_data = update_backlog(request_data)
        if backlog_data :
            return Response({"message":"Updated Successfully."}, status=status.HTTP_200_OK)
        return Response({"message": "No Data Found."}, status=status.HTTP_200_OK)
        # return Response({"message":"Invalid Data."},status=status.HTTP_400_BAD_REQUEST)

    def delete(self,request,backlog_uid,format = None):
        '''
        Request-type: DELETE
        Method to remove a Backlog
        ---
        request_serializer = BacklogRequestSerializer
        response_serializer = BacklogResponseSerializer
        '''

        result = delete_backlog(backlog_uid= backlog_uid)
        if result :
            return Response({"message": "Deleted Successfully."}, status=status.HTTP_200_OK)
        return Response({"message": "No Data Found."}, status=status.HTTP_200_OK)


class GetAllBacklogbyProjectUIdAPI(APIView):
    """
    API for getting All Backlog Details using project_uid
    """
    def get(self,request,project_uid,format = None):
        '''
        Request-type: POST
        Method for Fetching Backlog detail by project_uid
        ---
         request_serializer = BacklogRequestSerializer
        response_serializer = BacklogResponseSerializer
        '''
        backlog_data = get_all_backlogs_by_project_uid(project_uid)
        if backlog_data:
            response_serializer= BacklogResponseSerializer(backlog_data,many = True)
            return Response(response_serializer.data, status=status.HTTP_200_OK)
        return Response({"message": "No Data Found"}, status=status.HTTP_200_OK)
    



class GetAllBacklogbyIterationUIdAPI(APIView):
    """
    API for getting All Backlog Details using iteration_uid
    """

    def get(self,request,iteration_uid,format = None):
        '''
        Request-type: POST
        Method for Fetching Backlog detail by iteration_uid
        ---
        request_serializer = BacklogRequestSerializer
        response_serializer = BacklogResponseSerializer
        '''
        backlog_data = get_all_backlogs_by_iteration_uid(iteration_uid)
        if backlog_data:
            response_serializer= BacklogResponseSerializer(backlog_data,many = True)
            return Response(response_serializer.data, status=status.HTTP_200_OK)
        return Response({"message": "No Data Found"}, status=status.HTTP_200_OK)


class AssignMemberAPI(APIView):
    """
    API for assigning member to backlog
    """
    def put(self,request,format = None):
        '''
        Request-type: PUT
        Method for assigning member to backlog
        ---
        request_serializer = BacklogRequestSerializer
        response_serializer = BacklogResponseSerializer
        '''
        request_data = request.data
        request_serializer = BacklogRequestSerializer(data = request_data)
        if request_serializer.is_valid():
            is_member_assigned = assign_member_to_backlog(request.data)
            if is_member_assigned:
                return Response({"message":"Member Assigned Successfully."}, status=status.HTTP_200_OK)
            return Response({"message": "No Data Found"}, status=status.HTTP_200_OK)
        return Response({"message": "Invalid Data"}, status=status.HTTP_400_BAD_REQUEST)


class GetProjectAPI(APIView):
    """
    API for assigning member to backlog
    """
    def get(self,request,employee_id,format = None):
        '''
        Request-type: GET
        Method for getting project details usinng employee_id
        ---
        request_serializer = BacklogRequestSerializer
        response_serializer = ProjectResponseSerializer
        '''
        result = get_project_using_employee_id(employee_id)
        if result:
            response_serializer = ProjectResponseSerializer(result,many=True)
            return Response(response_serializer.data, status=status.HTTP_200_OK)
        return Response({"message": "No Data Found"}, status=status.HTTP_200_OK)

class GetByBacklogNameAndProjectUIdAPI(APIView):
    """
    API for getting Backlog details using backlog_name and project_uid
    """
    def post(self,request,format=None):
        """
        Request-type: POST
        Method for fetching Backlog detail using backlog_name and project_uid
        request_serializer = BacklogRequestSerializer
        response_serializer = BacklogResponseSerializer
        """
        request_data = request.data
        request_serializer = BacklogRequestSerializer(data = request_data)
        if request_serializer.is_valid():
            backlog_data = get_backlog_by_name_and_projectuid(request.data)
            if backlog_data:
                response_serializer = BacklogResponseSerializer(backlog_data,many=True)
                return Response(response_serializer.data, status=status.HTTP_200_OK)
            return Response({"message":"No Data Found"}, status=status.HTTP_200_OK)
        return Response({"message":"Invalid Data."},status=status.HTTP_400_BAD_REQUEST)

class UpdateActualStartDateAPI(APIView):
    """
    API for updating actual start date to backlog
    """
    def put(self,request,format = None):
        '''
        Request-type: PUT
        Method for updating actual start date to backlog
        ---
        request_serializer = BacklogRequestSerializer
        response_serializer = BacklogResponseSerializer
        '''
        request_data = request.data
        request_serializer = BacklogRequestSerializer(data = request_data)
        if request_serializer.is_valid():
            is_updated = update_actual_start_date(request.data)
            if is_updated:
                return Response({"message":"Updated Actual Start Date Successfully."}, status=status.HTTP_200_OK)
            return Response({"message": "No Data Found"}, status=status.HTTP_200_OK)
        return Response({"message": "Invalid Data"}, status=status.HTTP_400_BAD_REQUEST)

class UpdateActualEndDateAPI(APIView):
    """
    API for updating actual end date to backlog
    """
    def put(self,request,format = None):
        '''
        Request-type: PUT
        Method for updating actual end date to backlog
        ---
        request_serializer = BacklogRequestSerializer
        response_serializer = BacklogResponseSerializer
        '''
        request_data = request.data
        request_serializer = BacklogRequestSerializer(data = request_data)
        if request_serializer.is_valid():
            is_updated = update_actual_end_date(request.data)
            if is_updated:
                return Response({"message":"Updated Actual End Date Successfully."}, status=status.HTTP_200_OK)
            return Response({"message": "No Data Found"}, status=status.HTTP_200_OK)
        return Response({"message": "Invalid Data"}, status=status.HTTP_400_BAD_REQUEST)

class UpdateActualEffortsAPI(APIView):
    """
    API for updating actual efforts to backlog
    """
    def put(self,request,format = None):
        '''
        Request-type: PUT
        Method for updating actual efforts to backlog
        ---
        request_serializer = BacklogRequestSerializer
        response_serializer = BacklogResponseSerializer
        '''
        request_data = request.data
        request_serializer = BacklogRequestSerializer(data = request_data)
        if request_serializer.is_valid():
            is_updated = update_actual_efforts(request.data)
            if is_updated:
                return Response({"message":"Updated Actual Efforts Successfully."}, status=status.HTTP_200_OK)
            return Response({"message": "No Data Found"}, status=status.HTTP_200_OK)
        return Response({"message": "Invalid Data"}, status=status.HTTP_400_BAD_REQUEST)

class AssigneeNotificationAPI(APIView):
    """
    API for updating assignee notification to backlog
    """
    def get(self,request,backlog_uid,format = None):
        '''
        Request-type: GET
        Method for updating assignee notification to backlog
        ---
        request_serializer = BacklogRequestSerializer
        response_serializer = BacklogResponseSerializer
        '''
        
        is_updated = is_assignee_notified(backlog_uid)
        if is_updated:
            return Response({"message":"Updated Assignee Notification Successfully."}, status=status.HTTP_200_OK)
        return Response({"message": "No Data Found"}, status=status.HTTP_200_OK)
        
        
		

class CommentAPI(APIView):
    """
    API for Comments
    """

    def get(self,request,comment_uid,format = None):
        '''
        Request-type: GET
        Method for fetching Comment details using comment_uid
        ---
        request_serializer = CommentSerializer
        response_serializer = CommentSerializer
        '''
        result = get_comment(comment_uid)
        if result :
            response_serializer = CommentSerializer(result)
            return Response(response_serializer.data, status=status.HTTP_200_OK)
        return Response({"message": "No Data Found"}, status=status.HTTP_200_OK)

    def post(self,request,format = None):
        '''
        Request-type: POST
        Method for creating comment
        ---
        request_serializer = CommentSerializer
        response_serializer = CommentSerializer
        '''
        data = request.data
        request_serializer = CommentSerializer(data = data)
        if request_serializer.is_valid():
            comment_data = add_comment(request.data)
            if comment_data:
                response_serializer = CommentSerializer(comment_data)
                return Response(response_serializer.data, status=status.HTTP_200_OK)
            return Response({"message": "Invalid data"}, status=status.HTTP_200_OK)
        return Response({"message": "Operation failed"}, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self,request,format = None):
        '''
        Request-type: PUT
        Method for Updating comments using comment_uid
        ---
        request_serializer = CommentSerializer
        response_serializer = CommentSerializer
        '''
        data = request.data
        request_serializer = CommentSerializer(data = data)
        if request_serializer.is_valid():
            comment_data = update_comment(request.data)
            if comment_data:
                return Response({"message":"Updated Successfully."}, status=status.HTTP_200_OK)
            return Response({"message": "No Data Found."}, status=status.HTTP_200_OK)
        return Response({"message":"Invalid Data."},status=status.HTTP_400_BAD_REQUEST)

    def delete(self,request,comment_uid,format = None):
        '''
        Request-type: DELETE
        Method to remove a comment
        ---
        request_serializer = CommentSerializer
        response_serializer = CommentSerializer
        '''

        result = delete_comment(comment_uid)
        if result :
            return Response({"message": "Deleted Successfully."}, status=status.HTTP_200_OK)
        return Response({"message": "No Data Found."}, status=status.HTTP_200_OK)


class GetCommentsAPI(APIView):
    '''
    API for getting backlog comments
    '''

    def get(self,request,backlog_uid,format=None):
        '''
        Request-type: GET
        Method for Fetching comments
         ---
        request_serializer = CommentSerializer
        response_serializer = CommentSerializer
        '''

        comments = get_comments(backlog_uid)
        if comments:
            response_serializer = CommentSerializer(comments,many=True)
            return Response(response_serializer.data, status=status.HTTP_200_OK)
        return Response({"message": "No Data Found"}, status=status.HTTP_200_OK)



    







