import {
  Paper,
  Typography,
  Grid,
  TextField,
  IconButton,
  Button
} from "@mui/material";
import AddIcon   from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export default function IngredientsSection() {
  const [rows, setRows] = useState([]);

  const updateRow = (i, field, value) =>
    setRows(rows.map((r, idx) => (idx === i ? { ...r, [field]: value } : r)));

  const addEmptyRow = () =>
    setRows([...rows, { qty: "", unit: "", item: "" }]);

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Typography fontWeight={600} mb={2}>
        Ingredients *
      </Typography>

      {rows.length === 0 && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1 }}
        >
          Click <strong>Add</strong> to start listing ingredients.
        </Typography>
      )}

      {rows.map((row, i) => (
        <Grid container spacing={1} key={i} mb={1}>
          <Grid item xs={3} sm={2}>
            <TextField
              fullWidth
              placeholder="2"
              value={row.qty}
              onChange={e => updateRow(i, "qty", e.target.value)}
            />
          </Grid>
          <Grid item xs={3} sm={2}>
            <TextField
              fullWidth
              placeholder="cups"
              value={row.unit}
              onChange={e => updateRow(i, "unit", e.target.value)}
            />
          </Grid>
          <Grid item xs={5} sm={7}>
            <TextField
              fullWidth
              placeholder="quinoa, rinsed"
              value={row.item}
              onChange={e => updateRow(i, "item", e.target.value)}
            />
          </Grid>
          <Grid item xs={1}>
            <IconButton
              aria-label="remove ingredient"
              onClick={() => setRows(rows.filter((_, idx) => idx !== i))}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      ))}

      <Button
        startIcon={<AddIcon />}
        size="small"
        onClick={addEmptyRow}
      >
        Add
      </Button>
    </Paper>
  );
}