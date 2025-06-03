import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import RecipeCard from "./RecipeCard";

export default function RecipeGrid() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch("http://localhost:3000/recipes");
        const data = await response.json();
        console.log("🔍 Backend response:", data);
        console.log("🔥 Raw data from backend:", data);
        setRecipes(data);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchRecipes();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }
  console.log("🔁 Ready to render these recipes:", recipes);
  console.log("🔍 Type of recipes:", typeof recipes, Array.isArray(recipes));


  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fill, minmax(280px, 1fr))"
      gap={3}
    >
      {Array.isArray(recipes) &&
        recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
      ))}
    </Box>
  );
}
