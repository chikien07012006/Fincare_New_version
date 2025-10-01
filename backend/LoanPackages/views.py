from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializer import LoanOptionSerializer
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .service import GeminiLoanService

class LoanOptionView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        option_id = request.query_params.get("id")
        if option_id:
            option = get_object_or_404(LoanOptionSerializer.Meta.model, pk=option_id)
            serializer = LoanOptionSerializer(option)
            return Response(serializer.data, status=status.HTTP_200_OK)

        options = LoanOptionSerializer.Meta.model.objects.all()
        serializer = LoanOptionSerializer(options, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = LoanOptionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class geminiView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Lấy token từ DRF auth (sẽ tự động xử lý nếu dùng TokenAuthentication)
        token = request.auth  # Nếu dùng TokenAuthentication, token sẽ được tự động lấy
        
        if not token:
            return JsonResponse({"error": "Token is required"}, status=401)

        # Lấy dữ liệu từ request body
        try:
            data = request.data
            application = data.get('loan_evaluation')
            loan_option = data.get('loan_option')
            if not application or not loan_option:
                return JsonResponse({"error": "Missing loan_evaluation or loan_option"}, status=400)
        except Exception:
            return JsonResponse({"error": "Invalid request data"}, status=400)

        service = GeminiLoanService()
        try:
            result = service.call_gemini_with_data(token.key, application, loan_option)  # Sử dụng token.key
            return JsonResponse({"result": result})
        except ValueError as e:
            return JsonResponse({"error": str(e)}, status=500)