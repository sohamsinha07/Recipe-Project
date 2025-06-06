import { useEffect, useState } from "react";
import RecipeReviewTabs from "../components/admin/RecipeReviewTabs";
import AdminRecipeGrid from "../components/admin/AdminRecipeGrid";
import AdminHeader from "../components/admin/AdminHeader";
import Footer from "../components/homepage/Footer";
import "../styles/admin.css";
import { updateDoc, doc, getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase";
import axios from "axios";

// Helper
function getTimeAgo(createdAt) {
  const created = createdAt?.seconds ? new Date(createdAt.seconds * 1000) : new Date(createdAt);
  const now = new Date();
  const diffMs = now - created;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min${diffMins === 1 ? "" : "s"} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
}

export default function AdminPage() {
  const [recipes, setRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const [view, setView] = useState("grid");
  const [loading, setLoading] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    async function fetchAllRecipes() {
      const snapshot = await getDocs(collection(db, "recipes"));
      setAllRecipes(
        snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }))
      );
    }
    fetchAllRecipes();
  }, [reloadKey]);

  // Compute counts (used in header/tabs)
  const pendingCount = allRecipes.filter((r) => r.status === "pending").length;
  const approvedCount = allRecipes.filter((r) => r.status === "published").length;
  const rejectedCount = allRecipes.filter((r) => r.status === "rejected").length;

  const counts = {
    all: allRecipes.length,
    pending: pendingCount,
    approved: approvedCount,
    rejected: rejectedCount,
  };

  // Fetch recipes
  useEffect(() => {
    async function fetchRecipes() {
      setLoading(true);
      let q;
      if (filter === "all") {
        q = collection(db, "recipes");
      } else if (filter === "approved") {
        q = query(collection(db, "recipes"), where("status", "==", "published"));
      } else if (filter === "rejected") {
        q = query(collection(db, "recipes"), where("status", "==", "rejected"));
      } else {
        q = query(collection(db, "recipes"), where("status", "==", filter));
      }
      const snapshot = await getDocs(q);
      setRecipes(
        snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
          submittedAgo: getTimeAgo(docSnap.data().createdAt),
        }))
      );
      setLoading(false);
    }
    fetchRecipes();
  }, [filter, reloadKey]);

  // Sorting
  const sortedRecipes = [...recipes].sort((a, b) => {
    const aTime = a.createdAt?.seconds
      ? a.createdAt.seconds
      : a.createdAt
      ? new Date(a.createdAt).getTime() / 1000
      : 0;
    const bTime = b.createdAt?.seconds
      ? b.createdAt.seconds
      : b.createdAt
      ? new Date(b.createdAt).getTime() / 1000
      : 0;

    if (sort === "newest") {
      return bTime - aTime;
    } else {
      return aTime - bTime;
    }
  });

  // Approve/Reject
  const rejectRecipe = async (recipe) => {
    if (!recipe?.id) return;
    // Immediately remove from local state so UI looks snappier:
    setRecipes((prev) => prev.map((r) => (r.id === recipe.id ? { ...r, status: "rejected" } : r)));

    try {
      await axios.patch(`/api/admin/recipes/${recipe.id}/reject`);
    } catch (e) {
      console.error("Failed to reject via backend:", e);
    }
    // Refresh both lists
    setReloadKey((k) => k + 1);
  };

  const approveRecipe = async (recipe) => {
    if (!recipe?.id) return;
    setRecipes((prev) => prev.filter((r) => r.id !== recipe.id));

    try {
      await axios.patch(`/api/admin/recipes/${recipe.id}/publish`);
    } catch (e) {
      console.error("Failed to publish via backend:", e);
    }
    setReloadKey((k) => k + 1);
  };

  const resetToPending = async (recipe) => {
    if (!recipe?.id) return;

    // Update in Firestore (no notification logic on the server side)
    await updateDoc(doc(db, "recipes", recipe.id), { status: "pending" });

    // Move the card back into the pending list in the UI
    setReloadKey((k) => k + 1); // simply re-fetches lists
  };

  return (
    <div className="admin-page">
      <AdminHeader pendingCount={pendingCount} approvedCount={approvedCount} />
      <RecipeReviewTabs
        tab={filter}
        setTab={setFilter}
        sort={sort}
        setSort={setSort}
        view={view}
        setView={setView}
        counts={counts}
      />
      <AdminRecipeGrid
        view={view}
        recipes={sortedRecipes}
        onApprove={approveRecipe}
        onReject={rejectRecipe}
        onEdit={resetToPending}
        loading={loading}
      />
      <Footer />
    </div>
  );
}
