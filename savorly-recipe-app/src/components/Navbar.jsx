import { useState, useEffect, useContext } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
} from "@mui/material";
import { AuthContext } from "../AuthContext";

import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import LoginModal from "./LoginModal";
import SavorlyLogo from "../assets/icon.png";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [loginOpen, setLoginOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleAvatarClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [confirmOpen, setConfirmOpen] = useState(false);
  const openConfirm = () => {
    setAnchorEl(null);
    setConfirmOpen(true);
  };
  const closeConfirm = () => {
    setConfirmOpen(false);
  };
  const handleLogout = () => {
    logout();
    setConfirmOpen(false);
    navigate("/");
  };

  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // If URL has ?login=true, open the modal
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("login") === "true") {
      setLoginOpen(true);
    }
  }, [location.search]);

  const navLinkStyles = {
    fontWeight: "bold",
    textTransform: "none",
    "&.active": {
      color: "#F25C54",
    },
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-2px)",
      textDecoration: "underline",
      color: "#F25C54",
    },
  };

  const handleNavClick = (path) => {
    if (user) {
      navigate(path);
    } else {
      setLoginOpen(true);
    }
  };

  return (
    <>
      <AppBar position="static" color="transparent">
        <Toolbar sx={{ position: "relative", height: 64 }}>
          {/* Logo + Site Name */}
          <Box component={Link} to="/" sx={{ display: "flex", alignItems: "center" }}>
            {/* Logo */}
            <Avatar src={SavorlyLogo} alt="Savorly Logo" sx={{ width: 37, height: 37, mr: 1.5 }} />
            <Typography
              sx={{
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "1.3rem",
                color: "black",
                "&:hover": { color: "#F25C54" },
              }}
            >
              Savorly
            </Typography>
          </Box>

          {/* Nav Links */}
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 4,
            }}
          >
            <Button
              onClick={() => handleNavClick("/recipes")}
              sx={{
                color: (theme) => (theme.palette.mode === "light" ? "#777" : "#EEE"),
                ...navLinkStyles,
              }}
            >
              Recipes
            </Button>
            {/* <Button
              component={NavLink}
              to="/Community"
              sx={{
                color: (theme) => (theme.palette.mode === "light" ? "#777" : "#EEE"),
                ...navLinkStyles,
              }}
            >
              Community
            </Button> */}
            <Button
              onClick={() => handleNavClick("/my_kitchen")}
              sx={{
                color: (theme) => (theme.palette.mode === "light" ? "#777" : "#EEE"),
                ...navLinkStyles,
              }}
            >
              My Kitchen
            </Button>

            {/* Conditionally show Admin link if user.isAdmin === true */}
            {user?.isAdmin && (
              <Button
                component={NavLink}
                to="/admin"
                sx={{
                  color: (theme) => (theme.palette.mode === "light" ? "#777" : "#EEE"),
                  ...navLinkStyles,
                }}
              >
                Admin
              </Button>
            )}
          </Box>

          {/* Search, Bell, Avatar */}
          <Box sx={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton size="large" aria-label="search">
              <SearchIcon sx={{ color: "#555" }} />
            </IconButton>
            <IconButton size="large" aria-label="notifications">
              <NotificationsIcon sx={{ color: "#555" }} />
            </IconButton>

            {user ? (
              <>
                <IconButton onClick={handleAvatarClick} size="small" sx={{ p: 0 }}>
                  <Avatar
                    sx={{
                      bgcolor: "#F25C54",
                      width: 40,
                      height: 40,
                      fontWeight: "bold",
                    }}
                  >
                    {user.firstName?.[0]?.toUpperCase() || "U"}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={menuOpen}
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
                  <MenuItem onClick={openConfirm} sx={{ "&:hover": { color: "#F25C54" } }}>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              // If no user, show Login button
              <Button
                variant="outlined"
                onClick={() => setLoginOpen(true)}
                sx={{
                  textTransform: "none",
                  borderColor: "#F25C54",
                  color: "#F25C54",
                  fontWeight: 500,
                  "&:hover": {
                    backgroundColor: "#F25C5422",
                    borderColor: "#F25C54",
                  },
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />

      <Dialog open={confirmOpen} onClose={closeConfirm}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>Are you sure you want to log out?</DialogContent>
        <DialogActions>
          <Button onClick={closeConfirm}>Cancel</Button>
          <Button color="error" onClick={handleLogout}>
            Logout
          </Button>
        </DialogActions>
      </Dialog>

      {showScrollTop && (
        <Tooltip title="Scroll back to top">
          <IconButton
            onClick={scrollToTop}
            sx={{
              position: "fixed",
              top: 16,
              left: "50%",
              transform: "translateX(-50%)",
              bgcolor: "rgba(0,0,0,0.6)",
              color: "white",
              "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
              zIndex: 1500,
            }}
          >
            <ArrowUpwardIcon />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
}
