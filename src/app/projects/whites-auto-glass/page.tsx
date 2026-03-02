// src/app/whites-auto-glass/page.tsx
import type { Metadata } from "next";
import WhitesAutoGlassClient from "./WhitesAutoGlassClient";

export const metadata: Metadata = {
  title: "White’s Auto Glass & Trim",
  description:
    "Case study: White’s Auto Glass & Trim — conversion-focused, mobile-first marketing site built on Squarespace with clear service segmentation and local business UX.",
};

export default function WhitesAutoGlassPage() {
  return <WhitesAutoGlassClient />;
}
