import { Stack, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function KitchenHeader() {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      spacing={2}
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
        variant="contained"
        color="error"
        startIcon={<AddIcon />}
        sx={{ alignSelf: { xs: "flex-start", sm: "center" } }}
      >
        Create Recipe
      </Button>
    </Stack>
  );
}