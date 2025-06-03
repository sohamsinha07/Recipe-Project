import React from "react";
import AdminRecipeCard from "./AdminRecipeCard";
import { Box } from "@mui/material";
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

export default function AdminRecipeGrid({ recipes, onApprove, onReject, onEdit }) {
  return (
    <div className="popular-grid" style={{ display: "flex", flexWrap: "wrap", gap: "24px", marginTop: "32px" }}>
      {sampleRecipes.map((recipe) => (
        <AdminRecipeCard
          key={recipe.id}
          recipe={recipe}
          onApprove={onApprove}
          onReject={onReject}
          onEdit={onEdit}
        />
      ))}
      </div>
  );
}


