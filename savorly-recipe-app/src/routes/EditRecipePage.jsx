import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Box, Button, Snackbar, Alert, Typography, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FormProvider, useForm } from "react-hook-form";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../AuthContext";
import { useContext } from "react";

import BasicInfoSection from "../components/createRecipe/BasicInfoSection";
import ImageUploader from "../components/createRecipe/ImageUploader";
import CategoriesSection from "../components/createRecipe/CategoriesSection";
import IngredientsSection from "../components/createRecipe/IngredientsSection";
import InstructionsSection from "../components/createRecipe/InstructionsSection";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  title: yup.string().required().max(120),
  description: yup.string().required().max(1000),
  totalTime: yup.number().required().positive().integer(),
  calories: yup.number().positive().integer().nullable(),
  mealType: yup.string().required(),
  servings: yup.number().required().positive().integer(),
  ingredients: yup
    .array()
    .of(
      yup.object({
        qty: yup.string(),
        unit: yup.string(),
        item: yup.string().required(),
      })
    )
    .min(1, "At least one ingredient is required"),
  instructions: yup
    .array()
    .of(
      yup.object({
        value: yup.string().required(),
      })
    )
    .min(1, "At least one instruction step is required"),
  imageDataURL: yup
    .string()
    .required("Please upload an image for your recipe")
    .test(
      "is-data-url",
      "Upload a valid JPEG or PNG",
      (val) => typeof val === "string" && val.startsWith("data:image/")
    ),
  url: yup.string().url().nullable(),
});

export default function EditRecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [initialLoadError, setInitialLoadError] = useState(null);
  const [loadingRecipe, setLoadingRecipe] = useState(true);
  const [toastOpen, setToastOpen] = useState(false);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      totalTime: "",
      calories: "",
      mealType: "",
      servings: "",
      ingredients: [],
      instructions: [],
      imageDataURL: "",
      url: "",
    },
  });

  useEffect(() => {
    if (!id) {
      setInitialLoadError("No recipe ID provided");
      setLoadingRecipe(false);
      return;
    }

    async function fetchRecipe() {
      try {
        const docRef = doc(db, "recipes", id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          setInitialLoadError("Recipe not found");
          setLoadingRecipe(false);
          return;
        }
        const data = docSnap.data();

        let ingrArray = [];
        if (Array.isArray(data.ingredients)) {
          ingrArray = data.ingredients;
        } else if (typeof data.ingredients === "string") {
          try {
            ingrArray = JSON.parse(data.ingredients);
          } catch {
            ingrArray = [];
          }
        }

        let instrArray = [];
        if (Array.isArray(data.instructions)) {
          instrArray = data.instructions;
        } else if (typeof data.instructions === "string") {
          try {
            instrArray = JSON.parse(data.instructions);
          } catch {
            instrArray = [];
          }
        }

        methods.reset({
          title: data.title || "",
          description: data.description || "",
          totalTime: data.totalTime || "",
          calories: data.calories != null ? data.calories : "",
          mealType: data.mealType || "",
          servings: data.servings || "",
          ingredients: ingrArray,
          instructions: instrArray,
          imageDataURL: data.image || "",
          url: data.url || "",
        });
      } catch (err) {
        console.error("Error loading recipe for edit:", err);
        setInitialLoadError("Failed to load recipe");
      } finally {
        setLoadingRecipe(false);
      }
    }

    fetchRecipe();
  }, [id, methods]);

  const onSubmit = async (values) => {
    if (!id) {
      alert("No recipe ID to update");
      return;
    }

    try {
      const payload = {
        title: values.title,
        description: values.description,
        totalTime: Number(values.totalTime),
        calories: values.calories ? Number(values.calories) : null,
        mealType: values.mealType,
        servings: Number(values.servings),
        ingredients: Array.isArray(values.ingredients) ? values.ingredients : [],
        instructions: Array.isArray(values.instructions) ? values.instructions : [],
        image: values.imageDataURL,
        url: values.url || "",
      };

      const docRef = doc(db, "recipes", id);
      await updateDoc(docRef, payload);

      setToastOpen(true);
      setTimeout(() => {
        setToastOpen(false);
        navigate("/my_kitchen");
      }, 1000);
    } catch (err) {
      console.error("Error updating recipe:", err);
      alert("Failed to save changes.  Please try again.");
    }
  };

  if (initialLoadError) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography color="error" variant="h6">
          {initialLoadError}
        </Typography>
        <Button variant="outlined" sx={{ mt: 2 }} onClick={() => navigate("/my_kitchen")}>
          Back to My Kitchen
        </Button>
      </Container>
    );
  }

  if (loadingRecipe) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography>Loading recipe data…</Typography>
      </Container>
    );
  }

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

        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Stack spacing={4} alignItems="center">
            {/* Full-width sections */}
            <Box width="90%">
              <ImageUploader />
            </Box>
            <Box width="90%">
              <BasicInfoSection />
            </Box>
            <Box width="90%">
              <IngredientsSection />
            </Box>
            <Box width="90%">
              <InstructionsSection />
            </Box>

            {/* Narrower category section */}
            <Box width="90%" maxWidth={400}>
              <CategoriesSection />
            </Box>

            {/* Centered Save button */}
            <Button
              type="submit"
              variant="contained"
              color="error"
              disabled={methods.formState.isSubmitting}
              sx={{ alignSelf: "center", mt: 2 }}
            >
              {methods.formState.isSubmitting ? "Saving…" : "Save Recipe"}
            </Button>
          </Stack>
        </form>

        <Snackbar
          open={toastOpen}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          autoHideDuration={1200}
          onClose={() => setToastOpen(false)}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            Recipe updated! Returning to My Kitchen…
          </Alert>
        </Snackbar>
      </Container>
    </FormProvider>
  );
}
