# Fincare

## Overview
This prototype implements a **Loan Recommendation System** designed to match individual loan applicants with suitable banking products based on their financial profile. The system integrates traditional rule-based filtering with advanced machine learning techniques (vector similarity search) and AI-driven analysis (via Google's Gemini Large Language Model API) to provide personalized loan options and detailed approval assessments.

### High-Level Explanation
The system processes user loan applications through a multi-stage pipeline to recommend tailored loan options and generate a comprehensive analysis. Here's how it works at a high level:

#### System Architecture and Flow
1. **User Input and Profile Retrieval**:
   - The frontend (React/Next.js app) collects user data via a loan application form (e.g., income, debt, credit history, loan type).
   - This data is stored in a **MySQL database** via the Django backend.

2. **Feature Extraction and Normalization**:
   - Upon submission, the Django backend extracts key features from the user profile (e.g., DTI ratio, LTV ratio, CIC group score).
   - Features are normalized (e.g., scaled to 0-1 range) to ensure consistency for similarity computations.

3. **Vectorization and Cosine Similarity Search**:
   - User features are vectorized (e.g., using TF-IDF or embeddings) and compared against a pre-computed vector database of historical applicant profiles.
   - **Cosine similarity search** identifies the top-K most similar profiles to the current user.
   - This step finds patterns in successful/approved loans from similar users.

4. **Rule-Based Filtering**:
   - Recommended loan options (from a predefined catalog in the MySQL DB) are filtered using business rules:
     - Match loan type (e.g., car, real estate).
     - Check eligibility (e.g., minimum income, DTI < 36%, LTV < 80%).
     - Rank by estimated approval score (e.g., based on similarity + rules).
   - Filtered options are returned to the frontend for display (grid/table view).

5. **AI-Driven Analysis (Gemini LLM Integration)**:
   - When a user selects a loan option, the combined user profile and loan details are sent to the **Gemini Large Language Model API** via a Django endpoint (e.g., `/api/loan_options/gemini/`).
   - Gemini generates:
     - **Loan Readiness Score** (0-100): Overall alignment score.
     - **Breakdown Scores**: Sub-scores for credit, income stability, DTI, employment, utilization, and payment history.
     - **DTI/LTV Calculations**: Key ratios with explanations.
     - **Reasoning**: Detailed narrative on strengths/weaknesses and match fit.
     - **Improvement Advice**: 4 prioritized actionable steps.
   - Results are stored in localStorage and rendered on the `/dashboard-individual/analysis` page with visualizations (radar/bar charts, progress bars).

6. **Frontend Visualization and Interaction**:
   - **Loan Options Page** (`/dashboard-individual/loan-options`): Displays filtered options in grid/table view with apply buttons.
   - **Analysis Page** (`/dashboard-individual/analysis`): Shows scores, charts (using Chart.js/react-chartjs-2), formatted reasoning, and recommendations.
   - Navigation: Back/apply buttons for seamless UX.

#### Key Technologies
- **Backend**: Django (Python), MySQL (DB), Gemini API for LLM analysis.
- **Frontend**: Next.js (React), Tailwind CSS (styling), Chart.js (visualizations).
- **Data Flow**: Frontend → Django API → MySQL/Gemini → Response → localStorage for state persistence.
- **Assumptions**: Prototype assumes localhost backend (`http://localhost:8000`). Production would use secure auth (e.g., Django JWT) and cloud DB (e.g., AWS RDS).

#### Diagram Reference
The provided diagram illustrates the end-to-end flow:
- **Start**: Client user profile → MySQL.
- **Processing**: Feature extraction → Normalization → Vectorization → Cosine similarity → Top-K profiles → Rule-based filtering.
- **AI Layer**: Gemini LLM API for analysis.
- **End**: Ranked loan options + analysis results.

This prototype demonstrates a scalable MVP for financial recommendation systems, blending ML similarity with AI explainability for better user trust.

## Setup and Use Instructions
### Prerequisites
- Node.js (v18+)
- Python 3.10+ (for Django backend)
- MySQL 8.0+ (database)
- API Key for Google Gemini (free tier available at [Google AI Studio](https://aistudio.google.com/))

### Backend Setup (Django)
1. Clone/Navigate to backend repo (if separate; otherwise, assume integrated).
2. Install dependencies:
   ```
   pip install django==4.2.24 django-cors-headers==4.9.0 djangorestframework==3.16.1 mysql-connector-python==9.4.0 mysqlclient==2.2.7 google-genai==1.39.1 google-auth==2.41.1 requests==2.32.5 tenacity==9.1.2 pydantic==2.11.9 pydantic_core==2.33.2 annotated-types==0.7.0 anyio==4.11.0 asgiref==3.9.2 cachetools==6.2.0 certifi==2025.8.3 charset-normalizer==3.4.3 h11==0.16.0 httpcore==1.0.9 httpx==0.28.1 idna==3.10 pyasn1==0.6.1 pyasn1_modules==0.4.2 rsa==4.9.1 sniffio==1.3.1 sqlparse==0.5.3 typing_extensions==4.15.0 typing-inspection==0.4.1 tzdata==2025.2 urllib3==2.5.0 websockets==15.0.1
   ```
   - Note: Use exact versions to avoid compatibility issues. Run `pip install -r requirements.txt` if a `requirements.txt` file is provided.
3. Configure `.env` or `settings.py`:
   ```
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.mysql',
           'NAME': 'loan_db',
           'USER': 'root',
           'PASSWORD': 'your_password',
           'HOST': 'localhost',
           'PORT': '3306',
       }
   }
   GEMINI_API_KEY=your_gemini_key
   ```
4. Initialize MySQL DB:
   - Create schema with tables for `users`, `loan_applications`, `loan_options`.
   - Sample SQL:
     ```sql
     CREATE DATABASE loan_db;
     USE loan_db;
     CREATE TABLE loan_options (
       id INT PRIMARY KEY AUTO_INCREMENT,
       bank_name VARCHAR(255),
       product_name VARCHAR(255),
       loan_type VARCHAR(50),
       interest_rate VARCHAR(50)
       -- Add other fields...
     );
     -- Insert mock data from code snippets.
     ```
5. Apply migrations:
   ```
   python manage.py makemigrations
   python manage.py migrate
   ```
6. Run backend:
   ```
   python manage.py runserver 0.0.0.0:8000
   ```
   - Endpoints: `/api/loan_options/` (GET loan options), `/api/loan_options/gemini/` (POST analysis).

### Frontend Setup (Next.js)
1. Clone/Navigate to frontend directory (`app/dashboard-individual/`).
2. Install dependencies:
   ```
   npm install
   ```
   - Includes `react-chartjs-2 chart.js` for charts, `@/components/ui/*` for Shadcn/UI.
3. Configure (if needed): Update API base URL in fetch calls (e.g., `http://localhost:8000`).
4. Run dev server:
   ```
   npm run dev
   ```
   - Access at `http://localhost:3000/dashboard-individual/loan-options`.

### Usage Flow
1. **Submit Loan Application** (from form page, not shown): Saves to localStorage as `loanFormData`.
2. **View Loan Options**: Navigate to `/dashboard-individual/loan-options` → See filtered cards/table → Click "Apply now".
3. **View Analysis**: Redirects to `/dashboard-individual/analysis` → Displays scores, charts, reasoning, and advice.
4. **Debug**: Check browser console for API logs; verify localStorage for `loanFormData`.

### Troubleshooting
- **CORS Issues**: Ensure `django-cors-headers` is configured in `settings.py` (e.g., `CORS_ALLOWED_ORIGINS = ["http://localhost:3000"]`).
- **Gemini API Errors**: Ensure API key is valid; handle rate limits.
- **Charts Not Rendering**: Verify `chart.js` versions; restart dev server.
- **DB Connection**: Test MySQL with `mysql -u root -p`.

## Disclosure of AI Tool Use
This prototype was developed with assistance from **Grok** (built by xAI), an AI assistant used for:
- Code generation and debugging (e.g., React components like `AnalysisPage.tsx`, Chart.js integrations).
- Architecture advice (e.g., frontend-backend flow, error handling).
- UI/UX suggestions (e.g., formatting reasoning text, responsive layouts).

**Permitted Use Compliance**: Per guidelines, Grok was used solely for prototyping and documentation. All core logic (e.g., similarity search, rule filtering) is implemented manually. No AI-generated code was used for production-critical decisions or sensitive data handling. Gemini API is explicitly integrated for analysis (disclosed above). Human oversight ensured accuracy, with manual testing for financial calculations (DTI/LTV).

For questions, contact [24kien.dhc@vinuni.edu.vn]. 
