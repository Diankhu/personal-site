"use client";

import {
  Box,
  Chip,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

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
        <Stack spacing={4}>
          <Typography sx={{ fontSize: { xs: 40, md: 56 }, fontWeight: 900 }}>
            White’s Auto Glass & Trim
          </Typography>

          <Typography sx={{ fontSize: 18, opacity: 0.8 }}>
            Responsive business website focused on clarity, trust, and SEO.
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip label="Responsive Design" />
            <Chip label="SEO Optimization" />
            <Chip label="UX" />
            <Chip label="Squarespace" />
          </Stack>

          <Divider />

          <Typography sx={{ lineHeight: 1.8, opacity: 0.85 }}>
            Built and managed a marketing website designed to improve local
            search visibility and convert visitors into inbound leads. Focused
            on clear service presentation, trust signals, and mobile-first
            design.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
