import { CheckCircle2, CircleMinus } from "lucide-react";

export function VerificationIndicator({ verified, label }: { verified: boolean; label: string }) {
  const Icon = verified ? CheckCircle2 : CircleMinus;
  return <span className={`inline-flex items-center gap-1.5 text-xs ${verified ? "text-emerald-700" : "text-slate-500"}`}><Icon size={14} aria-hidden="true" />{label}: {verified ? "Verified" : "Not verified"}</span>;
}
