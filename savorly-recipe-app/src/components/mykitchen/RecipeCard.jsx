import React from "react";
import {
  Badge,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Stack,
  IconButton,
} from "@mui/material";
import StatusBadge from "./StatusBadge";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function RecipeCard({ data, view, onView, onDelete, onEdit, onRemove }) {
  const isList = view === "list";
  const gradientBackground = data.gradient || "linear-gradient(to right, #ddd, #eee)";

  return (
    <Card
      onClick={() => onView && onView(data.id)}
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: isList ? "row" : "column",
        height: isList ? 200 : "100%",
        width: isList ? "100%" : 300,
        maxWidth: "100%",
        boxShadow: 1,
        cursor: "pointer",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      {/* ─────── IMAGE / HEADER AREA ─────── */}
      <CardMedia
        sx={{
          width: isList ? 240 : "100%",
          height: isList ? "100%" : 140,
          position: "relative",
          backgroundColor: "#f0f0f0",
          flexShrink: 0,
        }}
      >
        {data.image ? (
          <Box
            component="img"
            src={data.image}
            alt={data.title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
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
          </Box>
        )}
      </CardMedia>

      {/* ─────── CONTENT AREA ─────── */}
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          p: 2,
          overflow: "hidden",
        }}
      >
        {/* TITLE */}
        <Typography
          variant="subtitle1"
          fontWeight={600}
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            ...(view === "grid"
              ? {
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  lineHeight: 1.3,
                }
              : {
                  whiteSpace: "nowrap",
                }),
          }}
        >
          {data.title}
        </Typography>

        {/* DESCRIPTION */}
        {data.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: "hidden",
              ...(view === "grid"
                ? {
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    lineHeight: 1.4,
                  }
                : {}),
            }}
          >
            {data.description}
          </Typography>
        )}

        {isList && <Box sx={{ flexGrow: 1 }} />}

        {/* FOOTER ICONS (views + edit/delete) */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ mt: "auto", pb: 0.5 }}
        >
          {/* STATUS BADGE – shows Pending / Approved / Rejected */}
          {data.status ? <StatusBadge status={data.status} /> : <Box />}

          {/* Left: views icon + count */}
          <Stack direction="row" spacing={0.5} alignItems="center"></Stack>

          {/* Right: edit + delete */}
          <Stack direction="row" spacing={1}>
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

      {onRemove && (
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onRemove(data.id);
          }}
          sx={{
            position: "absolute",
            bottom: 8,
            right: 8,
            bgcolor: "rgba(255,255,255,0.8)",
            "&:hover": { bgcolor: "rgba(255,255,255,1)" },
          }}
          size="small"
        >
          <FavoriteIcon sx={{ color: "error.main" }} fontSize="small" />
        </IconButton>
      )}
    </Card>
  );
}
