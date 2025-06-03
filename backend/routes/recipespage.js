import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
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

router.get("/", async (req, res) => {
  try {
    const selectedTerms = shuffleArray(queryTerms).slice(0, 6); 
    const allResults = [];

    for (const term of selectedTerms) {
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
      const formatted = hits.map((hit) => ({
        title: hit.recipe.label,
        description: hit.recipe.ingredientLines.slice(0, 2).join(", "),
        rating: (Math.random() * 1 + 4).toFixed(1),
        time: hit.recipe.totalTime ? `${hit.recipe.totalTime} min` : "N/A",
      }));

      allResults.push(...formatted);
    }

    const uniqueShuffled = shuffleArray(allResults).slice(0, 20);
    res.json(uniqueShuffled);

  } catch (error) {
    console.error("❌ Edamam API error:", error.message);
    console.error("🔍 Full error:", error.response?.data || error);
    res.status(500).json({ error: "Failed to fetch diverse recipes" });
  }
});

export default router;
