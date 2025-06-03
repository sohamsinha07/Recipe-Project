import React from "react";
import AdminRecipeCard from "./AdminRecipeCard"; // Use your styled card
// No need to define sampleRecipes here if it's passed as a prop

export default function AdminRecipeGrid({
  sampleRecipes = [],
  view = "grid", // Default to grid
  onApprove,
  onReject,
  onEdit
}) {
  if (!sampleRecipes.length) {
    return <div style={{ padding: 32 }}>No recipes found.</div>;
  }

  // Grid view
  if (view === "grid") {
    return (
      <div className="popular-grid" style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "2rem",
        marginTop: "2rem",
        alignItems: "stretch"
      }}>
        {sampleRecipes.map((recipe, i) => (
          <AdminRecipeCard
            key={i}
            recipe={recipe}
            onApprove={() => onApprove(recipe)}
            onReject={() => onReject(recipe)}
            onEdit={() => onEdit(recipe)}
          />
        ))}
      </div>
    );
  }

  // List view
  return (
    <div className="admin-list-view">
      {sampleRecipes.map((recipe, i) => (
        <AdminRecipeCard
          key={i}
          recipe={recipe}
          list
          onApprove={() => onApprove(recipe)}
          onReject={() => onReject(recipe)}
          onEdit={() => onEdit(recipe)}
        />
      ))}
    </div>
  );
}
