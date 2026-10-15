# Admin subscription plans

The `/subscription-plans` route implements the admin operations documented in
sections 11.24–11.30 of the Subscription Management specification.

| Method | Endpoint | UI |
| --- | --- | --- |
| GET | `/admin/subscription-plans` | Plan catalogue; status, audience and isFree filters |
| POST | `/admin/subscription-plans` | Create draft plan |
| PATCH | `/admin/subscription-plans/:planId` | Edit configuration using changed fields |
| PATCH | `/admin/subscription-plans/:planId/status` | Activate or deactivate with confirmation |

API, types, pure validation helpers, query/mutation hooks, form state and atomic UI
components are separate. Mutations invalidate the shared subscription-plan query
prefix and display success/error toasts. Permissions use `subscription_plans.*`
from the existing auth store, including its super-admin override.

## Builder

Plans have dynamic names, audience, free/default flags and display order. Prices
support multiple currencies and billing periods. Duplicate currency/period pairs,
negative prices, nonzero free-plan prices and invalid numeric values are rejected.

Entitlements are grouped and typed. The spec's initial entitlement definitions are
UI metadata, not plan-dependent business rules or default benefits. Unknown codes
returned by the API are retained and editable; custom codes can be added. No values
are inferred from plan names. Seller/all-audience plans require a fee from 0 to 100,
including decimals. The editor warns that changes apply only to future eligible
transactions; the backend owns financial snapshots and authoritative validation.

## Response assumptions and boundaries

The admin list response is assumed to be `{ success, data: SubscriptionPlan[] }`
with complete configuration, as described in the spec. Entitlements use its keyed
object format, and prices use its array format. No admin detail endpoint is given,
so previews and edits use the list record; incomplete records cannot be edited.

There is no admin user-subscription listing, assignment, renewal, cancellation,
audit-history or entitlement-definition endpoint in this document. The documented
`/subscriptions/current`, `/subscriptions/history`, renewal and auto-renewal APIs
are user-facing. They are not called on behalf of arbitrary users from this admin
feature. Archive is displayed as a status/filter, but no unsupported archive or
hard-delete action is offered.

No payment activation or gateway logic is implemented here. The backend remains
responsible for payments, existing subscription policy, audit events, notifications,
default-plan uniqueness, and preserving locked transaction financials.

## Validation

- `node --test src/features/subscriptions/tests/plan-rules.test.mjs`
- `npm run typecheck`
- `npx eslint src/features/subscriptions 'src/app/(admin)/subscription-plans'`
