import { SellerVerificationDetails } from "@/features/identity/components/templates/SellerVerificationDetails";

export default async function SellerVerificationInfoRoute({ params }: { params: Promise<{ verificationId: string }> }) {
  const { verificationId } = await params;
  return <SellerVerificationDetails verificationId={verificationId} />;
}
