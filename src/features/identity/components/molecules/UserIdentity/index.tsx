import Link from "next/link";
import { getInitials } from "../../../helpers";
import type { MarketplaceUser } from "../../../types/users";

export function UserIdentity({ user }: { user: MarketplaceUser }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sky-50 font-bold text-navy">{getInitials(user.firstName, user.lastName) || "?"}</span>
      <div className="min-w-0">
        <Link href={`/users/${encodeURIComponent(user.id)}`} className="whitespace-nowrap font-semibold text-navy-deep hover:text-sky-700 hover:underline">{[user.firstName, user.lastName].filter(Boolean).join(" ") || "View user"}</Link>
        <p className="whitespace-nowrap text-xs text-slate-500">{user.email}</p>
      </div>
    </div>
  );
}
