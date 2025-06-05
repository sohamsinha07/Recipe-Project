import express from "express";
import multer from "multer";
import { v4 as uuid } from "uuid";
import admin, { db } from "../firebase.js";

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
      createdBy = "", // the user’s UID
      source = "user",
      status = "pending",
      url = "",
    } = req.body;

    const recipeDoc = {
      title: title,
      description: description,
      totalTime: Number(totalTime),
      calories: calories ? Number(calories) : null,
      mealType: mealType,
      servings: Number(servings),

      ingredients: JSON.parse(ingredients),
      instructions: JSON.parse(instructions),

      author: author,
      createdBy: createdBy, // the UID string
      source: source, // always "user"
      status: status, // e.g. "pending"
      url: url,

      // System‐generated fields:
      createdAt: new Date(),
      averageRating: 0,
      favorited: false,
      ratings: [],

      // For now, store a placeholder image string.
      image: "",
    };

    const newRecipeRef = await db.collection("recipes").add(recipeDoc);
    const newRecipeId = newRecipeRef.id;

    if (createdBy) {
      const userDocRef = admin.firestore().doc(`users/${createdBy}`);
      await userDocRef.update({
        draftRecipes: admin.firestore.FieldValue.arrayUnion(newRecipeId),
      });
      console.log(`✔︎ Added recipe ID ${newRecipeId} to users/${createdBy}.draftRecipes`);
    }

    console.log("✔︎ recipe written:", title);
    return res.json({ ok: true, id: newRecipeId });
  } catch (err) {
    console.error("✖︎ create_recipe error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
