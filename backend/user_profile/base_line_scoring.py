from decimal import Decimal

CAR_CONFIG = {
    "dti_knockout": Decimal("0.40"),   # DTI > 40% thì loại
    "cic_knockout_min": 4,             # CIC từ nhóm 4 trở lên loại
    "down_payment_min_pct": Decimal("0.20"),  # trả trước <20% loại
}
REAL_ESTATE_LOAN_CONFIG = {
    "ltv_knockout_pct": Decimal("0.80"), # LTV >80% loại
    "dti_knockout": Decimal("0.50"),     # DTI >50% loại
    "cic_knockout_min": 3,               # CIC nhóm 3 trở lên loại
    "down_payment_min_pct": Decimal("0.20"),
}

def _safe_decimal(x):
    return Decimal(x) if x is not None else Decimal("0")

def compute_dti(monthly_debt_payments, monthly_income):
    monthly_income = _safe_decimal(monthly_income)
    if monthly_income == 0:
        return None
    return float((_safe_decimal(monthly_debt_payments) / monthly_income).quantize(Decimal("0.0001")))

def compute_ltv(loan_amount, collateral_value):
    collateral_value = _safe_decimal(collateral_value)
    if collateral_value == 0:
        return None
    return float((_safe_decimal(loan_amount) / collateral_value).quantize(Decimal("0.0001")))

### --- CAR scoring ---
def evaluate_car(application):
    """
    Returns dict:
    {
      "eligible": bool,
      "baseline_score": float,
      "knockout_reasons": [ ... ],
      "breakdown": { 'history': 35, 'dti': 30, ... }
    }
    """
    reasons = []
    # compute dti and ltv
    dti = compute_dti(application.monthly_debt_payments, application.monthly_income)
    ltv = None
    if application.vehicle_value:
        ltv = compute_ltv(application.loan_amount, application.vehicle_value)

    # Knock-out checks
    if application.cic_group >= CAR_CONFIG["cic_knockout_min"]:
        reasons.append("CIC group >= 4 (serious delinquency)")
    if dti is None:
        reasons.append("Monthly income is zero or missing")
    else:
        if Decimal(str(dti)) > CAR_CONFIG["dti_knockout"]:
            reasons.append(f"DTI > {float(CAR_CONFIG['dti_knockout'])*100:.0f}%")
    # down payment check (as percent of vehicle value)
    if application.vehicle_value and application.down_payment < (application.vehicle_value * CAR_CONFIG["down_payment_min_pct"]):
        reasons.append(f"Down payment < {int(CAR_CONFIG['down_payment_min_pct']*100)}% of vehicle value")

    if reasons:
        return {
            "eligible": False,
            "baseline_score": 0.0,
            "knockout_reasons": reasons,
            "breakdown": {}
        }

    # Baseline scoring (0-100)
    breakdown = {}

    # history (35 pts)
    if application.cic_group == 1 and application.num_late_payments_24m == 0:
        breakdown['history'] = 35
    elif application.cic_group == 2 or application.num_late_payments_24m <= 1:
        breakdown['history'] = 25
    else:
        breakdown['history'] = 15

    # dti (30 pts)
    if dti <= 0.30:
        breakdown['dti'] = 30
    else:
        breakdown['dti'] = 20

    # credit history length (15 pts)
    if application.credit_history_months >= 36:
        breakdown['history_length'] = 15
    elif application.credit_history_months >= 12:
        breakdown['history_length'] = 10
    else:
        breakdown['history_length'] = 5

    # credit mix (10 pts)
    if application.credit_mix_types >= 2:
        breakdown['credit_mix'] = 10
    else:
        breakdown['credit_mix'] = 5

    # new credit inquiries (10 pts)
    if application.num_new_inquiries_6m == 0:
        breakdown['new_credit'] = 10
    elif application.num_new_inquiries_6m <= 2:
        breakdown['new_credit'] = 7
    else:
        breakdown['new_credit'] = 5

    # qualitative bonus (0-10)
    bonus = 0
    # bonus:
    if application.down_payment and application.vehicle_value:
        dp_pct = Decimal(application.down_payment) / Decimal(application.vehicle_value)
        if dp_pct >= Decimal("0.30"):
            bonus += 5
    if application.employment_duration_months >= 12 and application.salary_payment_method == "bank_transfer":
        bonus += 5
    breakdown['bonus'] = bonus

    total = sum(breakdown.values())
    # cap at 100
    baseline_score = min(100.0, float(total))

    return {
        "eligible": True,
        "baseline_score": baseline_score,
        "knockout_reasons": [],
        "breakdown": breakdown
    }

### --- REAL ESTATE scoring ---
def evaluate_real_estate(application):
    reasons = []
    dti = compute_dti(application.monthly_debt_payments, application.monthly_income)
    ltv = None
    if application.property_value:
        ltv = compute_ltv(application.loan_amount, application.property_value)

    # Knock-outs
    if application.cic_group >= REAL_ESTATE_LOAN_CONFIG["cic_knockout_min"]:
        reasons.append("CIC group >= 3 (serious delinquency)")
    if dti is None:
        reasons.append("Monthly income missing or zero")
    else:
        if Decimal(str(dti)) > REAL_ESTATE_LOAN_CONFIG["dti_knockout"]:
            reasons.append(f"DTI > {float(REAL_ESTATE_LOAN_CONFIG['dti_knockout'])*100:.0f}%")
    if application.property_value:
        if Decimal(str(ltv)) > REAL_ESTATE_LOAN_CONFIG["ltv_knockout_pct"]:
            reasons.append(f"LTV > {int(REAL_ESTATE_LOAN_CONFIG['ltv_knockout_pct']*100)}%")
    if application.down_payment < (application.property_value or Decimal("0")) * REAL_ESTATE_LOAN_CONFIG["down_payment_min_pct"]:
        reasons.append(f"Down payment < {int(REAL_ESTATE_LOAN_CONFIG['down_payment_min_pct']*100)}%")

    if reasons:
        return {
            "eligible": False,
            "baseline_score": 0.0,
            "knockout_reasons": reasons,
            "breakdown": {}
        }

    breakdown = {}
    # Collateral (35)
    if Decimal(str(ltv)) <= Decimal("0.70"):
        breakdown['collateral'] = 35
    elif Decimal(str(ltv)) <= Decimal("0.80"):
        breakdown['collateral'] = 25
    else:
        breakdown['collateral'] = 0  

    # Capacity (30)
    if dti <= 0.35:
        breakdown['capacity'] = 30
    elif dti <= 0.43:
        breakdown['capacity'] = 20
    else:
        breakdown['capacity'] = 10

    # Character (20)
    if application.cic_group == 1 and application.num_late_payments_24m == 0:
        breakdown['character'] = 20
    elif application.cic_group == 2:
        breakdown['character'] = 15
    else:
        breakdown['character'] = 0

    # Capital (15)
    reserves_ok = False
    # assume reserves info is in additional_info (months_of_reserve)
    months_reserve = 0
    if application.additional_info and 'months_of_reserve' in application.additional_info:
        months_reserve = application.additional_info.get('months_of_reserve', 0)
    if application.down_payment and Decimal(application.down_payment) >= (application.property_value or Decimal("0")) * Decimal("0.30") and months_reserve >= 6:
        breakdown['capital'] = 15
    elif application.down_payment and Decimal(application.down_payment) >= (application.property_value or Decimal("0")) * Decimal("0.20") and months_reserve >= 3:
        breakdown['capital'] = 10
    else:
        breakdown['capital'] = 0

    # bonus
    bonus = 0
    if application.employment_duration_months >= 24:
        bonus += 5
    if application.credit_mix_types >= 2:
        bonus += 5
    breakdown['bonus'] = bonus

    total = sum(breakdown.values())
    baseline_score = min(100.0, float(total))
    return {
        "eligible": True,
        "baseline_score": baseline_score,
        "knockout_reasons": [],
        "breakdown": breakdown
    }
