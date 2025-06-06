import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Stack,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";            // <-- import filled heart
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function RecipeCard({
  data,
  view,
  onView,
  onDelete,
  onEdit,
  onRemove,
}) {
  const isList = view === "list";
  const gradientBackground = data.gradient || "linear-gradient(to right, #ddd, #eee)";

  return (
    <Card
      sx={{
        display: isList ? "flex" : "block",
        height: isList ? 200 : "auto",
        boxShadow: 1,
        cursor: "pointer",
        borderRadius: 2,
      }}
      onClick={() => onView(data.id)}
    >
      {/* IMAGE / HEADER AREA */}
      <CardMedia
        sx={{
          width: isList ? 240 : "100%",
          height: isList ? "100%" : 140,
          background: gradientBackground,
          position: "relative",
        }}
      >
        <Chip
          label={data.status || "Draft"}
          size="small"
          color={data.status === "Published" ? "success" : "default"}
          sx={{ position: "absolute", top: 12, left: 12 }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "text.disabled",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          Recipe Image
        </Box>
      </CardMedia>

      {/* CONTENT AREA */}
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          pb: "16px !important",
        }}
      >
        {/* TITLE */}
        <Typography
          variant="subtitle1"
          fontWeight={600}
          sx={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {data.title}
        </Typography>

        {/* DESCRIPTION (clamped to 3 lines in grid) */}
        {data.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={
              view === "grid"
                ? {
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }
                : {}
            }
          >
            {data.description}
          </Typography>
        )}

        <Box sx={{ flexGrow: 1 }} />

        {/* FOOTER ICONS */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ mt: 1 }}
        >
          {/* Left: views + likes */}
          <Stack >
          </Stack>

          {/* Right: action buttons */}
          <Stack direction="row" spacing={1}>
            {onRemove && (
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(data.id);
                }}
              >
                {/* Show a filled heart (red) in saved‐tab mode */}
                <FavoriteIcon sx={{ color: "error.main" }} fontSize="small" />
              </IconButton>
            )}
            {onEdit && (
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(data.id);
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            )}
            {onDelete && (
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(data.id);
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
