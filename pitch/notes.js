window.PITCH_NOTES = [
  {
    "slide": 1,
    "title": "Opening",
    "presenter": "Presenter 1",
    "target": 20,
    "script": "E-JUAN is a healthcare navigation and institutional care coordination concept for Davao City. A resident can move from a concern through care choices, funding, an appointment and prescribed medicine. Our aim is a clearer path for residents and accountable program records for sponsors. The screens are from our real interactive prototype, using fictional data.",
    "emphasis": [
      "One coordinated journey",
      "Davao City first",
      "Actual UI with fictional records"
    ],
    "sources": "Supplied pitch opening; actual renderAsk() screenshot."
  },
  {
    "slide": 2,
    "title": "The problem and its context",
    "presenter": "Presenter 1",
    "target": 30,
    "script": "Davao City has about 1.85 million residents. Nationally, households paid 41.2 percent of current healthcare spending out of pocket in 2025. These numbers give context; they do not prove demand for E-JUAN. Public services and private telehealth apps already exist. Our hypothesis is that people can still face friction moving between the right provider, eligibility, appointments, and medicines. We want to test whether coordinating these decisions makes existing care easier to reach.",
    "emphasis": [
      "Four decisions can create navigation friction",
      "Statistics provide context, not demand evidence"
    ],
    "sources": "PSA 2024 Davao City census: https://rsso11.psa.gov.ph/system/files/11RSSO-DEL-SUR/Attachments/SR-2025-08PSO24-040.pdf\nPSA 2025 National Health Accounts: https://psa.gov.ph/statistics/pnha\n41.2% describes current health expenditure."
  },
  {
    "slide": 3,
    "title": "The complete care journey",
    "presenter": "Presenter 2",
    "target": 15,
    "script": "The five steps are ask, match, check, consult and locate. All the screens here use fictional data. The interface demonstrates the journey, while actual public-first ranking, sponsorship verification, clinical handoff and stock confirmation remain proposed connected services. Residents with existing prescriptions can enter directly at medicine search.",
    "emphasis": [
      "Five connected steps",
      "All screens use fictional data",
      "Asterisks mark proposed connected capabilities"
    ],
    "sources": "Actual renderIntake(), renderRecommendation(), renderCoverage(), renderConsult() and renderPharmacies(). Supplied product-journey narrative."
  },
  {
    "slide": 4,
    "title": "Ask Juan: a clear starting point",
    "presenter": "Presenter 2",
    "target": 25,
    "script": "Juan starts with a concern and asks three short questions: who needs care, how long it has lasted, and whether there are warning signs. The demo uses local rules to organize the concern and show a next step. Urgent warning signs lead to separate urgent-care guidance. Juan does not diagnose, prescribe or operate an emergency service.",
    "emphasis": [
      "Three short intake questions",
      "Separate urgent-warning route",
      "Navigation rather than clinical decision-making"
    ],
    "sources": "Actual renderAsk(), renderIntake() and detectEmergency() in app.js. No connected AI model."
  },
  {
    "slide": 5,
    "title": "Match care and check the funding path",
    "presenter": "Presenter 2",
    "target": 25,
    "script": "The current interface shows fictional doctors and sample appointment slots. The proposed service would prioritize appropriate public or covered options. Standard booking can continue with a sample fee. Sponsored care requires approval of the beneficiary, provider, service, allowance and budget. YAKAP remains a separate primary-care pathway, and does not automatically approve LGU funding.",
    "emphasis": [
      "Keep standard, sponsored and YAKAP pathways separate",
      "LGU approval is explicitly fictional",
      "Public-first ranking remains proposed"
    ],
    "sources": "Actual renderRecommendation() and renderCoverage(); DESIGN_NOTES.md. https://www.philhealth.gov.ph/yakap/"
  },
  {
    "slide": 6,
    "title": "Review and consent before consultation",
    "presenter": "Presenter 2",
    "target": 25,
    "script": "The review screen brings together the provider, schedule, mode, care pathway and sample cost. Sharing the Ask Juan summary is optional and unchecked by default. In a connected service, the patient would consent to a short clinical handoff. Licensed clinicians would retain diagnosis and prescribing authority. This demo only creates local bookings and previews a simulated consultation.",
    "emphasis": [
      "Optional consent is unchecked by default",
      "Only clinicians diagnose and prescribe",
      "No real booking, transmission or charge"
    ],
    "sources": "Actual renderReview(), confirm-booking action and renderConsult(). The screenshot review.png shows the real unchecked consent control."
  },
  {
    "slide": 7,
    "title": "From prescription to medicine discovery",
    "presenter": "Presenter 2",
    "target": 25,
    "script": "A resident can open a prescription and search for medicine, or start from an existing prescription. The prototype shows example Paracetamol results with sample prices, distances, stock states and update ages. The intended next step is confirmation by a pharmacy partner before travel. Current listings are fictional and cannot guarantee availability or support dispensing.",
    "emphasis": [
      "Existing prescriptions can start here",
      "Stock state and freshness affect confidence",
      "Real pharmacy confirmation is proposed"
    ],
    "sources": "Actual renderPrescription() and renderPharmacies(). Only Paracetamol 500 mg has example results. No pharmacy inventory integration."
  },
  {
    "slide": 8,
    "title": "Sponsor accountability and role boundaries",
    "presenter": "Presenter 2",
    "target": 20,
    "script": "Sponsors would define which beneficiaries, providers and services qualify, then authorize visits within program limits. After a completed consultation, the proposed workflow would reconcile the booking and clinical payment against the budget. Sponsors need eligibility, booking and expenditure records. They do not need unrestricted medical histories. The current prototype has no sponsor dashboard or production access controls.",
    "emphasis": [
      "Approve funding before use",
      "Reconcile completed services with spending",
      "Sponsor access excludes unrestricted medical histories"
    ],
    "sources": "Institutional coordination and data-role boundaries from supplied product script and business-model narrative. Proposed workflow only."
  },
  {
    "slide": 9,
    "title": "Prototype today and pilot requirements",
    "presenter": "Presenter 2",
    "target": 20,
    "script": "The repository contains a working local interface with 23 screens. It demonstrates intake, filters, slots, funding options, consent, bookings and pharmacy states using fictional data. A connected pilot still needs approved partners, verified operations and secure records. We have no signed institutional customers or demonstrated clinical outcomes. The prototype supports testing the experience, not claiming deployment.",
    "emphasis": [
      "23 actual prototype screens",
      "Connected operations still need authorization",
      "No proven deployment, customers or patient outcomes"
    ],
    "sources": "Repository README.md, DESIGN_NOTES.md and app.js renderers. Supplied concept-stage claims baseline."
  },
  {
    "slide": 10,
    "title": "Competition and differentiation",
    "presenter": "Presenter 2",
    "target": 25,
    "script": "We are not claiming doctor booking or electronic prescriptions are new. NowServing and mWell already offer them—and mWell already serves LGUs. PhilHealth YAKAP and Davao City also provide public care. Our proposed value is a configurable coordination workflow that joins the right care options with sponsor rules, approved bookings, accountable spending, and local medicine availability. That combination must still beat the real alternatives: existing platforms and government in-house systems.",
    "emphasis": [
      "Existing platforms already deliver care",
      "mWell already serves LGUs",
      "Incremental coordination value must beat alternatives"
    ],
    "sources": "https://nowserving.ph/\nhttps://www.mwell.com.ph/lgu-community\nhttps://www.philhealth.gov.ph/yakap/\nhttps://davaocity.gov.ph/departments/social-services/city-health-office/"
  },
  {
    "slide": 11,
    "title": "Institution-funded software model",
    "presenter": "Presenter 3",
    "target": 30,
    "script": "Our proposed buyer is an LGU or healthcare program sponsor. In the illustrative month, 100 visits at 500 pesos cost 50,000 pesos in clinical services. A separate 10,000-peso monthly license brings sponsor spending to 60,000 pesos. E-JUAN revenue is only the 10,000-peso license before costs. At that volume, software adds 100 pesos per visit. All prices and willingness to pay remain unvalidated.",
    "emphasis": [
      "₱60,000 is sponsor spending",
      "₱10,000 is illustrated software revenue",
      "Clinical fees remain separate",
      "All prices hypothetical"
    ],
    "sources": "Supplied pitch financial assumptions. 100 × 500 = 50,000; 50,000 + 10,000 = 60,000; 10,000 / 100 = 100. Actual prototype sample provider fees differ."
  },
  {
    "slide": 12,
    "title": "Pilot evidence and responsible growth",
    "presenter": "Presenter 3",
    "target": 25,
    "script": "We begin with synthetic workflow testing, then seek an authorized provider-led Davao City pilot with a sponsor and pharmacies. We would measure navigation success, staff effort, completed-visit reconciliation, stock reliability and willingness to renew. Davao Region has 54 provincial, city and municipal LGU organizations. They are possible prospects, not customers. Expansion depends on evidence and a feasible institutional purchase.",
    "emphasis": [
      "Simulate, validate, then replicate",
      "Measure buyer value and renewal",
      "54 prospects does not mean 54 buyers"
    ],
    "sources": "PSA PSGC Davao Region: https://psa.gov.ph/classification/psgc/provinces/1100000000\n54 = 5 provinces + 6 cities + 43 municipalities. Proposed pilot subject to clinical and data-protection requirements."
  },
  {
    "slide": 13,
    "title": "Closing and the specific ask",
    "presenter": "Presenter 3",
    "target": 15,
    "script": "We are seeking one willing healthcare provider, one authorized institutional sponsor, and pharmacy partners to validate a credible Davao City pilot. That local test must establish easier navigation and value worth paying for. One concern. A clearer path to care.",
    "emphasis": [
      "One provider, one authorized sponsor and pharmacies",
      "One credible local test",
      "No signed partnerships claimed"
    ],
    "sources": "Supplied closing ask; actual renderHome() screenshot."
  }
];
