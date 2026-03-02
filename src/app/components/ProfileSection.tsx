// src/app/components/ProfileSection.tsx
"use client";

import React from "react";
import { Box } from "@mui/material";

export type ProfileSectionProps = {
  sectionRef: React.RefObject<HTMLDivElement | null>;
};

export default function ProfileSection({ sectionRef }: ProfileSectionProps) {
  return (
    <Box
      ref={sectionRef}
      id="profile"
      sx={{
        minHeight: "100vh",
        px: { xs: 2, md: 6 },
        pt: { xs: 10, md: 12 },
        pb: 10,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box sx={{ fontSize: 40, fontWeight: 800, lineHeight: 1.1 }}>Profile</Box>

      <Box sx={{ maxWidth: 760, fontSize: 18, opacity: 0.82 }}>
        Short intro about you. What you build, what you’re into, your vibe, etc.
      </Box>

      <Box
        sx={{
          mt: 3,
          p: 3,
          borderRadius: 4,
          border: "1px solid rgba(0,0,0,0.10)",
          backgroundColor: "rgba(255,255,255,0.7)",
        }}
      >
        Profile content block…
      </Box>
    </Box>
  );
}
