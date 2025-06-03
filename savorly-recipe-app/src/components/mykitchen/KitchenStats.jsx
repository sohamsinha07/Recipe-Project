import { Grid, Typography, Stack } from "@mui/material";

function Stat({ value, label }) {
  return (
    <Stack spacing={0.5} textAlign="center">
      <Typography variant="h6" fontWeight={600}>
        {value}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
    </Stack>
  );
}

export default function KitchenStats({ created, published, drafts, views }) {
  return (
    <Grid container mt={4} spacing={5}>
      <Grid item><Stat value={created}   label="Created" /></Grid>
      <Grid item><Stat value={published} label="Published" /></Grid>
      <Grid item><Stat value={drafts}    label="Drafts" /></Grid>
      <Grid item><Stat value={views.toLocaleString()} label="Total Views" /></Grid>
    </Grid>
  );
}