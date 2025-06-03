import { Box, Typography, Grid, Card, CardContent, Button, Skeleton } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import "../../styles/homePage.css";

export default function FeaturesSection({ loading }) {
  if (loading) {
    return (
      <Box className="features-section-container">
        <Box className="section-wrapper">
          <Skeleton
            variant="text"
            animation="wave"
            width={480}
            height={40}
            sx={{ mx: "auto", mb: 1 }}
          />

          <Skeleton
            variant="text"
            animation="wave"
            width={500}
            height={24}
            sx={{ mx: "auto", mb: 3 }}
          />

          <Grid container spacing={8} justifyContent="center">
            {Array.from({ length: 3 }).map((_, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Box className="feature-card">
                  <Box className="feature-card-content">
                    <Box className="feature-icon-box">
                      <Skeleton
                        variant="rectangular"
                        animation="wave"
                        width={48}
                        height={48}
                        sx={{ borderRadius: 1 }}
                      />
                    </Box>

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
                      width={300}
                      height={16}
                      sx={{ mb: 0.5 }}
                    />
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width={260}
                      height={16}
                      sx={{ mb: 2 }}
                    />
                  </Box>

                  <Box
                    className="feature-button-container"
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Skeleton
                      variant="rectangular"
                      animation="wave"
                      width={120}
                      height={40}
                      sx={{ borderRadius: 2 }}
                    />
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    );
  }

  return (
    <Box className="features-section-container">
      <Box className="section-wrapper">
        {/* Section Heading */}
        <Typography variant="h4" className="features-heading">
          Everything You Need to Cook
        </Typography>
        <Typography variant="body1" className="features-subtitle">
          From discovering new recipes to sharing your own creations
        </Typography>

        <Grid container spacing={6} justifyContent="center">
          <Grid>
            <Card className="feature-card">
              {/* Card Content */}
              <CardContent className="feature-card-content">
                <Box className="feature-icon-box feature-icon-discover">
                  <SearchIcon sx={{ fontSize: 28 }} />
                </Box>

                {/* Title */}
                <Typography variant="h6" className="feature-card-title">
                  Discover Recipes
                </Typography>

                {/* Description */}
                <Typography variant="body2" className="feature-card-text">
                  Browse thousands of recipes from around the world. Filter by cuisine, difficulty,
                  cooking time, and dietary preferences.
                </Typography>
              </CardContent>
              {/* Button Container */}
              <Box className="feature-button-container">
                <Button
                  size="large"
                  className="feature-button-common feature-button-explore"
                  endIcon={<ArrowForwardIosIcon className="feature-icon-small" />}
                >
                  Explore
                </Button>
              </Box>
            </Card>
          </Grid>

          <Grid>
            <Card className="feature-card">
              <CardContent className="feature-card-content">
                <Box className="feature-icon-box feature-icon-create">
                  <AddCircleOutlineIcon sx={{ fontSize: 26 }} />
                </Box>
                <Typography variant="h6" className="feature-card-title">
                  Create & Share
                </Typography>
                <Typography variant="body2" className="feature-card-text">
                  Share your favorite recipes with the community. Add photos, detailed instructions,
                  and get feedback from fellow cooks.
                </Typography>
              </CardContent>
              <Box className="feature-button-container">
                <Button
                  size="large"
                  className="feature-button-common feature-button-create"
                  endIcon={<ArrowForwardIosIcon className="feature-icon-small" />}
                >
                  Start Creating
                </Button>
              </Box>
            </Card>
          </Grid>

          <Grid>
            <Card className="feature-card">
              <CardContent className="feature-card-content">
                <Box className="feature-icon-box feature-icon-join">
                  <PeopleAltIcon sx={{ fontSize: 24 }} />
                </Box>
                <Typography variant="h6" className="feature-card-title">
                  Join Community
                </Typography>
                <Typography variant="body2" className="feature-card-text">
                  Connect with passionate home cooks. Share tips, ask questions, and learn from
                  experienced chefs in our community.
                </Typography>
              </CardContent>
              <Box className="feature-button-container">
                <Button
                  size="large"
                  className="feature-button-common feature-button-join"
                  endIcon={<ArrowForwardIosIcon className="feature-icon-small" />}
                >
                  Join Now
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
