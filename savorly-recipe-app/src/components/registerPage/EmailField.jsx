import { Box, TextField } from "@mui/material";

export default function EmailField({
  email,
  onEmailChange,
  onEmailBlur,
  emailStatus,
  emailErrorMessage,
}) {
  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        required
        fullWidth
        variant="filled"
        label="Email"
        size="small"
        type="email"
        value={email}
        onChange={onEmailChange}
        onBlur={onEmailBlur}
        error={Boolean(emailErrorMessage)}
        helperText={
          emailErrorMessage ||
          (emailStatus === "checking"
            ? "Checking email…"
            : emailStatus === "available"
            ? "Email is available!"
            : emailStatus === "invalid"
            ? "Account with this email already exists."
            : "")
        }
        FormHelperTextProps={{
          sx: {
            color:
              emailStatus === "available"
                ? "lightgreen"
                : emailStatus === "checking"
                ? "#555"
                : emailErrorMessage
                ? "tomato"
                : undefined,
          },
        }}
        sx={{ backgroundColor: "#f5f5f5", borderRadius: 1 }}
      />
    </Box>
  );
}
