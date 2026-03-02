"use client";

import { useEffect, useRef, useState } from "react";
import NavBar from "./components/NavBar";
import HeroWebGL from "./components/HeroWebGL";
import ProfileSection from "./components/ProfileSection";
import { Box } from "@mui/material";
import WorkSection from "./components/WorkSection";

export default function Home() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [navVisible, setNavVisible] = useState<boolean>(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // “fully in profile” feel (tweak if you want earlier)
        const show = entry.isIntersecting && entry.intersectionRatio >= 0.7;
        setNavVisible(show);
      },
      { threshold: [0, 0.25, 0.6, 1] },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <main>
      <NavBar visible={navVisible} />
      <HeroWebGL />
      <Box
        sx={{
          height: 180,
          // pull this band up over the bottom of the hero
          mt: "-180px",
          position: "relative",
          zIndex: 2,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.65) 40%, rgba(255,255,255,1) 100%)",
        }}
      />
      {/* content under hero */}
      <ProfileSection sectionRef={sectionRef} />
      <WorkSection />
    </main>
  );
}
