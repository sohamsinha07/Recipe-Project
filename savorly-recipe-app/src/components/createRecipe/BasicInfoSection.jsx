import { Paper, Typography, TextField, Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function BasicInfoSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Typography fontWeight={600} mb={2}>
        Basic Information
      </Typography>

      <Grid container spacing={2}>
        {/* ---------- Title ---------- */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Recipe Title *"
            error={!!errors.title}
            helperText={errors.title?.message}
            {...register("title", { required: "Title is required" })}
          />
        </Grid>

        {/* ---------- Description ---------- */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Description *"
            error={!!errors.description}
            helperText={errors.description?.message}
            {...register("description", { required: "Description is required" })}
          />
        </Grid>

        {/* ---------- Times & Servings ---------- */}
        <Grid item xs={4}>
          <TextField
            fullWidth
            type="number"
            label="Total Time (min) *"
            error={!!errors.totalTime}
            helperText={errors.totalTime?.message}
            {...register("totalTime", {
              required: "Total time is required",
              valueAsNumber: true,
              min: { value: 1, message: "Must be ≥ 1" },
            })}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            fullWidth
            type="number"
            label="Servings *"
            error={!!errors.servings}
            helperText={errors.servings?.message}
            {...register("servings", {
              required: "Servings required",
              valueAsNumber: true,
              min: { value: 1, message: "Must be ≥ 1" },
            })}
          />
        </Grid>

        {/* ---------- Calories ---------- */}
        <Grid item xs={4}>
          <TextField
            fullWidth
            type="number"
            label="Calories"
            {...register("calories", { valueAsNumber: true })}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}