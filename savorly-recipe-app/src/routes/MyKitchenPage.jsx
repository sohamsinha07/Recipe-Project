import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Stack,
  Button,
  Box,
  Tabs,
  Tab,
  Typography,
} from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import AddIcon from "@mui/icons-material/Add";

import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "../firebase";

import { useAuth } from "../AuthContext";
import useKitchenRecipes from "../components/mykitchen/useKitchenRecipes";
import KitchenHeader from "../components/mykitchen/KitchenHeader";
import KitchenTabs from "../components/mykitchen/KitchenTabs";
import KitchenControls from "../components/mykitchen/KitchenControls";
import RecipeGrid from "../components/mykitchen/RecipeGrid";

export default function MyKitchenPage() {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();

  const { myRecipes, savedRecipes, loading } = useKitchenRecipes();

  const [activeTab, setActiveTab] = useState("my");

  const [viewMode, setViewMode] = useState("list");

  const [sortBy, setSortBy] = useState("recent");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [createdRecipesLocal, setCreatedRecipesLocal] = useState([]);
  const [savedRecipesLocal, setSavedRecipesLocal] = useState([]);

  useEffect(() => {
    setCreatedRecipesLocal(myRecipes);
  }, [myRecipes]);

  useEffect(() => {
    setSavedRecipesLocal(savedRecipes);
  }, [savedRecipes]);

  const handleDeleteCreated = async (recipeId) => {
    try {
      // 1) Send DELETE to your backend
      await axios.delete(`/my_kitchen/recipes/${encodeURIComponent(recipeId)}`);
      setCreatedRecipesLocal((prev) => prev.filter((r) => r.id !== recipeId));
    } catch (err) {
      console.error("❌ Failed to delete recipe:", err);
    }
  };

  const handleEditCreated = (recipeId) => {
    navigate(`/edit/${encodeURIComponent(recipeId)}`);
  };

  const handleViewRecipe = (recipeId) => {
    navigate(`/recipe/user/${encodeURIComponent(recipeId)}`);
  };

  const handleRemoveSaved = async (recipeId) => {
    if (!currentUser?.uid) return;

    try {
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        savedRecipes: arrayRemove(recipeId),
      });

      setSavedRecipesLocal((prev) => prev.filter((r) => r.id !== recipeId));
    } catch (err) {
      console.error("❌ Failed to remove saved recipe:", err);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <KitchenHeader />
        <Typography>Loading your recipes…</Typography>
      </Container>
    );
  }

  const displayedRecipes =
    activeTab === "my" ? createdRecipesLocal : savedRecipesLocal;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <KitchenHeader />

      <Box borderBottom={1} borderColor="divider" mb={2}>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          textColor="inherit"
          indicatorColor="error"
        >
          <Tab value="my" label="My Recipes" />
          <Tab value="saved" label="Saved Recipes" />
        </Tabs>
      </Box>

      <KitchenControls
        viewMode={viewMode}
        onViewChange={setViewMode}
        sortBy={sortBy}
        onSortChange={setSortBy}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
      />

      <RecipeGrid
        recipes={displayedRecipes}
        view={viewMode}
        onView={handleViewRecipe}
        onDelete={activeTab === "my" ? handleDeleteCreated : undefined}
        onEdit={activeTab === "my" ? handleEditCreated : undefined}
        onRemove={activeTab === "saved" ? handleRemoveSaved : undefined}
      />
    </Container>
  );
}
