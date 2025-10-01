from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializer import LoanOptionSerializer
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .service import evaluate_with_gemini

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
        application = request.data.get("loan_evaluation")   # dict
        loan_option = request.data.get("loan_option")   # dict

        if not application or not loan_option:
            return Response({"error": "loan_evaluation and loan_option required"}, status=400)

        result = evaluate_with_gemini(application, loan_option)

        return Response(result, status=status.HTTP_200_OK)