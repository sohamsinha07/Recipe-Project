import { Box, Typography } from "@mui/material";

export default function StatsSection() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 8,
        py: 4,
        backgroundColor: "#FFF",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          12,500+
        </Typography>
        <Typography variant="body2" sx={{ color: "#777" }}>
          Recipes
        </Typography>
      </Box>

      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          8,200+
        </Typography>
        <Typography variant="body2" sx={{ color: "#777" }}>
          Home Cooks
        </Typography>
      </Box>

      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          45,000+
        </Typography>
        <Typography variant="body2" sx={{ color: "#777" }}>
          Reviews
        </Typography>
      </Box>

      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          150+
        </Typography>
        <Typography variant="body2" sx={{ color: "#777" }}>
          Cuisines
        </Typography>
      </Box>
    </Box>
  );
}
