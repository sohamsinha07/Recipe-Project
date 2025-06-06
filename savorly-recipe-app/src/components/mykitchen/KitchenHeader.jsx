import React from "react";
import { Stack, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link as RouterLink } from "react-router-dom";

export default function KitchenHeader() {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      spacing={2}
      sx={{ mb: 2 }}
    >
      <div>
        <Typography variant="h4" fontWeight={700}>
          My Kitchen
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage your created and saved recipes
        </Typography>
      </div>

      <Button
        component={RouterLink}
        to="/create_recipe"
        variant="contained"
        startIcon={<AddIcon />}
        sx={{
          alignSelf: {
            xs: "flex-start",
            sm: "center",
            backgroundColor: "#fe5f55",
            fontWeight: "bold",
          },
        }}
      >
        Create Recipe
      </Button>
    </Stack>
  );
}
