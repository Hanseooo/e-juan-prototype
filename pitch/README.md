# E-JUAN 24-slide pitch

Open `pitch/index.html` directly in Chrome or Edge, or visit `/pitch/` when serving the repository. The presentation runs locally without a backend, account or internet connection.

## Story order

| Slides | Purpose |
| --- | --- |
| 1-3 | Establish the resident's problem before introducing the product |
| 4 | Introduce E-JUAN |
| 5-6 | Show local population and national health-spending context |
| 7 | Show the potential institutional prospect universe |
| 8-10 | Explain the buyer, separate care spending, and software cost assumptions |
| 11 | Summarize the five-step journey |
| 12-18 | Explain one prototype screen at a time |
| 19-20 | Explain sponsor accountability and existing alternatives |
| 21-22 | Separate the current prototype from connected-pilot requirements |
| 23-24 | Explain pilot measures and the partnership ask |

Presenter 1 covers slides 1-7, Presenter 2 covers 8-20, and Presenter 3 covers 21-24. Speaker-note targets total five minutes. The original seven-slide script and supplied judge Q&A remain in the notes appendix.

## Present

- Arrow keys or Space navigate. Home and End jump to the first and last slide.
- F or **Present** enters fullscreen. Escape exits fullscreen or closes the open screen.
- N or **Notes** opens rehearsal notes, sources and prototype boundaries. Anyone watching the same display can see an open notes panel.
- Click a phone to enlarge the actual prototype capture.
- **Save PDF** prints all 24 slides. Select Save as PDF, the supplied page size, zero margins and background graphics.
- `E-JUAN-Pitch.pdf` is the regenerated shareable deck. `SPEAKER_NOTES.md` contains the revised script.

The 1600 × 900 canvas scales proportionally. Use landscape or fullscreen for readable presenting. The original app is independent of the presentation.

## Evidence and limits

The supplied original deck and script provide the concept narrative. The deck retains the app's native typography, Philippine flag colors, brand lockup and nine actual prototype screenshots. These assets show fictional providers, records, approvals, consultations and medicine listings.

Public figures were checked against PSA sources on 13 October 2026:

- Davao City population: 1,848,947 as of 1 July 2024, displayed as 1.85M.
- Household out-of-pocket payment: 41.2% of Philippine current health expenditure in 2025. This is a national spending share.
- Davao Region: 5 provinces + 6 cities + 43 municipalities = 54 potential institutional prospects.

Sources appear on their slides and in the speaker notes. These figures give context; they do not establish product demand, adoption or actual customers.

The ₱10,000 monthly license, ₱500 clinical fee and 100 monthly consultations are original modeling assumptions. Clinical spending is ₱50,000, total sponsor spending is ₱60,000, and illustrated E-JUAN revenue is only the ₱10,000 software license before costs. Effective software cost at that volume is ₱100 per visit. Prototype provider fees differ. Pricing, delivery costs, profitability and willingness to pay remain unvalidated.

Ask Juan uses local demonstration rules. Public-first ranking, sponsor eligibility verification, appointments, clinical handoff, pharmacy confirmation and sponsor records remain proposed integrations. Clinicians retain diagnosis and prescribing authority. No signed partners, paying customers, live care or measured pilot outcomes are claimed.

## Verify and regenerate

The existing verification script uses Playwright as a development tool, checks every slide at two projector sizes and a small portrait size, exercises controls and offline loading, then exports the PDF.

```powershell
rtk proxy node pitch/verify.mjs
```

If Playwright is not locally installed, set `PLAYWRIGHT_MODULE` to an installed `playwright` or `playwright-core` module and `CHROME_PATH` to the installed browser executable. No production dependency is needed.

Slide PNGs and the latest check report are in `qa/`. The earlier deck and sources are retained in `../tmp/pitch-original/`.
