import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "./providers";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import { NavProvider } from "./NavContext";
import "./globals.css";
const SITE_URL = "https://yourdomain.com";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Tyler White | Software Engineer",
    template: "%s | Tyler White",
  },

  description:
    "Full-stack software engineer specializing in React, Next.js, TypeScript, and AWS. Builder of production SaaS platforms and modern web applications.",

  openGraph: {
    title: "Tyler White | Software Engineer",
    description:
      "Full-stack engineer building production SaaS systems and modern web platforms.",
    url: SITE_URL,
    siteName: "Tyler White",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Tyler White | Software Engineer",
    description:
      "Full-stack engineer building production SaaS systems and modern web platforms.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Providers>
          <NavProvider>
            <NavBar />

            <div style={{ flex: 1 }}>{children}</div>

            <Footer />
          </NavProvider>
        </Providers>
      </body>
    </html>
  );
}
