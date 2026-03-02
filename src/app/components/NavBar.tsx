"use client";

import React from "react";
import Link from "next/link";
import { AppBar, Toolbar, Box, Button } from "@mui/material";
import { useNav } from "../NavContext";

const NAV_HEIGHT = { xs: 84, md: 95 };

const navButtonSx = {
  color: "rgba(255,255,255,0.92)",
  fontWeight: 700,
  fontSize: 14,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  px: 2,
  position: "relative",
  transition: "color 180ms ease",
  height: "100%",
  display: "flex",
  alignItems: "center",

  "&::after": {
    content: '""',
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 18,
    height: 2,
    background: "#ff3b3b",
    transform: "scaleX(0)",
    transformOrigin: "left",
    transition: "transform 200ms ease",
  },

  "&:hover": {
    color: "#ffffff",
    backgroundColor: "rgba(255,255,255,0.05)",
    "&::after": {
      transform: "scaleX(1)",
    },
  },
} as const;

export default function NavBar() {
  const { visible } = useNav();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: `
          linear-gradient(
            135deg,
            rgba(10, 25, 55, 0.96) 0%,
            rgba(15, 45, 95, 0.94) 50%,
            rgba(25, 65, 140, 0.92) 100%
          )
        `,
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 8px 28px rgba(0, 0, 0, 0.30)",

        transform: visible ? "translateY(0)" : "translateY(-100%)",
        opacity: visible ? 1 : 0,
        transition: "transform 260ms ease, opacity 260ms ease",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <Toolbar
        sx={{
          height: NAV_HEIGHT,
          minHeight: "unset",
          px: { xs: 2, md: 6 },
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Box sx={{ display: "flex", gap: 1.5, height: "100%" }}>
          <Button component={Link} href="/#profile" sx={navButtonSx}>
            Profile
          </Button>
          <Button component={Link} href="/#work" sx={navButtonSx}>
            Work
          </Button>
          <Button component={Link} href="/#contact" sx={navButtonSx}>
            Contact
          </Button>

          <Button component={Link} href="/resume" sx={navButtonSx}>
            Resume
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
