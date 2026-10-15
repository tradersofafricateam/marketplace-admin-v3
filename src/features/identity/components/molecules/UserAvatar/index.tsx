"use client";

import { useState } from "react";
import Image from "next/image";
import { getInitials } from "../../../helpers";

type Props = { logo: string | null; firstName: string; lastName: string };

export function UserAvatar({ logo, firstName, lastName }: Props) {
  const [failedLogo, setFailedLogo] = useState<string | null>(null);
  return (
    <span className="mx-auto grid size-20 place-items-center overflow-hidden rounded-full bg-sky-50 text-2xl font-bold text-navy">
      {logo && logo !== failedLogo ? <Image src={logo} alt={`${firstName} ${lastName} company logo`} width={80} height={80} unoptimized onError={() => setFailedLogo(logo)} className="size-20 object-cover" /> : getInitials(firstName, lastName) || "?"}
    </span>
  );
}
