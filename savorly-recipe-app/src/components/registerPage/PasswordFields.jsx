import { Box, TextField, IconButton, LinearProgress, Typography, Stack } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function PasswordFields({
  password,
  onPasswordChange,
  confirmPassword,
  onConfirmPasswordChange,
  onConfirmPasswordBlur,
  confirmErrorMessage,
  showPwd,
  toggleShowPwd,
  showConfirm,
  toggleShowConfirm,
}) {
  // Compute strength meter values here (or pass them in as props instead)
  const length = password.length;
  const pct = Math.min((length * 100) / 10, 100);
  const hue = Math.min(length * 12, 120);
  const strengthLabel = () => {
    if (length < 3) return "Very weak";
    if (length < 6) return "Weak";
    if (length < 10) return "Strong";
    return "Very strong";
  };

  return (
    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <TextField
          required
          fullWidth
          type={showPwd ? "text" : "password"}
          label="Password"
          variant="filled"
          size="small"
          value={password}
          onChange={onPasswordChange}
          InputProps={{
            endAdornment: (
              <IconButton onClick={toggleShowPwd} edge="end" size="small">
                {showPwd ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
              </IconButton>
            ),
          }}
          sx={{ backgroundColor: "#f5f5f5", borderRadius: 1 }}
        />

        {/* Password strength meter */}
        <Box sx={{ mt: 1 }}>
          <LinearProgress
            variant="determinate"
            value={pct}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: "#eeeeee",
              "& .MuiLinearProgress-bar": {
                backgroundColor: `hsl(${hue}, 80%, 50%)`,
              },
            }}
          />
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              color: `hsl(${hue}, 80%, 40%)`,
              fontWeight: 600,
              textAlign: "right",
            }}
          >
            {strengthLabel()}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ flex: 1 }}>
        <TextField
          required
          fullWidth
          type={showConfirm ? "text" : "password"}
          label="Confirm Password"
          variant="filled"
          size="small"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
          onBlur={onConfirmPasswordBlur}
          error={Boolean(confirmErrorMessage)}
          helperText={confirmErrorMessage}
          InputProps={{
            endAdornment: (
              <IconButton onClick={toggleShowConfirm} edge="end" size="small">
                {showConfirm ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
              </IconButton>
            ),
          }}
          sx={{ backgroundColor: "#f5f5f5", borderRadius: 1 }}
        />
      </Box>
    </Stack>
  );
}
