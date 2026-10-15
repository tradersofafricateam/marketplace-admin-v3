import { ProductDetails } from "@/features/products/components/templates/ProductDetails";

export default async function ProductInfoRoute({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  return <ProductDetails productId={productId} />;
}
