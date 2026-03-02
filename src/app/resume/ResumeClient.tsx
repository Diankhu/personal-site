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
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import StarsOutlinedIcon from "@mui/icons-material/StarsOutlined";

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
  transition:
    "transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease",
  "& .MuiChip-label": { px: 1.25, fontSize: 13, letterSpacing: "0.01em" },
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: "0 14px 28px rgba(10,25,55,0.10)",
    borderColor: "rgba(16, 76, 172, 0.22)",
  },
} as const;

const sectionCardSx: SxProps<Theme> = {
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: 2,
  p: { xs: 2, md: 3 },
  background:
    "linear-gradient(180deg, rgba(16, 76, 172, 0.05), rgba(16, 76, 172, 0.00))",
};

function SectionTitle({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <Stack spacing={0.75}>
      <Stack direction="row" spacing={1} alignItems="center">
        {icon}
        <Typography sx={{ fontWeight: 900, fontSize: 18 }}>{title}</Typography>
      </Stack>
      {subtitle ? (
        <Typography sx={{ opacity: 0.75 }}>{subtitle}</Typography>
      ) : null}
    </Stack>
  );
}

function Role({
  company,
  location,
  title,
  dates,
  bullets,
}: {
  company: string;
  location: string;
  title: string;
  dates: string;
  bullets: string[];
}) {
  return (
    <Stack spacing={1.1} sx={{ py: 2 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={0.75}
        alignItems={{ xs: "flex-start", sm: "baseline" }}
        justifyContent="space-between"
      >
        <Stack spacing={0.15}>
          <Typography sx={{ fontWeight: 900 }}>{company}</Typography>
          <Typography sx={{ opacity: 0.75 }}>
            {title} • {location}
          </Typography>
        </Stack>

        <Typography sx={{ opacity: 0.7, fontWeight: 700 }}>{dates}</Typography>
      </Stack>

      <Stack component="ul" spacing={0.75} sx={{ m: 0, pl: 2 }}>
        {bullets.map((b) => (
          <Typography
            key={b}
            component="li"
            sx={{ opacity: 0.86, lineHeight: 1.7 }}
          >
            {b}
          </Typography>
        ))}
      </Stack>
    </Stack>
  );
}

export default function ResumeClient() {
  return (
    <Box
      sx={{
        px: { xs: 2, md: 8 },
        py: { xs: 10, md: 12 },
        backgroundColor: "#fff",
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={5} sx={{ mt: 7 }}>
          {/* HERO */}
          <Stack spacing={1.5}>
            <Typography
              sx={{
                fontSize: { xs: 40, md: 56 },
                fontWeight: 900,
                letterSpacing: "-0.03em",
              }}
            >
              Tyler White
            </Typography>

            <Typography sx={{ fontSize: 18, opacity: 0.82, maxWidth: 900 }}>
              Associate Software Developer II • Founder / Lead Engineer (Symon
              Rental)
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.25}
              sx={{ pt: 0.5 }}
            >
              <Button
                component={Link}
                href="mailto:ty.white1010@outlook.com"
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
                ty.white1010@outlook.com
              </Button>

              <Button
                component={Link}
                href="https://www.linkedin.com/in/whitety4/"
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
                LinkedIn
              </Button>
            </Stack>

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip sx={chipSx} label="Full-stack" />
              <Chip sx={chipSx} label="Next.js + React" />
              <Chip sx={chipSx} label="TypeScript" />
              <Chip sx={chipSx} label="AWS (Lambda, API GW, RDS, S3)" />
              <Chip sx={chipSx} label="Prisma + Postgres" />
              <Chip sx={chipSx} label="UI polish" />
            </Stack>
          </Stack>

          <Divider />

          {/* EDUCATION */}
          <Stack sx={sectionCardSx} spacing={2}>
            <SectionTitle
              icon={<SchoolOutlinedIcon fontSize="small" />}
              title="Education"
            />
            <Stack spacing={0.5}>
              <Typography sx={{ fontWeight: 900 }}>
                Michigan State University — East Lansing, MI
              </Typography>
              <Typography sx={{ opacity: 0.8 }}>
                Bachelor of Science, Computer Science • Minor in Japanese
                Language • GPA: 3.7/4.0
              </Typography>
              <Typography sx={{ opacity: 0.7, fontWeight: 700 }}>
                Aug 2017 — May 2023
              </Typography>
            </Stack>
          </Stack>

          {/* EXPERIENCE */}
          <Stack sx={sectionCardSx} spacing={2}>
            <SectionTitle
              icon={<WorkOutlineIcon fontSize="small" />}
              title="Experience"
            />

            <Role
              company="Auto-Owners Insurance"
              location="Lansing, MI"
              title="Associate Software Developer II"
              dates="Jan 2025 — Present"
              bullets={[
                "Build and maintain full-stack web applications using React (JSX) on the frontend and Java on the backend.",
                "Perform report migrations and assist with data conversion projects for internal departments.",
                "Collaborate with cross-functional teams to gather requirements, design solutions, and implement features.",
                "Write, update, and debug COBOL programs on mainframe systems to ensure business continuity.",
              ]}
            />

            <Divider />

            <Role
              company="Symon Rental"
              location="Wyandotte, MI"
              title="Founder / Lead Software Engineer"
              dates="Apr 2025 — Present"
              bullets={[
                "Build and maintain a production multi-tenant rental SaaS platform supporting rental operations for multiple businesses.",
                "Developed a full-stack admin dashboard using Next.js, TypeScript, React, Prisma, and Material UI.",
                "Implemented a serverless AWS backend with Lambda, API Gateway, RDS (PostgreSQL), S3, and CloudFront.",
                "Designed scalable relational data models with multi-business access control and safe cascading deletes.",
                "Integrated AWS Cognito for authentication and Stripe for payments and billing workflows.",
              ]}
            />

            <Divider />

            <Role
              company="General Motors"
              location="Warren, MI"
              title="Software Engineer"
              dates="Jun 2023 — Aug 2024"
              bullets={[
                "Managed and enhanced Angular and .NET web applications supporting analytics across ~27 GM manufacturing facilities.",
                "Built a templated React-based platform to accelerate delivery of new internal websites.",
                "Integrated backend APIs, SQL Server (SSMS), and stored procedures to improve data access and performance.",
                "Implemented CI workflows using GitHub Actions and supported enterprise ETL pipelines with Oracle SQL.",
              ]}
            />
          </Stack>

          {/* SKILLS */}
          <Stack sx={sectionCardSx} spacing={2}>
            <SectionTitle
              icon={<CodeOutlinedIcon fontSize="small" />}
              title="Skills"
            />

            <Stack spacing={1.25}>
              <Stack spacing={0.5}>
                <Typography sx={{ fontWeight: 900 }}>Technical</Typography>
                <Typography sx={{ opacity: 0.86, lineHeight: 1.7 }}>
                  Python (Advanced) • C++ (Advanced) • React (Advanced) •
                  Angular (Proficient) • Oracle (Proficient) • SQL Server
                  Management Studio (Proficient) • .NET (Intermediate) • Azure
                  (Intermediate) • JavaScript (Intermediate) • C (Intermediate)
                  • Java (Intermediate)
                </Typography>
              </Stack>

              <Stack spacing={0.5}>
                <Typography sx={{ fontWeight: 900 }}>Language</Typography>
                <Typography sx={{ opacity: 0.86, lineHeight: 1.7 }}>
                  English (Native) • Japanese (Conversational, JLPT N3
                  equivalent)
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          {/* PROJECTS */}
          <Stack sx={sectionCardSx} spacing={2}>
            <SectionTitle
              icon={<StarsOutlinedIcon fontSize="small" />}
              title="Projects & Activities"
            />

            <Stack component="ul" spacing={1} sx={{ m: 0, pl: 2 }}>
              <Typography
                component="li"
                sx={{ opacity: 0.86, lineHeight: 1.7 }}
              >
                <Box component="span" sx={{ fontWeight: 900 }}>
                  Personal Portfolio Website
                </Box>{" "}
                — Developed a full-stack site using Flask and Python, deployed
                on Google Cloud.
              </Typography>

              <Typography
                component="li"
                sx={{ opacity: 0.86, lineHeight: 1.7 }}
              >
                <Box component="span" sx={{ fontWeight: 900 }}>
                  White&apos;s Auto Glass &amp; Trim Business Website
                </Box>{" "}
                — Built and managed a responsive business website to improve
                online presence and SEO.
              </Typography>

              <Typography
                component="li"
                sx={{ opacity: 0.86, lineHeight: 1.7 }}
              >
                <Box component="span" sx={{ fontWeight: 900 }}>
                  Japan Center for Michigan Universities
                </Box>{" "}
                — Fall 2022 study abroad program focused on Japanese language.
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
