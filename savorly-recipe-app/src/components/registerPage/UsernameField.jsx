import { Box, TextField } from "@mui/material";

export default function UsernameField({
  username,
  onUsernameChange,
  onUsernameBlur,
  usernameStatus,
}) {
  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        required
        fullWidth
        variant="filled"
        label="Username"
        size="small"
        value={username}
        onChange={onUsernameChange}
        onBlur={onUsernameBlur}
        error={usernameStatus === "taken" || usernameStatus === "invalid"}
        helperText={
          usernameStatus === "checking"
            ? "Checking availability…"
            : usernameStatus === "available"
            ? "Username is available!"
            : usernameStatus === "taken"
            ? "Username is already taken!"
            : usernameStatus === "invalid"
            ? "2-32 chars: letters, numbers, _ or ."
            : ""
        }
        FormHelperTextProps={{
          sx: {
            color:
              usernameStatus === "available"
                ? "rgb(14, 165, 8)"
                : usernameStatus === "checking"
                ? "#555"
                : "tomato",
          },
        }}
        sx={{ backgroundColor: "#f5f5f5", borderRadius: 1 }}
      />
    </Box>
  );
}
