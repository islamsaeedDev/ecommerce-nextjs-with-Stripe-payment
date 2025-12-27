import ProductDetail from "@/components/ProductDetail";
import { stripe } from "@/lib/stripe";

async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // ← Await params first

  const product = await stripe.products.retrieve(id, {
    expand: ["default_price"],
  });

  const plainProduct = JSON.parse(JSON.stringify(product));

  return <ProductDetail product={plainProduct} />;
}

export default ProductPage;
