"use client";
import Link from "next/link";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useCartStore } from "@/store/cart-store";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function Navbar() {
  const { getCartItemsQuanitiy } = useCartStore();
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow py-2">
      <div className="container mx-auto flex items-center justify-between px-4 scroll-py-44">
        <Link href="/" className="hover:text-blue-600">
          Gulden Brand
        </Link>
        <div className="hidden md:flex space-x-6 font-medium">
          <Link className="transition duration-300 hover:text-primary" href="/">
            Home
          </Link>
          <Link
            className="transition duration-300 hover:text-primary"
            href="/products"
          >
            Products
          </Link>
          <Link
            className="transition duration-300 hover:text-primary"
            href="/checkout"
          >
            Checkout
          </Link>
        </div>

        <div className="flex items-center justify-center space-x-2">
          <Link
            href="/checkout"
            className="relative hover:text-primary transition duration-300"
          >
            <ShoppingCartIcon className="h-8 w-8" />
            {getCartItemsQuanitiy() > 0 && (
              <span className="p-2 absolute top-1 left-6 inline-flex items-center justify-center px-1.5  before:rounded-full before:px-1 before:py-1  before:bg-primary before:text-xs before:content-[''] before:z-50  ">
                {getCartItemsQuanitiy()}
              </span>
            )}
          </Link>

          <Button
            variant="ghost"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden"
          >
            {mobileOpen ? (
              <XMarkIcon className="h-6 w-6" /> //x
            ) : (
              <Bars3Icon className="h-6 w-6" /> //menu
            )}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black ">
          <div className="relative h-full w-full z-80 ">
            <div className="absolute right-0 top-0 h-full w-[70%] bg-white ">
              <div className="flex items-center justify-between p-4">
                <Link href="/" className="hover:text-blue-600">
                  Gulden Brand
                </Link>
                <Button
                  variant="ghost"
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="md:hidden hover:text-primary "
                >
                  <XMarkIcon className=" cursor-pointer" />
                </Button>
              </div>
              <div className="flex flex-col space-y-4 p-4">
                <Link href="/" className="hover:text-primary">
                  Home
                </Link>
                <Link href="/products" className="hover:text-primary">
                  Products
                </Link>
                <Link href="/checkout" className="hover:text-primary">
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
