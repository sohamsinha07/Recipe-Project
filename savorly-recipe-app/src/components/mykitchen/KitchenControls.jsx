import {Stack, FormControl, Select, MenuItem, IconButton} from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";

export default function KitchenControls({ viewMode, onViewChange }) {
  return (
    <Stack
      mt={3}
      direction={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      alignItems={{ xs: "flex-start", sm: "center" }}
      spacing={2}
    >
      <Stack direction="row" spacing={2}>
        <FormControl size="small">
          <Select defaultValue="recent">
            <MenuItem value="recent">Recently Created</MenuItem>
            <MenuItem value="views">Most Viewed</MenuItem>
            <MenuItem value="likes">Most Liked</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small">
          <Select defaultValue="all">
            <MenuItem value="all">All Categories</MenuItem>
            <MenuItem value="breakfast">Breakfast</MenuItem>
            <MenuItem value="lunch">Lunch</MenuItem>
            <MenuItem value="dinner">Dinner</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Stack direction="row" spacing={1}>
        <IconButton
          onClick={() => onViewChange("grid")}
          color={viewMode === "grid" ? "error" : "default"}
        >
          <GridViewIcon />
        </IconButton>
        <IconButton
          onClick={() => onViewChange("list")}
          color={viewMode === "list" ? "error" : "default"}
        >
          <ViewListIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
}