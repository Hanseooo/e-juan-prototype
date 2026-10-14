# E-JUAN V6 implementation record

## Visual center and medicine details

Replaced the text-heavy center introduction with `assets/illustrations/health-center.svg`, an original code-native illustration, and grouped hours, sample distance and service icons. Contact and visit details expand on tap. Stock cards use distinct tablet/capsule/sachet SVG artwork, icon-and-text availability states, visible freshness dates and expandable dispensing notes. Center pages avoid repeating the center name on every medicine and link to medicine details; medicine pages emphasize center names and link back to the relevant center. The medicine catalog and detail hero share the packaging illustrations. No facility photos, real coordinates, new medical advice, live-stock claims or dispatch behavior were introduced.

Verified the four responsive widths (320, 390, 768, 1440), three medicine forms, available/unavailable/unconfirmed states, stale-stock fallback, missing hours, expandable information and center-to-medicine links in `tasks/verification/visual-details.spec.cjs`. Core V6 and citizen usability regressions also passed. Screenshots: `tasks/verification/visual-center-390.png`, `visual-center-stock-390.png`, and `visual-medicine-390.png`.

## Immediate clarity and app readability

Reworked the Home, Ask Juan, intake, guidance, centers, medicines, profile and report wording around short instructions and recognizable actions. Home keeps all four shortcuts visible at 390 × 844 with larger labels and a text Emergency control. Ask Juan shows suggestion chips first, with the labeled message box and Send button underneath. Each intake question says to tap an answer; care categories and next steps use plain language without changing the assessment branches. Guidance answers and facility listing details expand on demand, with the primary center action visible immediately. Searches show their field labels, examples and sample-data boundaries. Scanner fields and confirmation controls have larger text and touch targets. BHW lists the three steps to record a visit; LGU prioritizes next actions and uses plain stock-operation labels and actionable viewer-role guidance. Original assets, routes, camera lifecycle, draft retention, encryption and separate demo storage remain in place. Offline staff cache is `ejuan-bhw-v6-5`.

Validation uses the citizen usability suite (20 layouts and interaction checks), core V6 suite (70 responsive layouts and 7 flow groups), staff usability suite and BHW access/isolation suite. Phone screenshots are saved under `tasks/verification/citizen-friendly-*-390.png`.

## BHW access correction

The access screen now offers **Open demo workspace** without a password. It opens `ejuan-v6-bhw-demo`, separate from the existing `ejuan-v6-bhw` vault; neither its metadata nor its encrypted records are reset or overwritten. Practice mode is labeled and uses a public demo key for fictional records only. Exiting returns to the saved-workspace gate. The saved vault still requires its original LGU passphrase; 12 characters is only the creation minimum. Failed attempts keep the typed passphrase and selected LGU, and show guidance beside the field. This access correction initially shipped with static cache `ejuan-bhw-v6-4`.

Verified with `tasks/verification/bhw-access.spec.cjs`: all six BHW destinations, password-free entry, ciphertext/metadata preservation after wrong passwords and demo writes, original-passphrase access, tenant isolation, practice persistence and embedded offline reload. Existing V6 and staff usability suites also passed.

## Pre-edit inspection and impact report

The existing app is dependency-free HTML/CSS/JavaScript. `app.js` owns in-memory state, renderer functions and delegated event handlers; `index.html` contains the shell and icon sprite. There is no package manifest, API, authentication, database, SMS gateway or TypeScript build. Existing Playwright scripts exercise the earlier marketplace design. Unrelated pitch, film and temporary-tool files are outside this upgrade.

| Existing feature | V6 action | Reuse |
|---|---|---|
| E-JUAN logo, four Juan mascots, flag colors | Retain | Original assets unchanged |
| Splash and three onboarding slides | Retain; update purpose | Existing navigation and artwork |
| Home | Replace marketplace copy and cards | Card, button, header helpers |
| Ask Juan, symptom input and intake | Retain; add location, conservative navigation results | Chat styling, forms, warning choices |
| Doctor directory, booking, finance/coverage, consultation | Deprecate citizen entry points; redirect old route names | Source retained for reference, inaccessible through V6 routing |
| Pharmacy finder | Replace with public facility medicine catalog | Search, list/map conventions |
| Camera and prescription review | Retain under Medicines; explicit field confirmation | Existing permission, capture, cleanup and upload behavior |
| My Health | Replace with Profile and My Reports | Record/card conventions |
| BHW client | Implement separate tablet page | Shared brand/styles/data adapter |
| LGU portal | Implement separate administrative demo | Shared brand/styles/data adapter |
| Native SMS | Document backend boundary only | No citizen SMS navigation |

## Implementation checklist

- [x] Phase 1: shared design, exactly five citizen tabs and legacy redirects.
- [x] Phase 2: municipal Home and Ask Juan with symptom intake.
- [x] Phase 3: guidance results, public centers, emergency screen.
- [x] Phase 4: public medicine search, stock freshness and confirmed scan fields.
- [x] Phase 5: encrypted offline BHW records, queue/retry/conflict demo states.
- [x] Phase 6: tenant-scoped LGU command center frontend.
- [x] Phase 7: native SMS integration contract and production boundaries.
- [x] Phase 8: pilot evaluation and honest operational reports.
- [x] Phase 9: executed frontend browser, offline, isolation and syntax checks; limited security review. Production checks remain below.

## Safety and integration boundaries

All facilities, hours, distances, inventory and operational metrics are fictional fixtures. A fixture verification flag must never be described as real facility verification. No real queue, appointment, ambulance request, diagnosis, prescription issuance or institutional partnership is created. Citizen symptom reports stay in the current session. The BHW vault uses Web Crypto AES-GCM with a passphrase-derived key and IndexedDB; staff authentication remains a production dependency. Browser demo role selection is not authorization. Production adapters must fail closed until authenticated server services exist.

Emergency content references [DILG Unified 911](https://ncr.dilg.gov.ph/dilg-leads-nationwide-campaign-for-unified-911-emergency-hotline/) and [WHO warning signs](https://www.who.int/news-room/questions-and-answers/item/coronavirus-disease-covid-19). These support general warning information, not validation of a clinical triage algorithm. Clinical review and local emergency facility/contact verification remain required.

## Completed changes and updated routes

Citizen entry: `index.html`. The existing in-memory renderer now supports `home`, `ask`, `describe`, `intake`, `guidance`, `centers`, `centerDetail`, `medicines`, `medicineDetail`, `scan`, `reports`, `citizenProfile`, and `emergency`, plus retained splash/onboarding. The five tabs use house, message-circle, map-pin, pill and user-round icon names. Scanner and reports are secondary routes; no SMS screen exists in citizen navigation.

Legacy aliases: directory → centers; profile → centerDetail; pharmacies → medicines; pharmacyDetail → medicineDetail; health → citizenProfile; recommendation → guidance; coverage/coverageInfo/booking/review/booked/yakapNext → centers; appointment/consult/aftercare → reports; prescription → scan. Obsolete renderers are retained in source but routing redirects before rendering them. No remote publication or Git history changes were performed.

New reusable files: `v6-data.js` (JSDoc facility contract, fixtures, freshness and scoped inventory, disconnected production/local demo adapters), `v6-citizen.js` (citizen screens and event handlers), `v6.css` (shared municipal/tablet/desktop styling), `offline-store.js` (encrypted vault), `portal.js` (separate BHW/LGU shells), `bhw-sw.js` (static tablet cache), `bhw.html`, and `lgu.html`. Original camera lifecycle and brand assets remain in use. Public inventory supports Available, Limited Stock, Unavailable and Unconfirmed; stale stock is downgraded without hiding the previous confirmation timestamp.

## Offline BHW workflow

Choose an LGU, create/unlock a 12+ character passphrase vault, add a fictional resident/household, capture symptoms/duration/warning signs, then save a draft or queue a report. IndexedDB transaction completion precedes successful-save feedback. AES-GCM ciphertext protects resident and report payloads at rest. UUIDs remain stable across edits/retries, and version changes are explicit. Wrong passwords fail without changing records; locking and leaving the page clear decrypted UI data. The cached tablet can reload offline and unlock again.

Production synchronization is disconnected and fails closed with the queue unchanged. An explicitly chosen local demo adapter exercises failure, acknowledgment and conflict. Acknowledged IDs/versions are checked; synced reports are excluded from repeated retries. Conflicts require review/requeue rather than silent overwrite. Automatic reconnect retry runs only with the open unlocked demo app. Real staff identity, household/server synchronization, durable receipts, remote merge policy and closed-app background sync are outstanding production dependencies.

## LGU and pilot dashboards

All 12 requested sidebar destinations are present. Overview, aggregate map, trends, reviews, public facilities, stock catalog/receiving/dispensing/adjustment ledger, BHW monitoring, SMS operations, emergency requests, aggregate CSV export, pilot evaluation and access settings are implemented using clearly labeled fixtures. Single-LGU viewers cannot perform demo writes. Only the regional demo administrator sees the two-LGU switcher. Scoped datasets and evaluation/ledger records filter by LGU; these browser guards demonstrate behavior and do not replace server authorization.

Small counts are suppressed in tables/maps and bar widths; overall counts avoid exposing exact suppressed cells through subtraction. SMS volume/costs show unavailable rather than invented measurements. Emergency requests remain Not Submitted; the portal documents service-evidence requirements for later statuses without simulating them. Pilot phases include all requested indicators and session-only evidence-entry forms. Davao City and the Municipality of Santa Cruz are named correctly; expansion and DOH coordination stay planned/unconfirmed.

## Tests actually executed

Final results are in `tasks/verification/v6-results.json` and `v6-extra-results.json`.

- Playwright/Chrome main suite: 70 responsive layouts (citizen 320/390/768/1440, tablet 1024, LGU 768/1440) and seven flow groups, with no page errors or HTTP error responses.
- Additional Playwright suite: 12 more tablet layouts at 768/1280; synthetic camera capture/track cleanup, permission failure/upload, full onboarding, keyboard navigation, offline draft reload, simulated storage quota failure retaining the form, unlocked reconnect retry, and unauthorized demo tenant/write rejection.
- Encrypted-at-rest assertion inspected IndexedDB ciphertext and checked that fictional names, households and symptoms were absent from raw stored JSON. Offline tests disabled browser networking, reloaded the cached tablet, and unlocked existing records.
- Main flows covered unknown and emergency intake, session summaries, empty/missing/stale facility and stock fixtures, confirmation timestamps, scanner field confirmation, legacy redirects, production-disconnected queue preservation, simulated failure/conflict/success/duplicate retries, viewer write restrictions, two-LGU filters, negative stock rejection, review/evaluation entries and aggregate CSV export.
- `static-v6.cjs`: all six application scripts parsed; local HTML links/scripts/CSS and referenced V6 brand assets resolved.
- `git diff --check`: checked after the final changes.
- Visual inspection: generated Home/Ask Juan mobile screenshots and BHW/LGU portal screenshots. Form labels, body/screen overflow and keyboard navigation have targeted automated checks. This is not a full WCAG audit.

There is no package build or TypeScript compiler in this static project, so neither was claimed as executed. Shared JSDoc types document the data boundary. Historical marketplace suites were not used as V6 acceptance criteria.

## Remaining dependencies, known limits and next steps

1. Implement authenticated server identity and role/LGU/assignment authorization, PostgreSQL/RLS, durable audit trails and retention/key recovery with privacy review.
2. Connect verified public facility hours/contact/location/service data and medicine inventory, then reconcile receiving/dispensing with authorized staff. Current map/directions are illustrative; directions buttons explain that no real route is connected.
3. Add a reviewed and validated care-navigation protocol. Current warnings and pathway categories are conservative frontend demonstrations, not clinical triage validation or production AI. Citizen reports reset on refresh and are not submitted.
4. Implement transactional idempotent sync, household associations, remote version conflicts and usable-network checks; current network indicator is browser connectivity, not backend reachability. Demo adapter never transmits data.
5. Contract the SMS gateway and implement signed webhooks, replay/deduplication, queued workers, callbacks, privacy controls and actual usage/cost measurement as specified in `SMS-ARCHITECTURE.md`.
6. Connect any emergency request tracking only after formal service authorization. The sourced call link is real; there is no dispatch integration.
7. Add OCR behind explicit review and confirmation. Camera/upload fields currently remain labeled sample values, not extracted text.
8. Run real-device tablet/mobile tests, comprehensive accessibility evaluation, clinical/institutional validation, backend role/RLS tests and a formal security review. Lost vault passphrases cannot be recovered; browser storage eviction or clearing can delete offline records.

The existing pitch, films and historical verification artifacts were preserved and still describe earlier product versions. No production integrations, signed partnerships or operational pilot measurements were invented.

## Device showcase follow-up

The main showcase now swaps the phone for a landscape BHW tablet or an LGU desktop monitor with a stand. It preserves the blue background and story panel. The separate working clients are embedded with their native 1024×768 / 1440×900 viewports scaled to fit their hardware frames. Returning to Citizen App restores the existing phone state. Embedded citizen links return to the parent showcase; switching away stops an active citizen camera.

`showcase.spec.cjs` passed six device layouts at 1024, 1440 and 1920px, embedded BHW/LGU navigation, same-page switching, return controls, mobile resize and active-camera cleanup. Screenshots were visually inspected. Direct standalone clients retain their normal layouts. `static-v6.cjs` now parses seven scripts, including `showcase.js`.

## Staff usability upgrade

Both staff interfaces were redesigned with `portal.css`, preserving their existing encrypted storage, sync state, role checks, tenant scoping, inventory actions and mockup embedding. The LGU mockup now uses a 1280×820 viewport to improve text readability. BHW keeps its 1024×768 tablet viewport.

- BHW: smaller navigation column, larger 50–54px primary controls, a prominent report action, resident tiles, three numbered report sections, resident-first guidance when the directory is empty, semantic tables displayed as readable record cards, and saved-report details shown before the records list. Internal record IDs/versions are under a disclosure. Draft/conflict sync summaries no longer imply that work is complete. Demo sync controls are collapsed until explicitly opened.
- LGU: 12 destinations in four navigation groups, a visible pending-review count, concise page guidance, six readable overview metrics and three direct priority actions. All navigation and priority actions fit the 1280×820 overview. The reporting-window filter is compact and thresholds remain intact. Stock, review, evaluation and other routes retain their working controls.
- Access screens: clearer workspace entry, local passphrase guidance, original Juan artwork and explicit demo boundaries under an expandable explanation. The local vault remains passphrase protected; no staff-authentication service was added.
- Offline: cache version updated to include `portal.css` and the used mascot assets. Static BHW requests with `?embedded=1` now use the same safe app-shell fallback, without caching patient/API data.

Validation: main V6 regression (70 layouts/seven flow groups), additional offline/camera/role regression (12 tablet layouts), six mockup layouts and new `portal-ui.spec.cjs` checks. New checks cover visible 50px+ report CTA, six tablet destinations, resident-first entry, three sections and 54px inputs, all report inputs/save action visible at 1024×768, saved-detail ordering, collapsed demo controls, all 12 grouped LGU destinations and priority actions visible at 1280×820, 390px overflow and embedded offline reload. Final screenshots were visually inspected. Syntax/static-link validation and diff whitespace checks were run. Physical-device usability, formal accessibility and production security testing remain outside the verification performed.

## Separate native Messages demonstration

At the user's request, a second phone mockup was added to the showcase under **Native SMS**, independently of citizen navigation. `sms-demo.html`, `sms-demo.css` and `sms-demo.js` render a native Messages-style fictional conversation, with E-JUAN as the sample sender and Jave Jayson as the example recipient. Routine/urgent scenario controls, inbox/back, information disclosure and local STOP/START/EMERGENCY replies are interactive. Arbitrary entered text is escaped, kept in the current session and never transmitted or clinically assessed.

The supplied example was adapted to keep the V6 boundaries: San Jose clinic hours, public Paracetamol and #SJ-042 are explicitly sample/unverified values; the reference grants no queue priority. The urgent message does not diagnose suspected dengue, advertise an unverified municipal ambulance number or claim a sent triage alert. It shows Not Submitted and says no alert/ambulance request occurred. General rest/hydration and emergency-number references were checked against the linked WHO/DILG sources. The actual telecom backend remains disconnected.

`sms-demo.spec.cjs` checks 320/390 standalone and 1440 embedded layouts, both scenes, STOP/START/EMERGENCY, zero network transmission from replies, escaped input, inbox/info controls, mobile switching and preservation of five citizen tabs. The six tablet/monitor showcase tests were also rerun. Screenshots were visually inspected; eight application scripts and local shell assets passed static checks. No native handset/gateway delivery or clinical validation was performed.

## Citizen usability upgrade

The citizen screens retain the five tabs, original E-JUAN/Default Juan artwork, static renderer and session-only data. `citizen.css` is loaded only by the main citizen showcase, so staff and Messages layouts remain separate.

- Home: a compact care hero, all four quick actions visible at 390×844, immediate emergency access and a compact sample-center preview. The latest report now filters by the selected LGU rather than showing another LGU's summary.
- Ask Juan: a smaller welcome card, four clear starting points and a visible message composer. Demo connection/voice controls are disclosed separately. Unfinished text survives navigation and retry. Submitted text clears from the composer, and canceling the short preparation state no longer leaves it stuck loading. Plural center/medicine requests open the relevant search screens.
- Intake: full-width 54px choices, four-step progress, an expandable concern summary and a real previous-question control that keeps answers. Emergency access is visible in the header at every step. Clinical categories and escalation rules remain demonstrations; no medically validated triage claim was added.
- Guidance: the recommended next step and primary center action appear first, followed by a human-readable symptom summary and other options.
- Centers/medicines: larger field/action labels, simpler filters, readable hours/services/timestamps, full medicine catalog by default and recovery buttons when search is empty. Search focus/caret survives result rendering. Stock freshness and dispensing notices are retained.
- Profile/reports: a clear guest/session state, direct report/scanner/center actions and friendlier summary/empty cards. Reports still reset on refresh and never reach an LGU. Navigation dismisses old toast messages so they do not cover unrelated screens.

Validation: `citizen-ui.spec.cjs` passed draft/retry/back flows, selected-answer preservation, saved guidance action, LGU-scoped Home summaries, visible Home shortcuts/composer/emergency access, first-center action visibility, plural search intents, empty-search recovery, canceled loading and 20 responsive core layouts. Main V6 regression passed 70 layouts/seven flow groups; additional camera/offline/role checks passed 12 tablet layouts; mockup switching passed six layouts; SMS demo passed three layouts and its scripted reply checks. Final mobile screenshots were inspected. Two runs launched alongside five Chrome suites timed out at initial onboarding; sequential reruns passed, with no persistent startup issue reproduced. Physical devices and a formal accessibility audit were not tested.
