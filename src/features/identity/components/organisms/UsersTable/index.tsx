import { CopyableId } from "@/components/atoms/CopyableId";
import { DataTable, type DataTableColumn } from "@/components/organisms/DataTable";
import { formatAdminDate } from "../../../helpers";
import type { MarketplaceUser } from "../../../types/users";
import { UserStatusBadge } from "../../atoms/UserStatusBadge";
import { VerificationIndicator } from "../../atoms/VerificationIndicator";
import { UserIdentity } from "../../molecules/UserIdentity";

const columns: DataTableColumn<MarketplaceUser>[] = [
  { key: "user", header: "User", render: (user) => <UserIdentity user={user} /> },
  { key: "id", header: "User ID", render: (user) => <CopyableId value={user.id} label="User ID" /> },
  { key: "phone", header: "Phone", render: (user) => user.phoneNumber || "—" },
  { key: "type", header: "Type", render: (user) => <span className="capitalize">{user.userType}</span> },
  { key: "status", header: "Status", render: (user) => <UserStatusBadge status={user.status} /> },
  { key: "verification", header: "Verification", render: (user) => <div className="flex flex-col gap-2"><VerificationIndicator label="Email" verified={user.isEmailVerified} /><VerificationIndicator label="Company" verified={user.isCompanyVerified} /></div> },
  { key: "points", header: "Points", render: (user) => user.totalPoints.toLocaleString() },
  { key: "created", header: "Joined", render: (user) => <span className="whitespace-nowrap">{formatAdminDate(user.createdAt)}</span> },
];

export function UsersTable({ users }: { users: MarketplaceUser[] }) {
  return <DataTable columns={columns} data={users} getRowKey={(user) => user.id} emptyMessage="No users match your search." />;
}
