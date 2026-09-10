import { AuthShell } from "../AuthShell";
import { LoginForm } from "../../organisms";

export function LoginScreen() {
  return (
    <AuthShell eyebrow="Admin portal" title="Welcome back" subtitle="Sign in with your administrator credentials to continue." footer="Access is monitored and recorded for security purposes.">
      <LoginForm />
    </AuthShell>
  );
}
