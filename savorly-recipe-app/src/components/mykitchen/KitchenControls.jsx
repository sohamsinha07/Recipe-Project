import React from "react";
import { Stack, FormControl, Select, MenuItem, IconButton } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";

export default function KitchenControls({ viewMode, onViewChange, sortBy, onSortChange, categoryFilter, onCategoryChange }) {
  return (
    <Stack
      mt={3}
      mb={4}
      direction={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      alignItems={{ xs: "flex-start", sm: "center" }}
      spacing={2}
    >
      {/* Left: Sort By + Category Filter */}
      <Stack direction="row" spacing={2}>
        <FormControl size="small">
          <Select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
            <MenuItem value="recent">Recently Created</MenuItem>
            <MenuItem value="views">Most Viewed</MenuItem>
            <MenuItem value="likes">Most Liked</MenuItem>
          </Select>
        </FormControl>
        
      </Stack>

      {/* Right: Grid/List toggle */}
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
