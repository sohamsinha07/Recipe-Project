import React from "react";
import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RecipeFilters from "../components/recipes/RecipeFilters";
import RecipeGrid from "../components/recipes/RecipeGrid";

export default function RecipesPage() {
  return (
    <Box>
      {/* Top Banner */}
      <Box
        sx={{
          background: "linear-gradient(90deg, #f857a6 0%, #ff5858 100%)",
          color: "white",
          textAlign: "center",
          py: 8,
          px: 2,
          borderRadius: "0 0 16px 16px",
        }}
      >
        <Typography variant="h4" fontWeight={700} mb={1}>
          Discover Amazing Recipes
        </Typography>
        <Typography variant="subtitle1" mb={3}>
          From quick weeknight dinners to special occasion treats
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: "white",
            color: "#ff5858",
            fontWeight: 600,
            borderRadius: 2,
            ":hover": { backgroundColor: "#ffe6e6" },
          }}
        >
          Add Recipe
        </Button>
      </Box>

      {/* Recipe Section */}
      <Box px={{ xs: 2, md: 6 }} py={4}>
        <RecipeFilters />
        <RecipeGrid />
      </Box>
    </Box>
  );
}
