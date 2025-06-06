import express from "express";
const router = express.Router();
import { getFirestore, FieldValue, Timestamp } from "firebase-admin/firestore";
const db = getFirestore();

async function getRecipeMeta(recipeId) {
  const recipeRef = db.collection("recipes").doc(recipeId);
  const snap = await recipeRef.get();
  if (!snap.exists) throw new Error("Recipe not found");
  const data = snap.data();
  return { createdBy: data.createdBy, title: data.title };
}

// GET /api/admin/recipes
router.get("/recipes", async (req, res) => {
  try {
    const snapshot = await db.collection("recipes").where("status", "==", "pending").get();
    const recipes = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(recipes);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PATCH /api/admin/recipes/:id/publish
router.patch("/recipes/:id/publish", async (req, res) => {
  const recipeId = req.params.id;
  try {
    // Fetch metadata (createdBy + title)
    const { createdBy, title } = await getRecipeMeta(recipeId);

    // Update the recipe’s status to "published"
    await db.collection("recipes").doc(recipeId).update({
      status: "published",
    });

    // If createdBy exists, push a notification
    if (createdBy) {
      const notifRef = db.collection("users").doc(createdBy).collection("notifications");
      await notifRef.add({
        message: `Your recipe for “${title}” was approved.`,
        createdAt: Timestamp.now(),
        read: false,
      });
    }

    return res.json({ success: true });
  } catch (e) {
    console.error("Error in /recipes/:id/publish:", e);
    return res.status(500).json({ error: e.message });
  }
});

router.patch("/recipes/:id/reject", async (req, res) => {
  const recipeId = req.params.id;
  try {
    // Fetch metadata (createdBy + title)
    const { createdBy, title } = await getRecipeMeta(recipeId);

    // Update the recipe’s status to "rejected"
    await db.collection("recipes").doc(recipeId).update({
      status: "rejected",
    });

    // If createdBy exists, push a notification
    if (createdBy) {
      const notifRef = db.collection("users").doc(createdBy).collection("notifications");
      await notifRef.add({
        message: `Your recipe for “${title}” was rejected.`,
        createdAt: Timestamp.now(),
        read: false,
      });
    }

    return res.json({ success: true });
  } catch (e) {
    console.error("Error in /recipes/:id/reject:", e);
    return res.status(500).json({ error: e.message });
  }
});

export default router;
