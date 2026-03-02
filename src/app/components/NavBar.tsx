"use client";

import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";

export type NavBarProps = {
  visible: boolean;
};

export default function NavBar({ visible }: NavBarProps) {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: `
      linear-gradient(
        135deg,
        rgba(10, 25, 55, 0.95) 0%,
        rgba(15, 45, 95, 0.92) 50%,
        rgba(25, 65, 140, 0.90) 100%
      )
    `,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.25)",
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        opacity: visible ? 1 : 0,
        transition: "transform 240ms ease, opacity 240ms ease",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ fontWeight: 800, color: "#fff" }}>
          Tyler White
        </Typography>

        <Box sx={{ ml: "auto", display: "flex", gap: 2 }}>
          <Button href="#profile" sx={{ color: "#fff" }}>
            Profile
          </Button>
          <Button href="#work" sx={{ color: "#fff" }}>
            Work
          </Button>
          <Button href="#contact" sx={{ color: "#fff" }}>
            Contact
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
