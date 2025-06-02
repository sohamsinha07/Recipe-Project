import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#222",
        color: "#FFF",
        textAlign: "center",
        py: 3,
      }}
    >
      <Typography variant="body2">© 2024 Savorly. All rights reserved.</Typography>
    </Box>
  );
}
