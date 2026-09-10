"use client";

import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import { AuthFormField } from "../../molecules";
import { useForgotPassword } from "../../../hooks";

export function ForgotPasswordForm() {
  const { requestReset, isPending, error } = useForgotPassword();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        requestReset({ email: String(data.get("email")) });
      }}
      className="mt-8 space-y-5"
    >
      <AuthFormField
        label="Email address"
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="admin@tofa.com"
        required
      />

      {error && (
        <p role="alert" className="rounded-[10px] border border-orange/20 bg-orange/[0.07] px-4 py-3 text-[13px] font-medium text-orange-700">
          {error}
        </p>
      )}

      <button
        disabled={isPending}
        className="flex h-13 w-full items-center justify-center gap-2 rounded-[10px] bg-navy text-[15px] font-semibold text-white shadow-[0_14px_28px_-10px_rgba(11,30,74,0.6)] transition hover:bg-navy-deep disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending && <LoaderCircle className="animate-spin" size={17} />}
        {isPending ? "Sending code" : "Send reset code"}
      </button>

      <Link href="/login" className="block text-center text-[13px] font-semibold text-navy/75 hover:text-navy">
        Back to sign in
      </Link>
    </form>
  );
}
