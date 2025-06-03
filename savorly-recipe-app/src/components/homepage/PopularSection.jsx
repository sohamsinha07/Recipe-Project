import { Box, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StarIcon from "@mui/icons-material/Star";

import "../../styles/homePage.css";

export default function PopularSection() {
  // Mock data
  const cardsData = [
    {
      id: 1,
      title: "Creamy Mushroom Risotto",
      subtitle: "Rich and creamy Italian comfort food",
      rating: 4.9,
      reviews: 234,
      time: "35 min",
      badgeText: "Trending",
      badgeClass: "popular-badge",
      gradient: "linear-gradient(135deg, #FF8474, #FF5B5B)",
    },
    {
      id: 2,
      title: "Asian Fusion Tacos",
      subtitle: "Korean-Mexican fusion at its finest",
      rating: 4.7,
      reviews: 89,
      time: "25 min",
      badgeText: "New",
      badgeClass: "popular-badge popular-badge-new",
      gradient: "linear-gradient(135deg, #E8F5E9, #A5D6A7)",
    },
    {
      id: 3,
      title: "Classic French Onion Soup",
      subtitle: "Traditional French comfort in a bowl",
      rating: 4.8,
      reviews: 156,
      time: "45 min",
      badgeText: "Chef's Choice",
      badgeClass: "popular-badge popular-badge-choice",
      gradient: "linear-gradient(135deg, #F3E5AB, #D6A558)",
    },
    {
      id: 4,
      title: "Mediterranean Quinoa Salad",
      subtitle: "Fresh, healthy, and incredibly flavorful",
      rating: 4.6,
      reviews: 203,
      time: "20 min",
      badgeText: null, // no badge for this one
      badgeClass: "",
      gradient: "linear-gradient(135deg, #E1F5FE, #B3E5FC)",
    },
  ];

  return (
    <Box className="popular-section-container">
      {/* Wrapper for centering + responsive padding */}
      <Box className="section-wrapper">
        {/* Header Row */}
        <Box className="popular-header">
          <Box>
            <Typography variant="h4" className="popular-title">
              Popular This Week
            </Typography>
            <Typography variant="body2" className="popular-subtitle">
              Most loved recipes by our community
            </Typography>
          </Box>

          <Button size="small" className="popular-viewall-button" endIcon={<ArrowForwardIosIcon />}>
            View All
          </Button>
        </Box>

        {/* Grid of cards */}
        <Grid container spacing={3} className="popular-grid">
          {cardsData.map((card) => (
            <Grid key={card.id}>
              <Card className="popular-card">
                {/* Top gradient banner (title for now) */}
                <Box className="popular-card-media" style={{ background: card.gradient }}>
                  {card.title}
                </Box>

                <CardContent>
                  {/* Title and subtitle */}
                  <Typography variant="h6" className="popular-card-title">
                    {card.title}
                  </Typography>
                  <Typography variant="body2" className="popular-card-desc">
                    {card.subtitle}
                  </Typography>

                  {/* Star + reviews and Time */}
                  <Box className="popular-meta">
                    <Typography variant="caption" className="popular-meta-item">
                      <StarIcon className="popular-star-icon" />
                      {card.rating} ({card.reviews})
                    </Typography>
                    <Typography variant="caption">{card.time}</Typography>
                  </Box>
                </CardContent>

                {/* Badge, if present */}
                {card.badgeText && <Box className={card.badgeClass}>{card.badgeText}</Box>}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
