"use client";

import React from "react";
import { Box, Paper, Stack, Typography, Chip, Button } from "@mui/material";

export default function WorkSection() {
  return (
    <Box
      id="work"
      sx={{
        px: { xs: 2, md: 8 },
        py: { xs: 10, md: 14 },
        backgroundColor: "rgba(245,248,255,0.6)",
      }}
    >
      <Stack spacing={6} sx={{ maxWidth: 1150, mx: "auto" }}>
        {/* Header */}
        <Box>
          <Typography
            sx={{
              fontSize: { xs: 42, md: 56 },
              fontWeight: 900,
              letterSpacing: "-0.02em",
            }}
          >
            Selected Work
          </Typography>

          <Typography sx={{ mt: 1.5, fontSize: 18, opacity: 0.8 }}>
            Real systems I’ve designed, built, and shipped.
          </Typography>
        </Box>

        {/* Project Card - Symon Rental */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 4,
            border: "1px solid rgba(0,0,0,0.10)",
            backgroundColor: "#fff",
            boxShadow: "0 30px 60px rgba(10,25,55,0.08)",
            transition: "transform 200ms ease, box-shadow 200ms ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 40px 80px rgba(10,25,55,0.12)",
            },
          }}
        >
          <Stack spacing={2.5}>
            <Typography sx={{ fontSize: 26, fontWeight: 900 }}>
              Symon Rental
            </Typography>

            <Typography sx={{ opacity: 0.85, fontSize: 16 }}>
              A production multi-tenant SaaS platform supporting rental
              operations for multiple businesses. Built end-to-end including
              admin dashboard, serverless backend, relational data modeling,
              authentication, and payment processing.
            </Typography>

            <Stack direction="row" flexWrap="wrap" gap={1}>
              <Chip label="Next.js" />
              <Chip label="TypeScript" />
              <Chip label="AWS Lambda" />
              <Chip label="API Gateway" />
              <Chip label="PostgreSQL" />
              <Chip label="Prisma" />
              <Chip label="Stripe" />
              <Chip label="Cognito" />
            </Stack>

            <Stack direction="row" gap={2} sx={{ pt: 1 }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#ff3b3b",
                  "&:hover": { backgroundColor: "#d92b2b" },
                }}
              >
                View Project
              </Button>

              <Button variant="outlined">Architecture Details</Button>
            </Stack>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}
