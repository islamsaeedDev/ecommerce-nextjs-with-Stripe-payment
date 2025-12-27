"use client";
import { useState } from "react";
import Stripe from "stripe";
import ProductCard from "./ProductCard";

interface props {
  products: Stripe.Product[];
}
function ProductList({ products }: props) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLowerCase();
    const nameTerm = product.name.toLowerCase().includes(term);
    const descriptionTerm = product.description
      ? product.description.toLowerCase().includes(term)
      : false;
    return nameTerm || descriptionTerm;
  });

  return (
    <>
      <div className="mt-6 mb-6 flex justify-center">
        <input
          className="mb-6 w-full max-w-md rounded-full border border-gray-700  px-5 py-2 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary"
          type="text"
          placeholder="Search All products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2   lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </ul>
    </>
  );
}

export default ProductList;
