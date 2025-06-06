import express from "express";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

const router = express.Router();
const db = getFirestore();

// GET /api/notifications/:uid
router.get("/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const notifRef = db
      .collection("users")
      .doc(uid)
      .collection("notifications")
      .orderBy("createdAt", "desc");
    const snapshot = await notifRef.get();

    const notifications = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        message: data.message,
        createdAt: data.createdAt, // Firestore Timestamp
        read: data.read || false,
      };
    });
    return res.json({ notifications });
  } catch (err) {
    console.error("Error fetching notifications:", err);
    return res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

router.patch("/:uid/:notifId/read", async (req, res) => {
  const { uid, notifId } = req.params;
  try {
    const notifDocRef = db.collection("users").doc(uid).collection("notifications").doc(notifId);

    // Set `read: true`
    await notifDocRef.update({
      read: true,
    });

    return res.json({ success: true });
  } catch (err) {
    console.error("Error marking notification read:", err);
    return res.status(500).json({ error: "Failed to mark notification as read" });
  }
});

router.delete("/:uid/:notifId", async (req, res) => {
  const { uid, notifId } = req.params;
  try {
    // Reference the specific notification document:
    const notifDocRef = db.collection("users").doc(uid).collection("notifications").doc(notifId);

    // Delete it:
    await notifDocRef.delete();
    return res.json({ success: true });
  } catch (err) {
    console.error("Error deleting notification:", err);
    return res.status(500).json({ error: "Failed to delete notification" });
  }
});

export default router;
