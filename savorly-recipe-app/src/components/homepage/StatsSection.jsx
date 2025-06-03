import { Box, Typography } from "@mui/material";
import "../../styles/homePage.css";

export default function StatsSection() {
  return (
    <Box className="stats-section-container">
      {/* Recipes Stat */}
      <Box className="stats-item">
        <Typography variant="h5" className="stats-item-heading">
          12,500+
        </Typography>
        <Typography variant="body2" className="stats-item-text">
          Recipes
        </Typography>
      </Box>

      {/* Home Cooks Stats */}
      <Box className="stats-item">
        <Typography variant="h5" className="stats-item-heading">
          8,200+
        </Typography>
        <Typography variant="body2" className="stats-item-text">
          Home Cooks
        </Typography>
      </Box>

      {/* Reviews Stats */}
      <Box className="stats-item">
        <Typography variant="h5" className="stats-item-heading">
          45,000+
        </Typography>
        <Typography variant="body2" className="stats-item-text">
          Reviews
        </Typography>
      </Box>

      {/* Cuisines Stats */}
      <Box className="stats-item">
        <Typography variant="h5" className="stats-item-heading">
          150+
        </Typography>
        <Typography variant="body2" className="stats-item-text">
          Cuisines
        </Typography>
      </Box>
    </Box>
  );
}
