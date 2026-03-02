"use client";

import React from "react";
import Image from "next/image";
import { Box, Chip, Divider, Paper, Stack, Typography } from "@mui/material";

export type ProfileSectionProps = {
  sectionRef: React.RefObject<HTMLDivElement | null>;
};

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

const cardSx = {
  position: "relative",
  borderRadius: 4,
  border: "1px solid rgba(0,0,0,0.10)",
  backgroundColor: "rgba(255,255,255,0.78)",
  overflow: "hidden",
  p: { xs: 3, md: 3.5 },
  "&::before": accentBar,
} as const;

const popCardSx = {
  ...cardSx,
  backgroundColor: "#fff",
  boxShadow: "0 25px 60px rgba(10,25,55,0.10)",
} as const;

const techCardSx = {
  ...cardSx,
  mt: 2,
  backgroundColor: "rgba(245,248,255,0.65)",
} as const;

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

export default function ProfileSection({ sectionRef }: ProfileSectionProps) {
  return (
    <Box
      ref={sectionRef}
      id="profile"
      sx={{
        minHeight: "100vh",
        px: { xs: 2, md: 8 },
        pt: { xs: 10, md: 12 },
        pb: 12,
        backgroundColor: "#fff",
        background:
          "radial-gradient(circle at 80% 18%, rgba(120,180,255,0.15), transparent 60%)",
      }}
    >
      <Stack spacing={4.5} sx={{ maxWidth: 1150, mx: "auto" }}>
        {/* Header */}
        <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
          <Typography
            sx={{
              fontSize: { xs: 44, md: 58 },
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}
          >
            Profile
          </Typography>

          <Typography sx={{ mt: 1, fontSize: 18, opacity: 0.82 }}>
            Associate Software Developer II + founder/lead engineer of Symon
            Rental
          </Typography>
        </Box>

        <Divider sx={{ opacity: 0.6 }} />

        {/* Main layout */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 4, md: 6 }}
          alignItems={{ xs: "center", md: "flex-start" }}
        >
          {/* Photo */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: 6,
              border: "1px solid rgba(0,0,0,0.08)",
              overflow: "hidden",
              width: { xs: 240, md: 260 },
              flexShrink: 0,
              backgroundColor: "#fff",
              boxShadow: "0 20px 40px rgba(10,25,55,0.12)",
              mx: { xs: "auto", md: 0 },
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                aspectRatio: "4 / 5",
              }}
            >
              <Image
                src="/profile.jpg"
                alt="Tyler White"
                fill
                sizes="(max-width: 900px) 240px, 260px"
                quality={95}
                priority
                style={{ objectFit: "cover" }}
              />
            </Box>
          </Paper>

          {/* Right content */}
          <Stack
            spacing={3}
            sx={{
              flex: 1,
              width: "100%",
              alignItems: { xs: "center", md: "stretch" },
            }}
          >
            {/* Chips */}
            <Stack
              direction="row"
              flexWrap="wrap"
              gap={1.2}
              sx={{
                justifyContent: { xs: "center", md: "flex-start" },
                width: "100%",
              }}
            >
              <Chip label="Full-stack" sx={chipSx} />
              <Chip label="Next.js + React" sx={chipSx} />
              <Chip label="TypeScript" sx={chipSx} />
              <Chip label="AWS (Lambda, API GW, RDS, S3)" sx={chipSx} />
              <Chip label="Prisma + Postgres" sx={chipSx} />
              <Chip label="UI polish" sx={chipSx} />
            </Stack>

            {/* Quick intro */}
            <Box sx={{ width: "100%" }}>
              <Paper elevation={0} sx={popCardSx}>
                <Typography sx={{ fontWeight: 900, mb: 1.5 }}>
                  Quick intro
                </Typography>

                <Stack spacing={1.6} sx={{ opacity: 0.88, fontSize: 16 }}>
                  <Typography>
                    I build production full-stack web apps and I’m currently
                    building a multi-tenant rental SaaS platform end-to-end
                    (admin dashboard, backend APIs, data models, auth, and
                    payments).
                  </Typography>

                  <Typography>
                    I studied Computer Science at Michigan State University and
                    have a Japanese language background — conversational level
                    (JLPT N3-ish), including study abroad experience in Japan.
                  </Typography>

                  <Typography>
                    Outside of coding: I’m into reading and I play piano.
                  </Typography>
                </Stack>
              </Paper>
            </Box>

            {/* Two cards row */}
            <Box
              sx={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: { xs: 2.75, md: 3.25 },
              }}
            >
              <Paper elevation={0} sx={cardSx}>
                <Typography sx={{ fontWeight: 900, mb: 1.5 }}>
                  Japan / Language
                </Typography>
                <Stack spacing={1.1} sx={{ opacity: 0.88 }}>
                  <Typography>
                    • Conversational Japanese (JLPT N3 equivalent)
                  </Typography>
                  <Typography>• Minor in Japanese language</Typography>
                  <Typography>• Study abroad experience in Japan</Typography>
                </Stack>
              </Paper>

              <Paper elevation={0} sx={cardSx}>
                <Typography sx={{ fontWeight: 900, mb: 1.5 }}>
                  Interests
                </Typography>
                <Stack spacing={1.1} sx={{ opacity: 0.88 }}>
                  <Typography>• Reading</Typography>
                  <Typography>• Piano</Typography>
                  <Typography>• Building products with great UX</Typography>
                </Stack>
              </Paper>
            </Box>

            {/* Tech Stack */}
            <Box sx={{ width: "100%" }}>
              <Paper elevation={0} sx={techCardSx}>
                <Typography sx={{ fontWeight: 900, mb: 2.25 }}>
                  Tech Stack
                </Typography>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
                    gap: { xs: 2.25, md: 3.25 },
                  }}
                >
                  <Stack spacing={0.9}>
                    <Typography sx={{ fontWeight: 800 }}>Frontend</Typography>
                    <Typography sx={{ opacity: 0.86 }}>
                      React, Next.js, TypeScript, JavaScript, Angular, Material
                      UI
                    </Typography>
                  </Stack>

                  <Stack spacing={0.9}>
                    <Typography sx={{ fontWeight: 800 }}>Backend</Typography>
                    <Typography sx={{ opacity: 0.86 }}>
                      Node.js, Java, .NET, Python, C++, COBOL
                    </Typography>
                  </Stack>

                  <Stack spacing={0.9}>
                    <Typography sx={{ fontWeight: 800 }}>
                      Cloud / Infrastructure
                    </Typography>
                    <Typography sx={{ opacity: 0.86 }}>
                      AWS (Lambda, API Gateway, RDS, S3, CloudFront), Serverless
                    </Typography>
                  </Stack>

                  <Stack spacing={0.9}>
                    <Typography sx={{ fontWeight: 800 }}>Databases</Typography>
                    <Typography sx={{ opacity: 0.86 }}>
                      PostgreSQL, SQL Server, Oracle, Prisma ORM
                    </Typography>
                  </Stack>

                  <Stack spacing={0.9}>
                    <Typography sx={{ fontWeight: 800 }}>Languages</Typography>
                    <Typography sx={{ opacity: 0.86 }}>
                      English (Native), Japanese (Conversational)
                    </Typography>
                  </Stack>

                  <Stack spacing={0.9}>
                    <Typography sx={{ fontWeight: 800 }}>Other</Typography>
                    <Typography sx={{ opacity: 0.86 }}>
                      GitHub Actions, CI/CD, Multi-tenant architecture
                    </Typography>
                  </Stack>
                </Box>
              </Paper>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
