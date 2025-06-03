import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Divider,
  IconButton,
  Tooltip,
  Box,
  Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleLogo from "../assets/google.png";

import "../styles/loginAndRegister.css";

export default function LoginModal({ open, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const [showPwd, setShowPwd] = useState(false);
  const toggleShow = () => setShowPwd((prev) => !prev);

  const handleLogin = async () => {
    try {
      const response = await axios.post("/auth/login", { email, password });
      const { idToken, uid } = response.data;
      onClose();
      navigate("/profile");
    } catch (err) {
      const msg = err.response?.data?.error || "Login failed";
      setErrorMsg(msg);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      classes={{ paper: "login-dialog-container" }}
    >
      {/* Dialog Title with accent background */}
      <DialogTitle className="login-title">Log in to Savorly</DialogTitle>

      <DialogContent className="login-content">
        {/* Instruction text */}
        <Typography variant="body2" className="login-subtitle">
          Please enter your details to log in
        </Typography>

        {/* Email / Username field */}
        <TextField
          variant="filled"
          label="Email or username"
          required
          fullWidth
          margin="dense"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password field with show/hide toggle */}
        <TextField
          variant="filled"
          label="Password"
          required
          type={showPwd ? "text" : "password"}
          fullWidth
          margin="dense"
          className="login-password-input"
          slotProps={{
            input: {
              endAdornment: (
                <Tooltip title={showPwd ? "Hide password" : "Show password"}>
                  <IconButton onClick={toggleShow} edge="end" size="small">
                    {showPwd ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </Tooltip>
              ),
            },
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {errorMsg && (
          <Typography color="error" sx={{ mt: 1, mb: 1, textAlign: "center" }}>
            {errorMsg}
          </Typography>
        )}

        {/* Forgot password? link aligned to right */}
        <Box sx={{ textAlign: "right", mb: 2 }}>
          <Button component={Link} to="/forgot-password" className="login-forgot">
            Forgot your password?
          </Button>
        </Box>

        {/* Login Button */}
        <Button fullWidth variant="contained" className="login-button" onClick={handleLogin}>
          Login
        </Button>

        {/* "or login with" Divider (only Google) */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Divider sx={{ flexGrow: 1 }} />

          <Typography className="login-divider-text">or login with</Typography>

          <Divider sx={{ flexGrow: 1 }} />
        </Box>
        <Button
          fullWidth
          variant="outlined"
          startIcon={
            <Box
              component="img"
              src={GoogleLogo}
              alt="Google logo"
              sx={{ width: 20, height: 20 }}
            />
          }
          className="login-google-button"
        >
          Continue with Google
        </Button>

        {/* Don't have an account? prompt */}
        <Box sx={{ display: "flex", alignItems: "center", mt: 3, mb: 3 }}>
          <Divider sx={{ flexGrow: 1 }} />

          <Typography className="login-divider-text">Don't have an account?</Typography>

          <Divider sx={{ flexGrow: 1 }} />
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            component={Link}
            to="/register"
            className="login-register-button "
          >
            Register
          </Button>
        </Box>
      </DialogContent>

      <DialogActions className="login-dialog-actions"></DialogActions>
    </Dialog>
  );
}
