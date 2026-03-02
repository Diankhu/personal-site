"use client";

import {
  Box,
  Chip,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

export default function FlaskPortfolioPage() {
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
            Personal Portfolio Website (Flask)
          </Typography>

          <Typography sx={{ fontSize: 18, opacity: 0.8 }}>
            Flask + Python full-stack application deployed on Google Cloud.
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip label="Flask" />
            <Chip label="Python" />
            <Chip label="Google Cloud" />
            <Chip label="Full-Stack" />
          </Stack>

          <Divider />

          <Typography sx={{ lineHeight: 1.8, opacity: 0.85 }}>
            Developed a full-stack portfolio application with structured routing
            and templating, deployed in a production-ready environment with
            environment-based configuration and cloud hosting.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
