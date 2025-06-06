import React from "react";
import { Grid, Stack } from "@mui/material";
import RecipeCard from "./RecipeCard";

export default function RecipeGrid({
  recipes = [],
  view,
  onView,
  onDelete,
  onEdit,
  onRemove,
}) {
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
    <Grid container spacing={3}>
      {recipes.map((r) => (
        <Grid key={r.id} item xs={12} sm={6} md={4}>
          <RecipeCard
            data={r}
            view="grid"
            onView={onView}
            onDelete={onDelete}
            onEdit={onEdit}
            onRemove={onRemove}
          />
        </Grid>
      ))}
    </Grid>
  );
}
