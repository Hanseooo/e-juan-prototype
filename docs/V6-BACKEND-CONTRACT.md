# Production API and authorization boundary

The static prototype does not run an API, identity service, PostgreSQL or RLS. Browser demo roles are explicitly labeled demonstrations. Do not put real household or health records into this deployment.

## Proposed authenticated services

| Endpoint | Permission and behavior |
|---|---|
| `GET /session` | Validated staff identity, role, allowed LGUs, assigned barangays; server supplies scope |
| `GET /facilities` | Public approved fields only; tenant and data freshness returned |
| `GET /inventory` | Public confirmed availability only; stale values downgraded |
| `POST /bhw/sync` | Authenticated assigned BHW; verify tenant, resident association, ID and version; transactional idempotency |
| `POST /inventory/operations` | Authorized tenant inventory administrator; signed quantities, nonnegative stock, immutable ledger |
| `POST /reports/:id/review` | Tenant reviewer; audit actor and changes; no inferred clinical confirmation |
| `GET /analytics` | Authorized tenant analyst; server aggregation and privacy thresholds |
| `GET /sms/metrics` | Authorized tenant operations role; aggregate metadata only |
| `GET /emergency/requests` | Formal authorized emergency service integration; validated service status only |

## Offline sync contract

Each local record has a random stable UUID, tenant, kind, version and creation timestamp. Retry uses the same ID/version. Server uniqueness is `(tenant_id, record_id)` and an idempotency receipt is keyed by `(tenant_id, record_id, version)`. On first acceptance, insert or compare-and-swap the expected version transactionally. Exact retries return the same receipt; different payloads with reused keys fail. Conflicting versions return explicit conflict details, never overwrite silently. Validate resident belongs to tenant and BHW assignment; reject out-of-scope records before processing any sensitive payload.

Only a receipt whose ID and version match the local report can mark it Synced. Failed and conflicting local records stay encrypted. The prototype's demo adapter only simulates local acknowledgment; it never calls this proposed API. Household synchronization and durable remote conflict resolution are production work.

## Required security controls

- Staff authentication, session expiry, revocation and device enrollment; secure passphrase/key recovery without exposing stored health data.
- Server-derived authorization on every route, tenant RLS on all tenant tables, parent/child tenant consistency, least-privilege service credentials.
- Encryption in transit and at rest, key management and retention/deletion rules reviewed with the LGU privacy officer.
- Durable audit records for report access, review, inventory changes, SMS content access and emergency status changes.
- Production sync worker/network health checks, transactional duplicates/conflicts, signed telecom webhooks and replay protection.
- Medically reviewed and validated escalation rules, real facility/contact verification and formal emergency integration.

The browser vault encrypts payloads using AES-GCM with a fresh 96-bit IV, PBKDF2-SHA256 (250,000 iterations) and a random salt per LGU. The key is nonextractable and remains in memory. IndexedDB exposes only random record IDs, LGU identifiers, IVs and ciphertext. This is encrypted storage, not proof of staff identity or a completed security assessment. App-shell caching never caches patient data or API responses. Automatic demo retry runs only in the open unlocked tablet app; a locked/background app cannot decrypt its queue.
