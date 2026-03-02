"use client";

import React from "react";
import { Box, Chip, Paper, Stack, Typography, Button } from "@mui/material";

const accentBar = {
  content: '""',
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: 4,
  background:
    "linear-gradient(90deg, rgba(10,25,55,0.95) 0%, rgba(25,65,140,0.9) 60%, rgba(110,200,255,0.9) 100%)",
  opacity: 0.9,
} as const;

// Same chip style as Profile
const chipSx = {
  fontWeight: 800,
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.14)",
  color: "rgba(255,255,255,0.92)",
  background:
    "linear-gradient(135deg, rgba(10,25,55,0.92) 0%, rgba(25,65,140,0.86) 100%)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  boxShadow: "0 10px 22px rgba(10,25,55,0.10)",
  transition: "transform 160ms ease, box-shadow 160ms ease",
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: "0 14px 28px rgba(10,25,55,0.14)",
  },
} as const;

const projectCardSx = {
  position: "relative",
  borderRadius: 6,
  border: "1px solid rgba(0,0,0,0.10)",
  backgroundColor: "#fff",
  overflow: "hidden",

  // 👇 Taller feel
  p: { xs: 4, md: 5 },
  minHeight: { xs: 240, md: 300 },

  "&::before": accentBar,

  boxShadow: "0 30px 60px rgba(10,25,55,0.08)",
  transition: "transform 200ms ease, box-shadow 200ms ease",

  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 42px 90px rgba(10,25,55,0.12)",
  },
} as const;

const primaryBtnSx = {
  backgroundColor: "#ff3b3b",
  fontWeight: 900,
  borderRadius: 999,
  px: 2.25,
  py: 0.8,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  fontSize: 12,
  "&:hover": { backgroundColor: "#d92b2b" },
} as const;

type Project = {
  title: string;
  description: string;
  chips: string[];
  href: string; // dedicated page
};

const projects: Project[] = [
  {
    title: "Symon Rental",
    description:
      "Production multi-tenant rental platform I architected and built end-to-end — admin dashboard, serverless APIs, and a relational data model designed for real operations. Includes business isolation, inventory + order workflows, image delivery (S3/CloudFront), authentication/authorization (Cognito/JWT), and Stripe payments for billing and checkout.",
    chips: [
      "Next.js",
      "TypeScript",
      "AWS Lambda",
      "API Gateway",
      "PostgreSQL",
      "Prisma",
      "Stripe",
      "Cognito",
    ],
    href: "/projects/symon-rental",
  },
  {
    title: "White’s Auto Glass & Trim",
    description:
      "Responsive marketing site built to drive local discovery and inbound leads. Designed the information architecture around real customer intent (services, trust signals, contact), optimized for mobile performance, and implemented SEO fundamentals to improve visibility in local search.",
    chips: [
      "Responsive Design",
      "SEO Optimization",
      "UX Focused",
      "Squarespace",
    ],
    href: "/projects/whites-auto-glass",
  },
  {
    title: "Personal Portfolio Website (Flask)",
    description:
      "Full-stack Flask application deployed to Google Cloud to serve dynamic content and project pages. Built the routing + templating layer, structured the backend for maintainability, and shipped a production deployment setup with environment-based configuration.",
    chips: ["Flask", "Python", "Google Cloud", "Full-Stack"],
    href: "/projects/flask-portfolio",
  },
];

function ProjectRow({
  project,
  align,
}: {
  project: Project;
  align: "left" | "right";
}) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "repeat(12, 1fr)" },
        alignItems: "stretch",
      }}
    >
      <Box
        sx={{
          // keep layout / zig-zag logic as-is (just leaving your columns)
          gridColumn: {
            xs: "1 / -1",
            md: align === "left" ? "1 / span 6" : "7 / span 10",
          },
          position: "relative",
        }}
      >
        {/* Bigger glow behind card */}
        <Box
          sx={{
            position: "absolute",
            inset: { xs: -20, md: -40 },
            borderRadius: 8,
            background:
              align === "left"
                ? "radial-gradient(circle at 18% 28%, rgba(110,200,255,0.28), transparent 62%)"
                : "radial-gradient(circle at 82% 28%, rgba(110,200,255,0.28), transparent 62%)",
            filter: "blur(22px)",
            opacity: 0.95,
            pointerEvents: "none",
          }}
        />

        <Paper elevation={0} sx={projectCardSx}>
          <Stack spacing={2.25}>
            {/* Title row with button on far right */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography sx={{ fontSize: 26, fontWeight: 900, flex: 1 }}>
                {project.title}
              </Typography>

              <Button variant="contained" href={project.href} sx={primaryBtnSx}>
                View project
              </Button>
            </Box>

            <Typography sx={{ opacity: 0.86, lineHeight: 1.65 }}>
              {project.description}
            </Typography>

            <Stack direction="row" flexWrap="wrap" gap={1}>
              {project.chips.map((c) => (
                <Chip key={c} label={c} sx={chipSx} />
              ))}
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}

export default function WorkSection() {
  return (
    <Box
      id="work"
      sx={{
        px: { xs: 2, md: 8 },
        py: { xs: 10, md: 14 },
        backgroundColor: "rgba(245,248,255,0.6)",
        background:
          "radial-gradient(circle at 15% 20%, rgba(120,180,255,0.12), transparent 55%)",
      }}
    >
      <Stack spacing={15} sx={{ maxWidth: 2000, mx: "auto" }}>
        <Box sx={{ mb: { xs: 0, md: 2 } }}>
          <Typography
            sx={{
              fontSize: { xs: 42, md: 56 },
              fontWeight: 900,
              letterSpacing: "-0.02em",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Systems I’ve Built
          </Typography>

          <Typography
            sx={{
              mt: 2.5,
              fontSize: 18,
              opacity: 0.8,
              display: "flex",
              justifyContent: "center",
            }}
          >
            Real platforms and production systems I’ve designed and delivered.
          </Typography>
        </Box>

        <Stack spacing={{ xs: 12, md: 25 }}>
          <ProjectRow project={projects[0]} align="left" />
          <ProjectRow project={projects[1]} align="right" />
          <ProjectRow project={projects[2]} align="left" />
        </Stack>
      </Stack>
    </Box>
  );
}
