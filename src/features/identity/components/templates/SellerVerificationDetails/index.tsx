"use client";

import { CopyableId } from "@/components/atoms/CopyableId";

import { useState } from "react";
import { RichText } from "@/components/atoms/RichText";
import Link from "next/link";
import Image from "next/image";
import { QueryError } from "@/components/organisms/QueryError";
import { ArrowLeft, CalendarDays, Check, MapPin, Truck, X } from "lucide-react";
import { SectionTitle } from "@/components/atoms/SectionTitle";
import { useSellerVerification } from "../../../hooks";
import { formatAdminDate, getInitials } from "../../../helpers";
import { SellerVerificationStatusBadge } from "../../atoms";
import { ApproveSellerModal, RejectSellerModal } from "../../organisms";
import { SellerVerificationDetailsSkeleton } from "../SellerVerificationDetailsSkeleton";

export function SellerVerificationDetails({ verificationId }: { verificationId: string }) {
  const { data: verification, isPending, isError, refetch } = useSellerVerification(verificationId);
  const [failedLogo, setFailedLogo] = useState<string | null>(null);
  const [approveOpen, setApproveOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);

  if (isPending) return <SellerVerificationDetailsSkeleton />;
  if (isError) return <QueryError resource="seller verification" onRetry={() => { void refetch(); }} />;
  if (!verification) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8">
        <p className="font-semibold text-navy-deep">Verification request not found.</p>
        <Link href="/seller-verification" className="mt-3 inline-block text-sm text-sky-700">Return to seller verification</Link>
      </div>
    );
  }

  const fields: [string, string][] = [
    ["Registration number", verification.registrationNumber],
    ["Business type", verification.businessType],
    ["Years in business", String(verification.yearsOfBusiness)],
    ["Country", verification.country],
  ];

  return (
    <div className="space-y-7">
      <Link href="/seller-verification" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-navy">
        <ArrowLeft size={16} />
        Seller verification
      </Link>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionTitle eyebrow="Business verification" title={verification.companyName} description="Company details and verification documents submitted for admin review." />
        {verification.verificationStatus === "pending" && (
          <div className="flex gap-3">
            <button onClick={() => setRejectOpen(true)} className="inline-flex h-11 items-center gap-2 rounded-xl border border-red-200 bg-white px-4 text-sm font-semibold text-red-600 hover:bg-red-50">
              <X size={16} />
              Reject
            </button>
            <button onClick={() => setApproveOpen(true)} className="inline-flex h-11 items-center gap-2 rounded-xl bg-navy px-4 text-sm font-semibold text-white hover:bg-navy-deep">
              <Check size={16} />
              Approve
            </button>
          </div>
        )}
      </div>
      <section className="grid gap-5 xl:grid-cols-[0.85fr_1.4fr]">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <div className="mx-auto grid size-20 place-items-center overflow-hidden rounded-full bg-sky-50 text-2xl font-bold text-navy">
            {verification.companyLogo && failedLogo !== verification.companyLogo ? (
              <Image
                src={verification.companyLogo}
                alt={`${verification.companyName} logo`}
                width={80}
                height={80}
                unoptimized
                className="size-20 object-cover"
                onError={() => setFailedLogo(verification.companyLogo ?? null)}
              />
            ) : (
              <span aria-label="Applicant initials">
                {getInitials(verification.user?.firstName?.trim() ?? "", verification.user?.lastName?.trim() ?? "") || "?"}
              </span>
            )}
          </div>
          <h2 className="mt-4 text-xl font-bold text-navy-deep">{verification.companyName}</h2>
          <div className="mt-2">
            <SellerVerificationStatusBadge status={verification.verificationStatus} />
          </div>
          {verification.user && (
            <div className="mt-4 text-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Applicant</p>
              <Link href={`/users/${encodeURIComponent(verification.userId)}`} className="mt-1 block font-medium text-sky-700 hover:underline">{[verification.user.firstName, verification.user.lastName].filter(Boolean).join(" ") || "View user"}</Link>
              <a href={`mailto:${verification.user.email}`} className="text-sky-700 hover:underline">{verification.user.email}</a>
            </div>
          )}
          <div className="mt-6 space-y-3 border-t border-slate-100 pt-5 text-left text-sm text-slate-600">
            <p className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-sky-700" />
              {verification.companyAddress}
            </p>
            <p className="flex items-start gap-3">
              <Truck size={16} className="mt-0.5 shrink-0 text-sky-700" />
              {verification.pickupAddress}
            </p>
            <p className="flex items-start gap-3">
              <CalendarDays size={16} className="mt-0.5 shrink-0 text-sky-700" />
              Submitted {formatAdminDate(verification.submittedAt)}
            </p>
          </div>
        </article>
        <div className="space-y-5">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-navy-deep">Company information</h2>
            <dl className="mt-4 grid gap-x-8 sm:grid-cols-2">
              {fields.map(([label, value]) => (
                <div key={label} className="border-b border-slate-100 py-4">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</dt>
                  <dd className="mt-2 text-sm font-medium text-navy-deep">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Company bio</p>
              <RichText value={verification.companyBio} />
            </div>
          </article>
          {verification.verificationStatus !== "pending" && (
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="font-bold text-navy-deep">Review outcome</h2>
              <dl className="mt-4 grid gap-x-8 sm:grid-cols-2">
                <div className="border-b border-slate-100 py-4 sm:border-b-0">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">Reviewed at</dt>
                  <dd className="mt-2 text-sm font-medium text-navy-deep">{verification.reviewedAt ? formatAdminDate(verification.reviewedAt) : "—"}</dd>
                </div>
                <div className="py-4">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">Reviewed by</dt>
                  <dd className="mt-2 text-sm font-medium text-navy-deep">
                    {verification.reviewedBy ? (
                      <CopyableId
                        value={verification.reviewedBy}
                        label="Reviewer admin ID"
                        href={`/admin-users/${encodeURIComponent(verification.reviewedBy)}`}
                      />
                    ) : "—"}
                  </dd>
                </div>
              </dl>
              {verification.verificationStatus === "rejected" && verification.rejectionReason && (
                <div className="mt-2 rounded-xl border border-red-100 bg-red-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-red-700">Rejection reason</p>
                  <p className="mt-1 text-sm text-slate-700">{verification.rejectionReason}</p>
                </div>
              )}
            </article>
          )}
        </div>
      </section>
      <ApproveSellerModal open={approveOpen} verificationId={verificationId} companyName={verification.companyName} onClose={() => setApproveOpen(false)} />
      <RejectSellerModal open={rejectOpen} verificationId={verificationId} companyName={verification.companyName} onClose={() => setRejectOpen(false)} />
    </div>
  );
}
