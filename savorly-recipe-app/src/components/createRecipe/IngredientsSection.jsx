import { Paper, Typography, Grid, TextField, IconButton, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function IngredientsSection() {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        boxShadow: 5,
        borderRadius: 2,
        backgroundColor: "white",
      }}
    >
      <Typography fontWeight={600} mb={2}>
        Ingredients *
      </Typography>

      {fields.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Click <strong>Add</strong> to start listing ingredients.
        </Typography>
      )}

      {fields.map((field, i) => (
        <Grid container spacing={1} key={field.id} mb={1}>
          <Grid item xs={3} sm={2}>
            <TextField fullWidth placeholder="2" {...register(`ingredients.${i}.qty`)} />
          </Grid>
          <Grid item xs={3} sm={2}>
            <TextField fullWidth placeholder="cups" {...register(`ingredients.${i}.unit`)} />
          </Grid>
          <Grid item xs={5} sm={7}>
            <TextField
              fullWidth
              placeholder="quinoa, rinsed"
              {...register(`ingredients.${i}.item`)}
            />
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={() => remove(i)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      ))}

      <Button
        startIcon={<AddIcon />}
        size="small"
        onClick={() => append({ qty: "", unit: "", item: "" })}
      >
        Add
      </Button>
    </Paper>
  );
}
