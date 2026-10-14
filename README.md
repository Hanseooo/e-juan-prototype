# E-JUAN V6 — AI-Powered Municipal Health

**Alagang Abot-Kamay.** A barangay-first municipal healthcare frontend prototype that retains the original E-JUAN logo, Juan mascots and flag-inspired identity.

## Open the prototype

Run `python -m http.server 4173 --bind 127.0.0.1` in this directory, then open:

| Surface | Address | Purpose |
|---|---|---|
| Citizen mobile/web | [localhost:4173](http://127.0.0.1:4173/) | Home, Ask Juan, Centers, Medicines, Profile |
| Native Messages demo | [localhost:4173/sms-demo.html](http://127.0.0.1:4173/sms-demo.html) | Fictional E-JUAN SMS conversation in a separate phone mockup |
| BHW tablet | [localhost:4173/bhw.html](http://127.0.0.1:4173/bhw.html) | Encrypted local residents and health reports; sync queue |
| LGU portal | [localhost:4173/lgu.html](http://127.0.0.1:4173/lgu.html) | Separate municipal administrative demo |

The three citizen/frontline clients are the citizen app, native phone SMS, and BHW tablet. The LGU portal is separate administration. Native SMS is an integration boundary, not an in-app screen; no telecom service is connected.

**Native SMS** in the main showcase now opens a separate Messages-style phone demo. It uses E-JUAN as the supplied sample sender and Jave Jayson as the fictional recipient, with routine and urgent scenes. STOP, START and EMERGENCY trigger fixed local example replies. No SMS is transmitted, and no diagnosis, verified clinic opening, guaranteed medicine, queue priority or submitted emergency alert is claimed. The citizen app still has its original five tabs and no SMS inbox. General example information references [WHO](https://www.who.int/news-room/questions-and-answers/item/dengue-and-severe-dengue) and [DILG Unified 911](https://ncr.dilg.gov.ph/dilg-leads-nationwide-campaign-for-unified-911-emergency-hotline/).

The main blue showcase switches between a citizen phone, BHW landscape tablet and LGU desktop monitor using the three interface controls. BHW/LGU screens remain interactive inside their mockups. Citizen App or the citizen journey controls return to the phone; direct `bhw.html` and `lgu.html` URLs remain available for standalone use.

The staff workspaces use larger touch controls, clear task shortcuts, concise notices and friendly empty states. BHW reporting has three numbered sections, resident cards and saved-record summaries that open first. Demo sync controls are disclosed separately. LGU navigation groups daily work, community insights, connected services and preferences; its overview highlights the next review, facility and inventory actions. Shared staff styling lives in `portal.css` and is also cached for offline tablet use.

The citizen app uses `citizen.css` for compact Home shortcuts, a visible Ask Juan composer, full-width intake choices, clear search recovery and a guest profile with direct report/scanner actions. Unfinished descriptions and messages stay in memory while navigating; intake questions can be reviewed using Back. Public medicine search starts with the full demo catalog. Latest reports are scoped to the selected LGU. No clinical, inventory or emergency integration claims were added.

The latest clarity pass adds a visible **Emergency** label, larger action labels, **Start here** guidance, suggestion chips followed by a labeled Ask Juan message box with a **Send** button, and tap-to-continue question instructions. Suggested next steps use plain language; answer details and secondary facility information expand on demand. Search fields have visible labels and examples. Stock and facility samples remain clearly labeled. BHW shows its three work steps, and LGU places its next actions first and explains how viewer roles can try editing demo data.

Ask Juan's chatbox is docked directly above the bottom navigation for thumb access. Suggestions and demo controls scroll in their own area; the message field stays in place. Supporting browsers resize the app content when the keyboard opens.

Center details now feature a local SVG clinic illustration, quick facts, colored service tiles and expandable visit information. Medicines use distinct tablet, capsule and sachet illustrations. Compact stock cards show status with both text and icons; dates stay visible, while dispensing notes expand on tap. A center page lists medicine names; a medicine page lists center names. All artwork is illustrative, with no claim of real facility photos or live stock.

Center search groups the search field and side-by-side location/service filters in one compact panel. Result cards use clinic thumbnails, service previews and a primary blue action. Sample notices, map/list controls, search recovery and tenant/service filtering remain available.

Citizen pages also open directly from `index.html`. Encrypted BHW storage, service-worker offline reload and camera access require localhost or HTTPS. No package installation is needed for the application.

## Citizen experience

- Exactly five tabs: **Home / Ask Juan / Centers / Medicines / Profile**.
- “Kumusta!” and “How are you feeling today?” lead to **I Don't Feel Well**.
- Ask Juan records concern, person, duration, warning signs and barangay. It provides a conservative care-navigation summary, never a disease diagnosis or probability. Summaries appear in session-only My Reports.
- Emergency Help is accessible from Home and Ask Juan, with a sourced 911 call link and **Not Submitted** request status. No ambulance request or dispatch is simulated.
- Public health center search includes service filters, illustrative map/list, fixture verification, hours, contact gaps and update timestamps.
- Public medicine search includes generic name, strength/form, facility status, last confirmed update and dispensing requirements. Stale or absent stock becomes **Unconfirmed**.
- Original prescription camera capture/upload and editable sample fields are retained under Medicines. Users must confirm fields before searching. OCR is not connected; no prescription is issued.
- Doctor marketplace, booking, credits and consultation-finance entry points are deprecated. Legacy internal route names redirect to municipal screens; legacy implementation remains in source for reference.

## BHW offline workflow

For immediate access, choose your LGU and click **Open demo workspace**. No password is needed. Practice records are stored in a separate local database; this never unlocks, resets or overwrites your passphrase-protected workspace. **Exit demo** returns to the access screen.

For a saved workspace, 12 characters is the minimum length when creating a new vault, not a default password. An existing vault needs the exact original passphrase for that LGU. Incorrect attempts keep the selected LGU and entered passphrase so you can retry. Lost passphrases cannot be recovered by this prototype.

1. Choose the assigned pilot LGU and create a local vault passphrase of at least 12 characters. Use fictional data only. Keep the passphrase; this prototype cannot recover it.
2. Add a resident/household profile, select that resident, and enter symptoms, duration and warning signs.
3. Save a draft or **Save locally & queue**. Successful confirmation occurs only after the IndexedDB transaction commits.
4. Reload offline after the app shell has cached, then unlock with the same passphrase. Records are AES-GCM encrypted at rest; keys remain in memory.
5. Sync Center defaults to a disconnected production adapter. Explicitly choose the demo adapter to exercise success, failure or conflict. Retries reuse the same record ID/version, and acknowledged records are not resubmitted.
6. Review a conflict and requeue the local version. Automatic demo retry can run when an open, unlocked tablet reconnects. Locking clears decrypted UI state.

**Local vault access is not secure staff authentication.** No records are sent to a municipal server. Synced labels explicitly mean local demo acknowledgments. Background retry while the app is closed/locked and real conflict reconciliation require a backend and secure device/key design.

## LGU command center

The 12 sidebar sections cover Overview, Barangay Map, Symptom Trends, Reports for Review, Health Centers, Medicine Inventory, BHW Monitoring, SMS Operations, Emergency Requests, Reports & Analytics, Pilot Evaluation and Settings.

Demo viewers are restricted to one LGU and cannot change review or inventory state. A regional demo administrator can switch between **Davao City** and the **Municipality of Santa Cruz, Davao del Sur**. Stock receiving, dispensing and adjustments validate nonnegative inventory and write a session-only ledger. Analytics suppress small report counts. Pilot stages cover months 1–2, 3–4, 5–6 and 7–12; planned expansion and unconfirmed DOH coordination are labeled clearly.

Browser roles are demonstrations, not server authorization. Portal data is fictional and independent of unsynchronized BHW records. SMS traffic, service costs and dispatch statuses remain unavailable without connected authorized services.

## Implementation and verification

- [Impact report, checklist and completed handoff](docs/V6-IMPLEMENTATION.md)
- [Backend, authentication and sync contract](docs/V6-BACKEND-CONTRACT.md)
- [Native SMS architecture boundary](docs/SMS-ARCHITECTURE.md)
- [Executed browser results](tasks/verification/v6-results.json)
- [Additional camera/offline results](tasks/verification/v6-extra-results.json)

Run `node tasks/verification/static-v6.cjs` for script parsing and shell-link validation. Browser checks require Playwright and Chrome; this machine's cached runtime is configured by `tasks/verification/run-v6.ps1` and `run-v6-extra.ps1`. Earlier verification scripts and the existing pitch/films describe previous versions and are retained as historical artifacts.

## Production dependencies

Authenticated staff identities; server-derived role/tenant scope; PostgreSQL/RLS; durable audit logs; real facility and inventory verification; encrypted server records and retention; idempotent sync; signed SMS webhooks and workers; clinical review and validated escalation rules; formal emergency-service integration; accessibility and physical-device evaluation. No production AI, OCR, telecom, clinical triage or institutional partnership is claimed.

The application stays on its existing static JavaScript stack. There is no package build or TypeScript compiler configured. JSDoc documents shared facility types; executable browser and syntax checks provide the current validation.
