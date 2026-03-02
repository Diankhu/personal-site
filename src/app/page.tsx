"use client";

import { useEffect, useRef } from "react";
import HeroWebGL from "./components/HeroWebGL";
import ProfileSection from "./components/ProfileSection";
import WorkSection from "./components/WorkSection";
import { Box } from "@mui/material";
import ContactSection from "./components/ContactSection";
import { useNav } from "./NavContext";

export default function Home() {
  const heroExitRef = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const { setVisible } = useNav();

  useEffect(() => {
    const el = heroExitRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "-40px 0px 0px 0px",
      },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [setVisible]);

  return (
    <main>
      <HeroWebGL />

      <Box
        sx={{
          height: 180,
          mt: "-180px",
          position: "relative",
          zIndex: 2,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.65) 40%, rgba(255,255,255,1) 100%)",
        }}
      />

      <Box ref={heroExitRef} sx={{ height: 1 }} />

      <ProfileSection sectionRef={profileRef} />
      <WorkSection />
      <ContactSection />
    </main>
  );
}
