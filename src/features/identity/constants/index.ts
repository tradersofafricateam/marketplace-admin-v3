import type { AdminAccount, AdminRole } from "../types";

export const ADMIN_USERS_ENDPOINT = "/admin/admin-users";
export const ADMIN_ROLES_ENDPOINT = "/admin/roles";
export const USE_ADMIN_USERS_MOCK = true;
export const ADMIN_PAGE_LIMITS = [10, 20, 50] as const;

export const mockRoles: AdminRole[] = [
  { id: "role_operations", name: "Operations Manager", status: "active" },
  { id: "role_finance", name: "Finance Manager", status: "active" },
  { id: "role_support", name: "Customer Support", status: "active" },
  { id: "role_compliance", name: "Compliance Officer", status: "active" },
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
  lastLoginAt: status === "pending" ? null : new Date(Date.UTC(2026, 7, 28 - index, 8, 0)).toISOString(),
  createdAt: new Date(Date.UTC(2026, 7, 1 + index, 10, 0)).toISOString(),
}));
