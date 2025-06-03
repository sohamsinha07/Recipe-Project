import React, { useEffect, useState } from "react";
import RecipeReviewTabs from "../components/admin/RecipeReviewTabs";
import AdminRecipeGrid from "../components/admin/AdminRecipeGrid";
import AdminHeader from "../components/admin/AdminHeader";
import axios from "axios";
import Footer from "../components/homepage/Footer";


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
      <AdminHeader /* pass counts as props if you want */ />
      
      <RecipeReviewTabs filter={filter} setFilter={setFilter} />
      <div className="controls-bar">
        {/* Sorting and view toggle (list/grid) */}
        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
      <AdminRecipeGrid
  recipes={recipes}
  onApprove={handleApprove}
  onReject={handleReject}
  onEdit={handleEdit}
/>
      <Footer />
      </div>
    </div>
  );
}
