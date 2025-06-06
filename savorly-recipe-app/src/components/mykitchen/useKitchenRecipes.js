import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
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

    async function fetchAllRecipes() {
      setLoading(true);
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDocRef);

        if (!userSnap.exists()) {
          setMyRecipes([]);
          setSavedRecipes([]);
          setLoading(false);
          return;
        }

        const userData = userSnap.data();
        const draftIDs     = Array.isArray(userData.draftRecipes)     ? userData.draftRecipes     : [];
        const publishedIDs = Array.isArray(userData.publishedRecipes) ? userData.publishedRecipes : [];
        const savedIDs     = Array.isArray(userData.savedRecipes)     ? userData.savedRecipes     : [];

        async function fetchByIds(idArray) {
          const arr = await Promise.all(
            idArray.map(async (rid) => {
              try {
                const rSnap = await getDoc(doc(db, "recipes", rid));
                if (rSnap.exists()) {
                  return { id: rSnap.id, ...rSnap.data() };
                }
                return null;
              } catch (e) {
                console.warn("Could not fetch recipe ID:", rid, e);
                return null;
              }
            })
          );
          return arr.filter((r) => r !== null);
        }

        const [draftRecipesList, publishedRecipesList, savedRecipesList] = await Promise.all([
          fetchByIds(draftIDs),
          fetchByIds(publishedIDs),
          fetchByIds(savedIDs),
        ]);

        const combinedMy = [...draftRecipesList, ...publishedRecipesList];

        setMyRecipes(combinedMy);
        setSavedRecipes(savedRecipesList);
      } catch (err) {
        console.error("Error fetching kitchen recipes:", err);
        setMyRecipes([]);
        setSavedRecipes([]);
      } finally {
        setLoading(false);
      }
    }

    fetchAllRecipes();
  }, [user]);

  return { myRecipes, savedRecipes, loading };
}
