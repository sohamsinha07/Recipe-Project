import { Box, Typography, Button, Skeleton } from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

import "../../styles/homePage.css";

export default function TitleSection({ loading }) {
  if (loading) {
    return (
      <Box sx={{ backgroundColor: "#d3d3d3", textAlign: "center", px: 3, py: 2 }}>
        <Skeleton
          variant="text"
          animation="wave"
          width={470}
          height={87}
          sx={{ mx: "auto", mt: 4, mb: 1 }}
        />
        <Skeleton
          variant="text"
          animation="wave"
          width={550}
          height={30}
          sx={{ mx: "auto", mb: 3.6 }}
        />

        <Box className="title-section-button-row" sx={{ display: "inline-flex", gap: 2, mb: 5.5 }}>
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={180}
            height={48}
            sx={{ borderRadius: 2 }}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={160}
            height={48}
            sx={{ borderRadius: 2 }}
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box className="title-section-container">
      <Typography variant="h3" className="title-section-heading">
        Welcome to Savorly
      </Typography>
      <Typography variant="subtitle1" className="title-section-subtitle">
        Discover, create, and share amazing recipes with our community
      </Typography>

      <Box className="title-section-button-row">
        <Button
          variant="contained"
          className="title-section-browse-button"
          startIcon={<AutoStoriesIcon className="title-section-browse-icon" />}
        >
          Browse Recipes
        </Button>

        <Button variant="outlined" className="title-section-create-button">
          Create Recipe
        </Button>
      </Box>
    </Box>
  );
}
