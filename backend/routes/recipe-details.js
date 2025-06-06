import express from "express";
import dotenv from "dotenv";
import { db } from "../firebase.js";
import admin from "firebase-admin";
import axios from "axios";

const router = express.Router();
dotenv.config();

const apiKey = process.env.VITE_EDAMAM_API_KEY;
const appId = process.env.VITE_EDAMAM_APP_ID;

const EDAMAM_BASE_URL = "https://api.edamam.com/api/recipes/v2/";

router.get("/", async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Missing recipe id" });
  }

  try {
    const recipeId = decodeURIComponent(id);
	// console.log(uri);
	// const recipeId = uri.split('recipe_')[1];
	// console.log(recipeId);

    // const url = `https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=${decodedId}&app_id=${appId}&app_key=${apiKey}`;

	const response = await axios.get(EDAMAM_BASE_URL+recipeId, {
        params: {
          type: "public",
		//   id: 'f88956b66fa84afb981eebd5942b62af',
          app_id: process.env.VITE_EDAMAM_APP_ID,
          app_key: process.env.VITE_EDAMAM_API_KEY,
        },
        headers: {
          "Edamam-Account-User": "imjel",
        },
    });
	
	if (!response) {
      return res.status(404).json({ error: "Recipe not found from Edamam" });
    }
	res.json( response.data );

  } catch (err) {
    console.error("Error fetching recipe from Edamam:", err.message);
    res.status(500).json({ error: "Failed to fetch recipe from Edamam" });
  }
});

router.get("/newest", async (req, res) => {
  try {
    // Query Firestore recipes collection, ordered by createdAt descending, limit 4
    const recipesRef = db.collection("recipes");
    const snapshot = await recipesRef
      .where("status", "==", "published")
      .orderBy("createdAt", "desc")
      .limit(4)
      .get();

    const recipes = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        description: data.description,
        image: data.image,
        averageRating: data.averageRating || 0,
        numReviews: Array.isArray(data.ratings) ? data.ratings.length : 0,
        totalTime: data.totalTime,
        mealType: data.mealType,
      };
    });

    res.json({ recipes });
  } catch (err) {
    console.error("Error fetching newest recipes from Firestore:", err);
    res.status(500).json({ error: "Failed to fetch newest recipes" });
  }
});

router.get("/popular", async (req, res) => {
  try {
    const recipesRef = db.collection("recipes");
    // Order by averageRating descending; if same rating, fallback by createdAt desc
    const snapshot = await recipesRef
      .where("status", "==", "published")
      .orderBy("averageRating", "desc")
      .orderBy("createdAt", "desc")
      .limit(4)
      .get();

    const recipes = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        description: data.description,
        image: data.image,
        averageRating: data.averageRating || 0,
        numReviews: Array.isArray(data.ratings) ? data.ratings.length : 0,
        totalTime: data.totalTime,
        mealType: data.mealType,
      };
    });

    res.json({ recipes });
  } catch (err) {
    console.error("Error fetching popular recipes from Firestore:", err);
    res.status(500).json({ error: "Failed to fetch popular recipes" });
  }
});

export default router;
