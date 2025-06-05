import express from "express";
import admin, { db } from "../firebase.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    // Destructure exactly what we expect in JSON:
    const {
      title,
      description,
      totalTime,
      calories,
      mealType,
      servings,
      ingredients,
      instructions,
      image, // THIS is the Base64 string from the form
      author,
      createdBy,
      source,
      status,
      url,
    } = req.body;

    // Convert JSON‐wrapped arrays back into JS arrays:
    const recipeDoc = {
      title,
      description,
      totalTime: Number(totalTime),
      calories: calories ? Number(calories) : null,
      mealType,
      servings: Number(servings),
      ingredients: JSON.parse(ingredients),
      instructions: JSON.parse(instructions),
      image,
      author,
      createdBy,
      source, // “user”
      status, // “pending”
      url,

      // Firestore‐generated fields
      createdAt: new Date(),
      averageRating: 0,
      favorited: false,
      ratings: [],
    };

    // Write the recipe to Firestore
    const newRecipeRef = await db.collection("recipes").add(recipeDoc);
    const newRecipeId = newRecipeRef.id;

    // Push that ID into users/{createdBy}.draftRecipes
    if (createdBy) {
      const userDocRef = admin.firestore().doc(`users/${createdBy}`);
      await userDocRef.update({
        draftRecipes: admin.firestore.FieldValue.arrayUnion(newRecipeId),
      });
    }

    return res.json({ ok: true, id: newRecipeId });
  } catch (err) {
    console.error("✖︎ create_recipe error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
