import React, { useEffect, useState } from "react";
import RecipeReviewTabs from "../components/admin/RecipeReviewTabs";
import AdminRecipeGrid from "../components/admin/AdminRecipeGrid";
import AdminHeader from "../components/admin/AdminHeader";
import axios from "axios";
import Footer from "../components/homepage/Footer";
import "../styles/admin.css";



export default function AdminPage() {
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState("all"); // all, pending, approved
  const [sort, setSort] = useState("newest");


  useEffect(() => {
    axios.get("/api/admin/recipes?filter=" + filter).then(res => {
      setRecipes(res.data);
    });
  }, [filter]);

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
         <AdminHeader  />
      
      <RecipeReviewTabs filter={filter} setFilter={setFilter} />
      
      <AdminRecipeGrid
  onApprove={handleApprove}
  onReject={handleReject}
  onEdit={handleEdit}
/>
      <Footer />
      </div>
    </div>
  );
}
