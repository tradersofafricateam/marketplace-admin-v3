import { AuthShell } from "../AuthShell";
import { ResetPasswordForm } from "../../organisms";

type ResetPasswordScreenProps = {
  initialEmail?: string;
};

export function ResetPasswordScreen({ initialEmail }: ResetPasswordScreenProps) {
  return (
    <AuthShell eyebrow="Admin portal" title="Reset password" subtitle="Enter the code we sent you along with your new password.">
      <ResetPasswordForm initialEmail={initialEmail} />
    </AuthShell>
  );
}
