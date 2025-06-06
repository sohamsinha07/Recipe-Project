import { useState } from "react";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setSent(true);
    } catch (err) {
      setError(err.message.replace("Firebase:", "").trim());
    }
  };

  return (
    <Box
      maxWidth={400}
      mx="auto"
      mt={8}
      px={3}
      py={4}
      boxShadow={3}
      borderRadius={2}
      textAlign="center"
    >
      <Typography variant="h5" mb={2}>
        Reset your password
      </Typography>

      {sent ? (
        <Alert severity="success">Password-reset email sent! Check your inbox.</Alert>
      ) : (
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            type="email"
            label="Email address"
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {error && (
            <Alert severity="error" sx={{ mt: 1, mb: 1 }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, background: "#f25c54", textTransform: "none", fontWeight: "bold" }}
          >
            Send reset link
          </Button>
        </form>
      )}
    </Box>
  );
}
