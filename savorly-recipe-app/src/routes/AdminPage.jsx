import React, { useEffect, useState, useCallback } from "react";
import RecipeReviewTabs from "../components/admin/RecipeReviewTabs";
import AdminRecipeGrid from "../components/admin/AdminRecipeGrid";
import AdminHeader from "../components/admin/AdminHeader";
import Footer from "../components/homepage/Footer";
import "../styles/admin.css";
import { updateDoc, doc, getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase";

// Helper
function getTimeAgo(createdAt) {
  const created = createdAt?.seconds
    ? new Date(createdAt.seconds * 1000)
    : new Date(createdAt);
  const now = new Date();
  const diffMs = now - created;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min${diffMins === 1 ? "" : "s"} ago`;
  return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
}

export default function AdminPage() {
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const [view, setView] = useState("grid");
  const [loading, setLoading] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  // Compute counts (used in header/tabs)
  const pendingCount = recipes.filter(r => r.status === "pending").length;
  const approvedCount = recipes.filter(r => r.status === "approved" || r.status === "published").length;

  // Fetch recipes
  useEffect(() => {
    async function fetchRecipes() {
      setLoading(true);
      let q;
      if (filter === "all") {
        q = collection(db, "recipes");
      } else {
        q = query(collection(db, "recipes"), where("status", "==", filter));
      }
      const snapshot = await getDocs(q);
      setRecipes(snapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data(),
        submittedAgo: getTimeAgo(docSnap.data().createdAt),
      })));
      setLoading(false);
    }
    fetchRecipes();
  }, [filter, reloadKey]);

  // Sorting
  const sortedRecipes = [...recipes].sort((a, b) => {
    const aTime = a.createdAt?.seconds
      ? a.createdAt.seconds
      : (a.createdAt ? new Date(a.createdAt).getTime() / 1000 : 0);
    const bTime = b.createdAt?.seconds
      ? b.createdAt.seconds
      : (b.createdAt ? new Date(b.createdAt).getTime() / 1000 : 0);

    if (sort === "newest") {
      return bTime - aTime;
    } else {
      return aTime - bTime;
    }
  });

  // Approve/Reject
  const rejectRecipe = async (recipe) => {
    if (!recipe?.id) return;
    setRecipes(prev => prev.filter(r => r.id !== recipe.id));
    await updateDoc(doc(db, "recipes", recipe.id), { status: "rejected" });
    setReloadKey(k => k + 1);
  };
  
  const approveRecipe = async (recipe) => {
    if (!recipe?.id) return;
    setRecipes(prev => prev.filter(r => r.id !== recipe.id));
    await updateDoc(doc(db, "recipes", recipe.id), { status: "published" });
    setReloadKey(k => k + 1);
  };
  

  // For RecipeReviewTabs
  const counts = {
    all: recipes.length,
    pending: pendingCount,
    approved: approvedCount,
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
        loading={loading}
      />
      <Footer />
    </div>
  );
}
