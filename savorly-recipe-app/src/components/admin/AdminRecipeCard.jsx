import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Stack,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";


// Status color map
const statusMap = {
  pending: {
    label: "Pending Review",
    color: "error",
    bg: "#FFF5F5",
    text: "#C53030"
  },
  approved: {
    label: "Approved",
    color: "success",
    bg: "#F0FFF4",
    text: "#38A169"
  }
};

export default function AdminRecipeCard({ recipe, onApprove, onReject, onEdit }) {
    return (
      <div className="popular-card" style={{ width: 300, margin: "0 8px" }}>
        {/* Badge */}
        {recipe.status === "pending" && (
          <span className="popular-badge" style={{ background: "#ff5f55" }}>
            Pending Review
          </span>
        )}
        {recipe.status === "approved" && (
          <span className="popular-badge popular-badge-new">Approved</span>
        )}
        {/* Image or Gradient */}
        <div
          className="popular-card-media"
          style={{
            background: recipe.imageUrl
              ? `url(${recipe.imageUrl}) center center/cover no-repeat`
              : "linear-gradient(135deg, #ff8474, #ff5b5b)",
          }}
        >
          {!recipe.imageUrl && "Recipe Image"}
        </div>
        {/* Card Body */}
        <div style={{ padding: "18px 16px", flex: 1 }}>
          <div className="popular-card-title" style={{ marginBottom: 8 }}>
            {recipe.title}
          </div>
          <div className="popular-card-desc" style={{ marginBottom: 8 }}>
            {recipe.description}
          </div>
          <div className="popular-meta">
            <div className="popular-meta-item">
              <StarIcon className="popular-star-icon" />
              <span>{recipe.rating}</span>
            </div>
            <div className="popular-meta-item">
              <span>{recipe.time}</span>
            </div>
          </div>
          {/* Admin Actions */}
          <Stack direction="row" spacing={1} mt={2} justifyContent="flex-end">
            {recipe.status === "pending" && (
              <>
                <Button variant="outlined" color="error" size="small" onClick={() => onReject(recipe)}>
                  Reject
                </Button>
                <Button variant="contained" color="success" size="small" onClick={() => onApprove(recipe)}>
                  Approve & Publish
                </Button>
              </>
            )}
            {recipe.status === "approved" && (
              <>
                <Button variant="outlined" color="primary" size="small" onClick={() => onEdit(recipe)}>
                  Edit
                </Button>
                <span style={{ color: "#38a169", marginLeft: 8, fontWeight: 600 }}>Published</span>
              </>
            )}
          </Stack>
        </div>
      </div>
    );
  }