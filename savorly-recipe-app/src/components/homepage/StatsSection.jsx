import { Box, Typography, Skeleton } from "@mui/material";
import "../../styles/homePage.css";

export default function StatsSection({ loading }) {
  if (loading) {
    return (
      <Box className="stats-section-container">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Box key={idx} className="stats-item">
            <Skeleton variant="text" animation="wave" width={90} height={50} sx={{ mx: "auto" }} />
            <Skeleton variant="text" animation="wave" width={60} height={25} sx={{ mx: "auto" }} />
          </Box>
        ))}
      </Box>
    );
  }

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
