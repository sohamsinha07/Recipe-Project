import { Stack, TextField } from "@mui/material";

export default function NameFields({ firstName, lastName, onFirstNameChange, onLastNameChange }) {
  return (
    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
      <TextField
        required
        fullWidth
        variant="filled"
        size="small"
        label="First name"
        value={firstName}
        onChange={onFirstNameChange}
        sx={{ backgroundColor: "#f5f5f5", borderRadius: 1 }}
      />
      <TextField
        required
        fullWidth
        variant="filled"
        size="small"
        label="Last name"
        value={lastName}
        onChange={onLastNameChange}
        sx={{ backgroundColor: "#f5f5f5", borderRadius: 1 }}
      />
    </Stack>
  );
}
