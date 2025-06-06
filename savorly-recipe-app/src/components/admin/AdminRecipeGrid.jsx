import AdminRecipeCard from "./AdminRecipeCard";
import { Link } from "react-router-dom";

export default function AdminRecipeGrid({ recipes, view, onApprove, onReject, onEdit }) {
  if (!recipes.length) {
    return <div style={{ padding: 32 }}>No recipes found.</div>;
  }
  const cardsPerRow = 3;
  const placeholdersNeeded =
    recipes.length > 0 ? (cardsPerRow - (recipes.length % cardsPerRow)) % cardsPerRow : 0;

  // Grid view
  if (view === "grid") {
    return (
      <div
        className="popular-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          flexWrap: "wrap",
          gap: "32px",
          justifyContent: "center",
          maxWidth: "1280px",
          margin: "0 auto", // Center grid on page
          minHeight: "600px",
          padding: "32px 40px",
        }}
      >
        {recipes.map((recipe, i) => (
          <AdminRecipeCard
            key={recipe.id || i}
            recipe={recipe}
            onApprove={() => onApprove(recipe)}
            onReject={() => onReject(recipe)}
            onEdit={onEdit}
          />
        ))}
        {Array.from({ length: placeholdersNeeded }).map((_, idx) => (
          <div key={`ph-${idx}`} style={{ visibility: "hidden" }} />
        ))}
      </div>
    );
  }

  // List view
  return (
    <div
      className="admin-list-view"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 18,
        padding: "40px 0",
      }}
    >
      {recipes.map((recipe, idx) => (
        <div
          key={idx}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "18px 28px",
            borderRadius: 12,
            background: "white",
            boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
            border: "1px solid #eee",
            minHeight: 88,
          }}
        >
          {/* Image */}
          <div
            style={{
              width: 75,
              height: 75,
              borderRadius: 16,
              overflow: "hidden",
              background: "linear-gradient(225deg, #FF6B6B 0%, #FFE66D 100%)",
              display: "flex",
              marginRight: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {recipe.image ? (
              <img
                src={recipe.image}
                alt={recipe.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <span
                style={{
                  fontWeight: 600,
                  color: "#fff",
                  fontSize: 20,
                }}
              >
                Img
              </span>
            )}
          </div>
          {/* Info */}
          <div style={{ flex: 3, minWidth: 0 }}>
            <Link
              to={`/recipe/user/${recipe.id}`}
              style={{
                fontWeight: 700,
                fontSize: 18,
                color: "#1A202C",
                fontFamily: "Inter, sans-serif",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                textDecoration: "none",
                transition: "color 0.18s",
                display: "inline-block",
              }}
              onMouseOver={(e) => (e.target.style.color = "#3182ce")}
              onMouseOut={(e) => (e.target.style.color = "#1A202C")}
              className="list-title-link"
            >
              {recipe.title}
            </Link>
            <div
              style={{
                color: "#718096",
                fontSize: 14,
                fontFamily: "Inter, sans-serif",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                marginRight: 35,
              }}
            >
              {recipe.description}
            </div>
          </div>
          {/* Author */}
          <div style={{ flex: 1, color: "#718096", fontSize: 14, fontFamily: "Inter, sans-serif" }}>
            {recipe.author || "-"}
          </div>
          {/* Time */}
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              color: "#718096",
              fontSize: 14,
              fontFamily: "Inter, sans-serif",
            }}
          >
            <svg width="15" height="15" style={{ marginRight: 3 }}>
              <circle cx="7.5" cy="7.5" r="6" stroke="#A0AEC0" strokeWidth="1.2" fill="none" />
              <rect x="7" y="4" width="1.5" height="4" rx="0.75" fill="#A0AEC0" />
              <rect x="7" y="7.5" width="3" height="1.2" rx="0.6" fill="#A0AEC0" />
            </svg>
            {recipe.totalTime + " min"}
          </div>
          {/* Status */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                background: "#FFF5F5",
                color: "#C53030",
                borderRadius: 12,
                padding: "2px 10px",
                fontWeight: 500,
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
              }}
            >
              Pending
            </span>
          </div>
          {/* Hours ago */}
          <div
            style={{
              color: "#A0AEC0",
              fontSize: 13,
              flex: 1,
              textAlign: "right",
            }}
          >
            {recipe.submittedAgo} {recipe.submittedAgo !== 1}
          </div>
          {/* Actions */}
          <div style={{ display: "flex", gap: 10, marginLeft: 18 }}>
            <button
              onClick={() => onApprove(recipe)}
              style={{
                padding: "7px 18px",
                borderRadius: 6,
                background: "#38A169",
                color: "#fff",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
              }}
            >
              Approve
            </button>
            <button
              onClick={() => onReject(recipe)}
              style={{
                padding: "7px 18px",
                borderRadius: 6,
                background: "#fff",
                color: "#E53E3E",
                border: "1px solid #E53E3E",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
