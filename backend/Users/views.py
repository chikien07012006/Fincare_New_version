from rest_framework import generics, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from .models import User
from .serializers import register, login

class RegisterView(generics.CreateAPIView):
    """
    API View để xử lý đăng ký người dùng mới.
    """
#     Khi một yêu cầu POST được gửi đến RegisterView, CreateAPIView sẽ tự động thực hiện các bước sau:

# Thu thập dữ liệu: Lớp view này tự động lấy dữ liệu từ phần body của yêu cầu (request.data).

# Tạo Serializer: Nó tạo một instance của serializer_class (RegisterSerializer) và tự động truyền dữ liệu đã thu thập vào đó. Điều này tương đương với việc bạn viết:

# Python

# serializer = RegisterSerializer(data=request.data)
    queryset = User.objects.all() # = SELECT * FROM users; queryset: Cho biết API này sẽ làm việc với model nào (CustomUser).
    serializer_class = register # tự động check is_valid và save

class LoginView(APIView):
    """
    API View để xử lý đăng nhập và trả về token xác thực.
    """
    serializer_class = login

    def post(self, request):
        serializer = self.serializer_class(data=request.data) # Khi bạn gọi serializer = self.serializer_class(data=request.data), serializer sẽ nhận toàn bộ dữ liệu thô (raw data) từ request 
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data['email'] # Nếu tất cả các bước xác thực đều thành công, serializer sẽ tạo ra một dictionary mới gọi là validated_data. Dictionary này chỉ chứa những dữ liệu đã được xác thực và làm sạc
        password = serializer.validated_data['password']

        user = authenticate(request, username=email, password=password) # ttự động quét trong DB
        
        if user is not None:
            # Lấy hoặc tạo token cho user
            token, _ = Token.objects.get_or_create(user=user)
            return Response({"token": token.key}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

class UserProfileViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API ViewSet để xem hồ sơ người dùng.
    Chỉ cho phép đọc dữ liệu (GET).
    Yêu cầu người dùng đã đăng nhập (authenticated).
    """
    queryset = User.objects.all()
    serializer_class = register
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Giới hạn queryset chỉ trả về hồ sơ của người dùng đang đăng nhập.
        """
        return self.queryset.filter(id=self.request.user.id)
