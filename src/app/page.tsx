import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Tyler White | Software Engineer",
  description:
    "Full-stack software engineer specializing in React, Next.js, TypeScript, and AWS. Builder of Symon Rental and modern web applications.",
};

export default function Page() {
  return <HomeClient />;
}
