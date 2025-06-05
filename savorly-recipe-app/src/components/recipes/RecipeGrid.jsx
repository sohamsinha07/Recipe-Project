import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Button
} from "@mui/material";
import RecipeCard from "./RecipeCard";
//import RecipeFilters from "./RecipeFilters";

export default function RecipeGrid() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState("firestore");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log(source);
    async function fetchRecipes() {
      setLoading(true);
      try {
        //const url = `http://localhost:3000/recipes/edamam?search=${encodeURIComponent(searchTerm)}`
        const url =
           source === "edamam"
             ? `http://localhost:3000/recipes/edamam?search=${encodeURIComponent(searchTerm)}`
             : `http://localhost:3000/recipes/firestore?search=${encodeURIComponent(searchTerm)}`;
        const res = await fetch(url);
        const data = await res.json();
        setRecipes(data);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchRecipes();
  }, [source, searchTerm]);

  const handleToggle = (_, newSource) => {
    if (newSource) setSource(newSource);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <ToggleButtonGroup value={source} exclusive onChange={handleToggle}>
          <ToggleButton value="firestore">User Recipes</ToggleButton>
          <ToggleButton value="edamam">Official Recipes</ToggleButton>
        </ToggleButtonGroup>

        <Box display="flex" gap={1}>
          <TextField
            size="small"
            label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#FE5F55", 
                },
              },
              "& label.Mui-focused": {
                color: "#D6D1B1", 
              },
            }}
          />
          <Button
            variant="contained"
            onClick={() => setSearchTerm(searchTerm)}
            sx={{ backgroundColor: "#FE5F55", "&:hover": { backgroundColor: "#e14c44" } }}
          >
            Go
          </Button>
        </Box>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(280px, 1fr))"
          gap={3}
        >
          {recipes.map((recipe, index) => (
            <RecipeCard
            key={index}
            recipe={{
              ...recipe,
              source,
              id: recipe.id || recipe._id || recipe.uri || index,
              title: typeof recipe.title === "string" ? recipe.title : recipe.title?.value || "Untitled",
              description: typeof recipe.description === "string" ? recipe.description : recipe.description?.value || "No description",
              rating: typeof recipe.rating === "number" ? recipe.rating : recipe.rating?.value || 0,
              time: typeof recipe.time === "string" ? recipe.time : recipe.time?.value || "N/A",
            }}
          />

          ))}
        </Box>
      )}
    </Box>
  );
}
