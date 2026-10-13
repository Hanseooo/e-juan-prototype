# E-JUAN 24-slide speaker notes

Problem first, then the product introduction, need, opportunity and feasibility. Three presenters. Rehearsal targets total 300 seconds.

## Slide 1 - One health concern. Several decisions

Presenter 1 | Target 10 seconds

One health concern can lead to several decisions. Before someone reaches care, they have to work out where to start. We are focusing on this navigation problem in Davao City.

Sources and limits:
Original supplied problem narrative. Navigation friction is a hypothesis to validate.

## Slide 2 - Finding care. Understanding coverage

Presenter 1 | Target 10 seconds

Finding a provider is one decision. Understanding coverage is another. Public services already exist, but residents still need to understand which option fits and which program rules apply.

Sources and limits:
Original problem and product script. No measured access-friction claim.

## Slide 3 - A prescription leaves another decision

Presenter 1 | Target 10 seconds

The journey continues after the consultation. A prescription still leaves the resident looking for a pharmacy and checking whether the medicine is available. That is the final gap our proposed journey addresses.

Sources and limits:
Original medicine-navigation narrative.

## Slide 4 - One concern. A clearer path to care

Presenter 1 | Target 12 seconds

E-JUAN proposes a guided journey from a concern to care and prescribed medicine. Residents get a clearer next step. Institutions get a proposed way to coordinate approved visits and spending. The screen comes from our actual prototype, with fictional data.

Sources and limits:
Original opening and actual renderAsk() screenshot.

## Slide 5 - Davao City is our starting point

Presenter 1 | Target 12 seconds

Davao City had 1,848,947 residents in the 2024 census. That gives us a clear local starting point. It does not mean all residents need or will use E-JUAN. Interviews and pilot participation must establish the actual audience.

Sources and limits:
https://rsso11.psa.gov.ph/content/2024-census-population-popcen-official-population-counts-city-davao

## Slide 6 - Households carry a substantial share

Presenter 1 | Target 12 seconds

Nationally, households paid 41.2 percent of current health spending out of pocket in 2025. This supports the importance of clear care and funding choices. It is a national spending measure, not the share of Davao residents paying or proof that our software reduces costs.

Sources and limits:
https://psa.gov.ph/sites/default/files/infographics/2025%20PNHA%20Infographics-signed.pdf

## Slide 7 - A regional prospect universe

Presenter 1 | Target 12 seconds

Davao Region has 54 provincial, city and municipal LGU organizations. That is a possible prospect universe, not 54 customers. We would qualify each sponsor by its program need, budget, purchasing authority and reason to renew. Davao City is our initial focus.

Sources and limits:
https://psa.gov.ph/classification/psgc/provinces/1100000000

## Slide 8 - An institution-funded software license

Presenter 2 | Target 14 seconds

Our proposed buyer is an LGU or healthcare program sponsor. The original concept assumes a ten-thousand-peso monthly software license. Clinical payments remain separate. This is a proposed price to test with buyers, not a quotation, contract or established revenue.

Sources and limits:
Original concept financial assumptions.

## Slide 9 - Care spending and software revenue

Presenter 2 | Target 16 seconds

In an illustrative month, one hundred consultations at five hundred pesos cost fifty thousand pesos in clinical services. Add the ten-thousand-peso software license and the sponsor spends sixty thousand pesos. E-JUAN revenue is only the software license before costs.

Sources and limits:
Original assumptions. 100 × 500 = 50,000; 50,000 + 10,000 = 60,000. Prototype provider fees differ.

## Slide 10 - Software cost per visit

Presenter 2 | Target 12 seconds

At one hundred consultations, the assumed license adds one hundred pesos in software cost per visit. The commercial question is whether easier administration and reliable records justify that cost. We still need to validate delivery costs and profitability.

Sources and limits:
Derived from original concept assumptions: 10,000 / 100 = 100.

## Slide 11 - Five steps through care

Presenter 2 | Target 10 seconds

The five steps are ask, match, check, consult and locate. The prototype demonstrates the experience. Actual care, sponsorship checks and stock confirmation require connected partners. Someone who already has a prescription can begin at medicine search.

Sources and limits:
Original product journey; actual prototype.

## Slide 12 - A clearer starting point

Presenter 2 | Target 12 seconds

Juan organizes the concern with three short questions: who needs care, duration and warning signs. This guides navigation. It does not diagnose. The current app uses local demonstration rules, with a separate urgent-care route for warning signs.

Sources and limits:
Actual renderIntake(); original script.

## Slide 13 - Compare appropriate care options

Presenter 2 | Target 12 seconds

The resident can compare doctors and sample appointment slots. In the intended connected service, available public or covered care comes first, followed by relevant participating providers. That ranking still needs real service information and partners.

Sources and limits:
Actual renderRecommendation(); original product script.

## Slide 14 - Review the funding pathway

Presenter 2 | Target 16 seconds

Funding follows its own rules. A sponsored consultation requires approval for the beneficiary, provider and service within visit and budget limits. YAKAP is a separate primary-care pathway. Membership alone does not approve an LGU-sponsored visit.

Sources and limits:
Actual renderCoverage(); original funding narrative. https://www.philhealth.gov.ph/yakap/

## Slide 15 - Review details and choose consent

Presenter 2 | Target 12 seconds

Before confirming, the resident reviews appointment and funding details. Sharing the intake summary is optional. The actual checkbox begins unchecked. Current confirmation creates only a local sample booking, with no clinician contact or payment.

Sources and limits:
Actual renderReview(); consent unchecked by default.

## Slide 16 - The clinician makes the clinical decisions

Presenter 2 | Target 10 seconds

In the proposed service, a licensed clinician reviews the concern, diagnoses and prescribes. E-JUAN supports the journey. Today this screen is a simulated consultation, with no clinician or live call.

Sources and limits:
Actual renderConsult(); original clinical boundaries.

## Slide 17 - A prescription has a next step

Presenter 2 | Target 10 seconds

The prescription wallet demonstrates a possible handoff from a clinician-issued record to medicine search. This example is fictional and invalid for medical use. A resident with an existing prescription can enter here directly.

Sources and limits:
Actual renderPrescription(); original medicine navigation.

## Slide 18 - Confirm medicine before travelling

Presenter 2 | Target 12 seconds

Medicine listings show sample prices, distances and stock confidence. A connected pharmacy partner would need to confirm availability before travel. A reported listing alone cannot guarantee current stock.

Sources and limits:
Actual renderPharmacies(); original pharmacy-confirmation proposal.

## Slide 19 - Accountable sponsored visits

Presenter 2 | Target 14 seconds

Sponsors would authorize eligible services before the visit and reconcile completed consultations with payments afterward. They need program records for eligibility, booking and spending. Clinical information follows patient consent and authorized care-team access.

Sources and limits:
Original institutional workflow and role boundaries.

## Slide 20 - A specific coordination focus

Presenter 2 | Target 16 seconds

Existing platforms already provide digital care, and mWell already offers LGU solutions. Public pathways also exist. Our proposed focus is joining care choices with sponsor rules, service records and local medicine confirmation. A buyer must see added value over these alternatives and in-house systems.

Sources and limits:
https://nowserving.ph/
https://www.mwell.com.ph/lgu-community
https://www.philhealth.gov.ph/yakap/
https://davaocity.gov.ph/departments/social-services/city-health-office/

## Slide 21 - An experience we can test today

Presenter 3 | Target 14 seconds

Our local prototype has twenty-three screens covering the journey. It runs without a backend or account and lets us test usability now. That establishes an interface we can explore, not a deployed clinical service or proven outcomes.

Sources and limits:
Repository README.md and app.js renderers.

## Slide 22 - What a connected pilot requires

Presenter 3 | Target 14 seconds

A connected pilot still needs authorized care, sponsor and pharmacy partners. Operations must verify identity, eligibility and availability and protect the clinical handoff. Clinical, funding and data-protection arrangements come before live service.

Sources and limits:
Original pilot conditions and product-status narrative.

## Slide 23 - A local test with clear measures

Presenter 3 | Target 18 seconds

We begin with synthetic usability tests, then seek an authorized local pilot. We would measure navigation success, staff effort, visit reconciliation and medicine confirmation. Expansion depends on measurable benefit and a qualified sponsor willing to pay and renew.

Sources and limits:
Original pilot measures and growth gates.

## Slide 24 - A clearer path to care

Presenter 3 | Target 10 seconds

We are seeking one willing healthcare provider, one authorized institutional sponsor and pharmacy partners to validate one credible local pilot. That test must show a clearer resident journey and value worth paying for. Thank you.

Sources and limits:
Original closing ask; actual renderHome() screenshot.

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