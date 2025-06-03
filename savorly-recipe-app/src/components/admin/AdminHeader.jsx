import React from "react";

export default function AdminHeader({ pendingCount = 12, publishedCount = 8 }) {
  return (
    <div style={{
      alignSelf: "stretch",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      gap: 24,
      display: "flex"
    }}>
      <div style={{
        alignSelf: "stretch",
        justifyContent: "space-between",
        alignItems: "center",
        display: "flex"
      }}>
        {/* Admin Profile */}
        <div style={{ justifyContent: "flex-start", alignItems: "center", gap: 12, display: "flex" }}>
          <div style={{
            width: 40,
            height: 40,
            background: "#E53E3E",
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
            display: "flex"
          }}>
            <div style={{
              color: "white",
              fontSize: 18,
              fontFamily: "Inter",
              fontWeight: 700,
              lineHeight: "21.60px",
              wordWrap: "break-word"
            }}>R</div>
          </div>
          <div style={{
            color: "#1A202C",
            fontSize: 20,
            fontFamily: "Inter",
            fontWeight: 700,
            lineHeight: "24px",
            wordWrap: "break-word"
          }}>
            Savorly Admin
          </div>
        </div>
        {/* Review Stats & Avatar */}
        <div style={{ justifyContent: "flex-start", alignItems: "center", gap: 16, display: "flex" }}>
          <div style={{ justifyContent: "flex-start", alignItems: "center", gap: 24, display: "flex" }}>
            <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "center", gap: 4, display: "flex" }}>
              <div style={{
                textAlign: "center",
                color: "#E53E3E",
                fontSize: 24,
                fontFamily: "Inter",
                fontWeight: 700,
                lineHeight: "28.80px",
                wordWrap: "break-word"
              }}>{pendingCount}</div>
              <div style={{
                textAlign: "center",
                color: "#718096",
                fontSize: 12,
                fontFamily: "Inter",
                fontWeight: 500,
                lineHeight: "14.40px",
                wordWrap: "break-word"
              }}>Pending</div>
            </div>
            <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "center", gap: 4, display: "flex" }}>
              <div style={{
                textAlign: "center",
                color: "#38A169",
                fontSize: 24,
                fontFamily: "Inter",
                fontWeight: 700,
                lineHeight: "28.80px",
                wordWrap: "break-word"
              }}>{publishedCount}</div>
              <div style={{
                textAlign: "center",
                color: "#718096",
                fontSize: 12,
                fontFamily: "Inter",
                fontWeight: 500,
                lineHeight: "14.40px",
                wordWrap: "break-word"
              }}>Published</div>
            </div>
          </div>
          <div style={{
            width: 40,
            height: 40,
            background: "#E2E8F0",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            display: "flex"
          }}>
            <div style={{
              color: "#4A5568",
              fontSize: 16,
              fontFamily: "Inter",
              fontWeight: 600,
              lineHeight: "19.20px",
              wordWrap: "break-word"
            }}>A</div>
          </div>
        </div>
      </div>
      {/* Dashboard Title & Subtitle */}
      <div style={{
        alignSelf: "stretch",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 8,
        display: "flex"
      }}>
        <div style={{
          alignSelf: "stretch",
          color: "#1A202C",
          fontSize: 32,
          fontFamily: "Inter",
          fontWeight: 700,
          lineHeight: "38.40px",
          wordWrap: "break-word"
        }}>Recipe Review Dashboard</div>
        <div style={{
          alignSelf: "stretch",
          color: "#718096",
          fontSize: 16,
          fontFamily: "Inter",
          fontWeight: 400,
          lineHeight: "19.20px",
          wordWrap: "break-word"
        }}>Review and manage user-submitted recipes for publication</div>
      </div>
    </div>
  );
}
