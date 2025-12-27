"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Carousel from "@/components/Carousel";
import Stripe from "stripe"; // Ensure stripe types are available or use any
import gsap from "gsap";

interface LandingUIProps {
  products: any[]; // relaxed type to avoid import issues if Stripe type not exported universally
}

export default function LandingUI({ products }: LandingUIProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 1 },
      });

      tl.fromTo(
        textRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0 }
      ).fromTo(
        imageRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0 },
        "-=0.5"
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef}>
      <section className="rounded-xl bg-muted/50 py-12 sm:py-20 shadow-sm border">
        <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-8 sm:px-16 md:grid-cols-2">
          <div ref={textRef} className="max-w-md space-y-6 opacity-0">
            <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl text-foreground">
              Welcome to <span className="text-primary">Gulden Brand</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Discover the latest products at the best prices. Quality you can
              trust, style you can flaunt.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Link href="/products">Browse All Products</Link>
            </Button>
          </div>
          {products.length > 0 && products[0].images[0] && (
            <div ref={imageRef} className="opacity-0">
              <Image
                alt="Hero Image"
                src={products[0].images[0]}
                className="rounded-2xl shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500"
                width={500}
                height={500}
                priority
              />
            </div>
          )}
        </div>
      </section>
      <section className="py-12">
        <h3 className="text-2xl font-bold mb-6 text-center text-foreground">
          Featured Products
        </h3>
        <Carousel products={products} />
      </section>
    </div>
  );
}
