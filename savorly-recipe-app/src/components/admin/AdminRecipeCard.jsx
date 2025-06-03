import React from "react";

export default function AdminRecipeCard({ recipe, onApprove, onReject, onEdit, list }) {
  return (
    <div className={`popular-card${list ? " admin-list-card" : ""}`} style={{
      width: 340,
      minHeight: 240,
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.15)",
      display: "flex",
      flexDirection: "column",
      padding: 0,
      position: "relative"
    }}>
      <div className="popular-card-media" style={{
        height: 140,
        background: "linear-gradient(135deg, #ff8474, #ff5b5b)",
        color: "#fff",
        fontWeight: 700,
        fontSize: 18,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        Recipe Image
      </div>
      <div style={{ padding: 20 }}>
        <div className="popular-card-title" style={{ fontWeight: 700, fontSize: 20 }}>
          {recipe.title}
        </div>
        <div className="popular-card-desc" style={{ color: "#777", marginBottom: 8 }}>
          {recipe.description}
        </div>
        <div className="popular-meta" style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
          <div className="popular-meta-item" style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span role="img" aria-label="star" style={{ color: "#f2b01e" }}>★</span>
            <span>{recipe.rating}</span>
          </div>
          <div className="popular-meta-item">{recipe.time}</div>
        </div>
        {/* Admin buttons */}
        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          <button onClick={onReject} style={{
            padding: "8px 16px",
            borderRadius: 6,
            border: "1px solid #E53E3E",
            background: "#FFF5F5",
            color: "#E53E3E",
            fontWeight: 600,
            cursor: "pointer"
          }}>
            Reject
          </button>
          <button onClick={onApprove} style={{
            padding: "8px 16px",
            borderRadius: 6,
            border: "none",
            background: "#38A169",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer"
          }}>
            Approve & Publish
          </button>
        </div>
      </div>
    </div>
  );
}
