import React from "react";


export default function AdminHeader({ pendingCount, approvedCount }) {
  return (
    <div className="admin-header-container">
      {/* Top Row: Logo, Name, Stats, User */}
      <div className="admin-header-row">
        <div className="admin-header-left">
          <div className="admin-header-avatar">R</div>
          <div className="admin-header-title">Savorly Admin</div>
        </div>
        <div className="admin-header-stats">
          <div className="admin-header-stat-col">
            <div className="admin-header-stat-count-pending">{pendingCount}</div>
          </div>
          <div className="admin-header-stat-col">
            <div className="admin-header-stat-count-approved">{approvedCount}</div>
          </div>
        </div>
        <div className="admin-header-user">A</div>
      </div>
      {/* Dashboard Title & Subtitle */}
      <div>
        <div className="admin-header-dash-title">Recipe Review Dashboard</div>
        <div className="admin-header-dash-desc">Review and manage user-submitted recipes for publication</div>
      </div>
    </div>
  );
}

