import express from "express";
import dotenv from "dotenv";
const router = express.Router();
dotenv.config();

const apiKey = process.env.VITE_EDAMAM_API_KEY
const appId = process.env.VITE_EDAMAM_APP_ID

router.get('/', async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Missing recipe id' });
  }

  try {
    const decodedId = decodeURIComponent(id);
    const url = `https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=${decodedId}&app_id=${appId}&app_key=${apiKey}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Edamam API error: ${response.statusText}`);
    }

    const data = await response.json();

    const recipe = data.hits?.[0]?.recipe || data.recipe || null;

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found from Edamam' });
    }

    res.json({ recipe });
  } catch (err) {
    console.error('Error fetching recipe from Edamam:', err.message);
    res.status(500).json({ error: 'Failed to fetch recipe from Edamam' });
  }
});

export default router;

