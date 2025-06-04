import React, { useEffect, useState } from "react";
import RecipeReviewTabs from "../components/admin/RecipeReviewTabs";
import AdminRecipeGrid from "../components/admin/AdminRecipeGrid";
import AdminHeader from "../components/admin/AdminHeader";
import axios from "axios";
import Footer from "../components/homepage/Footer";
import "../styles/admin.css";

const sampleRecipes = [
  {
    title: "Mediterranean Quinoa Bowl",
    description: "Healthy and delicious bowl with fresh vegetables blah blah blah blah blah blah blah blah blah blah blah blah blah",
    rating: 4.8,
    time: "25 min",
    author: "Sarah Kim",
    submittedAgo: 1
  },
  {
    title: "Spicy Thai Curry",
    description: "Aromatic curry with coconut milk and vegetables",
    rating: 4.6,
    time: "35 min",
    submittedAgo: 3
  },
  {
    title: "Classic Chocolate Cake",
    description: "Rich and moist chocolate cake with ganache",
    rating: 4.9,
    time: "60 min",
    submittedAgo: 8
  },
  {
    title: "Fresh Garden Salad",
    description: "Crisp vegetables with homemade vinaigrette",
    rating: 4.4,
    submittedAgo: 5
  },
];


export default function AdminPage() {
  const [recipes, setRecipes] = useState(sampleRecipes);
  const [filter, setFilter] = useState("all"); // all, pending, approved
  const [sort, setSort] = useState("newest");
  const [view, setView] = useState("grid");
  

  const sortedRecipes = [...recipes].sort((a, b) => {
    if (sort === "newest") {
      return a.submittedAgo - b.submittedAgo; // less hours = newer
    } else {
      return b.submittedAgo - a.submittedAgo;
    }
  });

  // useEffect(() => {
  //   axios.get("/api/admin/recipes?filter=" + filter)
  //     .then(res => {
  //       setRecipes(res.data && res.data.length > 0 ? res.data : sampleRecipes);
  //     })
  //     .catch(() => setRecipes(sampleRecipes)); // fallback to demo data on error
  // }, [filter]);
  

  // Handler stubs:
  const handleApprove = (recipe) => {
    // call your approve API, then refresh recipes
  };
  const handleReject = (recipe) => {
    // call your reject API, then refresh recipes
  };
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
  onApprove={handleApprove}
  onReject={handleReject}
  onEdit={handleEdit}
  
/>
      <Footer />
      </div>
    </div>
  );
}
