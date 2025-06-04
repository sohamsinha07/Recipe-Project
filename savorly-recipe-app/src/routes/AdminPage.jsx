import React, { useEffect, useState, useCallback } from "react";
import RecipeReviewTabs from "../components/admin/RecipeReviewTabs";
import AdminRecipeGrid from "../components/admin/AdminRecipeGrid";
import AdminHeader from "../components/admin/AdminHeader";
import axios from "axios";
import Footer from "../components/homepage/Footer";
import "../styles/admin.css";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase";

// const sampleRecipes = [
//   {
//     title: "Mediterranean Quinoa Bowl",
//     description: "Healthy and delicious bowl with fresh vegetables",
//     rating: 4.8,
//     time: "25 min",
//     author: "Sarah Kim",
//     submittedAgo: 1
//   },
//   {
//     title: "Spicy Thai Curry",
//     description: "Aromatic curry with coconut milk and vegetables",
//     rating: 4.6,
//     time: "35 min",
//     author: "Mike Chen",
//     submittedAgo: 3
//   },
//   {
//     title: "Classic Chocolate Cake",
//     description: "Rich and moist chocolate cake with ganache",
//     rating: 4.9,
//     time: "60 min",
//     author: "Emma Wilson",
//     submittedAgo: 8
//   },
//   {
//     title: "Fresh Garden Salad",
//     description: "Crisp vegetables with homemade vinaigrette",
//     rating: 4.4,
//     time: "30 min",
//     author: "Mary Waters",
//     submittedAgo: 5
//   },
// ];

// Helper function
function getTimeAgo(createdAt) {
  // If using Firebase Timestamp, convert to JS Date
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
  const [filter, setFilter] = useState("all"); // all, pending, approved
  const [sort, setSort] = useState("newest");
  const [view, setView] = useState("grid");
  const [loading, setLoading] = useState(false);
  

  const fetchRecipes = useCallback(async () => {
    setLoading(true);
    let q;
    if (filter === "all") {
      q = query(collection(db, "recipes"));
    } else {
      q = query(collection(db, "recipes"), where("status", "==", filter));
    }
    const snapshot = await getDocs(q);
    setRecipes(
      snapshot.docs.map(docSnap => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          submittedAgo: getTimeAgo(data.createdAt),
        };
      })
    );
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  // Approve recipe
const approveRecipe = async (recipeId) => {
  await updateDoc(doc(db, "recipes", recipeId), { status: "approved" });
  fetchRecipes(); // Refresh after approve
};

// Reject recipe
const rejectRecipe = async (recipeId) => {
  await updateDoc(doc(db, "recipes", recipeId), { status: "rejected" });
  fetchRecipes(); // Refresh after reject
};

const sortedRecipes = [...recipes].sort((a, b) =>
    sort === "newest" ? a.submittedAgo - b.submittedAgo : b.submittedAgo - a.submittedAgo
  );

  // useEffect(() => {
  //   axios.get("/api/admin/recipes?filter=" + filter)
  //     .then(res => {
  //       setRecipes(res.data && res.data.length > 0 ? res.data : sampleRecipes);
  //     })
  //     .catch(() => setRecipes(sampleRecipes)); // fallback to demo data on error
  // }, [filter]);
  
  const handleEdit = (recipe) => {
    // navigate to edit page, open modal, etc
  };
  
  return (
    <div className="admin-page">
         <div>
         <AdminHeader pendingCount={12} approvedCount={8} />
        
         <RecipeReviewTabs
        tab={filter}
        setTab={setFilter}
        sort={sort}
        setSort={setSort}
        view={view}
        setView={setView}
      />
      
      <AdminRecipeGrid  view={view}
      recipes={sortedRecipes}
  onApprove={approveRecipe}
  onReject={rejectRecipe}
  onEdit={handleEdit}
  loading={loading}
  
/>
      <Footer />
      </div>
    </div>
  );
}
