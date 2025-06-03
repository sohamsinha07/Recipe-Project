import { Box, Typography, Grid, Card } from "@mui/material";
import FreeBreakfastOutlinedIcon from "@mui/icons-material/FreeBreakfastOutlined";
import LunchDiningOutlinedIcon from "@mui/icons-material/LunchDiningOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";

import "../../styles/homepage.css";

export default function CategorySection() {
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
