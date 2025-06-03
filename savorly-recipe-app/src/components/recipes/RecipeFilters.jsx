import React from "react";
import { Box, FormControl, Select, MenuItem, InputLabel } from "@mui/material";

const filters = {
  category: ["All Categories", "Dinner", "Dessert", "Salad"],
  cuisine: ["Cuisine", "Italian", "Indian", "Thai"],
  cookTime: ["Cook Time", "< 15 min", "15–30 min", "30+ min"],
  difficulty: ["Difficulty", "Easy", "Medium", "Hard"],
  sortBy: ["Most Popular", "Newest", "Top Rated"],
};

export default function RecipeFilters() {
  return (
    <Box display="flex" flexWrap="wrap" gap={2} mb={4}>
      {Object.entries(filters).map(([label, options]) => (
        <FormControl key={label} size="small" sx={{ minWidth: 150 }}>
          <InputLabel>{label}</InputLabel>
          <Select defaultValue={options[0]} label={label}>
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}
    </Box>
  );
}
