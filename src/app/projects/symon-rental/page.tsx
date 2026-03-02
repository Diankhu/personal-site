"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogContent,
  Divider,
  Stack,
  Typography,
  type SxProps,
  type Theme,
} from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import DashboardIcon from "@mui/icons-material/Dashboard";

type Screenshot = {
  title: string;
  description: string;
  src: string;
  alt: string;
};

const STOREFRONT_URL = "https://www.symonrental.com/store";

const screenshots: Screenshot[] = [
  {
    title: "Print Orders + Route Optimization",
    description:
      "Plan delivery runs with ready-by windows, per-stop setup time, and an optimized stop order.",
    src: "/Optimization Page 1.png",
    alt: "Symon Rental admin - route optimization dialog and stops",
  },
  {
    title: "Optimized Route Output",
    description:
      "Generated schedule with drive + setup minutes, arrival/depart times, and lateness checks.",
    src: "/Optimization Page 2.png",
    alt: "Symon Rental admin - optimized route table",
  },
  {
    title: "Rental Products Manager",
    description:
      "Inventory, pricing, featured + visibility controls, search, and fast editing.",
    src: "/Rental Products Page.png",
    alt: "Symon Rental admin - rental products grid",
  },
  {
    title: "Dashboard + Calendar",
    description:
      "Ops overview with revenue, top products, recent orders, and delivery/pickup calendar.",
    src: "/Symon Dashboard 1.png",
    alt: "Symon Rental admin - dashboard overview",
  },
  {
    title: "Calendar Detail View",
    description:
      "Month/week/day scheduling view for deliveries, pickups, and returns.",
    src: "/Symon Dashboard 2.png",
    alt: "Symon Rental admin - calendar module",
  },
];

const chipSx: SxProps<Theme> = {
  fontWeight: 800,
  borderRadius: 999,
  height: 34,
  px: 0.25,
  border: "1px solid rgba(10,25,55,0.14)",
  color: "rgba(10,25,55,0.86)",
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(245,248,255,0.96) 100%)",
  boxShadow: "0 10px 22px rgba(10,25,55,0.06)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  transition:
    "transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease",
  "& .MuiChip-label": {
    px: 1.25,
    fontSize: 13,
    letterSpacing: "0.01em",
  },
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: "0 14px 28px rgba(10,25,55,0.10)",
    borderColor: "rgba(16, 76, 172, 0.22)",
  },
  "&:active": {
    transform: "translateY(0px)",
    boxShadow: "0 10px 22px rgba(10,25,55,0.08)",
  },
} as const;

export default function SymonRentalPage() {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<Screenshot | null>(null);

  const handleOpen = (shot: Screenshot) => {
    setActive(shot);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setActive(null);
  };

  return (
    <Box
      sx={{
        px: { xs: 2, md: 8 },
        py: { xs: 10, md: 12 },
        backgroundColor: "#fff",
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4}>
          {/* Hero */}
          <Stack spacing={1.5}>
            <Typography
              sx={{
                fontSize: { xs: 40, md: 56 },
                fontWeight: 900,
                letterSpacing: "-0.03em",
              }}
            >
              Symon Rental
            </Typography>

            <Typography sx={{ fontSize: 18, opacity: 0.8, maxWidth: 820 }}>
              Multi-tenant rental platform with a production admin dashboard,
              serverless backend, and Stripe-powered payments.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              sx={{ pt: 1 }}
            >
              <Button
                component={Link}
                href={STOREFRONT_URL}
                target="_blank"
                rel="noreferrer"
                variant="outlined"
                startIcon={<StorefrontIcon />}
                sx={{
                  borderRadius: 999,
                  px: 2.25,
                  py: 1.1,
                  fontWeight: 800,
                  textTransform: "none",
                }}
              >
                Open Storefront
              </Button>
            </Stack>

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip sx={chipSx} label="Next.js" />
              <Chip sx={chipSx} label="TypeScript" />
              <Chip sx={chipSx} label="AWS Lambda" />
              <Chip sx={chipSx} label="PostgreSQL" />
              <Chip sx={chipSx} label="Prisma" />
              <Chip sx={chipSx} label="Stripe" />
              <Chip sx={chipSx} label="MUI" />
            </Stack>
          </Stack>

          <Divider />

          {/* Summary row (no Grid) */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={3}
            alignItems="stretch"
          >
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Stack spacing={1.25}>
                <Typography sx={{ fontWeight: 900, fontSize: 18 }}>
                  What I built
                </Typography>
                <Typography sx={{ lineHeight: 1.8, opacity: 0.85 }}>
                  I architected and built a production multi-tenant rental
                  platform including an admin dashboard, serverless APIs,
                  relational data models, authentication flows, and Stripe
                  billing. The system is structured for scalability and
                  long-term maintainability.
                </Typography>
              </Stack>
            </Box>

            <Box sx={{ width: { xs: "100%", md: 420 }, flexShrink: 0 }}>
              <Stack
                spacing={1.25}
                sx={{
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: 2,
                  p: 2,
                  height: "100%",
                  background:
                    "linear-gradient(180deg, rgba(16, 76, 172, 0.06), rgba(16, 76, 172, 0.00))",
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <DashboardIcon fontSize="small" />
                  <Typography sx={{ fontWeight: 900 }}>
                    Admin dashboard highlights
                  </Typography>
                </Stack>

                <Stack component="ul" spacing={0.75} sx={{ m: 0, pl: 2 }}>
                  <Typography component="li" sx={{ opacity: 0.85 }}>
                    Route optimization for deliveries/pickups with time windows
                  </Typography>
                  <Typography component="li" sx={{ opacity: 0.85 }}>
                    Print-ready pack lists + operational workflows
                  </Typography>
                  <Typography component="li" sx={{ opacity: 0.85 }}>
                    Product inventory, pricing, visibility, featured controls
                  </Typography>
                  <Typography component="li" sx={{ opacity: 0.85 }}>
                    Calendar-based scheduling + dashboard analytics
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Stack>

          {/* Screenshots (no Grid) */}
          <Stack spacing={1.5}>
            <Stack spacing={0.5}>
              <Typography sx={{ fontWeight: 900, fontSize: 20 }}>
                Admin UI screenshots
              </Typography>
              <Typography sx={{ opacity: 0.8 }}>
                Real screens from the production admin dashboard (click to
                zoom).
              </Typography>
            </Stack>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              {screenshots.map((shot) => (
                <Card
                  key={shot.src}
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    width: {
                      xs: "100%",
                      sm: "calc(50% - 8px)",
                      md: "calc(33.333% - 10.666px)",
                    },
                    transition: "transform 160ms ease",
                    "&:hover": { transform: "translateY(-2px)" },
                  }}
                >
                  <CardActionArea onClick={() => handleOpen(shot)}>
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: "16 / 9",
                        backgroundColor: "rgba(0,0,0,0.04)",
                      }}
                    >
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        fill
                        sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                        style={{ objectFit: "cover" }}
                      />
                    </Box>

                    <CardContent sx={{ p: 2 }}>
                      <Typography sx={{ fontWeight: 900 }}>
                        {shot.title}
                      </Typography>
                      <Typography sx={{ opacity: 0.8, mt: 0.5 }}>
                        {shot.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </Box>
          </Stack>
        </Stack>
      </Container>

      {/* Zoom dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogContent sx={{ p: { xs: 1.5, md: 2 } }}>
          {active ? (
            <Stack spacing={1.25}>
              <Stack spacing={0.25}>
                <Typography sx={{ fontWeight: 900, fontSize: 18 }}>
                  {active.title}
                </Typography>
                <Typography sx={{ opacity: 0.8 }}>
                  {active.description}
                </Typography>
              </Stack>

              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16 / 9",
                  borderRadius: 2,
                  overflow: "hidden",
                  backgroundColor: "rgba(0,0,0,0.04)",
                }}
              >
                <Image
                  src={active.src}
                  alt={active.alt}
                  fill
                  sizes="100vw"
                  style={{ objectFit: "contain" }}
                />
              </Box>
            </Stack>
          ) : null}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
