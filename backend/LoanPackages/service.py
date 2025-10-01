import os
import json
import re
import logging
from google import genai
from google.genai import types

logger = logging.getLogger(__name__)

# Khởi tạo client 1 lần
client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))
MODEL = "gemini-2.5-pro"   # bạn có thể đổi thành model khác nếu cần


def build_prompt(loan_evaluation: dict, loan_option: dict) -> str:
    """
    Build prompt string theo format bạn cung cấp.
    """
    prompt = f"""
You are a financial credit scoring assistant.
Task: Given a loan applicant profile (with baseline score and breakdown) and a loan option, 
analyze and return a match_score (0-100), reasoning, and improvement advice. 

Applicant baseline evaluation:
- Application ID: {loan_evaluation.get("application_id")}
- Baseline Score: {loan_evaluation.get("baseline_score")}
- Eligible: {loan_evaluation.get("eligible")}
- Knockout Reasons: {loan_evaluation.get("knockout_reasons")}
- Score Breakdown: {loan_evaluation.get("score_breakdown")}

Loan Option:
- Bank: {loan_option.get("bank_name")}
- Title: {loan_option.get("title")}
- Loan Type: {loan_option.get("loan_type")}
- Exclusive Interest Rate: {loan_option.get("exclusive_interest_rate")}
- Estimated Term: {loan_option.get("estimated_term")}
- Key Requirement: {loan_option.get("key_requirement")}
- Average Processing Time: {loan_option.get("average_processing_time")}

Return the output strictly in JSON with the following fields:
- match_score: number from 0 to 100
- reasoning: detailed text explaining why with that score
- improvement_advice: list of 4-5 items to help the applicant improve their score
"""
    return prompt.strip()


def call_gemini(prompt: str, max_tokens: int = 500):
    """
    Gọi Gemini API với prompt text.
    """
    response = client.models.generate_content(
        model=MODEL,
        contents=prompt,
        config=types.GenerateContentConfig(max_output_tokens=max_tokens),
    )

    # Lấy text kết quả
    raw_text = None
    try:
        raw_text = response.candidates[0].content[0].text.strip()
    except Exception as e:
        logger.error("Gemini response parse error: %s", e)
        raw_text = str(response)

    # Parse JSON từ kết quả
    parsed = None
    try:
        parsed = json.loads(raw_text)
    except Exception:
        # Thử cắt chuỗi JSON giữa { ... }
        match = re.search(r"(\{.*\})", raw_text, re.DOTALL)
        if match:
            try:
                parsed = json.loads(match.group(1))
            except Exception:
                parsed = None

    return {"parsed_result": parsed, "raw_text": raw_text}


def evaluate_with_gemini(application: dict, loan_option: dict):
    """
    Hàm chính để gọi Gemini phân tích hồ sơ + loan option.
    """
    prompt = build_prompt(application, loan_option)
    result = call_gemini(prompt)
    return result
