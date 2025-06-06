import { Paper, Typography, TextField, Grid, Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function BasicInfoSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        boxShadow: 5,
        borderRadius: 2,
        backgroundColor: "white",
      }}
    >
      <Typography fontWeight={600} mb={2}>
        Basic Information
      </Typography>

      {/* ---------- Title ---------- */}
      <TextField
        label="Recipe Title *"
        error={!!errors.title}
        helperText={errors.title?.message}
        {...register("title", { required: "Title is required" })}
        sx={{ mb: 2, width: 572 }}
      />

      {/* ---------- Description ---------- */}
      <TextField
        fullWidth
        multiline
        rows={3}
        label="Description *"
        error={!!errors.description}
        helperText={errors.description?.message}
        {...register("description", { required: "Description is required" })}
        sx={{ mb: 2 }}
      />

      {/* ---------- Times, Calories, Servings ---------- */}
      <Stack direction="row" spacing={2} flexWrap="wrap">
        <TextField
          type="number"
          label="Total Time (min) *"
          error={!!errors.totalTime}
          helperText={errors.totalTime?.message}
          {...register("totalTime", {
            required: "Total time is required",
            valueAsNumber: true,
            min: { value: 1, message: "Must be ≥ 1" },
          })}
          sx={{ width: { xs: "100%", sm: 180 } }}
        />

        {/* ---------- Calories ---------- */}
        <TextField
          type="number"
          label="Calories"
          {...register("calories", { valueAsNumber: true })}
          sx={{ width: { xs: "100%", sm: 180 } }}
        />

        <TextField
          type="number"
          label="Servings *"
          error={!!errors.servings}
          helperText={errors.servings?.message}
          {...register("servings", {
            required: "Servings required",
            valueAsNumber: true,
            min: { value: 1, message: "Must be ≥ 1" },
          })}
          sx={{ width: { xs: "100%", sm: 180 } }}
        />
      </Stack>
    </Paper>
  );
}
