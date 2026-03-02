// src/app/resume/page.tsx
import type { Metadata } from "next";
import ResumeClient from "./ResumeClient";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume for Tyler White — full-stack software engineer specializing in React, Next.js, TypeScript, and AWS.",
};

export default function ResumePage() {
  return <ResumeClient />;
}
