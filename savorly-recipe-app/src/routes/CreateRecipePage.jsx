import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Grid, Button, Snackbar, Alert } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FormProvider } from "react-hook-form";
import { AuthContext } from "../AuthContext";

import useCreateRecipeForm from "../components/createRecipe/useCreateRecipeForm";
import BasicInfoSection from "../components/createRecipe/BasicInfoSection";
import ImageUploader from "../components/createRecipe/ImageUploader";
import CategoriesSection from "../components/createRecipe/CategoriesSection";
import IngredientsSection from "../components/createRecipe/IngredientsSection";
import InstructionsSection from "../components/createRecipe/InstructionsSection";

export default function CreateRecipePage() {
  const navigate = useNavigate();
  const [toastOpen, setToastOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const methods = useCreateRecipeForm(() => {
    setToastOpen(true);
    setTimeout(() => navigate("/my_kitchen"), 1500);
  }, user);

  const handleSubmit = (e) => {
    e.preventDefault();
    methods.handleSubmit(methods.onSubmit)();
    if (Object.keys(methods.formState.errors).length) {
      console.warn("✖︎ RHF errors →", methods.formState.errors);
    }
  };

  return (
    <FormProvider {...methods}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          color="error"
          sx={{ mb: 3 }}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>

        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8} display="flex" flexDirection="column" gap={4}>
              <ImageUploader />
              <BasicInfoSection />
              <IngredientsSection />
              <InstructionsSection />
            </Grid>

            <Grid item xs={12} md={4} display="flex" flexDirection="column" gap={4}>
              <CategoriesSection />
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            color="error"
            sx={{ mt: 4 }}
            disabled={methods.formState.isSubmitting}
          >
            {methods.formState.isSubmitting ? "Saving…" : "Save Recipe"}
          </Button>
        </form>

        <Snackbar
          open={toastOpen}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          autoHideDuration={1500}
          onClose={() => setToastOpen(false)}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            Recipe saved! Redirecting to My Kitchen…
          </Alert>
        </Snackbar>
      </Container>
    </FormProvider>
  );
}
