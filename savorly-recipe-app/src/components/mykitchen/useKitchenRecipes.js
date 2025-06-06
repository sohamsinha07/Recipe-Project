import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../AuthContext";

export default function useKitchenRecipes() {
  const { user } = useAuth();
  const [myRecipes, setMyRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !user.uid) {
      setMyRecipes([]);
      setSavedRecipes([]);
      setLoading(false);
      return;
    }

    async function fetchRecipes() {
      setLoading(true);

      try {
        const recipesRef = collection(db, "recipes");
        const q = query(recipesRef, where("authorUid", "==", user.uid));
        const mySnap = await getDocs(q);
        const myList = mySnap.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));

        const userDocRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDocRef);

        let savedList = [];
        if (userSnap.exists()) {
          const userData = userSnap.data();
          const savedIDs = Array.isArray(userData.savedRecipes)
            ? userData.savedRecipes
            : [];

          if (savedIDs.length > 0) {
            const fetched = await Promise.all(
              savedIDs.map(async (rid) => {
                try {
                  const rDoc = await getDoc(doc(db, "recipes", rid));
                  if (rDoc.exists()) {
                    return { id: rDoc.id, ...rDoc.data() };
                  } else {
                    return null;
                  }
                } catch (e) {
                  console.warn("Could not fetch saved recipe ID:", rid, e);
                  return null;
                }
              })
            );
            savedList = fetched.filter((r) => r !== null);
          }
        }

        setMyRecipes(myList);
        setSavedRecipes(savedList);
      } catch (err) {
        console.error("Error fetching kitchen recipes:", err);
        setMyRecipes([]);
        setSavedRecipes([]);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, [user]);

  return { myRecipes, savedRecipes, loading };
}