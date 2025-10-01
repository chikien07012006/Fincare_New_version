import os
import google.genai as genai  # Note: new import path
from google.genai import types  # For GenerateContentConfig

class GeminiLoanService:
    def __init__(self):
        # Cấu hình API key (từ biến môi trường)
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        self.model = "gemini-2.5-flash"  # Hoặc "gemini-1.5-pro" nếu bạn có quyền truy cập

    def call_gemini_with_data(self, token, application, loan_option):
        # Bước 3: Kết hợp vào prompt (sử dụng dữ liệu trực tiếp)
        prompt = f"""
You are a financial credit scoring assistant.
Task: Given a loan applicant profile (with baseline score and breakdown) and a loan option, 
analyze and return a match_score (0-100), reasoning, and improvement advice. 

Applicant baseline evaluation:
- Application ID: {application["application_id"]}
- Baseline Score: {application["baseline_score"]}
- Eligible: {application["eligible"]}
- Knockout Reasons: {application["knockout_reasons"]}
- Score Breakdown: {application["score_breakdown"]}

Loan Option:
- Bank: {loan_option["bank_name"]}
- Title: {loan_option["title"]}
- Loan Type: {loan_option["loan_type"]}
- Exclusive Interest Rate: {loan_option["exclusive_interest_rate"]}
- Estimated Term: {loan_option["estimated_term"]}
- Key Requirement: {loan_option["key_requirement"]}
- Average Processing Time: {loan_option["average_processing_time"]}

Return the output strictly in JSON with the following fields:
- match_score: number from 0 to 100
- reasoning: detailed text explaining why with that score
- improvement_advice: list of 4-5 items to help the applicant improve their score
"""
        
        # Bước 4: Gọi Gemini API với JSON mode
        generation_config = types.GenerateContentConfig(  # Updated class
            response_mime_type="application/json"
        )
        
        model = genai.GenerativeModel(self.model)
        try:
            response = model.generate_content(
                prompt,
                generation_config=generation_config
            )
            return response.text
        except Exception as e:
            raise ValueError(f"Gemini API error: {str(e)}")