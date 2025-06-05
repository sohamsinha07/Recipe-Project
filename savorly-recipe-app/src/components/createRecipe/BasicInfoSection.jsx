import { Paper, Typography, TextField, Grid } from "@mui/material";

export default function BasicInfoSection() {
  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Typography fontWeight={600} mb={2}>
        Basic Information
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField fullWidth label="Recipe Title *" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description *"
            multiline
            rows={3}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField fullWidth label="Prep Time *"/>
        </Grid>
        <Grid item xs={4}>
          <TextField fullWidth label="Cook Time *"/>
        </Grid>
        <Grid item xs={4}>
          <TextField fullWidth label="Servings *"/>
        </Grid>
      </Grid>
    </Paper>
  );
}