import React from "react";
import { Link , useNavigate} from "react-router-dom";


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

export default function AdminRecipeCard({ recipe, onApprove, onReject, onEdit }) {
  const navigate = useNavigate();
  // Published or Approved card
  if (recipe.status === "published" || recipe.status === "approved") {
    return (
      <div
        style={{
          width: "100%",
          minHeight: 440,
          maxHeight: 440,
          background: "white",
          borderRadius: 12,
          outline: "1px #E2E8F0 solid",
          outlineOffset: "-1px",
          flexDirection: "column",
          boxSizing: "border-box",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
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

        <div
          style={{
            flex: "1 1 auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 20,
          }}
        >
          {/* Status Row */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
            <div
              style={{
                background: "#F0FFF4",
                borderRadius: 12,
                padding: "0 10px",
                height: 24,
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                fontWeight: 500,
                color: "#38A169",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" style={{ marginRight: 3 }}>
                <circle cx="8" cy="8" r="7" stroke="#38A169" strokeWidth="2" fill="none" />
                <polyline
                  points="5.5,9 7.5,11 11,6"
                  fill="none"
                  stroke="#38A169"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Approved
            </div>
            <div
              style={{
                marginLeft: "auto",
                color: "#A0AEC0",
                fontSize: 14,
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                whiteSpace: "nowrap",
              }}
            >
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
            }}
          >
            <Link
              to={`/recipe/user/${recipe.id}`}
              style={{
                color: "#1A202C",
                textDecoration: "none",
                cursor: "pointer",
                transition: "color 0.16s, text-decoration 0.16s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#3182ce")}
              onMouseLeave={(e) => (e.target.style.color = "#1A202C")}
            >
              {recipe.title}
            </Link>
          </div>
          {/* Description */}
          <div
            style={{
              color: "#718096",
              fontSize: 14,
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              marginBottom: 12,
              overflow: "hidden",
              textOverflow: "ellipsis",
              minHeight: "42px",
            }}
          >
            {recipe.description}
          </div>
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
                <rect
                  x="3"
                  y="11"
                  width="9"
                  height="2"
                  rx="1"
                  stroke="#A0AEC0"
                  strokeWidth="1.2"
                  fill="none"
                />
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
              onClick={() => navigate(`/edit/${recipe.id}`)}
              style={{
                height: 36,
                padding: "0 18px",
                background: "#fff",
                borderRadius: 6,
                border: "1px solid #4299E1",
                color: "#4299E1",
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: 15,
                cursor: "pointer",
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseOver={(e) => (e.target.style.background = "#FFF0F0")}
              onMouseOut={(e) => (e.target.style.background = "#fff")}
            >
              Edit
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
              onMouseOver={(e) => (e.target.style.background = "#25603b")}
              onMouseOut={(e) => (e.target.style.background = "#38A169")}
            >
              Published!
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (recipe.status === "rejected") {
    return (
      <div
        style={{
          width: "100%",
          minHeight: 440,
          maxHeight: 440,
          background: "#fff",
          borderRadius: 12,
          outline: "1px #E2E8F0 solid",
          outlineOffset: "-1px",
          flexDirection: "column",
          boxSizing: "border-box",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {/*  Image header  */}
        <div
          style={{
            width: "100%",
            height: 200,
            background: "linear-gradient(225deg,#FF6B6B 0%,#FFE66D 100%)",
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
              alt="recipe"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div style={{ opacity: 0.85, color: "#fff", fontSize: 18, fontWeight: 500 }}>
              Recipe Image
            </div>
          )}
        </div>

        <div style={{ flex: "1 1 auto", display: "flex", flexDirection: "column", padding: 20 }}>
          {/* Status row */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
            <div
              style={{
                background: "#FFF5F5",
                color: "#C53030",
                borderRadius: 12,
                padding: "0 10px",
                height: 24,
                display: "flex",
                alignItems: "center",
                fontSize: 12,
                fontWeight: 500,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" style={{ marginRight: 8 }}>
                {/* outer circle */}
                <circle cx="8" cy="8" r="7" stroke="#C53030" strokeWidth="2" fill="none" />

                {/* X mark — two crossed lines */}
                <line
                  x1="5.5"
                  y1="5.5"
                  x2="10.5"
                  y2="10.5"
                  stroke="#C53030"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="10.5"
                  y1="5.5"
                  x2="5.5"
                  y2="10.5"
                  stroke="#C53030"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              Rejected
            </div>
            <div style={{ marginLeft: "auto", color: "#A0AEC0", fontSize: 14 }}>
              {recipe.createdAt ? getTimeAgo(recipe.createdAt) : ""}
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              color: "#1A202C",
              fontSize: 24,
              fontWeight: 700,
              lineHeight: "28px",
              marginBottom: 5,
            }}
          >
            <Link
              to={`/recipe/user/${recipe.id}`}
              style={{ color: "#1A202C", textDecoration: "none" }}
              onMouseEnter={(e) => (e.target.style.color = "#3182ce")}
              onMouseLeave={(e) => (e.target.style.color = "#1A202C")}
            >
              {recipe.title}
            </Link>
          </div>

          {/* Description */}
          <div
            style={{
              color: "#718096",
              fontSize: 14,
              marginBottom: 12,
              overflow: "hidden",
              textOverflow: "ellipsis",
              minHeight: "42px",
            }}
          >
            {recipe.description}
          </div>

          {/* Author & time row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              fontSize: 14,
              color: "#718096",
              marginBottom: 20,
              minHeight: 24,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <svg width="15" height="15" viewBox="0 0 15 15">
                <circle cx="7.5" cy="5.5" r="3" stroke="#A0AEC0" strokeWidth="1.2" fill="none" />
                <rect
                  x="3"
                  y="11"
                  width="9"
                  height="2"
                  rx="1"
                  stroke="#A0AEC0"
                  strokeWidth="1.2"
                  fill="none"
                />
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

          <div style={{ display: "flex", gap: 14 }}>
            <button
               onClick={() => navigate(`/edit_recipe/${recipe.id}`)}// send back to review
              style={{
                height: 36,
                padding: "0 18px",
                background: "#fff",
                borderRadius: 6,
                border: "1px solid #4299E1",
                color: "#4299E1",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Pending review card
  return (
    <div
      style={{
        width: "100%",
        minHeight: 440,
        maxHeight: 440,
        background: "white",
        borderRadius: 12,
        outline: "1px #E2E8F0 solid",
        outlineOffset: "-1px",
        flexDirection: "column",
        boxSizing: "border-box",
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
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

      <div
        style={{
          flex: "1 1 auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 20,
        }}
      >
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
          <div
            style={{
              marginLeft: "auto",
              color: "#A0AEC0",
              fontSize: 14,
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              whiteSpace: "nowrap",
            }}
          >
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
          }}
        >
          <Link
            to={`/recipe/user/${recipe.id}`}
            style={{
              color: "#1A202C",
              textDecoration: "none",
              cursor: "pointer",
              transition: "color 0.16s, text-decoration 0.16s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#3182ce")}
            onMouseLeave={(e) => (e.target.style.color = "#1A202C")}
          >
            {recipe.title}
          </Link>
        </div>
        {/* Description */}
        <div
          style={{
            color: "#718096",
            fontSize: 14,
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            marginBottom: 12,
            overflow: "hidden",
            textOverflow: "ellipsis",
            minHeight: "42px",
          }}
        >
          {recipe.description}
        </div>
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
              <rect
                x="3"
                y="11"
                width="9"
                height="2"
                rx="1"
                stroke="#A0AEC0"
                strokeWidth="1.2"
                fill="none"
              />
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
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.background = "#FFF0F0")}
            onMouseOut={(e) => (e.target.style.background = "#fff")}
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
            onMouseOver={(e) => (e.target.style.background = "#25603b")}
            onMouseOut={(e) => (e.target.style.background = "#38A169")}
          >
            Approve &amp; Publish
          </button>
        </div>
      </div>
    </div>
  );
}
