import dotenv from "dotenv";
import admin  from "firebase-admin";
import serviceAccount from "./permissions.json" with { type: "json" };

dotenv.config();

const projectId     = process.env.FIREBASE_PROJECT_ID;
const storageBucket = process.env.FIREBASE_STORAGE_BUCKET
  || `${projectId}.appspot.com`;

console.log("⚙︎ Storage bucket:", storageBucket);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket,
});

export const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

export default admin;