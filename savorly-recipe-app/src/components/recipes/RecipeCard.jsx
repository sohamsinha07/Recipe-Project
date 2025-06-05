import React, { useState,useEffect } from "react";
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
import { useContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";



export default function RecipeCard({ recipe }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
  const auth = getAuth();
  const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
    console.log(" Firebase user loaded:", firebaseUser);
    setUser(firebaseUser);
  });

  return () => unsubscribe();
}, []);


  const handleFavoriteClick = async (e) => {
    e.preventDefault(); // don't follow <Link>

    if (!user) {
      alert("Please log in to save recipes.");
      return;
    }

    const userId = user.uid;
    try {
      const res = await fetch(`http://localhost:3000/recipes/save/${recipe.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.uid }),
      });

      const data = await res.json();
      if (res.ok) {
        setIsFavorited(data.isSaved);
      } else {
        throw new Error(data.error || "Failed to toggle save");
      }
    } catch (err) {
      console.error("❌ Save error:", err);
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
    <CardContent
      sx={{
        p: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <Box mb={1}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
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
        </Box>

        <Typography
          variant="body2"
          sx={{
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {recipe.description}
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between" mt="auto">
        <Chip label={`⭐ ${recipe.rating > 0 ? recipe.rating : "N/A"}`} size="small" />
        <Chip label={recipe.time} size="small" />
      </Box>
    </CardContent>
  </Card>
</Link>

  );
} 
