# E-JUAN 13-slide speaker notes

Expanded to 13 slides so the on-slide story can be understood without narration. These notes adapt the supplied October 12, 2026 script to the expanded sequence. Three presenters remain; targets total 300 seconds. The original seven-slide script and Q&A follow as source material.

## Slide 1 - Opening

Presenter 1 | Target 20 seconds

E-JUAN is a healthcare navigation and institutional care coordination concept for Davao City. A resident can move from a concern through care choices, funding, an appointment and prescribed medicine. Our aim is a clearer path for residents and accountable program records for sponsors. The screens are from our real interactive prototype, using fictional data.

Emphasize:
- One coordinated journey
- Davao City first
- Actual UI with fictional records

Sources and limits:
Supplied pitch opening; actual renderAsk() screenshot.

## Slide 2 - The problem and its context

Presenter 1 | Target 30 seconds

Davao City has about 1.85 million residents. Nationally, households paid 41.2 percent of current healthcare spending out of pocket in 2025. These numbers give context; they do not prove demand for E-JUAN. Public services and private telehealth apps already exist. Our hypothesis is that people can still face friction moving between the right provider, eligibility, appointments, and medicines. We want to test whether coordinating these decisions makes existing care easier to reach.

Emphasize:
- Four decisions can create navigation friction
- Statistics provide context, not demand evidence

Sources and limits:
PSA 2024 Davao City census: https://rsso11.psa.gov.ph/system/files/11RSSO-DEL-SUR/Attachments/SR-2025-08PSO24-040.pdf
PSA 2025 National Health Accounts: https://psa.gov.ph/statistics/pnha
41.2% describes current health expenditure.

## Slide 3 - The complete care journey

Presenter 2 | Target 15 seconds

The five steps are ask, match, check, consult and locate. All the screens here use fictional data. The interface demonstrates the journey, while actual public-first ranking, sponsorship verification, clinical handoff and stock confirmation remain proposed connected services. Residents with existing prescriptions can enter directly at medicine search.

Emphasize:
- Five connected steps
- All screens use fictional data
- Asterisks mark proposed connected capabilities

Sources and limits:
Actual renderIntake(), renderRecommendation(), renderCoverage(), renderConsult() and renderPharmacies(). Supplied product-journey narrative.

## Slide 4 - Ask Juan: a clear starting point

Presenter 2 | Target 25 seconds

Juan starts with a concern and asks three short questions: who needs care, how long it has lasted, and whether there are warning signs. The demo uses local rules to organize the concern and show a next step. Urgent warning signs lead to separate urgent-care guidance. Juan does not diagnose, prescribe or operate an emergency service.

Emphasize:
- Three short intake questions
- Separate urgent-warning route
- Navigation rather than clinical decision-making

Sources and limits:
Actual renderAsk(), renderIntake() and detectEmergency() in app.js. No connected AI model.

## Slide 5 - Match care and check the funding path

Presenter 2 | Target 25 seconds

The current interface shows fictional doctors and sample appointment slots. The proposed service would prioritize appropriate public or covered options. Standard booking can continue with a sample fee. Sponsored care requires approval of the beneficiary, provider, service, allowance and budget. YAKAP remains a separate primary-care pathway, and does not automatically approve LGU funding.

Emphasize:
- Keep standard, sponsored and YAKAP pathways separate
- LGU approval is explicitly fictional
- Public-first ranking remains proposed

Sources and limits:
Actual renderRecommendation() and renderCoverage(); DESIGN_NOTES.md. https://www.philhealth.gov.ph/yakap/

## Slide 6 - Review and consent before consultation

Presenter 2 | Target 25 seconds

The review screen brings together the provider, schedule, mode, care pathway and sample cost. Sharing the Ask Juan summary is optional and unchecked by default. In a connected service, the patient would consent to a short clinical handoff. Licensed clinicians would retain diagnosis and prescribing authority. This demo only creates local bookings and previews a simulated consultation.

Emphasize:
- Optional consent is unchecked by default
- Only clinicians diagnose and prescribe
- No real booking, transmission or charge

Sources and limits:
Actual renderReview(), confirm-booking action and renderConsult(). The screenshot review.png shows the real unchecked consent control.

## Slide 7 - From prescription to medicine discovery

Presenter 2 | Target 25 seconds

A resident can open a prescription and search for medicine, or start from an existing prescription. The prototype shows example Paracetamol results with sample prices, distances, stock states and update ages. The intended next step is confirmation by a pharmacy partner before travel. Current listings are fictional and cannot guarantee availability or support dispensing.

Emphasize:
- Existing prescriptions can start here
- Stock state and freshness affect confidence
- Real pharmacy confirmation is proposed

Sources and limits:
Actual renderPrescription() and renderPharmacies(). Only Paracetamol 500 mg has example results. No pharmacy inventory integration.

## Slide 8 - Sponsor accountability and role boundaries

Presenter 2 | Target 20 seconds

Sponsors would define which beneficiaries, providers and services qualify, then authorize visits within program limits. After a completed consultation, the proposed workflow would reconcile the booking and clinical payment against the budget. Sponsors need eligibility, booking and expenditure records. They do not need unrestricted medical histories. The current prototype has no sponsor dashboard or production access controls.

Emphasize:
- Approve funding before use
- Reconcile completed services with spending
- Sponsor access excludes unrestricted medical histories

Sources and limits:
Institutional coordination and data-role boundaries from supplied product script and business-model narrative. Proposed workflow only.

## Slide 9 - Prototype today and pilot requirements

Presenter 2 | Target 20 seconds

The repository contains a working local interface with 23 screens. It demonstrates intake, filters, slots, funding options, consent, bookings and pharmacy states using fictional data. A connected pilot still needs approved partners, verified operations and secure records. We have no signed institutional customers or demonstrated clinical outcomes. The prototype supports testing the experience, not claiming deployment.

Emphasize:
- 23 actual prototype screens
- Connected operations still need authorization
- No proven deployment, customers or patient outcomes

Sources and limits:
Repository README.md, DESIGN_NOTES.md and app.js renderers. Supplied concept-stage claims baseline.

## Slide 10 - Competition and differentiation

Presenter 2 | Target 25 seconds

We are not claiming doctor booking or electronic prescriptions are new. NowServing and mWell already offer them—and mWell already serves LGUs. PhilHealth YAKAP and Davao City also provide public care. Our proposed value is a configurable coordination workflow that joins the right care options with sponsor rules, approved bookings, accountable spending, and local medicine availability. That combination must still beat the real alternatives: existing platforms and government in-house systems.

Emphasize:
- Existing platforms already deliver care
- mWell already serves LGUs
- Incremental coordination value must beat alternatives

Sources and limits:
https://nowserving.ph/
https://www.mwell.com.ph/lgu-community
https://www.philhealth.gov.ph/yakap/
https://davaocity.gov.ph/departments/social-services/city-health-office/

## Slide 11 - Institution-funded software model

Presenter 3 | Target 30 seconds

Our proposed buyer is an LGU or healthcare program sponsor. In the illustrative month, 100 visits at 500 pesos cost 50,000 pesos in clinical services. A separate 10,000-peso monthly license brings sponsor spending to 60,000 pesos. E-JUAN revenue is only the 10,000-peso license before costs. At that volume, software adds 100 pesos per visit. All prices and willingness to pay remain unvalidated.

Emphasize:
- ₱60,000 is sponsor spending
- ₱10,000 is illustrated software revenue
- Clinical fees remain separate
- All prices hypothetical

Sources and limits:
Supplied pitch financial assumptions. 100 × 500 = 50,000; 50,000 + 10,000 = 60,000; 10,000 / 100 = 100. Actual prototype sample provider fees differ.

## Slide 12 - Pilot evidence and responsible growth

Presenter 3 | Target 25 seconds

We begin with synthetic workflow testing, then seek an authorized provider-led Davao City pilot with a sponsor and pharmacies. We would measure navigation success, staff effort, completed-visit reconciliation, stock reliability and willingness to renew. Davao Region has 54 provincial, city and municipal LGU organizations. They are possible prospects, not customers. Expansion depends on evidence and a feasible institutional purchase.

Emphasize:
- Simulate, validate, then replicate
- Measure buyer value and renewal
- 54 prospects does not mean 54 buyers

Sources and limits:
PSA PSGC Davao Region: https://psa.gov.ph/classification/psgc/provinces/1100000000
54 = 5 provinces + 6 cities + 43 municipalities. Proposed pilot subject to clinical and data-protection requirements.

## Slide 13 - Closing and the specific ask

Presenter 3 | Target 15 seconds

We are seeking one willing healthcare provider, one authorized institutional sponsor, and pharmacy partners to validate a credible Davao City pilot. That local test must establish easier navigation and value worth paying for. One concern. A clearer path to care.

Emphasize:
- One provider, one authorized sponsor and pharmacies
- One credible local test
- No signed partnerships claimed

Sources and limits:
Supplied closing ask; actual renderHome() screenshot.

---

## Original supplied seven-slide script and judge Q&A

# E-JUAN speaker notes

Source: E-JUAN_Persuasive_Pitch_Script_and_QA.pdf, October 12, 2026. Original script and presenter assignments preserved. Rehearsal targets total 300 seconds.

## Slide 1 - Opening

Presenter 1 | 20-25 seconds | rehearsal target 25 seconds

One health concern can lead to several decisions: where to go, which doctor to see, what care is covered, and where to get medicine. E-JUAN proposes one guided path through those decisions. We are starting with Davao City.

## Slide 2 - Problem and evidence

Presenter 1 | 40-45 seconds | rehearsal target 45 seconds

Davao City has about 1.85 million residents. Nationally, households paid 41.2 percent of current healthcare spending out of pocket in 2025. These numbers give context; they do not prove demand for E-JUAN. Public services and private telehealth apps already exist. Our hypothesis is that people can still face friction moving between the right provider, eligibility, appointments, and medicines. We want to test whether coordinating these decisions makes existing care easier to reach.

## Slide 3 - Product journey

Presenter 2 | 60-65 seconds | rehearsal target 65 seconds

Here is our proposed patient journey. A resident describes a non-emergency concern to Juan, who organizes the information and suggests appropriate care options, without diagnosing. E-JUAN presents existing covered services first. Where a separate sponsored consultation program exists, it checks the institution’s eligibility rules, visit allowance, and budget before requesting an appointment. With the patient’s consent, the doctor receives a short intake summary. Only the licensed clinician diagnoses and prescribes. Afterward, the patient can search for prescribed medicine and request stock confirmation from nearby partner pharmacies. Someone with an existing prescription may start from medicine search directly. Behind the scenes, the sponsor receives eligibility, booking, and expenditure records—not unrestricted medical histories. All the screens here use fictional data.

## Slide 4 - Competition

Presenter 2 | 35-40 seconds | rehearsal target 40 seconds

We are not claiming doctor booking or electronic prescriptions are new. NowServing and mWell already offer them—and mWell already serves LGUs. PhilHealth YAKAP and Davao City also provide public care. Our proposed value is a configurable coordination workflow that joins the right care options with sponsor rules, approved bookings, accountable spending, and local medicine availability. That combination must still beat the real alternatives: existing platforms and government in-house systems.

## Slide 5 - Business model

Presenter 3 | 55-60 seconds | rehearsal target 55 seconds

Our initial paying-customer hypothesis is an LGU or healthcare program sponsor, not the patient. We propose a fixed software license, separate from doctors’ compensation. Consider this purely illustrative month: 100 completed consultations at 500 pesos each cost the sponsor 50,000 pesos in clinical services. A proposed 10,000- peso E-JUAN license brings total institutional spending to 60,000 pesos, while E-JUAN revenue is only the 10,000- peso license, before costs. At that volume, software adds 100 pesos per visit. Why would a sponsor pay? Only if easier program administration, eligible bookings, and reliable records justify that cost. Buyer willingness and these prices remain unvalidated. No percentage of professional fees is assumed.

## Slide 6 - Pilot and growth

Presenter 3 | 45-50 seconds | rehearsal target 45 seconds

We start with a small Davao City workflow test using synthetic records and supervised usability sessions. Then we would seek approval for a provider-led pilot with an institutional sponsor and pharmacy partners, subject to clinical and data-protection requirements. We would measure navigation success, staff minutes per booking, reconciled completed consultations, and confirmed medicine availability. Expansion would follow only after measurable benefit and a viable purchasing path. Davao Region has 54 provincial, city, and municipal LGU organizations; that is a prospect universe, not 54 customers. Our key gate is whether a sponsor has the need, budget, procurement authority, and reason to renew.

## Slide 7 - Closing and ask

Presenter 3 | 20-25 seconds | rehearsal target 25 seconds

Our goal isn’t citywide rollout. It’s one credible local test—with a provider, an authorized sponsor, and pharmacies ready to validate the workflow. If we prove easier access and value worth paying for, E-JUAN can grow responsibly. One concern. A clearer path to care. Thank you.

## Judge Q&A and source check


Why would an LGU pay if YAKAP services already exist?
Our proposal is to help residents navigate covered care first, then coordinate only approved supplemental visits 
where a documented gap exists. The software purchase is justified only if it improves program coordination 
enough to be worth its cost. That remains to be tested.
How are you different from NowServing or mWell?
We do not claim novelty in teleconsultations, doctor discovery, or medicine services. mWell already offers 
solutions for LGUs. Our proposed focus is a configurable institution-led workflow connecting care options, funding 
eligibility, approved bookings, service records, and local medicine confirmation. We need pilot evidence to prove it 
is better for a particular buyer.
Where did the ₱10,000 license and ₱500 visit price come from?
They are modeling assumptions from the original concept, not supplier quotations or negotiated agreements. The 
proposed pilot will test buyer value and provider compensation before pricing is finalized.
Does 54 LGUs mean 54 customers?
No. It represents a possible regional institutional prospect universe. Davao City is a single government buyer, and 
we currently have zero signed institutional customers. The market must be qualified bottom-up by need, budget, 
and procurement feasibility.
Is the AI diagnosing or issuing prescriptions?
No. Juan is intended to organize patient intake and navigate care options. Emergency concerns require urgent-care 
guidance. Licensed clinicians retain clinical decisions and prescribing authority; sensitive patient data must be 
protected.
Do you already have institutional partners or a functioning application?
No. E-JUAN is at the concept stage. The visuals use fictional data. We are proposing supervised workflow testing 
followed by a formally authorized pilot if clinical, funding, and data-protection arrangements can be secured.
What determines whether E-JUAN is worth paying for?
Pilot evidence: patient navigation success, administrative minutes per booking, successfully reconciled funded 
visits, pharmacy stock confirmation reliability, and—most importantly—whether a qualified institutional buyer is 
willing to pay and renew.
Source and claims check
 PSA 2024 Census (Davao City, 1,848,947): https://rsso11.psa.gov.ph/content/2024-census-population-popcen-
official-population-counts-city-davao
 PSA 2025 National Health Accounts (41.2% out-of-pocket current expenditure): 
https://psa.gov.ph/content/government-contributes-465-percent-countrys-current-health-spending-2025
 mWell LGU community offerings: https://www.mwell.com.ph/lgu-community
 Davao City Health Office: https://davaocity.gov.ph/departments/social-services/city-health-office/
 Davao Region LGU composition: https://psa.gov.ph/classification/psgc/regions
 Concept-derived assumptions: ₱10,000 institutional monthly license; ₱500 separately paid clinical consultation; 
100 illustrative monthly visits; proposed partnerships and pilot. None are contracted facts.