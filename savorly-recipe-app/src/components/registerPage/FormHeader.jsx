import { Box, Typography } from "@mui/material";

export default function FormHeader() {
  return (
    // Header
    <Box
      sx={{
        backgroundColor: "#F25C54",
        color: "#fff",
        px: 3,
        py: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        Create an account
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        Please fill in the information below to create your account
      </Typography>
    </Box>
  );
}
