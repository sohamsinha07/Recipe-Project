import { useState, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import {
  Paper,
  Typography,
  Box,
  Avatar,
  IconButton
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ImageUploader() {
  const { setValue, watch } = useFormContext();
  const currentFile = watch("imageFile");

  const [dragging, setDragging] = useState(false);
  const [previewURL, setPreviewURL] = useState("");

  const handleFiles = useCallback(files => {
    const file = files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (!validTypes.includes(file.type)) {
     alert("Please choose a JPG or PNG image.");
     return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Image size must be ≤ 10 MB");
      return;
    }

    setValue("image", file, { shouldValidate: true });
    setPreviewURL(URL.createObjectURL(file));
  }, [setValue]);

  const handleInputChange = e => handleFiles(e.target.files);

  const handleDrop = e => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = () => {
    setValue("image", null);
    setPreviewURL("");
  };

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Typography fontWeight={600} mb={2}>
        Recipe Image
      </Typography>

      {previewURL ? (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 180,
            borderRadius: 2,
            overflow: "hidden",
            "& img": { width: "100%", height: "100%", objectFit: "cover" },
          }}
        >
          <Avatar
            variant="square"
            src={previewURL}
            alt="recipe preview"
            sx={{ width: "100%", height: "100%" }}
          />
          <IconButton
            size="small"
            onClick={removeImage}
            sx={{
              position: "absolute",
              top: 4,
              right: 4,
              bgcolor: "rgba(255,255,255,0.8)",
              ":hover": { bgcolor: "white" },
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ) : (
        <Box
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => document.getElementById("img-input").click()}
          sx={{
            height: 180,
            border: "2px dashed",
            borderColor: dragging ? "error.main" : "divider",
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
          <Typography>
            Drop your image here or click to browse
          </Typography>
          <Typography variant="caption">
            PNG, JPG up to 10&nbsp;MB
          </Typography>
          <input
            id="img-input"
            type="file"
            accept="image/*"
            hidden
            onChange={handleInputChange}
          />
        </Box>
      )}
    </Paper>
  );
}