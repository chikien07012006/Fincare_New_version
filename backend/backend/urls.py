from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('Users.urls')), # Thêm dòng này để định tuyến API
    path('api/loan_application/', include('user_profile.urls'))
]
# ```
# eof

# ### 4. Hướng dẫn Frontend Fetch API

# Sau khi bạn chạy server Django, các endpoint sẽ có sẵn để frontend gọi:

# * **API Đăng ký**:
#     * **URL**: `http://localhost:8000/api/users/register/`
#     * **Method**: `POST`
#     * **Body (JSON)**:
#         ```json
#         {
#           "email": "user@example.com",
#           "password": "strongpassword123",
#           "full_name": "Nguyen Van A"
#         }
#         ```

# * **API Đăng nhập**:
#     * **URL**: `http://localhost:8000/api/users/login/`
#     * **Method**: `POST`
#     * **Body (JSON)**:
#         ```json
#         {
#           "email": "user@example.com",
#           "password": "strongpassword123"
#         }
#         ```
#     * **Phản hồi thành công**:
#         ```json
#         {
#           "token": "9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b"
#         }
#         ```
#         Frontend sẽ nhận được `token` này và lưu lại (ví dụ: trong `localStorage`) để sử dụng cho các yêu cầu API khác cần xác thực.

# Bạn có thể chạy các lệnh sau để áp dụng các thay đổi vào database:
# ```bash
# python manage.py makemigrations
# python manage.py migrate
# python manage.py runserver
