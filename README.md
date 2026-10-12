# E-JUAN — Interactive Healthcare UX Prototype (v2)

An offline, dependency-free, mobile-first clickable prototype for **E-JUAN · Alagang Abot-Kamay**, a proposed Davao City healthcare navigation and care coordination product.

## Open

Open `index.html` locally in Chrome, Edge, Safari or Firefox. No server, installation, login, API key or internet connection required. At desktop widths the project displays a phone showcase; on a phone it displays full-screen mobile UI. A separate **single-file standalone HTML** is included alongside the ZIP download.

## Primary journey: care coordination

1. **Home → Ask Juan → “I don’t feel well”** or type symptoms directly. If using the starter, select an example or enter your own concern. Juan then asks three small, structured questions.
2. **Ask Juan → Care matches:** A general physician is suggested as a starting point, followed **immediately by doctor cards**. Explore **Available now** (two fictional options) or **All times** (includes a later appointment). Select a doctor directly from the cards or open the profile.
3. **Choose consultation:** Select video/voice/text when supported, choose an available day and time, or choose the simulated “Now” slot. Days with no slots display a clear unavailable state.
4. **Care options:** Only after choosing the doctor/time, select standard booking, a fictional **LGU-funded selected-beneficiary** scenario, or navigate an appropriate **PhilHealth YAKAP primary-care** pathway. Unverified/pending LGU states **cannot apply** the funding benefit; an approved *sample scenario* demonstrates conditional coverage.
5. **Review & confirm:** The optional Ask Juan handoff can be reviewed and consented to separately. Confirmation simulates a booking; it does not contact a doctor or charge money.
6. **Consultation → aftercare → prescription → pharmacy:** Try sample text/video/voice consultation and navigate through clinician-issued example aftercare, a mock prescription, and fictional pharmacy results.

### Shortcuts and alternate cases

- **Find Care:** Browse doctors without Ask Juan. Filter by availability (`All`, `Available now`, `Upcoming`), specialty and consultation mode. Pediatrics demonstrates a provider with no online slots.
- **Find medicines:** Search directly, scan/upload a prescription (editable example extracted fields), compare list/map results and stale-stock states.
- **Care options shortcut:** An **informational explainer**, not a funding/booking workflow before provider selection.
- **Emergency:** Descriptions with explicit severe warning signs, or selecting concerning warning answers, show separate urgent-care guidance. Routine symptoms should display doctor results instead of emergency actions.
- **Failure/recovery:** Ask Juan contains a recoverable mocked connectivity error state.

## Product rules represented

- Everyone can use ordinary care guidance, browsing and pharmacy discovery.
- LGU-funded consultations are **only for selected, approved beneficiaries**, when provider, service, entitlement and funding are all approved. The originally proposed two-free-consultation monthly ceiling is **not** an established user benefit; it is configurable/potential in the concept.
- **YAKAP and LGU-funded consultations are separate programs.** PhilHealth verification does not establish LGU-funded eligibility or make all teleconsultations free.
- Ask Juan suggests care pathways; it does not diagnose, prescribe, or independently certify specialist suitability.
- Doctor schedules/status, identities, credentials, reviews, clinical records, prices, pharmacy inventory, eligibility and booking confirmation are **fictional prototype data**; “Available now” means available in the **demo scenario**, not a live doctor.
- No identity verification, government connectivity, production AI, real teleconsultation, OCR/ML, payment, or true inventory feed is connected.

## Included files

- `index.html`: semantic HTML prototype shell and icons
- `styles.css`: responsive styling
- `app.js`: screen rendering, offline mock data and interactions
- `assets/`: illustrated fictional clinician avatars
- `DESIGN_NOTES.md`: flow decisions and UI rules
- `preview-matches-v2.png`, `preview-booking-v2.png`, `preview-eligibility-v2.png`: preview snapshots

This is an early product design exploration, **not a validated healthcare service, verified doctor directory, or confirmed funded program**.
