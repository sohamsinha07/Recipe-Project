import React from "react";
import { Box } from "@mui/material";
import RecipeCard from "./RecipeCard";

const sampleRecipes = [
  {
    title: "Mediterranean Quinoa Bowl",
    description: "Healthy and delicious bowl with fresh vegetables",
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
  {
    title: "Homemade Pizza",
    description: "Wood-fired style pizza with fresh toppings",
    rating: 4.7,
    time: "45 min",
  },
  {
    title: "Beef Stir Fry",
    description: "Quick and easy stir fry with tender beef",
    rating: 4.5,
    time: "20 min",
  },
  {
    title: "Lemon Herb Salmon",
    description: "Perfectly seasoned salmon with fresh herbs",
    rating: 4.6,
    time: "30 min",
  },
  {
    title: "Lemon Herb Salmon",
    description: "Perfectly seasoned salmon with fresh herbs",
    rating: 4.6,
    time: "30 min",
  },
  {
    title: "Lemon Herb Salmon",
    description: "Perfectly seasoned salmon with fresh herbs",
    rating: 4.6,
    time: "30 min",
  },
  {
    title: "Lemon Herb Salmon",
    description: "Perfectly seasoned salmon with fresh herbs",
    rating: 4.6,
    time: "30 min",
  },
  {
    title: "Lemon Herb Salmon",
    description: "Perfectly seasoned salmon with fresh herbs",
    rating: 4.6,
    time: "30 min",
  },
];

export default function RecipeGrid() {
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fill, minmax(280px, 1fr))"
      gap={3}
    >
      {sampleRecipes.map((recipe, index) => (
        <RecipeCard key={index} recipe={recipe} />
      ))}
    </Box>
  );
}
