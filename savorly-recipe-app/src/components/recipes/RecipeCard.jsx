import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Chip,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  const [isFavorited, setIsFavorited] = useState(recipe.favorited || false);
  //console.log("Rendering recipe:", recipe);

  const handleFavoriteClick = async (e) => {
  e.preventDefault();

  if (recipe.source !== "firestore") return;

  try {
    const res = await fetch(`/recipe-details?id=${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ favorited: !isFavorited }), // send the desired value
    });

    const data = await res.json();

    if (res.ok && typeof data.favorited === "boolean") {
      setIsFavorited(data.favorited);
    } else {
      throw new Error(data.error || "Unexpected response");
    }
  } catch (err) {
    console.error("❌ Failed to toggle favorite:", err);
  }
};


  return (
    <Link
      to={`/recipe/${recipe.source === "firestore" ? "user" : "edamam"}/${encodeURIComponent(recipe.id)}`}
      style={{ textDecoration: "none" }}
    >
        <Card
    sx={{
        background: "linear-gradient(to right, #ff5f6d, #ffc371)",
        height: 200,
        width: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 3,
        p: 2,
        color: "white",  
        overflow: "hidden",
    }}
    >

        <CardContent sx={{ p: 0, height: "100%" }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography
              fontWeight="bold"
              variant="subtitle1"
              sx={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {recipe.title}
            </Typography>
            <IconButton size="small" onClick={handleFavoriteClick}>
              {isFavorited ? (
                <FavoriteIcon sx={{ color: "#ff1744" }} />
              ) : (
                <FavoriteBorderIcon sx={{ color: "white" }} />
              )}
            </IconButton>
          </Box>

          <Typography
            variant="body2"
            sx={{
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              mb: 2,
            }}
          >
            {recipe.description}
          </Typography>

          <Box display="flex" justifyContent="space-between" fontSize="0.875rem">
            <Chip label={`⭐ ${recipe.rating}`} size="small" />
            <Chip label={recipe.time} size="small" />
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
} 
