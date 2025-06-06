import { useState, useEffect, useContext, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  AppBar,
  Badge,
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
  Checkbox,
  Divider,
} from "@mui/material";

import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../AuthContext";

// import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DeleteIcon from "@mui/icons-material/Delete";
import notiSound from "../assets/sounds/notis.mp3";

import LoginModal from "./LoginModal";
import { timeAgo } from "../utils/timeAgo";
import SavorlyLogo from "../assets/icon.png";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [loginOpen, setLoginOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const [anchorElNotif, setAnchorElNotif] = useState(null);
  const menuOpenNotif = Boolean(anchorElNotif);
  const [notifications, setNotifications] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [toDeleteNotif, setToDeleteNotif] = useState(null);
  const audioRef = useRef(null);
  const prevUnread = useRef(0);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [selected, setSelected] = useState([]); // doc IDs checked
  const hasSelection = selected.length > 0;

  const toggleSelect = (id) =>
    setSelected((sel) => (sel.includes(id) ? sel.filter((x) => x !== id) : [...sel, id]));

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

  useEffect(() => {
    if (!user || !user.uid) {
      setNotifications([]);
      return;
    }

    // Build a query on the subcollection:
    const notifsRef = collection(db, "users", user.uid, "notifications");
    const q = query(notifsRef, orderBy("createdAt", "desc"));

    // Subscribe with onSnapshot:
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const arr = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            message: data.message,
            createdAt: data.createdAt,
            read: data.read || false,
          };
        });
        setNotifications(arr);

        const newUnread = arr.filter((n) => !n.read).length;
        if (newUnread > prevUnread.current && audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(() => {
            /* ignore autoplay block */
          });
        }
        prevUnread.current = newUnread;
      },
      (err) => {
        console.error("Notification listener error:", err);
      }
    );

    // Cleanup on unmount or user‐logout:
    return () => unsubscribe();
  }, [user]);

  const markAsRead = async (notifId) => {
    if (!user || !user.uid) return;

    // If it’s already read, do nothing
    const idx = notifications.findIndex((n) => n.id === notifId);
    if (idx === -1 || notifications[idx].read) return;

    // Immediately update local state so UI flips to white
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === notifId
          ? {
              ...n,
              read: true,
            }
          : n
      )
    );

    // Fire off the PATCH request to the server
    try {
      await axios.patch(`/api/notifications/${user.uid}/${notifId}/read`);
    } catch (err) {
      console.error("Failed to mark notification read:", err);
    }
  };

  // Handle deletion of a notification (open confirmation dialog)
  const handleDeleteClick = (notifId) => {
    setToDeleteNotif(notifId);
    setDeleteDialogOpen(true);
  };

  const askDeleteAll = () => {
    setToDeleteNotif("__ALL__");
    setDeleteDialogOpen(true);
  };

  // Confirm deletion: actually delete from Firestore + local state
  const confirmDelete = async () => {
    if (!user || !user.uid || !toDeleteNotif) {
      setDeleteDialogOpen(false);
      setToDeleteNotif(null);
      return;
    }

    let ids = [];

    if (toDeleteNotif === "__ALL__") {
      // special for “delete every notification”
      ids = notifications.map((n) => n.id);
    } else if (Array.isArray(toDeleteNotif)) {
      ids = toDeleteNotif;
    } else {
      ids = [toDeleteNotif]; // single id
    }

    try {
      if (ids.length === 1) {
        // single-delete route
        await axios.delete(`/api/notifications/${user.uid}/${ids[0]}`);
      } else {
        // bulk route
        await axios.delete(`/api/notifications/${user.uid}/bulk`, {
          data: { ids },
        });
      }

      // UI update
      setNotifications((prev) => prev.filter((n) => !ids.includes(n.id)));
      setSelected((sel) => sel.filter((id) => !ids.includes(id)));
    } catch (err) {
      console.error("Failed to delete notification:", err);
    } finally {
      setDeleteDialogOpen(false);
      setToDeleteNotif(null);
    }
  };

  // Cancel deletion
  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setToDeleteNotif(null);
  };

  const handleNavClick = (path) => {
    if (user) {
      navigate(path);
    } else {
      setLoginOpen(true);
    }
  };

  const handleAvatarClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Notification menu handlers
  const handleBellClick = (e) => {
    if (!user) {
      setLoginOpen(true);
      return;
    }
    setAnchorElNotif(e.currentTarget);
  };
  const handleNotifClose = () => {
    setAnchorElNotif(null);
  };

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

  return (
    <>
      <AppBar position="static" color="transparent">
        <Toolbar sx={{ position: "relative", height: 64 }}>
          {/* Logo + Site Name */}
          <Box component={Link} to="/" sx={{ display: "flex", alignItems: "center" }}>
            {/* Logo */}
            <Avatar
              src={SavorlyLogo}
              alt="Savorly Logo"
              sx={{
                width: 37,
                height: 37,
                mr: 1.5,
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.25))",
              }}
            />
            <Typography
              sx={{
                textDecoration: "none",
                filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.27))",
                fontWeight: 700,
                fontSize: "1.3rem",
                color: "black",
                "&:hover": {
                  color: "#F25C54",
                  filter: "drop-shadow(0 3px 6px rgba(242, 92, 84, 0.21))",
                },
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
            {/* <IconButton size="large" aria-label="search">
              <SearchIcon sx={{ color: "#555" }} />
            </IconButton> */}
            <IconButton size="large" aria-label="notifications" onClick={handleBellClick}>
              <Badge
                badgeContent={unreadCount}
                color="error"
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                // when unreadCount is zero, the badge will be hidden automatically
                showZero={false}
              >
                <NotificationsIcon sx={{ color: "#555" }} />
              </Badge>
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
                      "&:hover": {
                        filter: "drop-shadow(0 3px 6px rgba(0, 0, 0, 0.49))",
                      },
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

      <Menu
        anchorEl={anchorElNotif}
        open={menuOpenNotif}
        onClose={handleNotifClose}
        PaperProps={{
          sx: {
            // 5 items tall then scroll
            maxHeight: 5 * 64,
            width: 320,
            overflowY: "auto",
          },
        }}
      >
        {/* Delete-all action */}
        {notifications.length > 0 && [
          <MenuItem
            key="delete-all"
            onClick={askDeleteAll}
            sx={{ bgcolor: "#fff5f5", "&:hover": { bgcolor: "#fee2e2" } }}
          >
            Delete all
          </MenuItem>,
          <Divider key="da-divider" />,
        ]}

        {/* Bulk-delete action */}
        {hasSelection && [
          <MenuItem
            key="delete-selected"
            onClick={() => {
              setToDeleteNotif([...selected]); // store the array of IDs
              setDeleteDialogOpen(true); // open confirmation
            }}
            sx={{ bgcolor: "#fef2f2", "&:hover": { bgcolor: "#fee2e2" } }}
          >
            <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
            Delete selected
          </MenuItem>,
          <Divider key="ds-divider" />,
        ]}

        {/* Individual notifications */}
        {notifications.length === 0 ? (
          <MenuItem key="no-notifs" disabled>
            No new notifications
          </MenuItem>
        ) : (
          notifications.map((notif) => (
            <MenuItem
              key={notif.id}
              sx={{
                backgroundColor: notif.read ? "white" : "#e3f2fd",
                whiteSpace: "normal",
                alignItems: "flex-start",
              }}
              onMouseEnter={() => markAsRead(notif.id)}
            >
              <Box sx={{ display: "flex", width: "100%", alignItems: "flex-start" }}>
                <Checkbox
                  edge="start"
                  checked={selected.includes(notif.id)}
                  onChange={() => toggleSelect(notif.id)}
                  tabIndex={-1}
                  disableRipple
                  sx={{ p: 0.5 }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body2">{notif.message}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {timeAgo(notif.createdAt)}
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  onClick={() => handleDeleteClick(notif.id)}
                  sx={{
                    ml: 1,
                    p: 0.5,
                    "&:hover": { backgroundColor: "#f8d7da" },
                  }}
                >
                  <DeleteIcon fontSize="small" color="error" />
                </IconButton>
              </Box>
            </MenuItem>
          ))
        )}
      </Menu>

      <audio ref={audioRef} src={notiSound} preload="auto" />

      {/* Delete-confirmation dialog */}
      <Dialog open={deleteDialogOpen} onClose={cancelDelete}>
        <DialogTitle>
          {toDeleteNotif === "__ALL__"
            ? "Delete ALL notifications"
            : Array.isArray(toDeleteNotif)
            ? "Delete selected notifications"
            : "Delete notification"}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {toDeleteNotif === "__ALL__"
              ? "This will permanently remove every notification in your inbox."
              : Array.isArray(toDeleteNotif)
              ? "This will permanently remove all selected notifications."
              : "This will permanently remove the notification."}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>Cancel</Button>
          <Button color="error" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
