from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializer import LoanOptionSerializer

class LoanOptionView(APIView):

    def get(self, request):
        options = LoanOptionSerializer().Meta.model.objects.all() # Lấy tất cả các gói vay từ cơ sở dữ liệu
        serializer = LoanOptionSerializer(options, many=True) # Tạo instance của LoanOptionSerializer với dữ liệu từ DB
        return Response(serializer.data, status=status.HTTP_200_OK) # Trả về danh sách gói vay dưới dạng JSON với mã trạng thái 200 OK
    
    def post(self, request):
        serializer = LoanOptionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)