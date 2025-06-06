import React from "react";
import { Grid, Stack, Box } from "@mui/material";
import RecipeCard from "./RecipeCard";

export default function RecipeGrid({ recipes = [], view, onView, onDelete, onEdit, onRemove }) {
  if (view === "list") {
    return (
      <Stack spacing={2}>
        {recipes.map((r) => (
          <RecipeCard
            key={r.id}
            data={r}
            view="list"
            onView={onView}
            onDelete={onDelete}
            onEdit={onEdit}
            onRemove={onRemove}
          />
        ))}
      </Stack>
    );
  }

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fill, minmax(280px, 1fr))"
      gap={3}
      gridAutoRows="340px"
    >
      {recipes.map((r) => (
        <Box key={r.id} sx={{ display: "flex" }}>
          <RecipeCard
            data={r}
            view="grid"
            onView={onView}
            onDelete={onDelete}
            onEdit={onEdit}
            onRemove={onRemove}
            sx={{ height: "100%" }}
          />
        </Box>
      ))}
    </Box>
  );
}
