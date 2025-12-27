import { stripe } from "@/lib/stripe";
import LandingUI from "@/components/LandingUI";

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  });

  return (
    <div>
      <LandingUI products={products.data} />
    </div>
  );
}
