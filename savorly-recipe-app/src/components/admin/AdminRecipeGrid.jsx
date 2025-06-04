import React from "react";
import AdminRecipeCard from "./AdminRecipeCard"; 

export default function AdminRecipeGrid({
  recipes, view, onApprove, onReject, onEdit
}) {
  if (!recipes.length) {
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
        {recipes.map((recipe, i) => (
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
      {recipes.map((recipe, i) => (
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
