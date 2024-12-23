import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Monte Carlo Simulation",
  description: "Monte Carlo simulation for production planning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`bg-black text-white ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
