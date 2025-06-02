import { Box, Typography, Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function TitleSection() {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 8,
        backgroundColor: "#FFF",
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
        Welcome to Savorly
      </Typography>
      <Typography variant="subtitle1" sx={{ color: "#555", mb: 4 }}>
        Discover, create, and share amazing recipes with our community
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#F25C54",
            color: "#FFF",
            textTransform: "none",
            px: 3,
            py: 1.25,
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "#E14A4A",
            },
          }}
          startIcon={<ArrowForwardIosIcon sx={{ transform: "rotate(180deg)" }} />}
        >
          Browse Recipes
        </Button>

        <Button
          variant="outlined"
          sx={{
            borderColor: "#F25C54",
            color: "#F25C54",
            textTransform: "none",
            px: 3,
            py: 1.25,
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "#FEEAEA",
            },
          }}
        >
          Create Recipe
        </Button>
      </Box>
    </Box>
  );
}
