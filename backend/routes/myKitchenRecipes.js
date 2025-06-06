import express from "express";
import { db } from "../firebase.js"; 

const router = express.Router();

router.delete("/:id", async (req, res) => {
  const recipeId = req.params.id;
  if (!recipeId) {
    return res.status(400).json({ error: "Missing recipe ID" });
  }

  try {
    await db.collection("recipes").doc(recipeId).delete();
    return res.json({ success: true });
  } catch (err) {
    console.error("Error deleting recipe (My Kitchen):", err);
    return res.status(500).json({ error: "Failed to delete recipe." });
  }
});

export default router;
