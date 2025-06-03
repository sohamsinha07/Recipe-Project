import { Box, Typography, Button } from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

import "../../styles/homePage.css";

export default function TitleSection() {
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
