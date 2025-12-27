import Link from "next/link";
import Stripe from "stripe";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

interface props {
  product: Stripe.Product;
}
function ProductCard({ product }: props) {
  const price = product.default_price as Stripe.Price;

  return (
    <Link
      href={`/products/${product.id}`}
      className="group transition-all duration-300 "
    >
      <Card className="h-full p-0 gap-0 justify-between shadow-sm">
        {product.images && product.images[0] && (
          <div className="relative h-[300px] w-full overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className=" w-full h-full group-hover:scale-108 group-hover:opacity-75 group-hover:rotate-2 object-cover transition-all duration-200 ease-in-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) w-full h-[300px]"
            />
          </div>
        )}
        <CardHeader className="p-4 grow flex flex-col justify-between">
          <CardTitle className="text-lg font-bold text-gray-800">
            {product.name}
          </CardTitle>
          {product.description && (
            <p className="text-sm text-gray-600 mb-2">
              {product.description.charAt(0).toUpperCase() +
                product.description.slice(1).slice(0, 50)}
            </p>
          )}
          <CardContent className="p-0 w-full mt-4  flex justify-between gap-3 items-center">
            {price && price.unit_amount && (
              <p className="-text-lg font-bold text-gray-900 ">
                ${(price.unit_amount / 100).toFixed(2)}
              </p>
            )}
            <Button className="w-fit self-end">View Details</Button>
          </CardContent>
        </CardHeader>
      </Card>
    </Link>
  );
}

export default ProductCard;
