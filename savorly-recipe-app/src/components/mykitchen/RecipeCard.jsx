import { Card, CardContent, CardMedia, Typography, Box, Chip, Stack, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

export default function RecipeCard({ data, view }) {
  const isList = view === "list";

  return (
    <Card
      sx={{
        display: isList ? "flex" : "block",
        height: isList ? 150 : "auto",
        boxShadow: 1,
      }}
    >
      <CardMedia
        sx={{
          width: isList ? 260 : "100%",
          height: isList ? "100%" : 140,
          background: data.gradient,
          position: "relative",
        }}
      >
        <Chip
          label={data.status}
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

      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          pb: "16px !important",
        }}
      >
        <Typography variant="subtitle1" fontWeight={600}>
          {data.title}
        </Typography>

        {data.description && (
          <Typography variant="body2" color="text.secondary">
            {data.description}
          </Typography>
        )}

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ mt: 1 }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Stack direction="row" spacing={0.5} alignItems="center">
              <VisibilityIcon fontSize="small" />
              <Typography variant="caption">{data.views}</Typography>
            </Stack>

            <Stack direction="row" spacing={0.5} alignItems="center">
              <FavoriteBorderIcon fontSize="small" />
              <Typography variant="caption">{data.likes}</Typography>
            </Stack>
          </Stack>

          <IconButton size="small" sx={{ p: 0.5 }}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
}
