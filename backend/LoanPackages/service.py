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


def build_prompt(loan_application: dict, loan_option: dict) -> str:
    """
    Build prompt string theo format bạn cung cấp.
    """
    prompt = f"""
You are a professional financial credit scoring assistant with over 15 years of experience in banking and loan evaluation. Your expertise includes assessing creditworthiness, calculating key financial ratios like DTI (Debt-to-Income ratio), LTV (Loan-to-Value ratio), analyzing credit history, employment stability, and matching applicant profiles to specific loan options. You provide objective, data-driven analysis, highlighting strengths, weaknesses, and actionable recommendations to improve approval chances.

Task: Given the loan applicant's profile from the loan_application data and the selected loan_option, analyze the match between the applicant and the loan. Calculate key financial indicators such as DTI, LTV. Provide a loan_readiness_score (0-100) based on how well the applicant's profile aligns with the loan's requirements (e.g., interest rate suitability, term feasibility, key requirements like minimum income). Provide breakdown scores for each category (0-100). Explain your reasoning in detail, referencing specific data points from the applicant's profile and the loan option. Finally, give improvement advice as a list of 4 specific, prioritized steps the applicant can take to boost their score and approval odds.

Applicant profile (loan_application data):
- User Type: {loan_application.get("userType")}
- Loan Type: {loan_application.get("loan_type")}
- Monthly Income: {loan_application.get("monthly_income")} VND
- Monthly Debt Payments: {loan_application.get("monthly_debt_payments")} VND
- CIC Group: {loan_application.get("cic_group")} (1=Excellent, 5=Bad)
- Credit History Months: {loan_application.get("credit_history_months")}
- Credit Utilization Percentage: {loan_application.get("credit_utilization_pct")}%
- Number of Late Payments in 24 Months: {loan_application.get("num_late_payments_24m")}
- Number of New Inquiries in 6 Months: {loan_application.get("num_new_inquiries_6m")}
- Credit Mix Types: {loan_application.get("credit_mix_types")}
- Loan Amount Requested: {loan_application.get("loan_amount")} VND
- Down Payment: {loan_application.get("down_payment")} VND
- Vehicle Value (if applicable): {loan_application.get("vehicle_value")} VND
- Property Value (if applicable): {loan_application.get("property_value")} VND
- Employment Type: {loan_application.get("employment_type")}
- Employment Duration Months: {loan_application.get("employment_duration_months")}
- Salary Payment Method: {loan_application.get("salary_payment_method")}
- Additional Info: {loan_application.get("additional_info")}
- Appraisal Doc: {loan_application.get("appraisal_doc")}

Selected Loan Option (loan_option data):
- Bank Name: {loan_option.get("bank_name")}
- Title: {loan_option.get("title")}
- Loan Type: {loan_option.get("loan_type")}
- Exclusive Interest Rate: {loan_option.get("exclusive_interest_rate")}
- Estimated Term: {loan_option.get("estimated_term")}
- Key Requirement: {loan_option.get("key_requirement")}
- Average Processing Time: {loan_option.get("average_processing_time")}

Key Calculations to Perform (include these in your analysis):
- DTI (Debt-to-Income Ratio): Calculate as (monthly_debt_payments / monthly_income) * 100. Ideal DTI is below 36%; above 50% is high risk.
- LTV (Loan-to-Value Ratio): Calculate as (loan_amount / collateral_value) * 100, where collateral_value is vehicle_value for car loans or property_value for real estate loans. Ideal LTV is below 80%.

Breakdown Scores to Calculate (each 0-100, include in output):
- Credit Score: Assess based on cic_group (1=100, 5=0), adjusted for credit_mix_types, num_late_payments_24m, num_new_inquiries_6m.
- Income Stability: Assess based on monthly_income relative to key_requirement (e.g., if income > key min income, high score), salary_payment_method (bank_transfer = high).
- Debt-to-Income: 100 - (DTI * 2) if DTI <50, else 0.
- Employment History: Assess based on employment_duration_months (ideal >24 =100, <6=0), employment_type (permanent=100, part-time=50).
- Credit Utilization: 100 if <30%, 50 if 30-50%, 0 if >50%.
- Payment History: 100 - (num_late_payments_24m * 20), min 0.

Scoring Guidelines for loan_readiness_score:
- Average of all breakdown scores, adjusted for match to loan_option (e.g., if DTI high and term long, deduct 10-20 points).
- 80-100: Excellent
- 60-79: Good
- 40-59: Fair
- 0-39: Poor

Reasoning Structure:
1. Summarize applicant's strengths and weaknesses based on key indicators (DTI, LTV, credit factors, employment).
2. Calculate and explain each breakdown score.
3. Compare to loan option's requirements and explain match.
4. Conclude with overall assessment.

Improvement Advice:
- Provide exactly 4 specific, actionable items tied to low breakdown scores (e.g., "To improve Debt-to-Income (75/100), reduce monthly debts by consolidating loans.").

Return the output strictly in JSON with the following fields:
- loan_readiness_score: number from 0 to 100
- dti: calculated DTI percentage (number, rounded to 2 decimals)
- ltv: calculated LTV percentage (number, rounded to 2 decimals, or null if no collateral)
- breakdown_scores: object with {{"credit_score": number, "income_stability": number, "debt_to_income": number, "employment_history": number, "credit_utilization": number, "payment_history": number}}
- reasoning: detailed text (300-500 words) explaining the score, calculations, breakdown, and match
- improvement_advice: array of exactly 4 strings, each a specific advice item
Ensure the response is a valid JSON object enclosed in triple backticks (```json ... ```) with no additional text outside the JSON.
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
