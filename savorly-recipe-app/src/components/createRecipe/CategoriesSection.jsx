import { Paper, Typography, Stack, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

export default function CategoriesSection() {
  const {
    control,
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
        Categories &amp; Tags
      </Typography>

      <Stack spacing={2}>
        <FormControl fullWidth error={!!errors?.mealType}>
          <InputLabel id="mealType-label">Category *</InputLabel>
          <Controller
            name="mealType"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                {...field}
                labelId="mealType-label"
                label="Category *"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Breakfast">Breakfast</MenuItem>
                <MenuItem value="Lunch">Lunch</MenuItem>
                <MenuItem value="Dinner">Dinner</MenuItem>
                <MenuItem value="Dessert">Dessert</MenuItem>
              </Select>
            )}
          />
        </FormControl>
      </Stack>
    </Paper>
  );
}
