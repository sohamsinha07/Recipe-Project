import { Paper, Typography, Box } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function ImageUploader() {
  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Typography fontWeight={600} mb={2}>
        Recipe Image
      </Typography>

      <Box
        sx={{
          height: 180,
          border: "2px dashed",
          borderColor: "divider",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "text.secondary",
          textAlign: "center",
          cursor: "pointer",
          "&:hover": { borderColor: "error.main" },
        }}
      >
        <CloudUploadIcon color="success" sx={{ fontSize: 40, mb: 1 }} />
        <Typography>Drop your image here or click to browse</Typography>
        <Typography variant="caption">PNG, JPG up to 10 MB</Typography>
        <input type="file" hidden />
      </Box>
    </Paper>
  );
}