# E-JUAN 13-slide pitch

Open `pitch/index.html` directly in Chrome or Edge. No install, account, backend or internet connection is required. With the repository served over HTTP, open `/pitch/`.

For a local preview from the repository root:

```powershell
rtk proxy python -m http.server 4173 --bind 127.0.0.1
```

Then visit `http://127.0.0.1:4173/pitch/`. The original app remains at `/`.

## Present

- Arrow keys or Space: advance or return. Home / End: first / last slide.
- F or **Present**: fullscreen. Escape: exit fullscreen or close the open screen.
- N or **Notes**: adapted 13-slide script, presenter, target duration, essential points and source context.
- Click a phone to enlarge the real screen. Close it to resume slide navigation.
- **Save PDF**: print all 13 slides. Use Save as PDF, the supplied page size, zero margins and background graphics. A ready-to-share `E-JUAN-Pitch.pdf` is included.
- PNG exports and verification results are in `qa/`. `SPEAKER_NOTES.md` includes the adapted 13-slide notes plus the original seven-slide script and supplied judge Q&A.

The 1600 × 900 canvas scales proportionally to the window. Small portrait windows preserve the slides; use landscape or fullscreen for readable presenting. The controls sit outside the slide and disappear in fullscreen until hovered or focused. The notes panel is intended for private rehearsal and is visible to anyone watching the same screen.

## Content and source provenance

The supplied `E-JUAN_Persuasive_Pitch_Deck_v2.pdf` and `E-JUAN_Persuasive_Pitch_Script_and_QA.pdf` (October 12, 2026) provide the original narrative and scripts. The presentation is now expanded to 13 slides at the user’s request, with explicit on-slide explanations of intake, care/funding paths, consent, medicine discovery, sponsor accountability and prototype readiness. Presenter 1 covers slides 1–2, Presenter 2 covers 3–10, and Presenter 3 covers 11–13. Adapted notes target five minutes total: 20, 30, 15, 25, 25, 25, 25, 20, 20, 25, 30, 25 and 15 seconds. The original script is retained in the notes appendix. No school, team email or presenter names were invented.

The deck imports `../styles.css` for the native typography, flag-color tokens and `.brand-lockup` / `.brand-symbol` component. It uses the actual `assets/MAINICON_EJUAN.svg` chatbot identity and native doctor portraits inside the captured app screens, rather than replacing them with new artwork. No external fonts, stock photos or generated images are used.

Nine PNGs were captured from the original `index.html` running its unchanged `app.js`, at a 1440 × 1080 browser viewport with 2× pixel density. Each is a screenshot of the actual 400 × 850 `#device`, not a reconstructed UI:

| Asset | Actual renderer and capture state |
| --- | --- |
| `ask.png` | `renderAsk()`: Ask Juan start |
| `intake.png` | `renderIntake()`: cough concern, first intake question |
| `match.png` | `renderRecommendation()`: answers Myself / 2–3 days / None of these, fictional general physician matches |
| `check.png` | `renderCoverage()`: selected Dr. Andrea Santos, conditional LGU-approved sample; scrolled to show the explicit demo-state controls |
| `review.png` | `renderReview()`: actual optional clinician-summary consent, unchecked by default |
| `consult.png` | `renderConsult()`: simulated video consultation |
| `locate.png` | `renderPharmacies()`: Paracetamol 500 mg, mixed fictional stock scenarios |
| `prescription.png` | `renderPrescription()`: actual fictional Paracetamol 500 mg prescription wallet |
| `home.png` | `renderHome()`: actual home after sample journey |

The deck uses all nine images, including the actual consent-review and prescription-wallet screens on dedicated explanatory slides. All records, providers, sample approval, consultations and medicine listings are fictional. Ask Juan uses local demonstration rules, not a connected AI model. No real patient data was used.

Connected public-first ranking, actual sponsor eligibility checks, visit allowances, budget controls, appointment requests, clinical handoff, sponsor records and pharmacy confirmation remain proposed. Slide 3 marks connected capabilities with an asterisk. Licensed clinicians retain diagnosis and prescribing authority. Sponsors are proposed to receive program records, not unrestricted medical histories.

Slide 11's ₱500 clinical fee is a financial assumption from the supplied PDFs. The prototype's sample provider fees differ. The license assumptions are explicitly hypothetical: 100 × ₱500 = ₱50,000 clinical spending; + ₱10,000 software = ₱60,000 institution spending; ₱10,000 / 100 = ₱100 software per visit. E-JUAN's illustrated revenue is only ₱10,000, before costs.

Slide 2 cites PSA population and current health spending sources, and slide 12 cites PSA's 5 provinces + 6 cities + 43 municipalities. Slide 10 links the actual alternative services and acknowledges mWell's existing LGU offerings. These facts provide context, not evidence of demand, customers or operational E-JUAN outcomes.

## Verify / regenerate exports

The app has no package manifest, build or lint command. The verification script uses Playwright only as a development tool. It checks layouts at both requested projector sizes and at a small portrait size, controls, notes, image loading, fullscreen and file-based offline loading, then exports the PDF.

If Playwright is available locally:

```powershell
rtk proxy node pitch/verify.mjs
```

Otherwise set `PLAYWRIGHT_MODULE` to an installed Playwright module directory and `CHROME_PATH` to an installed Chrome executable, then run the same command. No dependency was added to this static app.

The original app's intake-to-matches, selected doctor, conditional funding, unchecked consent review, sample booking, simulated consultation, prescription, pharmacy and Home journey was exercised to create the captures. This is a local UI check, not a clinical integration test. No app source, clinical workflow, authentication or backend was changed.
