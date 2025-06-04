import React from "react";
import AdminRecipeCard from "./AdminRecipeCard"; 

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
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        flexWrap: "wrap",
        gap: "32px",
        justifyContent: "center",
        maxWidth: "1280px",
        margin: "0 auto",                        // Center grid on page
        minHeight: "600px",
        padding: "32px 40px"
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
