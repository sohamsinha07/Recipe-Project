import { Paper, Typography, TextField, MenuItem, Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function CategoriesSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Typography fontWeight={600} mb={2}>
        Categories &amp; Tags
      </Typography>

      <Stack spacing={2}>
        {/* -------- Category (mealType) -------- */}
        <TextField
          select
          label="Category *"
          defaultValue=""
          error={!!errors?.mealType}
          {...register("mealType", { required: true })}
        >
          <MenuItem value="Breakfast">Breakfast</MenuItem>
          <MenuItem value="Lunch">Lunch</MenuItem>
          <MenuItem value="Linner">Dinner</MenuItem>
        </TextField>
      </Stack>
    </Paper>
  );
}
