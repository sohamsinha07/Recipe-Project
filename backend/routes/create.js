import express from "express";
import multer  from "multer";
import { v4 as uuid } from "uuid";
import { db }  from "../firebase.js";

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const {
      title,
      description,
      totalTime,
      calories,
      mealType,
      servings,
      ingredients,
      instructions,
      author = "Anonymous",
    } = req.body;

    const doc = {
      title,
      description,
      totalTime: Number(totalTime),
      calories:  calories ? Number(calories) : null,
      mealType,
      servings:  Number(servings),
      ingredients: JSON.parse(ingredients),
      instructions: JSON.parse(instructions),
      author,
      createdAt: new Date(),
      averageRating: 0,
      favorited: false,
      status: "unpublished",
    };

    await db.collection("recipes").add(doc);
    console.log("✔︎ recipe written:", title);
    res.json({ ok: true });
  } catch (err) {
    console.error("✖︎ create_recipe error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;