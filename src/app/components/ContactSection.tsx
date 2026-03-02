"use client";

import { Box, Link, Stack, Typography } from "@mui/material";

export default function ContactSection() {
  return (
    <Box
      id="contact"
      sx={{
        px: { xs: 2, md: 8 },
        py: { xs: 10, md: 14 },
        backgroundColor: "#fff",
      }}
    >
      <Stack
        spacing={3}
        sx={{
          maxWidth: 700,
          mx: "auto",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: 28, md: 34 },
            fontWeight: 800,
            letterSpacing: "-0.01em",
          }}
        >
          Contacts
        </Typography>

        <Typography
          sx={{
            fontSize: 16,
            opacity: 0.7,
            lineHeight: 1.7,
          }}
        >
          Feel free to reach out.
        </Typography>

        <Stack
          direction="row"
          spacing={4}
          justifyContent="center"
          sx={{ fontSize: 16 }}
        >
          <Link
            href="mailto:ty.white1010@outlook.com"
            underline="hover"
            sx={{ fontWeight: 600 }}
          >
            Email
          </Link>

          <Link
            href="https://www.linkedin.com/in/whitety4/"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            sx={{ fontWeight: 600 }}
          >
            LinkedIn
          </Link>

          <Link
            href="https://github.com/Diankhu"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            sx={{ fontWeight: 600 }}
          >
            GitHub
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
}
