from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializer import LoanApplicationSerializer, LoanEvaluationSerializer

class LoanApplyView(APIView): # Đây là một class-based view, chỉ xử lý các request HTTP được định nghĩa (ở đây là post).
    permission_classes = [IsAuthenticated] # Yêu cầu người dùng phải đăng nhập (authenticated) để truy cập view này.

    def post(self, request):
        serializer = LoanApplicationSerializer(data=request.data, context={"request": request}) # Tạo instance của LoanApplicationSerializer với dữ liệu từ request (request.data là JSON từ frontend).
        serializer.is_valid(raise_exception=True) # Kiểm tra dữ liệu hợp lệ (dựa trên validate trong serializer)
        app = serializer.save() # Gọi phương thức create của LoanApplicationSerializer
        # fetch last evaluation
        eval_obj = app.evaluations.latest('created_at') # Đối tượng loanevaluation mới nhất liên quan đến application này
        eval_ser = LoanEvaluationSerializer(eval_obj)
        # respond with application + evaluation summary
        return Response({
            "application_id": app.id,
            "baseline_score": eval_obj.baseline_score,
            "eligible": eval_obj.eligible,
            "knockout_reasons": eval_obj.knockout_reasons,
            "score_breakdown": eval_obj.score_breakdown,
        }, status=status.HTTP_201_CREATED)
