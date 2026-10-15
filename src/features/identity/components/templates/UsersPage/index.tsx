"use client";

import { SectionTitle } from "@/components/atoms/SectionTitle";
import { QueryError } from "@/components/organisms/QueryError";
import { useUsers } from "../../../hooks/use-users";
import { useUsersQuery } from "../../../hooks/use-users-query";
import { AdminPagination } from "../../molecules/AdminPagination";
import { UserTypeFilter } from "../../molecules/UserTypeFilter";
import { UsersSearch } from "../../molecules/UsersSearch";
import { UsersTable } from "../../organisms/UsersTable";
import { UsersPageSkeleton } from "../UsersPageSkeleton";

export function UsersPage() {
  const { query, updateQuery } = useUsersQuery();
  const users = useUsers(query);
  return (
    <div className="space-y-7">
      <SectionTitle eyebrow="People & access" title="Users" description="Browse marketplace users, contact details, and verification status." />
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <UsersSearch search={query.search} onSearch={(search) => updateQuery({ search, page: 1 })} />
        <UserTypeFilter value={query.userType} onChange={(userType) => updateQuery({ userType, page: 1 })} />
        {users.isPending ? <div className="p-5"><UsersPageSkeleton /></div> : users.isError ? (
          <div className="p-5"><QueryError resource="users" onRetry={() => { void users.refetch(); }} /></div>
        ) : <>
          <UsersTable users={users.data.data} />
          <AdminPagination itemLabel="users" pagination={{ ...users.data.meta, page: Math.max(1, users.data.meta.page), limit: query.limit, totalPages: Math.max(1, users.data.meta.totalPages) }} onPageChange={(page) => updateQuery({ page })} onLimitChange={(limit) => updateQuery({ limit, page: 1 })} />
        </>}
      </section>
    </div>
  );
}
