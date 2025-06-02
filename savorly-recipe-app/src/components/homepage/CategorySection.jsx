import { Box, Typography, Grid, Card } from "@mui/material";

export default function CategorySection() {
  return (
    <Box sx={{ backgroundColor: "#F7B267", py: 6 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Browse by Category
        </Typography>
        <Typography variant="body1" sx={{ color: "#333" }}>
          Find recipes that match your mood and dietary preferences
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {/* Breakfast */}
        <Grid item xs={6} sm={4} md={2.5}>
          <Card
            sx={{
              borderRadius: 2,
              height: 120,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backgroundColor: "white",
            }}
          >
            <img
              src="/icons/coffee-cup.svg"
              alt="Breakfast"
              style={{ width: 40, height: 40, marginBottom: 8 }}
            />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Breakfast
            </Typography>
            <Typography variant="caption" sx={{ color: "#777" }}>
              Start your day right
            </Typography>
          </Card>
        </Grid>

        {/* Lunch */}
        <Grid item xs={6} sm={4} md={2.5}>
          <Card
            sx={{
              borderRadius: 2,
              height: 120,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backgroundColor: "white",
            }}
          >
            <img
              src="/icons/lunch-box.svg"
              alt="Lunch"
              style={{ width: 40, height: 40, marginBottom: 8 }}
            />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Lunch
            </Typography>
            <Typography variant="caption" sx={{ color: "#777" }}>
              Midday fuel
            </Typography>
          </Card>
        </Grid>

        {/* Dinner */}
        <Grid item xs={6} sm={4} md={2.5}>
          <Card
            sx={{
              borderRadius: 2,
              height: 120,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backgroundColor: "white",
            }}
          >
            <img
              src="/icons/dinner-plate.svg"
              alt="Dinner"
              style={{ width: 40, height: 40, marginBottom: 8 }}
            />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Dinner
            </Typography>
            <Typography variant="caption" sx={{ color: "#777" }}>
              Evening delights
            </Typography>
          </Card>
        </Grid>

        {/* Desserts */}
        <Grid item xs={6} sm={4} md={2.5}>
          <Card
            sx={{
              borderRadius: 2,
              height: 120,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backgroundColor: "white",
            }}
          >
            <img
              src="/icons/dessert.svg"
              alt="Desserts"
              style={{ width: 40, height: 40, marginBottom: 8 }}
            />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Desserts
            </Typography>
            <Typography variant="caption" sx={{ color: "#777" }}>
              Sweet endings
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
