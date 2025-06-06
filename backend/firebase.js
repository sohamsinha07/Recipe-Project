import dotenv from "dotenv";
import admin  from "firebase-admin";
import serviceAccount from "./permissions.json" with { type: "json" };

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

export default admin;