import { Box, Button, Divider, Typography } from "@mui/material";
import RegisterProviders from "./RegisterProviders";

export default function SubmitSection({ onSubmitError }) {
  return (
    <>
      {/* Form‐level error message */}
      {onSubmitError && (
        <Box sx={{ mt: 1 }}>
          <Typography color="error" variant="body2" align="center">
            {onSubmitError}
          </Typography>
        </Box>
      )}
      {/* Create Account Button */}
      <Box sx={{ mt: 3 }}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "#F25C54",
            color: "#fff",
            textTransform: "none",
            fontWeight: 600,
            py: 1.2,
            "&:hover": { backgroundColor: "#C94D44" },
          }}
        >
          Create account
        </Button>
      </Box>
      {/* divider + providers */}
      <Box mt={3} textAlign="center">
        <Divider sx={{ flexGrow: 1 }} />
        <Typography
          sx={{
            mt: -1.2,
            px: 1.5,
            display: "inline-block",
            backgroundColor: "#fff",
            color: "#777",
            fontWeight: 500,
            fontSize: "0.75rem",
          }}
        >
          or register with
        </Typography>
      </Box>
      <RegisterProviders /> {/* round provider buttons */}
    </>
  );
}
