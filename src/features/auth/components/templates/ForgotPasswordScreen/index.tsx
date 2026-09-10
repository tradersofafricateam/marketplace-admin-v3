import { AuthShell } from "../AuthShell";
import { ForgotPasswordForm } from "../../organisms";

export function ForgotPasswordScreen() {
  return (
    <AuthShell eyebrow="Admin portal" title="Forgot password?" subtitle="Enter the email linked to your admin account and we'll send you a reset code.">
      <ForgotPasswordForm />
    </AuthShell>
  );
}
