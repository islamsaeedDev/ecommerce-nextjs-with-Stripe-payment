import ProductList from "@/components/ProductList";
import { stripe } from "@/lib/stripe";

async function ProductsPage() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
  });

  return (
    <div className="pb-8">
      <h1 className="text-3xl font-bold">All Products</h1>
      <ProductList products={products.data} />
    </div>
  );
}

export default ProductsPage;
