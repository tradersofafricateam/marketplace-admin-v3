# Feature boundaries

Each business capability owns its API calls, hooks, domain types, validation, constants, and feature-specific atomic components. Shared primitives belong in `src/components`; cross-cutting infrastructure belongs in `src/lib`.

The initial boundaries are:

- `dashboard`: overview
- `identity`: users, seller/business verification, admin users, roles, permissions
- `catalog`: products and categories
- `orders`: orders, returns, and cancellations
- `finance`: payments, refunds, settlements, payouts, and payout-account review
- `logistics`: delivery and logistics operations
- `rfq`: direct and market RFQs
- `trust-safety`: disputes, review moderation, and communication oversight
- `subscriptions`: plan and user subscription management
- `engagement`: notifications, referrals, and rewards
- `insights`: analytics, reporting, and audit logs
- `configuration`: marketplace, country, currency, language, payment method, logistics provider, settlement, and payout configuration

When implementing a capability, use the same internal structure as the marketplace frontend:

```text
feature/
  api/
  components/{atoms,molecules,organisms,templates}/
  constants/
  helpers/
  hooks/
  types/
  index.ts
```
