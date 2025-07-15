// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientLayout from "./client-layout";
import { metadata as meta } from "./metadata";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = meta;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
