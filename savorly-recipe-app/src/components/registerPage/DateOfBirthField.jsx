import { Box, TextField } from "@mui/material";

export default function DateOfBirthField({ dateOfBirth, onDateChange }) {
  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        required
        fullWidth
        variant="filled"
        label="Date of Birth"
        size="small"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        value={dateOfBirth}
        onChange={onDateChange}
        sx={{ backgroundColor: "#f5f5f5", borderRadius: 1 }}
      />
    </Box>
  );
}
