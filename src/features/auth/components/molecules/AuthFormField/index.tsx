import { AuthInput, AuthLabel } from "../../atoms";

type AuthFormFieldProps = React.ComponentProps<"input"> & { label: string };

export function AuthFormField({ label, id, ...props }: AuthFormFieldProps) {
  return <div className="space-y-2"><AuthLabel htmlFor={id}>{label}</AuthLabel><AuthInput id={id} {...props} /></div>;
}
