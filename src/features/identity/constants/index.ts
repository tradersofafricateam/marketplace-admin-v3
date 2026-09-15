import type { AdminAccount, AdminRole, Permission, PermissionGroup, RolePermissionSummary, SellerVerificationDetail, SellerVerificationSummary } from "../types";

export const ADMIN_USERS_ENDPOINT = "/admin/admin-users";
export const ADMIN_ROLES_ENDPOINT = "/admin/roles";
export const ADMIN_PERMISSIONS_ENDPOINT = "/admin/permissions";
export const SELLER_VERIFICATIONS_ENDPOINT = "/admin/seller-verifications";
export const APPROVE_SELLER_ENDPOINT = "/admin/approve-seller";
export const REJECT_SELLER_ENDPOINT = "/admin/reject-seller";
export const REJECT_SELLER_REASON_MIN_LENGTH = 10;
export const USE_ADMIN_USERS_MOCK = false;
export const ADMIN_PAGE_LIMITS = [10, 20, 50] as const;

const permissionCatalogue: Record<string, [string, string][]> = {
  users: [
    ["users.view", "View users"],
    ["users.update", "Update users"],
    ["users.disable", "Disable users"],
    ["users.activate", "Activate users"],
  ],
  sellers: [
    ["sellers.view", "View sellers"],
    ["sellers.verify", "Verify sellers"],
    ["sellers.reject", "Reject seller verification"],
  ],
  products: [
    ["products.view", "View products"],
    ["products.update", "Update products"],
    ["products.activate", "Activate products"],
    ["products.deactivate", "Deactivate products"],
    ["products.archive", "Archive products"],
  ],
  categories: [
    ["categories.view", "View categories"],
    ["categories.create", "Create categories"],
    ["categories.update", "Update categories"],
    ["categories.activate", "Activate categories"],
    ["categories.deactivate", "Deactivate categories"],
    ["categories.archive", "Archive categories"],
  ],
  orders: [
    ["orders.view", "View orders"],
    ["orders.manage", "Manage orders"],
    ["orders.cancel", "Cancel orders"],
  ],
  payments: [
    ["payments.view", "View payments"],
    ["payments.verify", "Verify payments"],
    ["payments.reject", "Reject payments"],
  ],
  rfqs: [
    ["rfqs.view", "View RFQs"],
    ["rfqs.manage", "Manage RFQs"],
  ],
  reviews: [
    ["reviews.view", "View reviews"],
    ["reviews.moderate", "Moderate reviews"],
  ],
  subscriptions: [
    ["subscriptions.view", "View subscriptions"],
    ["subscriptions.manage", "Manage subscriptions"],
    ["subscription_plans.view", "View subscription plans"],
    ["subscription_plans.create", "Create subscription plans"],
    ["subscription_plans.update", "Update subscription plans"],
    ["subscription_plans.activate", "Activate subscription plans"],
    ["subscription_plans.deactivate", "Deactivate subscription plans"],
  ],
  analytics: [
    ["analytics.view_overview", "View overview analytics"],
    ["analytics.view_revenue", "View revenue analytics"],
    ["analytics.view_orders", "View order analytics"],
    ["analytics.export_reports", "Export analytics reports"],
  ],
  disputes: [
    ["disputes.view", "View disputes"],
    ["disputes.assign", "Assign disputes"],
    ["disputes.manage", "Manage disputes"],
    ["disputes.request_information", "Request dispute information"],
    ["disputes.resolve", "Resolve disputes"],
    ["disputes.close", "Close disputes"],
  ],
  admins: [
    ["admins.view", "View admin accounts"],
    ["admins.create", "Create admin accounts"],
    ["admins.update", "Update admin accounts"],
    ["admins.activate", "Activate admin accounts"],
    ["admins.deactivate", "Deactivate admin accounts"],
  ],
  roles: [
    ["roles.view", "View admin roles"],
    ["roles.create", "Create admin roles"],
    ["roles.update", "Update admin roles"],
    ["roles.deactivate", "Deactivate admin roles"],
  ],
  permissions: [
    ["permissions.view", "View permissions"],
    ["permissions.assign", "Assign permissions to roles"],
  ],
  settings: [
    ["settings.view", "View system settings"],
    ["settings.update", "Update system settings"],
    ["settings.countries.manage", "Manage countries"],
    ["settings.currencies.manage", "Manage currencies"],
    ["settings.settlement.manage", "Manage settlement configuration"],
    ["settings.payout.manage", "Manage payout configuration"],
  ],
};

export const mockPermissions: Permission[] = Object.entries(permissionCatalogue).flatMap(
  ([module, entries]) =>
    entries.map(([code, name], index) => ({
      id: `perm_${module}_${index}`,
      code,
      name,
      description: name,
      module,
      status: "active" as const,
    })),
);

export const mockPermissionGroups: PermissionGroup[] = Object.keys(permissionCatalogue).map((module) => ({
  module,
  permissions: mockPermissions.filter((permission) => permission.module === module),
}));

export const mockPermissionsByRole: Record<string, string[]> = {
  role_operations: ["users.view", "sellers.view", "orders.view", "orders.manage"],
  role_finance: ["payments.view", "payments.verify", "analytics.view_revenue", "subscriptions.view"],
  role_compliance: ["sellers.view", "sellers.verify", "disputes.view", "disputes.resolve"],
  role_support: ["users.view", "orders.view", "disputes.view", "disputes.request_information"],
};

export function resolveRolePermissions(codes: string[]): RolePermissionSummary[] {
  return mockPermissions
    .filter((permission) => codes.includes(permission.code))
    .map(({ id, code, name }) => ({ id, code, name }));
}

export function resolveRolePermissionsByIds(ids: string[]): RolePermissionSummary[] {
  return mockPermissions
    .filter((permission) => ids.includes(permission.id))
    .map(({ id, code, name }) => ({ id, code, name }));
}

export const mockRoles: AdminRole[] = [
  {
    id: "role_operations",
    name: "Operations Manager",
    description: "Day-to-day marketplace operations across users, sellers, and orders.",
    status: "active",
    permissions: resolveRolePermissions(mockPermissionsByRole.role_operations),
  },
  {
    id: "role_finance",
    name: "Finance Manager",
    description: "Payment verification and financial reporting.",
    status: "active",
    permissions: resolveRolePermissions(mockPermissionsByRole.role_finance),
  },
  {
    id: "role_support",
    name: "Customer Support",
    description: "Front-line support for users and dispute intake.",
    status: "active",
    permissions: resolveRolePermissions(mockPermissionsByRole.role_support),
  },
  {
    id: "role_compliance",
    name: "Compliance Officer",
    description: "Seller verification and dispute resolution oversight.",
    status: "active",
    permissions: resolveRolePermissions(mockPermissionsByRole.role_compliance),
  },
];

const people = [
  ["Joy", "Okafor", "joy@tofa.com", "role_operations", "active"],
  ["David", "Mensah", "david@tofa.com", "role_finance", "active"],
  ["Amina", "Bello", "amina@tofa.com", "role_support", "pending"],
  ["Kofi", "Owusu", "kofi@tofa.com", "role_compliance", "inactive"],
  ["Grace", "Eze", "grace@tofa.com", "role_operations", "active"],
  ["Samuel", "Adeyemi", "samuel@tofa.com", "role_finance", "active"],
  ["Fatima", "Diallo", "fatima@tofa.com", "role_support", "pending"],
  ["Daniel", "Ncube", "daniel@tofa.com", "role_operations", "inactive"],
  ["Linda", "Boateng", "linda@tofa.com", "role_compliance", "active"],
  ["Peter", "Kamau", "peter@tofa.com", "role_support", "active"],
  ["Zainab", "Musa", "zainab@tofa.com", "role_finance", "active"],
  ["Michael", "Osei", "michael@tofa.com", "role_operations", "active"],
] as const;

export const mockAdmins: AdminAccount[] = people.map(([firstName, lastName, email, roleId, status], index) => ({
  id: `admin_${102 + index}`,
  firstName, lastName, email,
  phoneNumber: `+2348012345${String(678 + index).slice(-3)}`,
  status,
  isSuperAdmin: index === 1,
  role: mockRoles.find((role) => role.id === roleId) ?? mockRoles[0],
  permissions: mockPermissionsByRole[roleId] ?? [],
  lastLoginAt: status === "pending" ? null : new Date(Date.UTC(2026, 7, 28 - index, 8, 0)).toISOString(),
  createdAt: new Date(Date.UTC(2026, 7, 1 + index, 10, 0)).toISOString(),
}));

const sellerApplications = [
  ["ver_221", "usr_112", "Victor Agro Export Ltd", "Victor Agro Export Ltd", "RC123456", "Agriculture", 5, "Lagos, Nigeria", "Oshodi warehouse", "Exporter of premium agricultural commodities.", "Nigeria", "pending"],
  ["ver_222", "usr_113", "Accra Textile Traders", "Accra Textile Traders Ltd", "RC778812", "Textiles", 3, "Accra, Ghana", "Tema industrial area", "Wholesale supplier of West African textiles.", "Ghana", "pending"],
  ["ver_223", "usr_114", "Nairobi Fresh Produce", "Nairobi Fresh Produce Co.", "RC445321", "Agriculture", 8, "Nairobi, Kenya", "Industrial area warehouse", "Exporter of fresh fruit and vegetables.", "Kenya", "approved"],
  ["ver_224", "usr_115", "Lagos Steel Works", "Lagos Steel Works Ltd", "RC990123", "Manufacturing", 2, "Ikeja, Lagos", "Apapa port storage", "Steel fabrication and export.", "Nigeria", "rejected"],
] as const;

export const mockSellerVerifications: SellerVerificationDetail[] = sellerApplications.map(
  ([verificationId, userId, storeName, companyName, registrationNumber, businessType, yearsOfBusiness, companyAddress, pickupAddress, companyBio, country, status], index) => ({
    verificationId,
    userId,
    status,
    storeName,
    companyName,
    registrationNumber,
    businessType,
    yearsOfBusiness,
    companyAddress,
    pickupAddress,
    companyBio,
    country,
    companyLogo: undefined,
    submittedAt: new Date(Date.UTC(2026, 2, 16 - index, 9, 0)).toISOString(),
    reviewedAt: status === "pending" ? null : new Date(Date.UTC(2026, 2, 18 - index, 10, 0)).toISOString(),
    reviewedBy: status === "pending" ? null : "admin_103",
    rejectionReason: status === "rejected" ? "Invalid registration document." : null,
  }),
);

export const mockSellerVerificationSummaries = (): SellerVerificationSummary[] =>
  mockSellerVerifications.map((verification) => ({
    verificationId: verification.verificationId!,
    companyName: verification.companyName,
    userId: verification.userId!,
    submittedAt: verification.submittedAt,
    status: verification.status,
  }));
