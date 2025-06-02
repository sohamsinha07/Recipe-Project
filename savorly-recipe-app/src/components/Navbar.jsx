import { Link, NavLink } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function Navbar() {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: 2,
          paddingRight: 2,
        }}
      >
        {/* Logo + Site Name */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Logo */}
          <Box
            sx={{
              backgroundColor: "#F25C54",
              width: 32,
              height: 32,
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 1,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontSize: "1rem",
                color: "white",
                lineHeight: 1,
              }}
            >
              S
            </Typography>
          </Box>
          <Typography
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "1.125rem",
              color: "black",
            }}
          >
            Savorly
          </Typography>
        </Box>

        {/* Nav Links */}
        <Box sx={{ display: "flex", gap: 4 }}>
          <Button
            component={NavLink}
            to="/recipes"
            sx={{
              color: (theme) => (theme.palette.mode === "light" ? "black" : "white"),
              textTransform: "none",
              fontWeight: 500,
              "&.active": {
                color: "#F25C54",
              },
            }}
          >
            Recipes
          </Button>
          <Button
            component={NavLink}
            to="/categories"
            sx={{
              color: (theme) => (theme.palette.mode === "light" ? "#777" : "#EEE"),
              textTransform: "none",
              fontWeight: 500,
              "&.active": {
                color: "#F25C54",
              },
            }}
          >
            Categories
          </Button>
          <Button
            component={NavLink}
            to="/my_kitchen"
            sx={{
              color: (theme) => (theme.palette.mode === "light" ? "#777" : "#EEE"),
              textTransform: "none",
              fontWeight: 500,
              "&.active": {
                color: "#F25C54",
              },
            }}
          >
            My Kitchen
          </Button>
        </Box>

        {/* Search, Bell, Avatar */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton size="large" aria-label="search">
            <SearchIcon sx={{ color: "#555" }} />
          </IconButton>
          <IconButton size="large" aria-label="notifications">
            <NotificationsIcon sx={{ color: "#555" }} />
          </IconButton>
          <Button component={NavLink} to="/profile">
            <Avatar
              sx={{
                bgcolor: "#B5EAEA",
                color: "#2F3C7E",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              A
            </Avatar>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
