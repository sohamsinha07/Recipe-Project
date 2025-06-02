const express = require('express');
const router = express.Router();
const { getFirestore } = require('firebase-admin/firestore');
const db = getFirestore();

// GET /api/admin/recipes
router.get('/recipes', async (req, res) => {
  try {
    const snapshot = await db.collection('recipes').where('status', '==', 'pending').get();
    const recipes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(recipes);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PATCH /api/admin/recipes/:id/publish
router.patch('/recipes/:id/publish', async (req, res) => {
  try {
    await db.collection('recipes').doc(req.params.id).update({ status: 'published' });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
