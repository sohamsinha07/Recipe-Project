import React from "react";
import { Tabs, Tab, Box } from "@mui/material";

export default function KitchenTabs({ value, onChange }) {
  const handleChange = (_, newValue) => onChange(newValue);

  return (
    <Box mb={2} borderBottom={1} borderColor="divider">
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="inherit"
        indicatorColor="error"
      >
        <Tab value="my" label="My Recipes" />
        <Tab value="saved" label="Saved Recipes" />
      </Tabs>
    </Box>
  );
}
