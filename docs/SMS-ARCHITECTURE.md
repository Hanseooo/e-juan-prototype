# Native SMS integration boundary

SMS is an independent access client: a resident types into their phone's built-in Messages app. No E-JUAN installation or citizen SMS tab is involved. This repository has no gateway number, telecom account, webhook server or message delivery capability. The LGU SMS Operations screen therefore shows disconnected/unmeasured states rather than sample private messages or fabricated traffic.

## Required backend sequence

1. A contracted telecom gateway sends inbound events to `POST /webhooks/sms/inbound` over TLS. Verify its signature against the raw body, timestamp and replay window before parsing or accepting the event. Keep secrets server-side.
2. Resolve the receiving number to an enabled tenant. Never trust a tenant ID supplied in a message. Normalize sender identity, record purpose/consent, rate-limit and deduplicate by `(gateway, event_id)` using a unique database constraint.
3. Persist the validated event and enqueue processing atomically; reply to the gateway after durable acceptance. Do not perform clinical processing in the webhook request.
4. The worker applies a versioned, clinically reviewed care-navigation protocol. Do not diagnose, issue prescriptions, promise medicine or emergency dispatch, or improvise emergency escalation. Unknown location, ambiguous symptoms and missing information require clarification or human assessment.
5. Read only authorized tenant facilities and inventory. Include confirmation timestamps; stale/missing inventory is Unconfirmed. Limit reply length and explain dispensing requirements.
6. Queue an outbound reply with an idempotency key. Record send attempts without logging health content into general application logs. Delivery receipts enter `POST /webhooks/sms/status`, with the same signature and replay controls.
7. Retry transient failures with bounded backoff; move permanent failures to a restricted review queue. Delivery success is not proof that guidance was read or emergency care was provided.

## Proposed contracts (not running endpoints)

- Inbound event: `gateway`, `eventId`, `receivedAt`, `receivingNumber`, `senderNumber`, `body`, `signature`.
- Internal envelope: `id`, server-resolved `tenantId`, encrypted/restricted sender reference and message body, protocol version, consent/purpose, processing state.
- Delivery receipt: gateway message reference, event ID, status, event timestamp and error code. Validate transitions; never infer delivery from outbound enqueue success.
- Metrics: tenant, interval, inbound/outbound totals, delivery failures, billed segments and actual contracted cost. Portal permissions expose aggregates by default, with audited case-specific access for message content.

## Production dependencies

Gateway contract and assigned number; number/tenant mapping; signed webhook verification; PostgreSQL unique constraints and tenant RLS; encrypted storage and retention policy; authorized clinical protocol and human review; delivery callbacks; background workers; rate limits; cost reconciliation; access/audit review; local-language and accessibility evaluation. Native-device sending, delivery, gateway failover and webhook replay tests cannot be run against this frontend-only repository.
