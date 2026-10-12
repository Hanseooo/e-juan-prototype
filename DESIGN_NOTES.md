# E-JUAN — UX and Flow Decisions (v2)

## Product scope and confirmation status

This design follows the *later* working positioning of E-JUAN as an **AI-assisted care coordination experience**, not a blanket entitlement to two free monthly consultations for every resident. The initial market is Davao City. Public care navigation is accessible broadly; a supplemental funded teleconsultation program could serve **selected, approved beneficiaries** if institution/provider/budget approvals are secured. The institutional willingness to pay and final beneficiary program are **unvalidated**.

## Main UX hypothesis

Patients should be able to **see suitable doctors and choose one** without administrative friction.

`Describe concern → short guided questions → suggested care type → doctor availability cards → choose provider/time/mode → care-funding options → review → consult → aftercare/prescription → pharmacies`

Why this order:

1. The output of Juan's guidance is actionable **doctor matches**, not another large block of chatbot prose, and not a default “Call 911” CTA.
2. Use **availability-first cards** that emphasize sample status and upcoming slots; patients can filter “Available now” or review later dates.
3. Profiles are **optional**: choose from the list to proceed quickly, or inspect before committing.
4. **Coverage is checked after doctor/time selection** so unrelated funding steps do not block first-time usage.
5. The **LGU-funded scenario** is strictly conditional and only enabled in a visibly labeled fictional approved-beneficiary preview.
6. **YAKAP** provides navigation to an applicable accredited primary-care clinic rather than pretending it funds any doctor shown in a generic online directory.
7. The final review presents the optional clinician handoff, with user consent independent of booking.
8. Prescription scanning and medicine search remain standalone entry points, as well as natural next steps after consultation.

Emergency warning signs are a **separate clinical safety exception**. A routine cough should not take the emergency path, and the app should not encourage users with emergency red flags to wait for routine teleconsultation. No emergency or diagnostic service is actually operated by this prototype.

## UI system

E-JUAN reference branding: flag blue `#0038A8` dominates the desktop frame, home hero, primary actions and navigation. Yellow `#FCD116` and red `#CE1126` are visibly present in decorative curves, the brand mark, and two-tone healthcare icons. Existing service cards use pale red and yellow surfaces, with circular light-blue icon backplates. White app surfaces keep content readable; ink is `#14213D`, secondary surface is `#F6F8FC`, and line is `#E5EAF2`. Red still identifies urgent-care alerts and yellow identifies LGU benefit markers; green remains a confirmation/status color. Native system sans serif typography uses 14px body copy, 16px section headings, 12px metadata, and 11px uppercase eyebrows. Cards use 18px corners and controls have at least 44px touch targets. Existing screens, content, layouts, assets, navigation, consent, eligibility, and interaction logic are preserved; only shared icon artwork and CSS branding change in the color-distribution refresh.

## Screens

The flag-color treatment extends to all existing routes: shared headers, cards, forms, circular icon accents, booking choices, records, prescriptions and consultation surfaces. Pale red/yellow panels accompany visible red/yellow strokes and borders; blue remains dominant for actions and active navigation. Browser verification checks that both exact accent colors are present in every route's visible mobile content, independent of the desktop backdrop or status-bar stripe.

Pharmacy listings use white card fills; the doctor directory uses light blue #EEF4FF. Both retain the red/yellow top accents. These listing-specific fills do not change the care-match cards.

Home, Ask Juan intro, Describe concern, 3-step dynamic symptom intake, availability-first care matches, doctor directory, doctor profile, consultation time, funding options, booking review, booking confirmation, appointment details, video/voice/text consultation mockups, aftercare, prescription wallet, scan/review, medicine/pharmacy search, pharmacy details, YAKAP guidance, benefits explainer, and emergency/error alternates.

## What the demonstration does *not* claim

No real doctor is online, no partner or LGU/PhilHealth arrangement is established, no sample rating or fee is verified, no medicine availability is live, no patient is actually approved, and no booking/consultation/payment can occur. An allowance of two monthly free consultations remains a **proposed configurable cap**, not a confirmed rule. Provider credentials, clinical handoff, verified stock, beneficiary eligibility, consent, audit logs and privacy/security practices all require production discovery and implementation.
