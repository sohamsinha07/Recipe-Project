import React from "react";

export default function RecipeReviewTabs({
  view = "grid",
  setView = () => {},
  tab = "pending",
  setTab,
  counts = { all: 20, pending: 12, approved: 8 },
  sort = "newest",
  setSort
}) {
  return (
    <div style={{
      alignSelf: "stretch",
      padding: 24,
      background: "white",
      borderRadius: 12,
      outline: "1px #E2E8F0 solid",
      outlineOffset: "-1px",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      gap: 16,
      display: "flex"
    }}>
      <div style={{
        alignSelf: "stretch",
        justifyContent: "space-between",
        alignItems: "center",
        display: "flex"
      }}>
        {/* Tabs */}
        <div style={{
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 12,
          display: "flex"
        }}>
          <button
            style={{
              height: 40,
              padding: "0 16px",
              background: "#F7FAFC",
              borderRadius: 8,
              outline: "1px #E2E8F0 solid",
              outlineOffset: "-1px",
              border: "none",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              fontWeight: tab === "all" ? 700 : 500
            }}
            onClick={() => setTab?.("all")}
          >
            <span style={{
              color: "#4A5568",
              fontSize: 14,
              fontFamily: "Inter, sans-serif",
              fontWeight: tab === "all" ? 700 : 500,
              lineHeight: "16.8px"
            }}>
              All ({counts.all})
            </span>
          </button>
          <button
            style={{
              height: 40,
              padding: "0 16px",
              background: "#FFF5F5",
              borderRadius: 8,
              outline: "1px #FEB2B2 solid",
              outlineOffset: "-1px",
              border: "none",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              fontWeight: tab === "pending" ? 700 : 500
            }}
            onClick={() => setTab?.("pending")}
          >
            <span style={{
              color: "#C53030",
              fontSize: 14,
              fontFamily: "Inter, sans-serif",
              fontWeight: tab === "pending" ? 700 : 500,
              lineHeight: "16.8px"
            }}>
              Pending ({counts.pending})
            </span>
          </button>
          <button
            style={{
              height: 40,
              padding: "0 16px",
              background: "#F0FFF4",
              borderRadius: 8,
              outline: "1px #9AE6B4 solid",
              outlineOffset: "-1px",
              border: "none",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              fontWeight: tab === "approved" ? 700 : 500
            }}
            onClick={() => setTab?.("approved")}
          >
            <span style={{
              color: "#38A169",
              fontSize: 14,
              fontFamily: "Inter, sans-serif",
              fontWeight: tab === "approved" ? 700 : 500,
              lineHeight: "16.8px"
            }}>
              Approved ({counts.approved})
            </span>
          </button>
        </div>
        {/* Sort Dropdown & View Toggle */}
        <div style={{
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 12,
          display: "flex"
        }}>
          {/* Sort Dropdown */}
          <div style={{
            position: "relative",
            width: 160,
            height: 40,
            display: "flex",
            alignItems: "center"
          }}>
            <select
              value={sort}
              onChange={e => setSort?.(e.target.value)}
              style={{
                width: "100%",
                height: "100%",
                padding: "0 36px 0 16px",
                background: "white",
                borderRadius: 8,
                outline: "1px #E2E8F0 solid",
                outlineOffset: "-1px",
                color: "#4A5568",
                fontSize: 14,
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                lineHeight: "16.8px",
                appearance: "none",
                border: "none",
                cursor: "pointer"
              }}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
            {/* Custom dropdown arrow */}
            <svg
              style={{
                position: "absolute",
                right: 16,
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none"
              }}
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <polyline
                points="4,6 8,10 12,6"
                style={{
                  fill: "none",
                  stroke: "#718096",
                  strokeWidth: 1.5
                }}
              />
            </svg>
          </div>
          {/* View Toggle Buttons */}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {/* Grid Button */}
            <div
              onClick={() => setView?.("grid")}
              style={{
                width: 36,
                height: 36,
                background: view === "grid" ? "#E53E3E" : "#F7FAFC",
                borderRadius: 6,
                outline: view === "grid" ? "none" : "1px #E2E8F0 solid",
                outlineOffset: "-1px",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                cursor: "pointer"
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16">
                <rect x="2" y="2" width="4" height="4" fill="white"/>
                <rect x="10" y="2" width="4" height="4" fill="white"/>
                <rect x="2" y="10" width="4" height="4" fill="white"/>
                <rect x="10" y="10" width="4" height="4" fill="white"/>
              </svg>
            </div>
            {/* List Button */}
            <div
              onClick={() => setView?.("list")}
              style={{
                width: 36,
                height: 36,
                background: view === "list" ? "#E53E3E" : "#F7FAFC",
                borderRadius: 6,
                outline: view === "list" ? "none" : "1px #E2E8F0 solid",
                outlineOffset: "-1px",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                cursor: "pointer"
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16">
                <rect x="3" y="4" width="10" height="2" fill={view === "list" ? "white" : "#4A5568"} />
                <rect x="3" y="10" width="10" height="2" fill={view === "list" ? "white" : "#4A5568"} />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
