import React from "react";
import "../../styles/admin.css";

export default function AdminHeader({ pendingCount = 12, approvedCount = 8 }) {
  return (
    <div className="admin-header-container">
      <div className="admin-header-row-top">
        {/* Logo & name */}
        <div className="admin-header-left">
          <div className="admin-header-avatar">R</div>
          <div className="admin-header-title">Savorly Admin</div>
        </div>
        {/* Title & subtitle CENTERED */}
        <div className="admin-header-center">
          <div className="admin-header-dash-title">Recipe Review Dashboard</div>
          <div className="admin-header-dash-desc">
            Review and manage user-submitted recipes for publication
          </div>
        </div>
        {/* Stats block right-aligned */}
        <div className="admin-header-right">
          <div className="admin-header-stats">
            <div className="admin-header-stat-col">
              <div className="admin-header-stat-count-pending">{pendingCount}</div>
              <div className="admin-header-stat-label">Pending</div>
            </div>
            <div className="admin-header-stat-col">
              <div className="admin-header-stat-count-approved">{approvedCount}</div>
              <div className="admin-header-stat-label">Published</div>
            </div>
          </div>
          <div className="admin-header-user">A</div>
        </div>
      </div>
    </div>
  );
}
