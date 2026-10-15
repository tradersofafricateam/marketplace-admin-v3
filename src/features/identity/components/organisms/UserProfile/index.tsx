import { UserAvatar } from "../../molecules/UserAvatar";
import { UserAccountInformation } from "../UserAccountInformation";
import { UserBusinessInformation } from "../UserBusinessInformation";
import type { MarketplaceUserDetail } from "../../../types/users";
import { UserStatusBadge } from "../../atoms/UserStatusBadge";
import { VerificationIndicator } from "../../atoms/VerificationIndicator";

export function UserProfile({ user }: { user: MarketplaceUserDetail }) {
  return (
    <section className="grid gap-5 lg:grid-cols-[1fr_2fr]">
      <article className="self-start rounded-2xl border border-slate-200 bg-white p-6 text-center">
        <UserAvatar logo={user.companyLogo} firstName={user.firstName} lastName={user.lastName} />
        <h2 className="mt-4 text-xl font-bold text-navy-deep">{[user.firstName, user.lastName].filter(Boolean).join(" ") || "User"}</h2>
        <p className="mb-3 mt-1 capitalize text-slate-500">{user.userType}</p>
        <UserStatusBadge status={user.status} />
        <div className="mt-5 flex flex-col items-center gap-3"><VerificationIndicator label="Email" verified={user.isEmailVerified} /><VerificationIndicator label="Company" verified={user.isCompanyVerified} /></div>
      </article>
      <div className="space-y-5">
        <UserAccountInformation user={user} />
        <UserBusinessInformation user={user} />
      </div>
    </section>
  );
}
