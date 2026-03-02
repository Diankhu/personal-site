"use client";

import {
  Box,
  Chip,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

export default function SymonRentalPage() {
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
          <Typography
            sx={{
              fontSize: { xs: 40, md: 56 },
              fontWeight: 900,
              letterSpacing: "-0.03em",
            }}
          >
            Symon Rental
          </Typography>

          <Typography sx={{ fontSize: 18, opacity: 0.8 }}>
            Multi-tenant rental platform with serverless backend and payment
            workflows.
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip label="Next.js" />
            <Chip label="TypeScript" />
            <Chip label="AWS Lambda" />
            <Chip label="PostgreSQL" />
            <Chip label="Prisma" />
            <Chip label="Stripe" />
          </Stack>

          <Divider />

          <Typography sx={{ lineHeight: 1.8, opacity: 0.85 }}>
            I architected and built a production multi-tenant rental platform
            including an admin dashboard, serverless APIs, relational data
            models, authentication flows, and Stripe-powered billing. The system
            is structured for scalability and long-term maintainability.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
