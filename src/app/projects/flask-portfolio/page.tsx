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
import LaunchIcon from "@mui/icons-material/Launch";
import DashboardIcon from "@mui/icons-material/Dashboard";

type Screenshot = {
  title: string;
  description: string;
  src: string;
  alt: string;
};

// Optional – fill in if you have them:
const LIVE_URL = "https://homework-e5tbz4l6ca-uc.a.run.app/home"; // e.g. "https://your-flask-site.com"

const screenshots: Screenshot[] = [
  {
    title: "Wordle Game",
    description:
      "A Wordle-style game that pulls a new word daily via a dictionary API and validates guesses.",
    src: "/Wordle-Instructions.png",
    alt: "Wordle game view",
  },
  {
    title: "Wordle Gameplay",
    description:
      "Interactive grid + keyboard feedback states (correct, present, absent) across attempts.",
    src: "/Wordle-Instructions-3.png",
    alt: "Wordle gameplay showing guesses and keyboard state",
  },
  {
    title: "Wordle Instructions Modal",
    description:
      "Rules + UX guidance presented in a clean modal to onboard users quickly.",
    src: "/Wordle-Instructions-2.png",
    alt: "Wordle instructions modal",
  },
  {
    title: "Flashcards Home",
    description:
      "Deck browsing UI with a themed landing experience and clear creation flow.",
    src: "/flashcards-home.png",
    alt: "Flashcards home screen",
  },
  {
    title: "Create Deck / Add Cards",
    description:
      "Create decks, add words, set languages, and configure visibility/access.",
    src: "/flashcards-deck-create.png",
    alt: "Flashcards create deck form",
  },
  {
    title: "Flashcards Study + Cards",
    description:
      "Deck management and study workflow — review cards and iterate quickly.",
    src: "/flashcards.png",
    alt: "Flashcards study and card list screen",
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

export default function FlaskPortfolioPage() {
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
              Personal Portfolio Website (Flask)
            </Typography>

            <Typography sx={{ fontSize: 18, opacity: 0.8, maxWidth: 820 }}>
              A full-stack Flask app built in college featuring a daily Wordle
              game and a flashcard system with decks, cards, and study flows.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              sx={{ pt: 1 }}
            >
              {LIVE_URL ? (
                <Button
                  component={Link}
                  href={LIVE_URL}
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
                  View Live
                </Button>
              ) : null}
            </Stack>

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip sx={chipSx} label="Flask" />
              <Chip sx={chipSx} label="Python" />
              <Chip sx={chipSx} label="Jinja Templates" />
              <Chip sx={chipSx} label="REST APIs" />
              <Chip sx={chipSx} label="Dictionary API" />
              <Chip sx={chipSx} label="Google Cloud" />
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
                  I built a full-stack Flask portfolio site with structured
                  routing, templating, and deployment configuration. The core
                  features were a Wordle-style game that fetches a new daily
                  word via a dictionary API and a flashcard app where users can
                  create decks, add cards, and study them.
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
                    Project highlights
                  </Typography>
                </Stack>

                <Stack component="ul" spacing={0.75} sx={{ m: 0, pl: 2 }}>
                  <Typography component="li" sx={{ opacity: 0.85 }}>
                    Daily Wordle: new word each day pulled from a dictionary API
                  </Typography>
                  <Typography component="li" sx={{ opacity: 0.85 }}>
                    Word validation + guess feedback (grid + keyboard state)
                  </Typography>
                  <Typography component="li" sx={{ opacity: 0.85 }}>
                    Flashcards: create decks, add cards, study workflow
                  </Typography>
                  <Typography component="li" sx={{ opacity: 0.85 }}>
                    Deployed as a production-style Flask app on Google Cloud
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Stack>

          {/* Screenshots (no Grid) */}
          <Stack spacing={1.5}>
            <Stack spacing={0.5}>
              <Typography sx={{ fontWeight: 900, fontSize: 20 }}>
                Screenshots
              </Typography>
              <Typography sx={{ opacity: 0.8 }}>
                Wordle + Flashcards features from the original Flask build
                (click to zoom).
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
