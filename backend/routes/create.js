// backend/routes/create.js
import express from "express";
import multer  from "multer";
import { v4 as uuid } from "uuid";
import { db }  from "../firebase.js";

/* ------------------------------------------------------------------ */
/* We still accept an <input type="file"> so the front-end             */
/* doesn’t have to change.  The file is uploaded to RAM and then      */
/* simply ignored.  No Cloud Storage, no external services.           */
/* ------------------------------------------------------------------ */
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

/* POST /create_recipe ---------------------------------------------- */
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

    /* ---------- build Firestore document ---------- */
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
      // No `image` property – we’re skipping pictures entirely
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