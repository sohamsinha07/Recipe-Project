import express from "express";
import admin from "firebase-admin";

const router = express.Router();
const FIREBASE_API_KEY = process.env.VITE_FIREBASE_API_KEY;

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    // Call Firebase Auth REST endpoint via fetch
    const firebaseResponse = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    const data = await firebaseResponse.json();

    if (!firebaseResponse.ok) {
      // Firebase returned an error status
      const fbError = data.error?.message || "UNKNOWN_ERROR";

      let message = fbError;
      if (fbError === "INVALID_LOGIN_CREDENTIALS") message = "Incorrect email or password.";

      return res.status(401).json({ error: message });
    }

    // On success, data contains idToken and localId (UID)
    const { idToken, localId: uid } = data;
    return res.status(200).json({ idToken, uid });
  } catch (err) {
    console.error("Error calling Firebase Auth:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
