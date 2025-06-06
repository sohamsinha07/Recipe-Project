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

import { useAuth } from "../AuthContext";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "../firebase";

import KitchenHeader from "../components/mykitchen/KitchenHeader";
import KitchenTabs from "../components/mykitchen/KitchenTabs";
import KitchenControls from "../components/mykitchen/KitchenControls";
import RecipeGrid from "../components/mykitchen/RecipeGrid";
import useKitchenRecipes from "../components/mykitchen/useKitchenRecipes";

export default function MyKitchenPage() {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();

  const { myRecipes, savedRecipes, loading } = useKitchenRecipes();

  const [activeTab, setActiveTab] = useState("my");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("recent");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const handleDeleteCreated = async (recipeId) => {
    try {
      await axios.delete(`/recipes/${encodeURIComponent(recipeId)}`);
      console.log("Deleted recipe:", recipeId, ". Please reload or re-fetch.");
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
    if (!currentUser || !currentUser.uid) return;
    try {
      const userRef = doc(db, "users", currentUser.uid);

      await updateDoc(userRef, {
        savedRecipes: arrayRemove(recipeId),
      });

      setLocalSaved(prev => prev.filter((r) => r.id !== recipeId));
    } catch (err) {
      console.error("❌ Failed to remove saved recipe:", err);
    }
  };

  const [localSaved, setLocalSaved] = useState([]);
  useEffect(() => {
    setLocalSaved(savedRecipes || []);
  }, [savedRecipes]);


  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <KitchenHeader />
        <Typography>Loading your recipes…</Typography>
      </Container>
    );
  }

  const displayedMyRecipes = myRecipes;
  const displayedSavedRecipes = localSaved;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <KitchenHeader />

      <KitchenTabs value={activeTab} onChange={setActiveTab} />

      <KitchenControls
        viewMode={viewMode}
        onViewChange={setViewMode}
        sortBy={sortBy}
        onSortChange={setSortBy}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
      />

      {activeTab === "my" ? (
        <RecipeGrid
          recipes={displayedMyRecipes}
          view={viewMode}
          onView={handleViewRecipe}
          onDelete={handleDeleteCreated}
          onEdit={handleEditCreated}
        />
      ) : (
        <RecipeGrid
          recipes={displayedSavedRecipes}
          view={viewMode}
          onView={handleViewRecipe}
          onRemove={handleRemoveSaved}
        />
      )}
    </Container>
  );
}
