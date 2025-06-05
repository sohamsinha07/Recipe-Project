import { Paper, Typography, TextField, MenuItem, ToggleButtonGroup, ToggleButton, Chip, Stack } from "@mui/material";
import { useState } from "react";

export default function CategoriesSection() {
  const [difficulty, setDifficulty] = useState("Easy");
  const [tags, setTags] = useState(["healthy", "vegetarian"]);

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Typography fontWeight={600} mb={2}>
        Categories &amp; Tags
      </Typography>

      <Stack spacing={2}>
        <TextField select label="Category *">
          <MenuItem value="breakfast">Breakfast</MenuItem>
          <MenuItem value="lunch">Lunch</MenuItem>
          <MenuItem value="dinner">Dinner</MenuItem>
        </TextField>

        <TextField select label="Cuisine">
          <MenuItem value="american">American</MenuItem>
          <MenuItem value="italian">Italian</MenuItem>
          <MenuItem value="thai">Thai</MenuItem>
        </TextField>

        <div>
          <Typography variant="body2" mb={1}>
            Difficulty *
          </Typography>
          <ToggleButtonGroup
            size="small"
            exclusive
            value={difficulty}
            onChange={(_, v) => v && setDifficulty(v)}
          >
            <ToggleButton value="Easy">Easy</ToggleButton>
            <ToggleButton value="Medium">Medium</ToggleButton>
            <ToggleButton value="Hard">Hard</ToggleButton>
          </ToggleButtonGroup>
        </div>

        <Stack direction="row" spacing={1} flexWrap="wrap">
          {tags.map(t => (
            <Chip
              key={t}
              label={t}
              onDelete={() => setTags(tags.filter(x => x !== t))}
            />
          ))}
        </Stack>

        <TextField
          label="Add tags..."
          onKeyDown={e => {
            if (e.key === "Enter" && e.target.value.trim()) {
              setTags([...tags, e.target.value.trim()]);
              e.target.value = "";
            }
          }}
        />
      </Stack>
    </Paper>
  );
}