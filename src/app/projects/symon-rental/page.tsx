// src/app/symon-rental/page.tsx
import type { Metadata } from "next";
import SymonRentalClient from "./SymonRentalClient";

export const metadata: Metadata = {
  title: "Symon Rental",
  description:
    "Case study: Symon Rental — a production multi-tenant rental platform with a Next.js admin dashboard, serverless AWS backend, and Stripe billing.",
};

export default function SymonRentalPage() {
  return <SymonRentalClient />;
}
