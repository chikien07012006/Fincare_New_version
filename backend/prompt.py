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
- reasoning: detailed text explaining why with that scorce
- improvement_advice: list of 4-5 items to help the applicant improve their score
"""

import os
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
GEMINI_MODEL = os.environ.get("GEMINI_MODEL", "gemini-2.5-pro")  # tuỳ quyền của bạn

