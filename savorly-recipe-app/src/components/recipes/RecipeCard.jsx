{/* import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Chip,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function RecipeCard({ recipe }) {
  return (
    //<Link to >
        <Card
        sx={{
            background: "linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)",
            p: 1,
            borderRadius: 3,
            height: "100%",
        }}
        >
        <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography fontWeight="bold">{recipe.title}</Typography>
            <IconButton size="small">
                <FavoriteBorderIcon />
            </IconButton>
            </Box>
            <Typography variant="body2" mb={2}>
            {recipe.description}
            </Typography>
            <Box display="flex" justifyContent="space-between" fontSize="0.875rem">
            <Chip label={`⭐ ${recipe.rating}`} size="small" />
            <Chip label={recipe.time} size="small" />
            </Box>
        </CardContent>
        </Card>
    //</Link>
  );
}
*/}

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Chip,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  return (
    <Link to={`/recipe/${encodeURIComponent(recipe.title)}`} style={{ textDecoration: "none" }}>
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
        color: "white",  // sets default text color
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
            <IconButton size="small">
              <FavoriteBorderIcon />
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
