import express from "express";
import dotenv from "dotenv";

const router = express.Router();
dotenv.config();

const apiKey = process.env.VITE_EDAMAM_API_KEY
const appId = process.env.VITE_EDAMAM_APP_ID

router.get("/recipes", async (req, res) => {

	try {
		const response = await fetch(
			`https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${apiKey}&diet=balanced`,
			{
				headers: {
					"Edamam-Account-User": "imjel",
				},
			}
		);
		const result = await response.json();
		res.json(result);
	} catch (error) {
		console.error("Error fetching Edamam data:", error);
		res.status(500).json({
			error: "Failed to fetch recipes",
			details: error.message
		});
	}
}
);

export default router;