# Category management

The `/categories` admin page uses small atoms, molecules, organisms and templates.
API requests, query hooks, permissions, query-string state, types and lifecycle helpers
are kept outside rendering components.

## Endpoint usage

- `GET /admin/categories`: management list and paginated parent lookup.
- `POST /admin/categories`: multipart creation with name, optional description/sourceLanguage/parentId/sortOrder, and optional binary icon/image files (JPEG, PNG, WebP). Only name is required. The backend applies its configured upload-size policy.
- `PATCH /admin/categories/:id`: changed fields only.
- `PATCH /admin/categories/:id/status`: activate, deactivate, archive and soft delete, with a reason.
- `GET /categories`: active-category browsing and subcategory search.
- `GET /categories/tree`: hierarchy and product category filter.
- `GET /categories/:id`: public active-category details.

All category queries share a cache prefix and are invalidated after mutations.
Product filters send `categoryId`; relationships remain `categoryIds[]`.

## Contract boundaries

The supplied spec has no admin detail endpoint. The management View action displays
fields returned by the admin list, and partial edit requests leave omitted fields
untouched unless an admin supplies a new value. Public details are used only for
active-category previews, never as an admin fallback for archived/deleted records.

The backend remains responsible for uniqueness, circular-parent checks, permissions,
translation, slug generation, audit records and historical relationships. Existing
category migration requires the source category list and backend migration tooling;
this frontend does not recreate or seed production categories. No audit-history or
product-assignment mutation endpoints were provided, so none are invented here.

Mutation controls use `categories.create`, `categories.update`, `categories.activate`,
`categories.deactivate`, `categories.archive`, and `categories.delete`, with the
existing super-admin override. The backend must enforce the same permissions.

## Checks

Run `node --test src/features/categories/tests/category-rules.test.mjs` on Node 24,
plus `npm run typecheck` and ESLint on the category feature and routes.
