import { Container, Grid, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

import BasicInfoSection      from "../components/createRecipe/BasicInfoSection";
import ImageUploader         from "../components/createRecipe/ImageUploader";
import CategoriesSection     from "../components/createRecipe/CategoriesSection";
import NutritionSection      from "../components/createRecipe/NutritionSection";
import IngredientsSection    from "../components/createRecipe/IngredientsSection";
import InstructionsSection   from "../components/createRecipe/InstructionsSection";

export default function CreateRecipePage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* back nav */}
      <Button
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
        onClick={() => navigate(-1)}
      >
        Create New Recipe
      </Button>

      <Grid container spacing={4}>
        {/* LEFT COLUMN */}
        <Grid item xs={12} md={8} display="flex" flexDirection="column" gap={4}>
          <BasicInfoSection />
          <ImageUploader />
          <IngredientsSection />
          <InstructionsSection />
        </Grid>

        {/* RIGHT COLUMN */}
        <Grid item xs={12} md={4} display="flex" flexDirection="column" gap={4}>
          <CategoriesSection />
          <NutritionSection />
        </Grid>
      </Grid>
    </Container>
  );
}