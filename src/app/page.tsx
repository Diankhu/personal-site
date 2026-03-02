"use client";

import { useEffect, useRef, useState } from "react";
import NavBar from "./components/NavBar";
import HeroWebGL from "./components/HeroWebGL";
import ProfileSection from "./components/ProfileSection";
import WorkSection from "./components/WorkSection";
import { Box } from "@mui/material";
import ContactSection from "./components/ContactSection";

export default function Home() {
  const heroExitRef = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);

  const [navVisible, setNavVisible] = useState<boolean>(false);

  useEffect(() => {
    const el = heroExitRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        // When sentinel is visible, you're still basically in hero => hide nav
        // Once it scrolls out of view, you're in content => show nav
        setNavVisible(!entry.isIntersecting);
      },
      {
        // threshold 0 is fine since it's a 1px sentinel
        threshold: 0,
        // optional: reveal nav a touch later by pushing the observer line down
        rootMargin: "-40px 0px 0px 0px",
      },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <main>
      <NavBar visible={navVisible} />

      <HeroWebGL />

      {/* Fade band */}
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

      {/* 🔥 Sentinel: once you scroll past this, nav stays on */}
      <Box ref={heroExitRef} sx={{ height: 1 }} />

      <ProfileSection sectionRef={profileRef} />
      <WorkSection />
      <ContactSection />
    </main>
  );
}
