<div align="center">

# 🛡️ TRACE-IQ
### AI-Powered Banking Cyber Threat Investigation Platform

[![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

*Real-time threat correlation · AI-driven investigation · Banking fraud detection*

</div>

---

## 📌 What is Trace-IQ?

**Trace-IQ** is a **Security Operations Center (SOC) platform** built for the banking industry. When a suspicious login, privilege escalation, or fraudulent transaction occurs, Trace-IQ automatically:

1. 📥 **Ingests** security events (logins, device changes, privilege escalations)
2. 🔗 **Correlates** them with financial transactions across the same user
3. 🤖 **Classifies** the threat using an AI rule engine (Account Takeover, Insider Threat, etc.)
4. 📊 **Calculates** a risk score from individual signal weights
5. 🔍 **Identifies** the root cause automatically
6. 💡 **Generates** actionable remediation recommendations
7. 📋 **Presents** a full investigation case report — in seconds

> **Judges' Note:** This is a working prototype that demonstrates the complete flow from raw security events → AI correlation → investigation case → remediation. All data visible in the UI is fetched live from the Python backend.

---

## 🖥️ Live Demo Pages

| Page | URL | What It Shows |
|------|-----|---------------|
| **Dashboard** | `/` | SOC overview — live stats, threat charts, AI-correlated cases |
| **Investigations** | `/investigations` | AI-generated investigation case list |
| **Case Detail** | `/investigations/CASE-001` | Full AI report with timeline, risk breakdown, recommendations |
| **Security Events** | `/security-events` | Raw event feed with severity filtering |
| **Transactions** | `/transactions` | Financial monitor with risk-level auto-calculation |
| **Analytics** | `/analytics` | Threat intelligence dashboards & AI engine metrics |

---

## 🏗️ Architecture

```
TRACE-IQ/
├── backend/                    # Python FastAPI backend
│   ├── app/
│   │   ├── main.py             # FastAPI app, CORS, route registration
│   │   ├── models.py           # Pydantic models (SecurityEvent, Transaction, InvestigationCase)
│   │   ├── dummy_data.py       # Realistic banking scenario data
│   │   ├── routes/
│   │   │   ├── dashboard.py    # GET /api/dashboard
│   │   │   ├── investigation.py # GET /api/cases, GET /api/cases/{id}
│   │   │   ├── events.py       # GET /api/events
│   │   │   ├── transactions.py # GET /api/transactions
│   │   │   └── analysis.py     # GET /api/analytics
│   │   └── services/           # AI engine modules
│   │       ├── correlation.py  # Core: groups events by user, runs all AI services
│   │       ├── classifier.py   # Threat classification logic
│   │       ├── risk.py         # Risk score calculation (weighted signals)
│   │       ├── rootcause.py    # Root cause identification
│   │       ├── recommendation.py # Remediation recommendations
│   │       ├── timeline.py     # Chronological attack timeline builder
│   │       ├── behaviour.py    # Behavioural anomaly detection
│   │       └── summary.py      # AI executive summary generator
│   └── requirements.txt
│
└── frontend/                   # React + Vite frontend
    ├── src/
    │   ├── App.jsx             # Router + layout shell
    │   ├── api.js              # Axios API client
    │   ├── hooks/
    │   │   └── useApi.js       # Data fetching hook (loading/error states)
    │   ├── components/
    │   │   ├── layout/
    │   │   │   ├── Sidebar.jsx # Navigation with LIVE indicator
    │   │   │   └── Navbar.jsx  # AI badge + live clock
    │   │   └── dashboard/
    │   │       ├── DashboardCard.jsx   # KPI stat cards with glow
    │   │       ├── ThreatChart.jsx     # Bar/Pie/Line charts (Recharts)
    │   │       ├── Timeline.jsx        # Attack timeline component
    │   │       ├── AIInsightPanel.jsx  # AI summary + risk breakdown
    │   │       └── EventTable.jsx      # Security event table
    │   └── pages/
    │       ├── Dashboard.jsx       # SOC overview
    │       ├── Investigations.jsx  # Case list + case detail
    │       ├── SecurityEvents.jsx  # Event monitor
    │       ├── Transactions.jsx    # Transaction monitor
    │       └── Analytics.jsx       # Threat intelligence
    └── vite.config.js          # Vite proxy → backend :8000
```

---

## 🤖 AI Engine — How It Works

The AI correlation engine lives entirely in `backend/app/services/`. Here's the pipeline:

```
Security Events + Transactions
        │
        ▼
[correlation.py]  ←── Groups events & transactions by username
        │
        ├──▶ [behaviour.py]      → Detects anomalies (new device, privilege escalation, large TX)
        ├──▶ [classifier.py]     → Classifies threat type
        │         "Potential Account Takeover"
        │         "Insider Threat"
        │         "Suspicious Financial Activity"
        │         "Suspicious Login"
        ├──▶ [risk.py]           → Calculates weighted risk score (0–100)
        │         +35 Privilege Escalation
        │         +25 New Device Login
        │         +30 Large Transaction (≥₹10L)
        │         +10 Failed Login
        ├──▶ [rootcause.py]      → Identifies root cause (plain English)
        ├──▶ [recommendation.py] → Generates remediation steps
        ├──▶ [timeline.py]       → Builds chronological attack timeline
        └──▶ [summary.py]        → Generates AI executive summary
```

Each user in the dataset gets their own **InvestigationCase** — fully auto-generated.

---

## 🚀 Getting Started

### Prerequisites
- **Python 3.10+** (with `pip`)
- **Node.js 18+** (with `npm`)

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/balinekarunyajs-kars/Trace-IQ.git
cd Trace-IQ
```

---

### 2️⃣ Start the Backend

```bash
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Start the FastAPI server
uvicorn app.main:app --reload --port 8000
```

Backend will be available at:
- **API:** http://localhost:8000
- **Swagger Docs:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

---

### 3️⃣ Start the Frontend

Open a **new terminal**:

```bash
cd frontend

# Install Node dependencies
npm install

# Start the Vite dev server
npm run dev
```

Frontend will be available at: **http://localhost:5173/**

> The Vite dev server automatically proxies `/api/*` requests to the backend at `localhost:8000` — no CORS issues.

---

## 🔌 API Reference

All endpoints are prefixed with `/api`.

| Method | Endpoint | Description |
|--------|---------|-------------|
| `GET` | `/` | Health check |
| `GET` | `/health` | Service status |
| `GET` | `/api/dashboard` | Summary stats (events, transactions, critical count) |
| `GET` | `/api/cases` | All AI-generated investigation cases |
| `GET` | `/api/cases/{case_id}` | Full investigation detail for one case |
| `GET` | `/api/events` | All security events |
| `GET` | `/api/transactions` | All financial transactions |
| `GET` | `/api/analytics` | Threat distribution and risk breakdown charts |

**Example response — `GET /api/cases`:**
```json
[
  {
    "case": {
      "case_id": "CASE-001",
      "username": "Database Administrator",
      "threat": "Potential Account Takeover",
      "risk_score": 90,
      "root_cause": "Unauthorized privilege escalation.",
      "recommendations": [
        "Temporarily revoke privileged access.",
        "Require Multi-Factor Authentication.",
        "Place the transaction on hold for manual verification."
      ]
    },
    "behaviour_analysis": [
      "Login from a new device detected.",
      "Privilege escalation activity detected.",
      "Large transaction of ₹15,00,000 detected."
    ],
    "timeline": [ ... ],
    "risk_breakdown": {
      "Privilege Escalation": 35,
      "New Device Login": 25,
      "Large Transaction": 30
    },
    "confidence_score": 100,
    "executive_summary": "Database Administrator shows suspicious behaviour. ..."
  }
]
```

---

## 🎨 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Backend** | FastAPI (Python) | REST API, AI engine orchestration |
| **AI Engine** | Pure Python | Threat classification, risk scoring, root cause analysis |
| **Frontend** | React 19 + Vite 8 | SPA with fast HMR |
| **Styling** | TailwindCSS v4 | Utility-first dark theme |
| **Charts** | Recharts | Interactive threat visualisations |
| **Icons** | Lucide React | Consistent icon set |
| **HTTP** | Axios | API client with interceptors |
| **Routing** | React Router v7 | Client-side navigation |
| **Fonts** | Inter + JetBrains Mono | Premium typography |

---

## 🔮 Roadmap / Future Enhancements

- [ ] **Database integration** — Replace dummy data with PostgreSQL / MongoDB
- [ ] **Real-time alerts** — WebSocket push notifications for new critical events
- [ ] **ML-based classifier** — Replace rule-based AI with a trained scikit-learn model
- [ ] **Authentication** — SOC analyst login with role-based access control
- [ ] **Export reports** — PDF/CSV investigation report generation
- [ ] **API rate limiting** — Production-grade security hardening
- [ ] **Multi-bank support** — Multi-tenant architecture for financial institution onboarding

---

## 👥 Team

**Trace-IQ** — Built for the banking cybersecurity domain.

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

**Built with ❤️ for Banking Security**

*Trace-IQ — Because every threat leaves a trace.*

</div>
