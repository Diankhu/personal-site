"use client";

import { Box, Stack, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        px: { xs: 2, md: 8 },
        py: 6,

        // Deep navy like your example
        background: "linear-gradient(180deg, #0b1f33 0%, #071423 100%)",

        color: "rgba(255,255,255,0.75)",
      }}
    >
      <Stack
        spacing={1}
        sx={{
          maxWidth: 900,
          mx: "auto",
          textAlign: "center",
        }}
      >
        <Typography sx={{ fontSize: 14 }}>
          © {new Date().getFullYear()} Tyler White
        </Typography>

        <Typography sx={{ fontSize: 13, opacity: 0.7 }}>
          Built with Next.js • Hosted on Google Cloud
        </Typography>
      </Stack>
    </Box>
  );
}
