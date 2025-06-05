import { Paper, Typography, TextField } from "@mui/material";

export default function NutritionSection() {
  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Typography fontWeight={600} mb={2}>
        Nutrition Information
      </Typography>
      <TextField fullWidth label="Calories (per serving)" />
    </Paper>
  );
}