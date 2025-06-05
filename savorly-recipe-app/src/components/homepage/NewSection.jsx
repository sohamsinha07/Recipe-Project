import { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Button, Skeleton, Stack } from "@mui/material";
import axios from "axios";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StarIcon from "@mui/icons-material/Star";
import MarqueeTitle from "./MarqueeTitle";

import "../../styles/homePage.css";

export default function NewSection({ loading }) {
  const mealTypeColors = {
    Breakfast: "#FFA726",
    Lunch: "#29B6F6",
    Dinner: "#66BB6A",
    Dessert: "#AB47BC",
  };

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    let isMounted = true;

    // Fetch the 4 most recently‐added recipes
    axios
      .get("/recipe-details/newest")
      .then((res) => {
        if (isMounted) {
          setRecipes(res.data.recipes);
        }
      })
      .catch((err) => {
        console.error("Error fetching newest recipes:", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <Box className="popular-section-container">
        <Box className="section-wrapper">
          <Box className="popular-header">
            <Box>
              <Skeleton variant="text" animation="wave" width={350} height={80} sx={{ mb: -1 }} />
              <Skeleton variant="text" animation="wave" width={250} height={20} sx={{ mb: 5 }} />
            </Box>

            <Skeleton
              variant="rectangular"
              animation="wave"
              width={80}
              height={32}
              sx={{ borderRadius: 1 }}
            />
          </Box>

          <Stack
            direction="row"
            spacing={3}
            flexWrap="nowrap" /* this line lets them wrap if the window is too narrow */
          >
            {Array.from({ length: 4 }).map((_, idx) => (
              <Box
                key={idx}
                sx={{
                  flexBasis: "25%" /* each card takes exactly 25% of the parent width */,
                  flexGrow: 1 /* grow to fill that 25% container */,
                  maxWidth: "25%" /* ensure it never exceeds 25% */,
                }}
              >
                <Card className="popular-card">
                  <Box className="popular-card-media">
                    <Skeleton
                      sx={{ backgroundColor: "#d3d3d3" }}
                      variant="rectangular"
                      animation="wave"
                      width="100%"
                      height="100%"
                    />
                  </Box>

                  <CardContent>
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width={160}
                      height={28}
                      sx={{ mb: 1 }}
                    />

                    <Skeleton
                      variant="text"
                      animation="wave"
                      width={200}
                      height={16}
                      sx={{ mb: 1 }}
                    />

                    <Box className="popular-meta">
                      <Skeleton variant="text" animation="wave" width={80} height={16} />
                      <Skeleton variant="text" animation="wave" width={40} height={16} />
                    </Box>
                  </CardContent>

                  <Box
                    sx={{
                      position: "absolute",
                      top: 8,
                      left: 8,
                    }}
                  >
                    <Skeleton
                      variant="rectangular"
                      animation="wave"
                      width={60}
                      height={20}
                      sx={{ borderRadius: 1 }}
                    />
                  </Box>
                </Card>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    );
  }

  return (
    <Box className="popular-section-container">
      {/* Wrapper for centering + responsive padding */}
      <Box className="section-wrapper">
        {/* Header Row */}
        <Box className="popular-header">
          <Box>
            <Typography variant="h4" className="popular-title">
              Newest Recipes Published
            </Typography>
            <Typography variant="body2" className="popular-subtitle">
              The four most recent recipes added by our community
            </Typography>
          </Box>

          <Button size="small" className="popular-viewall-button" endIcon={<ArrowForwardIosIcon />}>
            View All
          </Button>
        </Box>

        {/* Stack of cards */}
        <Stack direction="row" spacing={3} flexWrap="nowrap">
          {recipes.map((recipe) => {
            const {
              id,
              title,
              description,
              image,
              averageRating,
              numReviews,
              totalTime,
              mealType,
            } = recipe;

            const badgeColor = mealTypeColors[mealType] || "#757575";

            return (
              <Box
                key={id}
                sx={{
                  flexBasis: "25%",
                  flexGrow: 1,
                  maxWidth: "25%",
                }}
              >
                <Card className="popular-card">
                  <Box
                    className="popular-card-media"
                    sx={{
                      backgroundImage: `url(${image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "140px",
                    }}
                  />

                  <CardContent>
                    {/* Title and subtitle */}
                    <MarqueeTitle text={title} className="popular-card-title" speed={30} />
                    <Typography variant="body2" className="popular-card-desc">
                      {description}
                    </Typography>

                    {/* Star + reviews and Time */}
                    <Box className="popular-meta">
                      <StarIcon className="popular-star-icon" />
                      <Typography variant="caption" className="popular-meta-item">
                        {averageRating.toFixed(1)} ({numReviews})
                      </Typography>
                      <Typography variant="caption">{totalTime}</Typography>
                    </Box>
                  </CardContent>

                  {/* Badge showing mealType */}
                  <Box className="popular-badge" style={{ backgroundColor: badgeColor }}>
                    {mealType}
                  </Box>
                </Card>
              </Box>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
}
