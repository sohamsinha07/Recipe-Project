import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

import SavorlyLogo from "../../assets/icon.png";
import "../../styles/admin.css";

export default function AdminHeader({ pendingCount, approvedCount }) {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  // Avatar menu to logout
  const [anchorEl, setAnchorEl] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleAvatarClick = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogoutClick = () => {
    handleMenuClose();
    setConfirmOpen(true);
  };

  const confirmLogout = () => {
    logout();
    setConfirmOpen(false);
    navigate("/"); // back to public home after logging out
  };

  return (
    <div className="admin-header-container">
      <div className="admin-header-row">
        {/* Left: Logo, name, title, desc */}
        <div className="admin-header-left-column">
          <div className="admin-header-left">
            <IconButton size="large" onClick={() => navigate("/")} sx={{ p: 0, mr: 1 }}>
              <img
                src={SavorlyLogo}
                alt="Savorly logo"
                style={{ width: 48, height: 48, borderRadius: 8 }}
              />
            </IconButton>
            <span className="admin-header-title">Savorly Admin</span>
          </div>
          <div className="admin-header-dash-title">Recipe Review Dashboard</div>
          <div className="admin-header-dash-desc">
            Review and manage user-submitted recipes for publication
          </div>
        </div>
        {/* Right: Stats, avatar */}
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

          {/* User avatar & dropdown */}
          <IconButton onClick={handleAvatarClick} size="small" sx={{ ml: 2 }}>
            <Avatar
              src={user?.avatarURL || ""}
              sx={{
                width: 40,
                height: 40,
                bgcolor: "#F25C54",
                fontWeight: 600,
              }}
            >
              {user?.firstName?.[0]?.toUpperCase() || "U"}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem
              onClick={() => {
                handleMenuClose();
                navigate("/profile");
              }}
            >
              Profile
            </MenuItem>

            <MenuItem onClick={handleLogoutClick} sx={{ "&:hover": { color: "#F25C54" } }}>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
      {/* Logout confirmation */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>Are you sure you want to log out?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button color="error" onClick={confirmLogout}>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
