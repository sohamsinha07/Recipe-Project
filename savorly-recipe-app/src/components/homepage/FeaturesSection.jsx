import { Box, Typography, Grid, Card, CardContent, Button } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import "../../styles/homePage.css";

export default function FeaturesSection() {
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
