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
import { ModeToggle } from "./ModeToggle";

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
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 shadow py-2 border-b">
      <div className="container mx-auto flex items-center justify-between px-4 scroll-py-44">
        <Link href="/" className="hover:text-primary text-xl font-bold">
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

        <div className="flex items-center justify-center space-x-4">
          <Link
            href="/checkout"
            className="relative hover:text-primary transition duration-300"
          >
            <ShoppingCartIcon className="h-6 w-6" />
            {getCartItemsQuanitiy() > 0 && (
              <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {getCartItemsQuanitiy()}
              </span>
            )}
          </Link>

          <ModeToggle />

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
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="relative h-full w-full z-80 ">
            <div className="absolute right-0 top-0 h-full w-[70%] bg-popover border-l p-4 shadow-xl">
              <div className="flex items-center justify-between p-4">
                <Link href="/" className="font-bold text-lg hover:text-primary">
                  Gulden Brand
                </Link>
                <Button
                  variant="ghost"
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="md:hidden hover:text-primary "
                >
                  <XMarkIcon className="h-6 w-6 cursor-pointer" />
                </Button>
              </div>
              <div className="flex flex-col space-y-4 p-4 font-medium">
                <Link
                  href="/"
                  className="hover:text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  className="hover:text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  Products
                </Link>
                <Link
                  href="/checkout"
                  className="hover:text-primary"
                  onClick={() => setMobileOpen(false)}
                >
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
