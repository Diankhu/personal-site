// src/app/flask-portfolio/page.tsx
import type { Metadata } from "next";
import FlaskPortfolioClient from "./FlaskPortfolioClient";

export const metadata: Metadata = {
  title: "Flask Portfolio",
  description:
    "College full-stack Flask project featuring a daily Wordle game powered by a dictionary API and a flashcards app with decks, cards, and study workflows.",
};

export default function FlaskPortfolioPage() {
  return <FlaskPortfolioClient />;
}
