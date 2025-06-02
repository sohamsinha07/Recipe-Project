import { Box, Typography, Grid, Card, CardContent, CardMedia, Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function PopularSection() {
  // You’ll eventually replace hardcoded cards with dynamic data from your API/Firestore.
  // For now, we’re just showing 4 static examples with gradient placeholders.

  return (
    <Box sx={{ py: 6, backgroundColor: "#FBFBFB" }}>
      <Box sx={{ px: { xs: 2, md: 0 }, maxWidth: 1200, margin: "0 auto" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Popular This Week
            </Typography>
            <Typography variant="body2" sx={{ color: "#555" }}>
              Most loved recipes by our community
            </Typography>
          </Box>
          <Button
            size="small"
            sx={{
              textTransform: "none",
              color: "#F25C54",
              fontWeight: 600,
            }}
            endIcon={<ArrowForwardIosIcon sx={{ fontSize: "0.75rem" }} />}
          >
            View All
          </Button>
        </Box>

        <Grid container spacing={3}>
          {/* ----- Card 1: Trending ----- */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ position: "relative", borderRadius: 2, boxShadow: 3 }}>
              <CardMedia
                component="div"
                sx={{
                  height: 140,
                  background: "linear-gradient(135deg, #FF8474, #FF5B5B)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                Recipe Image
              </CardMedia>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Creamy Mushroom Risotto
                </Typography>
                <Typography variant="body2" sx={{ color: "#777", mb: 1 }}>
                  Rich and creamy Italian comfort food
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                  <Typography
                    variant="caption"
                    sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                  >
                    ★ 4.9 (234)
                  </Typography>
                  <Typography variant="caption">35 min</Typography>
                </Box>
              </CardContent>

              <Box
                sx={{
                  position: "absolute",
                  top: 8,
                  left: 8,
                  backgroundColor: "#2C3E50",
                  color: "#FFF",
                  px: 1.2,
                  borderRadius: 1,
                  fontSize: "0.625rem",
                  fontWeight: 700,
                }}
              >
                Trending
              </Box>
            </Card>
          </Grid>

          {/* ----- Card 2: New ----- */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ position: "relative", borderRadius: 2, boxShadow: 3 }}>
              <CardMedia
                component="div"
                sx={{
                  height: 140,
                  background: "linear-gradient(135deg, #E8F5E9, #A5D6A7)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#333",
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                Recipe Image
              </CardMedia>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Asian Fusion Tacos
                </Typography>
                <Typography variant="body2" sx={{ color: "#777", mb: 1 }}>
                  Korean-Mexican fusion at its finest
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                  <Typography
                    variant="caption"
                    sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                  >
                    ★ 4.7 (89)
                  </Typography>
                  <Typography variant="caption">25 min</Typography>
                </Box>
              </CardContent>

              <Box
                sx={{
                  position: "absolute",
                  top: 8,
                  left: 8,
                  backgroundColor: "#388E3C",
                  color: "#FFF",
                  px: 1.2,
                  borderRadius: 1,
                  fontSize: "0.625rem",
                  fontWeight: 700,
                }}
              >
                New
              </Box>
            </Card>
          </Grid>

          {/* ----- Card 3: Chef’s Choice ----- */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ position: "relative", borderRadius: 2, boxShadow: 3 }}>
              <CardMedia
                component="div"
                sx={{
                  height: 140,
                  background: "linear-gradient(135deg, #F3E5AB, #D6A558)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#333",
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                Recipe Image
              </CardMedia>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Classic French Onion Soup
                </Typography>
                <Typography variant="body2" sx={{ color: "#777", mb: 1 }}>
                  Traditional French comfort in a bowl
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                  <Typography
                    variant="caption"
                    sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                  >
                    ★ 4.8 (156)
                  </Typography>
                  <Typography variant="caption">45 min</Typography>
                </Box>
              </CardContent>

              <Box
                sx={{
                  position: "absolute",
                  top: 8,
                  left: 8,
                  backgroundColor: "#A67F00",
                  color: "#FFF",
                  px: 1.2,
                  borderRadius: 1,
                  fontSize: "0.625rem",
                  fontWeight: 700,
                }}
              >
                Chef’s Choice
              </Box>
            </Card>
          </Grid>

          {/* ----- Card 4: No badge ----- */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardMedia
                component="div"
                sx={{
                  height: 140,
                  background: "linear-gradient(135deg, #E1F5FE, #B3E5FC)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#333",
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                Recipe Image
              </CardMedia>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Mediterranean Quinoa Salad
                </Typography>
                <Typography variant="body2" sx={{ color: "#777", mb: 1 }}>
                  Fresh, healthy, and incredibly flavorful
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                  <Typography
                    variant="caption"
                    sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                  >
                    ★ 4.6 (203)
                  </Typography>
                  <Typography variant="caption">20 min</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
