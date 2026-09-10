"use client";

import { useState } from "react";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { AuthInput, AuthLabel } from "../../atoms";
import { AuthFormField } from "../../molecules";
import { useResetPassword } from "../../../hooks";

type ResetPasswordFormProps = {
  initialEmail?: string;
};

export function ResetPasswordForm({ initialEmail = "" }: ResetPasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [mismatch, setMismatch] = useState(false);
  const { resetPassword, isPending, error } = useResetPassword();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const password = String(data.get("password"));
        if (password !== String(data.get("confirmPassword"))) {
          setMismatch(true);
          return;
        }
        setMismatch(false);
        resetPassword({ email: String(data.get("email")), otp: String(data.get("otp")), password });
      }}
      className="mt-8 space-y-5"
    >
      <AuthFormField label="Email address" id="email" name="email" type="email" autoComplete="email" defaultValue={initialEmail} placeholder="admin@tofa.com" required />
      <AuthFormField label="Reset code" id="otp" name="otp" type="text" inputMode="numeric" autoComplete="one-time-code" placeholder="6-digit code" required />

      <div className="space-y-2">
        <AuthLabel htmlFor="password">New password</AuthLabel>
        <div className="relative">
          <AuthInput
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Enter a new password"
            className="pr-12"
            required
            minLength={8}
          />
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-navy"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>
      </div>

      <AuthFormField label="Confirm new password" id="confirmPassword" name="confirmPassword" type={showPassword ? "text" : "password"} autoComplete="new-password" placeholder="Re-enter the new password" required minLength={8} />

      {(mismatch || error) && (
        <p role="alert" className="rounded-[10px] border border-orange/20 bg-orange/[0.07] px-4 py-3 text-[13px] font-medium text-orange-700">
          {mismatch ? "Passwords do not match." : error}
        </p>
      )}

      <button
        disabled={isPending}
        className="flex h-13 w-full items-center justify-center gap-2 rounded-[10px] bg-navy text-[15px] font-semibold text-white shadow-[0_14px_28px_-10px_rgba(11,30,74,0.6)] transition hover:bg-navy-deep disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending && <LoaderCircle className="animate-spin" size={17} />}
        {isPending ? "Resetting password" : "Reset password"}
      </button>
    </form>
  );
}
