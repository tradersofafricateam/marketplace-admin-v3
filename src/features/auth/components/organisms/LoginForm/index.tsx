"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { AuthInput, AuthLabel } from "../../atoms";
import { AuthFormField } from "../../molecules";
import { useAdminLogin } from "../../../hooks";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isPending, error } = useAdminLogin();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        login({
          email: String(data.get("email")),
          password: String(data.get("password")),
          rememberMe: data.get("rememberMe") === "on",
        });
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
      <div className="space-y-2">
        <AuthLabel htmlFor="password">Password</AuthLabel>
        <div className="relative">
          <AuthInput
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
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
      <div className="flex items-center justify-between gap-4 pt-1">
        <label className="flex items-center gap-2 text-[13px] text-slate-500">
          <input
            name="rememberMe"
            type="checkbox"
            className="size-3.75 rounded-md border-slate-300 accent-navy"
          />
          Remember me
        </label>
        <Link href="/forgot-password" className="text-[13px] font-semibold text-navy/75 hover:text-navy">
          Forgot password?
        </Link>
      </div>
      {error && (
        <p
          role="alert"
          className="rounded-[10px] border border-orange/20 bg-orange/[0.07] px-4 py-3 text-[13px] font-medium text-orange-700"
        >
          {error}
        </p>
      )}
      <button
        disabled={isPending}
        className="flex h-13 w-full items-center justify-center gap-2 rounded-[10px] bg-navy text-[15px] font-semibold text-white shadow-[0_14px_28px_-10px_rgba(11,30,74,0.6)] transition hover:bg-navy-deep disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending && <LoaderCircle className="animate-spin" size={17} />}
        {isPending ? "Signing in" : "Sign in"}
      </button>
    </form>
  );
}
