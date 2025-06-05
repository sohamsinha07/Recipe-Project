import { Grid, Stack } from "@mui/material";
import RecipeCard from "./RecipeCard";

export default function RecipeGrid({ recipes, view }) {
  if (view === "list") {
    return (
      <Stack spacing={2}>
        {recipes.map(r => (
          <RecipeCard key={r.id} data={r} view="list" />
        ))}
      </Stack>
    );
  }

  return (
    <Grid container spacing={3}>
      {recipes.map(r => (
        <Grid key={r.id} item xs={12} sm={6} lg={3}>
          <RecipeCard data={r} view="grid" />
        </Grid>
      ))}
    </Grid>
  );
}
