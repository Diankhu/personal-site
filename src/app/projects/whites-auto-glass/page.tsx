"use client";

import Link from "next/link";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Stack,
  Typography,
  type SxProps,
  type Theme,
} from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import BuildIcon from "@mui/icons-material/Build";
import VerifiedIcon from "@mui/icons-material/Verified";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const SITE_URL = "https://www.whitesautoglasstrim.com/";

const chipSx: SxProps<Theme> = {
  fontWeight: 800,
  borderRadius: 999,
  height: 34,
  border: "1px solid rgba(10,25,55,0.14)",
  color: "rgba(10,25,55,0.86)",
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(245,248,255,0.96) 100%)",
  boxShadow: "0 10px 22px rgba(10,25,55,0.06)",
  transition: "transform 160ms ease, box-shadow 160ms ease",
  "& .MuiChip-label": {
    px: 1.25,
    fontSize: 13,
  },
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: "0 14px 28px rgba(10,25,55,0.10)",
  },
};

export default function WhitesAutoGlassPage() {
  return (
    <Box
      sx={{
        px: { xs: 2, md: 8 },
        py: { xs: 10, md: 12 },
        backgroundColor: "#fff",
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={5}>
          {/* Hero */}
          <Stack spacing={1.5}>
            <Typography
              sx={{
                fontSize: { xs: 40, md: 56 },
                fontWeight: 900,
                letterSpacing: "-0.03em",
              }}
            >
              White’s Auto Glass & Trim
            </Typography>

            <Typography sx={{ fontSize: 18, opacity: 0.8, maxWidth: 800 }}>
              Conversion-focused marketing website built for a local auto glass
              repair business. Designed to improve search visibility and drive
              inbound calls.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              sx={{ pt: 1 }}
            >
              <Button
                component={Link}
                href={SITE_URL}
                target="_blank"
                rel="noreferrer"
                variant="outlined"
                startIcon={<LaunchIcon />}
                sx={{
                  borderRadius: 999,
                  px: 2.25,
                  py: 1.1,
                  fontWeight: 800,
                  textTransform: "none",
                }}
              >
                Visit Live Site
              </Button>
            </Stack>

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip sx={chipSx} label="Responsive Design" />
              <Chip sx={chipSx} label="SEO Optimization" />
              <Chip sx={chipSx} label="UX Strategy" />
              <Chip sx={chipSx} label="Local Business Marketing" />
              <Chip sx={chipSx} label="Squarespace" />
            </Stack>
          </Stack>

          <Divider />

          {/* Summary row */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={3}
            alignItems="stretch"
          >
            <Box sx={{ flex: 1 }}>
              <Stack spacing={1.25}>
                <Typography sx={{ fontWeight: 900, fontSize: 18 }}>
                  What I built
                </Typography>

                <Typography sx={{ lineHeight: 1.8, opacity: 0.85 }}>
                  I designed and developed a clean, mobile-first marketing
                  website focused on clarity, trust, and local SEO performance.
                  The goal was to improve Google visibility while increasing
                  phone inquiries and service bookings.
                </Typography>

                <Typography sx={{ lineHeight: 1.8, opacity: 0.85 }}>
                  The structure emphasizes clear service segmentation,
                  credibility indicators, strong call-to-action placement, and
                  optimized content for regional search rankings.
                </Typography>
              </Stack>
            </Box>

            {/* Highlight card */}
            <Box sx={{ width: { xs: "100%", md: 420 }, flexShrink: 0 }}>
              <Stack
                spacing={1.5}
                sx={{
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: 2,
                  p: 3,
                  background:
                    "linear-gradient(180deg, rgba(200, 16, 46, 0.06), rgba(200, 16, 46, 0.00))",
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <VerifiedIcon fontSize="small" />
                  <Typography sx={{ fontWeight: 900 }}>
                    Business impact focus
                  </Typography>
                </Stack>

                <Stack component="ul" spacing={0.75} sx={{ m: 0, pl: 2 }}>
                  <Typography component="li" sx={{ opacity: 0.85 }}>
                    Improved local search discoverability
                  </Typography>
                  <Typography component="li" sx={{ opacity: 0.85 }}>
                    Clear service breakdown by category
                  </Typography>
                  <Typography component="li" sx={{ opacity: 0.85 }}>
                    Strong trust messaging & credibility signals
                  </Typography>
                  <Typography component="li" sx={{ opacity: 0.85 }}>
                    Optimized for mobile-first browsing
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Stack>

          {/* Services highlight section */}
          <Stack spacing={2}>
            <Typography sx={{ fontWeight: 900, fontSize: 20 }}>
              Key Service Areas Highlighted
            </Typography>

            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              alignItems="stretch"
            >
              <Stack
                spacing={1}
                sx={{
                  flex: 1,
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: 2,
                  p: 3,
                }}
              >
                <BuildIcon />
                <Typography sx={{ fontWeight: 900 }}>
                  Windshield Replacement
                </Typography>
                <Typography sx={{ opacity: 0.8 }}>
                  Clear service explanation with trust-driven messaging and easy
                  call-to-action placement.
                </Typography>
              </Stack>

              <Stack
                spacing={1}
                sx={{
                  flex: 1,
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: 2,
                  p: 3,
                }}
              >
                <TrendingUpIcon />
                <Typography sx={{ fontWeight: 900 }}>
                  Stone Chip & Leak Repair
                </Typography>
                <Typography sx={{ opacity: 0.8 }}>
                  Structured content optimized for regional keyword targeting
                  and mobile browsing.
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
