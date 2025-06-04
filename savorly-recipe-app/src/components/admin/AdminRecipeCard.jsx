import React from "react";

export default function AdminRecipeCard({
  recipe = {
    title: "Spicy Korean Bibimbap",
    description: "Traditional Korean mixed rice bowl with vegetables and gochujang sauce",
    author: "Sarah Kim",
    time: "45 min",
    status: "pending",
    submittedAgo: "2 hours ago"
  },
  onApprove,
  onReject,
}) {
  return (
    <div style={{
      width: 400,
      background: 'white',
      borderRadius: 12,
      outline: '1px #E2E8F0 solid',
      outlineOffset: '-1px',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Recipe image placeholder */}
      <div style={{
        width: "100%",
        height: 200,
        background: 'linear-gradient(225deg, #FF6B6B 0%, #FFE66D 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{
          opacity: 0.85,
          color: 'white',
          fontSize: 18,
          fontFamily: 'Inter, sans-serif',
          fontWeight: 500
        }}>
          Recipe Image
        </div>
      </div>
      {/* Card content */}
      <div style={{
        width: "100%",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        flexGrow: 1, // <-- make this grow to fill
        minHeight: 100 
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Status */}
          <div style={{
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
            fontFamily: "Inter, sans-serif"
          }}>
            {/* Pending SVG */}
            <svg width="14" height="14" viewBox="0 0 14 14" style={{ marginRight: 2 }}>
              <circle cx="7" cy="7" r="6" stroke="#C53030" strokeWidth="1.5" fill="none" />
              <rect x="6.25" y="3" width="1.5" height="5" rx="0.75" fill="#C53030" />
              <circle cx="7" cy="10.5" r="1" fill="#C53030" />
            </svg>
            Pending Review
          </div>
          <div style={{
            color: "#A0AEC0",
            fontSize: 12,
            fontWeight: 400
          }}>
            {recipe.submittedAgo}
          </div>
        </div>
        {/* Title */}
        <div style={{
          color: "#1A202C",
          fontSize: 22,
          fontFamily: "Inter, sans-serif",
          fontWeight: 700,
          lineHeight: "24px"
        }}>
          {recipe.title}
        </div>
        {/* Description */}
        <div style={{
          color: "#718096",
          fontSize: 15,
          fontFamily: "Inter, sans-serif",
          fontWeight: 400
        }}>
          {recipe.description}
        </div>
        {/* Author & Time */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          fontSize: 13,
          color: "#718096",
          fontFamily: "Inter, sans-serif"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            {/* Author SVG */}
            <svg width="15" height="15" viewBox="0 0 15 15">
              <circle cx="7.5" cy="5.5" r="3" stroke="#A0AEC0" strokeWidth="1.2" fill="none" />
              <rect x="3" y="11" width="9" height="2" rx="1" stroke="#A0AEC0" strokeWidth="1.2" fill="none" />
            </svg>
            {recipe.author}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            {/* Clock SVG */}
            <svg width="15" height="15" viewBox="0 0 15 15">
              <circle cx="7.5" cy="7.5" r="6" stroke="#A0AEC0" strokeWidth="1.2" fill="none" />
              <rect x="7" y="4" width="1.5" height="4" rx="0.75" fill="#A0AEC0" />
              <rect x="7" y="7.5" width="3" height="1.2" rx="0.6" fill="#A0AEC0" />
            </svg>
            {recipe.time}
          </div>
        </div>
        {/* Action buttons */}
        <div style={{
          display: "flex",
          gap: 14,
          marginTop: "auto" // <-- THIS is key to align the button row to the bottom
        }}>
          <button
            onClick={onReject}
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
              cursor: "pointer"
            }}
          >
            Reject
          </button>
          <button
            onClick={onApprove}
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
              cursor: "pointer"
            }}
          >
            Approve &amp; Publish
          </button>
        </div>
      </div>
    </div>
  );
}
