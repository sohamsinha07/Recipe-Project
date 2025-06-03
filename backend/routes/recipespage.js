// backend/routes/recipespage.js
const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

router.get("/recipes", async (req, res) => {
  const query = req.query.q || "chicken";
  const { EDAMAM_APP_ID, EDAMAM_APP_KEY } = process.env;

  try {
    const response = await axios.get("https://api.edamam.com/search", {
      params: {
        q: query,
        app_id: EDAMAM_APP_ID,
        app_key: EDAMAM_APP_KEY,
        to: 12,
      },
    });

    const formatted = response.data.hits.map((hit) => ({
      title: hit.recipe.label,
      description: hit.recipe.ingredientLines.slice(0, 2).join(", "),
      rating: (Math.random() * 1 + 4).toFixed(1),
      time: hit.recipe.totalTime ? `${hit.recipe.totalTime} min` : "N/A",
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Failed to fetch from Edamam:", error);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

module.exports = router;
