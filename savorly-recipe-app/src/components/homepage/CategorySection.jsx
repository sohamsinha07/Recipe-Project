import { Box, Typography, Skeleton, Card } from "@mui/material";
import FreeBreakfastOutlinedIcon from "@mui/icons-material/FreeBreakfastOutlined";
import LunchDiningOutlinedIcon from "@mui/icons-material/LunchDiningOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";

import "../../styles/homepage.css";

export default function CategorySection({ loading }) {
  if (loading) {
    return (
      <Box className="category-container" sx={{ backgroundColor: "#d3d3d3" }}>
        <Box className="section-wrapper">
          {/* Header skeletons */}
          <Box className="category-header" sx={{ mb: 3, pt: 4 }}>
            {/* Title skeleton */}
            <Skeleton variant="text" animation="wave" width={330} height={90} sx={{ mx: "auto" }} />
            {/* Subtitle skeleton */}
            <Skeleton variant="text" animation="wave" width={430} height={35} sx={{ mx: "auto" }} />
          </Box>

          {/* Four “card” skeletons laid out exactly like the real category cards */}
          <Box className="category-grid">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Box className="category-item" key={idx}>
                <Card className="category-card">
                  {/* Icon skeleton (40×40) */}
                  <Skeleton
                    variant="circular"
                    animation="wave"
                    width={40}
                    height={40}
                    sx={{ mb: 1, mt: 1 }}
                  />
                  {/* Title skeleton (h6) */}
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width={100} // roughly the width of “Breakfast” etc.
                    height={28} // approximate line-height of variant="h6"
                    sx={{ mb: 1 }}
                  />
                  {/* Caption skeleton (variant="caption") */}
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width={80} // roughly the width of “Start your day right”
                    height={16} // approximate line-height of variant="caption"
                  />
                </Card>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box className="category-container">
      <Box className="section-wrapper">
        {/* Header */}
        <Box className="category-header">
          <Typography variant="h4" className="category-heading">
            Browse by Category
          </Typography>
          <Typography variant="body1" className="category-subtitle">
            Find recipes that match your mood and dietary preferences
          </Typography>
        </Box>

        {/* Four cards in one row */}
        <Box className="category-grid">
          {/* Breakfast */}
          <Box className="category-item">
            <Card className="category-card">
              <FreeBreakfastOutlinedIcon className="category-icon" />
              <Typography variant="h6" className="category-card-title">
                Breakfast
              </Typography>
              <Typography variant="caption" className="category-card-text">
                Start your day right
              </Typography>
            </Card>
          </Box>

          {/* Lunch */}
          <Box className="category-item">
            <Card className="category-card">
              <LunchDiningOutlinedIcon className="category-icon" />
              <Typography variant="h6" className="category-card-title">
                Lunch
              </Typography>
              <Typography variant="caption" className="category-card-text">
                Delicious midday meals
              </Typography>
            </Card>
          </Box>

          {/* Dinner */}
          <Box className="category-item">
            <Card className="category-card">
              <RestaurantOutlinedIcon className="category-icon" />
              <Typography variant="h6" className="category-card-title">
                Dinner
              </Typography>
              <Typography variant="caption" className="category-card-text">
                Evening delights
              </Typography>
            </Card>
          </Box>

          {/* Desserts */}
          <Box className="category-item">
            <Card className="category-card">
              <CakeOutlinedIcon className="category-icon" />
              <Typography variant="h6" className="category-card-title">
                Desserts
              </Typography>
              <Typography variant="caption" className="category-card-text">
                Treat yourself
              </Typography>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
