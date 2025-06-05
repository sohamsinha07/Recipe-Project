import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { auth } from "../firebase";
import axios from "axios";
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
  Stack,
} from "@mui/material";
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleLogo from "../assets/providerLogos/google.png";
import GithubLogo from "../assets/providerLogos/github.png";

import "../styles/loginAndRegister.css";

export default function LoginModal({ open, onClose }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const toggleShow = () => setShowPwd((prev) => !prev);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login({ email, password });
      setErrorMsg("");
      onClose();
      navigate("/my_kitchen");
    } catch (err) {
      const msg = err.response?.data?.error || "Login failed";
      setErrorMsg(msg);
    }
  };

  const handleProviderLogin = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();

      // Ensure Firestore profile exists
      await axios.post("/auth/provider", { idToken });

      await login({ firebaseUser: user });
      onClose();
      navigate("/my_kitchen");
    } catch (err) {
      console.error("OAuth sign-in failed:", err);
      setErrorMsg("Provider login failed");
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
      {/* Dialog Title */}
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
        <Stack direction="row" spacing={2} justifyContent="center" mb={3}>
          <Tooltip title="Google">
            <IconButton
              onClick={() => handleProviderLogin(new GoogleAuthProvider())}
              sx={circleStyle}
            >
              <Box
                component="img"
                src={GoogleLogo}
                alt="Google logo"
                sx={{ width: 24, height: 24 }}
              />
            </IconButton>
          </Tooltip>

          <Tooltip title="GitHub">
            <IconButton
              onClick={() => handleProviderLogin(new GithubAuthProvider())}
              sx={circleStyle}
            >
              <Box
                component="img"
                src={GithubLogo}
                alt="GitHub logo"
                sx={{ width: 24, height: 24 }}
              />
            </IconButton>
          </Tooltip>
        </Stack>

        {/* Don't have an account? prompt */}
        <Box sx={{ display: "flex", alignItems: "center", mt: 3, mb: 3 }}>
          <Divider sx={{ flexGrow: 1 }} />

          <Typography className="login-divider-text">Don't have an account?</Typography>

          <Divider sx={{ flexGrow: 1 }} />
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            className="login-register-button"
            onClick={() => {
              onClose(); // first close the modal
              navigate("/register"); // then navigate to /register
            }}
          >
            Register
          </Button>
        </Box>
      </DialogContent>

      <DialogActions className="login-dialog-actions"></DialogActions>
    </Dialog>
  );
}

const circleStyle = {
  width: 48,
  height: 48,
  backgroundColor: "rgba(0,0,0,0.12)",
  "&:hover": { backgroundColor: "rgba(0,0,0,0.15)" },
};
