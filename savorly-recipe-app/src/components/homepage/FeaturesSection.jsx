import { Box, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function FeaturesSection() {
  return (
    <Box sx={{ textAlign: "center", pt: 6, pb: 3, backgroundColor: "#FFF" }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Everything You Need to Cook
      </Typography>
      <Typography variant="body1" sx={{ color: "#555", mb: 4 }}>
        From discovering new recipes to sharing your own creations
      </Typography>

      <Grid container spacing={3} justifyContent="center" sx={{ px: { xs: 1, md: 2 } }}>
        {/* -------- Discover Recipes Card -------- */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardContent sx={{ py: 3 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 1,
                  backgroundColor: "#FFEAE8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <img
                  src="/icons/search-icon.svg"
                  alt="Discover Recipes"
                  style={{ width: 24, height: 24 }}
                />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Discover Recipes
              </Typography>
              <Typography variant="body2" sx={{ color: "#777", mb: 2 }}>
                Browse thousands of recipes from around the world. Filter by cuisine, difficulty,
                cooking time, and dietary preferences.
              </Typography>
            </CardContent>
            <Box sx={{ px: 3, pb: 3 }}>
              <Button
                size="small"
                endIcon={<ArrowForwardIosIcon sx={{ fontSize: "0.75rem" }} />}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  color: "#F25C54",
                }}
              >
                Explore
              </Button>
            </Box>
          </Card>
        </Grid>

        {/* -------- Create & Share Card -------- */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardContent sx={{ py: 3 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 1,
                  backgroundColor: "#ECFCEE",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <img
                  src="/icons/add-recipe-icon.svg"
                  alt="Create & Share"
                  style={{ width: 24, height: 24 }}
                />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Create & Share
              </Typography>
              <Typography variant="body2" sx={{ color: "#777", mb: 2 }}>
                Share your favorite recipes with the community. Add photos, detailed instructions,
                and get feedback from fellow cooks.
              </Typography>
            </CardContent>
            <Box sx={{ px: 3, pb: 3 }}>
              <Button
                size="small"
                endIcon={<ArrowForwardIosIcon sx={{ fontSize: "0.75rem" }} />}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  color: "#3C9D68",
                }}
              >
                Start Creating
              </Button>
            </Box>
          </Card>
        </Grid>

        {/* -------- Join Community Card -------- */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardContent sx={{ py: 3 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 1,
                  backgroundColor: "#FFF4E6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <img
                  src="/icons/community-icon.svg"
                  alt="Join Community"
                  style={{ width: 24, height: 24 }}
                />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Join Community
              </Typography>
              <Typography variant="body2" sx={{ color: "#777", mb: 2 }}>
                Connect with passionate home cooks. Share tips, ask questions, and learn from
                experienced chefs in our community.
              </Typography>
            </CardContent>
            <Box sx={{ px: 3, pb: 3 }}>
              <Button
                size="small"
                endIcon={<ArrowForwardIosIcon sx={{ fontSize: "0.75rem" }} />}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  color: "#F2A541",
                }}
              >
                Join Now
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
