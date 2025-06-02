import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import axios from "axios";

export default function AdminPage() {
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState("all"); // all, pending, approved
  const [sort, setSort] = useState("newest");
  
  useEffect(() => {
    axios.get("/api/admin/recipes?filter=" + filter).then(res => {
      setRecipes(res.data);
    });
  }, [filter]);
  
  return (
    <div className="admin-page">
      <AdminHeader />
      <RecipeReviewTabs filter={filter} setFilter={setFilter} />
      <div className="controls-bar">
        {/* Sorting and view toggle (list/grid) */}
        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
      <RecipeGrid recipes={recipes} filter={filter} sort={sort} />
    </div>
  );
}
