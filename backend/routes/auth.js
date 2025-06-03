import express from "express";
import admin from "firebase-admin";
import db from "../firebase.js";

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

// format createdAt as "MM/DD/YYYY"
function formattedDateString() {
  const now = new Date();
  // month/day/year
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const yyyy = now.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

router.post("/register", async (req, res) => {
  const { email, password, firstName, lastName, username, dateOfBirth } = req.body;

  // Simple server-side validation
  if (!email || !password || !firstName || !lastName || !username || !dateOfBirth) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    // Create a new user in Firebase Auth
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: `${firstName} ${lastName}`,
    });

    const uid = userRecord.uid;

    // Build the Firestore document data
    const userDocData = {
      firstName,
      lastName,
      username,
      email,
      dateOfBirth,
      createdAt: formattedDateString(), // MM/DD/YYYY
      savedRecipes: [], // empty array
      publishedRecipes: [], // empty array
      draftRecipes: [], // empty array
      isAdmin: false,
      pageVisits: 0,
    };

    // Write to Firestore under "users/{uid}""
    await db.collection("users").doc(uid).set(userDocData);

    return res.status(201).json({ uid, message: "User created successfully." });
  } catch (error) {
    console.error("Error creating user:", error);

    if (error.code && error.code.startsWith("auth/")) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal server error." });
  }
});

router.get("/check-email", async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ message: "Missing email parameter." });
  }

  try {
    // If the user exists, admin.auth().getUserByEmail will succeed
    await admin.auth().getUserByEmail(email);
    // Found a matching Auth user
    return res.json({ exists: true });
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      // No user with that email
      return res.json({ exists: false });
    }
    console.error("Error checking email:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

router.get("/check-username", async (req, res) => {
  const { username } = req.query;
  if (!username) {
    return res.status(400).json({ message: "Missing username parameter." });
  }

  try {
    const snapshot = await db.collection("users").where("username", "==", username).limit(1).get();

    if (snapshot.empty) {
      // No document with that username
      return res.json({ exists: false });
    } else {
      // Found at least one document with the same username
      return res.json({ exists: true });
    }
  } catch (error) {
    console.error("Error checking username:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

export default router;
