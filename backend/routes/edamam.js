import express from "express";
import dotenv from "dotenv";

const router = express.Router();
dotenv.config();

const apiKey = process.env.VITE_EDAMAM_API_KEY
const appId = process.env.VITE_EDAMAM_APP_ID

router.get("/recipe-details", async (req, res) => {
  const uri = req.query.id;

  if (!uri) {
    return res.status(400).json({ error: "Missing Edamam recipe URI" });
  }

  try {
    const response = await fetch(
      `https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=${encodeURIComponent(uri)}&app_id=${appId}&app_key=${apiKey}`,
      {
        headers: {
          "Edamam-Account-User": "imjel",
        },
      }
    );

    const result = await response.json();
    res.json(result);
  } catch (error) {
    console.error("❌ Error fetching Edamam recipe:", error);
    res.status(500).json({
      error: "Failed to fetch recipe",
      details: error.message,
    });
  }
});


// getting specific recipe by Edamam URI

{/* router.get("/recipes/:recipeId", async (req,res) => {
	try {
		const { recipeId } = req.params;
		const decodedUri = decodeURIComponent(recipeId);

		const response = await fetch(
			`https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=${encodeURIComponent(decodedUri)}&app_id=${appId}&app_key=${apiKey}`, 
			{
				headers: {
					"Edamam-Account-User": "imjel",
				},
			}
		);

	} catch (error) {
		console.error("Error fetching Edamam data:", error);
		res.status(500).json({
			error: "Failed to fetch recipes",
			details: error.message
		});
	}
}) */}

export default router;