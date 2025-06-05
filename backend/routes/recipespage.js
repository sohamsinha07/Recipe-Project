import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { getFirestore, collection, doc, updateDoc, getDocs, query, where } from "firebase/firestore";
import { initializeApp } from "firebase/app";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const router = express.Router();

const EDAMAM_BASE_URL = "https://api.edamam.com/api/recipes/v2";

const queryTerms = [
  "chicken", "pasta", "salad", "curry", "fish", "soup",
  "tofu", "beef", "eggs", "shrimp", "cheese", "lentils",
  "stew", "sandwich", "broccoli", "mushroom", "bacon",
  "quinoa", "wrap", "cauliflower"
];

function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

router.patch("/firestore/:id/favorite", async (req, res) => {
  const recipeId = req.params.id;
  const { favorited } = req.body;

  if (typeof favorited !== "boolean") {
    return res.status(400).json({ error: "'favorited' must be a boolean" });
  }

  try {
    const docRef = doc(db, "recipes", recipeId);
    await updateDoc(docRef, { favorited });
    res.json({ favorited });
  } catch (err) {
    console.error("❌ Failed to update favorite:", err);
    res.status(500).json({ error: "Failed to update favorite" });
  }
});


router.get("/edamam", async (req, res) => {
  try {
    const searchQuery = req.query.search || "";
    const allResults = [];

    const termsToSearch = searchQuery
      ? [searchQuery] // only one search term
      : shuffleArray(queryTerms).slice(0, 6); // fallback to random

    for (const term of termsToSearch) {
      const response = await axios.get(EDAMAM_BASE_URL, {
        params: {
          type: "public",
          q: term,
          app_id: process.env.VITE_EDAMAM_APP_ID,
          app_key: process.env.VITE_EDAMAM_API_KEY,
          to: 4,
        },
        headers: {
          "Edamam-Account-User": "imjel",
        },
      });

      const hits = response.data.hits || [];
	  console.log(hits);
      const formatted = hits.map((hit) => ({
		uri: hit.recipe.uri,
        title: hit.recipe.label,
        description: hit.recipe.ingredientLines.slice(0, 2).join(", "),
        rating: (Math.random() * 1 + 4).toFixed(1),
        time: hit.recipe.totalTime ? `${hit.recipe.totalTime} min` : "N/A",
      }));

      allResults.push(...formatted);
    }

    const finalResults = searchQuery
      ? allResults // if searched, return all
      : shuffleArray(allResults).slice(0, 20); // else limit

    res.json(finalResults);

  } catch (error) {
    console.error("Edamam API error:", error.message);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

router.get("/firestore", async (req, res) => {
  try {
    const searchTerm = req.query.search?.toLowerCase() || "";
    const recipeRef = collection(db, "recipes");
    const snapshot = await getDocs(recipeRef);

    const recipes = snapshot.docs
      .map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          description: data.instructions?.[0] || "No description provided.",
          rating: data.averageRating || 0,
          time: `${data.totalTime || "?"} min`,
          image: data.image || "",
          favorited: data.favorited || false,
        };
      })
      .filter(recipe =>
        !searchTerm || recipe.title.toLowerCase().includes(searchTerm)
      );

    res.json(recipes);
  } catch (error) {
    console.error("Firestore fetch error:", error.message);
    res.status(500).json({ error: "Failed to fetch user recipes" });
  }
});


export default router;
