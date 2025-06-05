import React from "react";
import { Link } from "react-router-dom";


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

export default function AdminRecipeCard({
  recipe = {
    title: "Spicy Korean Bibimbap",
    description: "Traditional Korean mixed rice bowl with vegetables and gochujang sauce",
    author: "Sarah Kim",
    totalTime: 45,
    createdAt: new Date(),
    image: "",
    status: "pending",
  },
  onApprove,
  onReject,
}) {
  return (
    <Link
      to={`/recipe/user/${recipe.id}`}
      style={{
        textDecoration: "none",
        color: "inherit",
        display: "block",
        height: "100%",
        width: "100%",
      }}
    >
    <div
      style={{
        width: 400,
        minHeight: 440,
        background: "white",
        borderRadius: 12,
        outline: "1px #E2E8F0 solid",
        outlineOffset: "-1px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Recipe image */}
      <div
        style={{
          width: "100%",
          height: 200,
          background: "linear-gradient(225deg, #FF6B6B 0%, #FFE66D 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          overflow: "hidden",
        }}
      >
        {recipe.image ? (
          <img
            src={recipe.image}
            alt="Recipe"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              opacity: 0.85,
              color: "white",
              fontSize: 18,
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
            }}
          >
            Recipe Image
          </div>
        )}
      </div>

      {/* Card content as a flex column, space-between */}
      <div
        style={{
          flex: "1 1 auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        {/* TOP: Status, Title, Description */}
        <div>
          {/* Status Row */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
            <div
              style={{
                background: "#FFF5F5",
                borderRadius: 12,
                padding: "0 10px",
                height: 24,
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                fontWeight: 500,
                color: "#C53030",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" style={{ marginRight: 2 }}>
                <circle cx="7" cy="7" r="6" stroke="#C53030" strokeWidth="1.5" fill="none" />
                <rect x="6.25" y="3" width="1.5" height="5" rx="0.75" fill="#C53030" />
                <circle cx="7" cy="10.5" r="1" fill="#C53030" />
              </svg>
              Pending Review
            </div>
            <div style={{
              marginLeft: "auto",
              color: "#A0AEC0",
              fontSize: 14,
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              whiteSpace: "nowrap",
            }}>
              {recipe.createdAt ? getTimeAgo(recipe.createdAt) : ""}
            </div>
          </div>
          {/* Title */}
          <div
            style={{
              color: "#1A202C",
              fontSize: 24,
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              lineHeight: "28px",
              marginBottom: 5,
              transition: "color 0.18s",
          }}
          onMouseOver={e => (e.target.style.color = "#3182ce")}
          onMouseOut={e => (e.target.style.color = "#1A202C")}
        >
            {recipe.title}
          </div>
          {/* Description - clamp to 2 lines */}
          <div
            style={{
              color: "#718096",
              fontSize: 14,
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              marginBottom: 12,
              // display: "-webkit-box",
              // WebkitLineClamp: 2,
              // WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              minHeight: "42px", // keeps box height consistent
            }}
          >
            {recipe.description}
          </div>
        </div>

        {/* BOTTOM: Author, Time, Actions (use gap to separate actions) */}
        <div>
          {/* Author & Time Row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              fontSize: 14,
              color: "#718096",
              fontFamily: "Inter, sans-serif",
              marginBottom: 20,
              minHeight: 24,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <svg width="15" height="15" viewBox="0 0 15 15">
                <circle cx="7.5" cy="5.5" r="3" stroke="#A0AEC0" strokeWidth="1.2" fill="none" />
                <rect x="3" y="11" width="9" height="2" rx="1" stroke="#A0AEC0" strokeWidth="1.2" fill="none" />
              </svg>
              {recipe.author}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <svg width="15" height="15" viewBox="0 0 15 15">
                <circle cx="7.5" cy="7.5" r="6" stroke="#A0AEC0" strokeWidth="1.2" fill="none" />
                <rect x="7" y="4" width="1.5" height="4" rx="0.75" fill="#A0AEC0" />
                <rect x="7" y="7.5" width="3" height="1.2" rx="0.6" fill="#A0AEC0" />
              </svg>
              {recipe.totalTime ? `${recipe.totalTime} min` : ""}
            </div>
          </div>
          {/* Buttons */}
          <div style={{ display: "flex", gap: 14 }}>
            <button
              onClick={() => onReject(recipe)}
              style={{
                height: 36,
                padding: "0 18px",
                background: "#fff",
                borderRadius: 6,
                border: "1px solid #E53E3E",
                color: "#E53E3E",
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: 15,
                cursor: "pointer",
                transition: "background 0.2s, color 0.2s"
              }}
              onMouseOver={e => e.target.style.background = "#FFF0F0"}
              onMouseOut={e => e.target.style.background = "#fff"}
            >
              Reject
            </button>
            <button
              onClick={() => onApprove(recipe)}
              style={{
                height: 36,
                padding: "0 18px",
                background: "#38A169",
                borderRadius: 6,
                border: "none",
                color: "#fff",
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: 15,
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseOver={e => e.target.style.background = "#25603b"}
              onMouseOut={e => e.target.style.background = "#38A169"}
            >
              Approve &amp; Publish
            </button>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
}
