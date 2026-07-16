// Dashboard Statistics
export const dashboardStats = {
  totalEvents: 245,
  activeInvestigations: 12,
  criticalThreats: 4,
  avgInvestigationTime: "5.8s",
};

// Investigation Cases
export const investigationCases = [
  {
    id: "CASE-001",
    threat: "Account Takeover",
    risk: 96,
    status: "Critical",
    analyst: "AI Engine",
  },
  {
    id: "CASE-002",
    threat: "Insider Threat",
    risk: 89,
    status: "High",
    analyst: "AI Engine",
  },
  {
    id: "CASE-003",
    threat: "Credential Theft",
    risk: 81,
    status: "Medium",
    analyst: "AI Engine",
  },
];

// Investigation Details
export const caseDetails = {
  id: "CASE-001",
  threat: "Account Takeover",
  risk: 96,
  status: "Critical",
  rootCause: "Compromised Credentials",

  evidence: [
    "Foreign Login",
    "New Device",
    "Privilege Escalation",
    "Database Access",
    "Large Transaction",
  ],

  timeline: [
    {
      time: "10:30",
      event: "Login",
    },
    {
      time: "10:31",
      event: "New Device Detected",
    },
    {
      time: "10:32",
      event: "Privilege Escalation",
    },
    {
      time: "10:33",
      event: "Database Access",
    },
    {
      time: "10:35",
      event: "₹15,00,000 Transfer",
    },
  ],

  recommendations: [
    "Freeze Transaction",
    "Reset Credentials",
    "Notify Security Operations Center",
  ],
};

// Security Events
export const securityEvents = [
  {
    id: "EVT-001",
    user: "Admin01",
    activity: "Login",
    severity: "Low",
  },
  {
    id: "EVT-002",
    user: "Admin01",
    activity: "Privilege Escalation",
    severity: "Critical",
  },
  {
    id: "EVT-003",
    user: "Vendor03",
    activity: "Database Access",
    severity: "High",
  },
];

// Transactions
export const transactions = [
  {
    id: "TX-1001",
    user: "Admin01",
    amount: "₹15,00,000",
    location: "Singapore",
    risk: "High",
  },
  {
    id: "TX-1002",
    user: "Employee14",
    amount: "₹4,50,000",
    location: "India",
    risk: "Medium",
  },
];