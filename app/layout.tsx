import "./globals.css";
import Navbar from "@/components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gulden Brand",
  description: "next zustand stripe full stack eccomerce store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-full flex-col bg-gray-300">
        <Navbar />
        <main className="grow container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
