{/*import React from "react";
import { Grid } from "@mui/material";
import RecipeCard from "./RecipeCard";

const sampleRecipes = [
  {
    title: "Mediterranean Quinoa Bowl",
    description: "Healthy and delicious bowl with fresh vegetables blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah ",
    rating: 4.8,
    time: "25 min",
  },
  {
    title: "Spicy Thai Curry",
    description: "Aromatic curry with coconut milk and vegetables",
    rating: 4.6,
    time: "35 min",
  },
  {
    title: "Classic Chocolate Cake",
    description: "Rich and moist chocolate cake with ganache",
    rating: 4.9,
    time: "60 min",
  },
  {
    title: "Fresh Garden Salad",
    description: "Crisp vegetables with homemade vinaigrette",
    rating: 4.4,
    time: "15 min",
  },
];

export default function RecipeGrid() {
  return (
    <Grid container spacing={3}>
      {sampleRecipes.map((recipe, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <RecipeCard recipe={recipe} />
        </Grid>
      ))}
    </Grid>
  );
} */}

import React from "react";
import { Grid } from "@mui/material";
import RecipeCard from "./RecipeCard";

const sampleRecipes = [
  {
    title: "Mediterranean Quinoa Bowl",
    description: "Healthy and delicious bowl with fresh vegetables blah blah blah blah blah blah blah blah blah blah blah blah blah",
    rating: 4.8,
    time: "25 min",
  },
  {
    title: "Spicy Thai Curry",
    description: "Aromatic curry with coconut milk and vegetables",
    rating: 4.6,
    time: "35 min",
  },
  {
    title: "Classic Chocolate Cake",
    description: "Rich and moist chocolate cake with ganache",
    rating: 4.9,
    time: "60 min",
  },
  {
    title: "Fresh Garden Salad",
    description: "Crisp vegetables with homemade vinaigrette",
    rating: 4.4,
    time: "15 min",
  },
];

export default function RecipeGrid() {
  return (
    <Grid
      container
      spacing={4}
      justifyContent="flex-start"
      sx={{ maxWidth: "960px", margin: "0 auto" }}
    >
      {sampleRecipes.map((recipe, index) => (
        <Grid item key={index}>
          <RecipeCard recipe={recipe} />
        </Grid>
      ))}
    </Grid>
  );
}

