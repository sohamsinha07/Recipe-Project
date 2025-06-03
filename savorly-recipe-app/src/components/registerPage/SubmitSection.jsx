import { Box, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function SubmitSection({ onSubmitError }) {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    // Navigate back to "/" but with ?login=true
    navigate("/?login=true");
  };
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

      {/* Already have an account? Login */}
      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Typography variant="body2">
          Already have an account?{" "}
          <Button
            onClick={handleLoginClick}
            sx={{
              textTransform: "none",
              textDecoration: "underline",
              color: "#F25C54",
              fontWeight: 500,
              padding: 0,
              minWidth: 0,
              bottom: 1,
            }}
          >
            Login
          </Button>
        </Typography>
      </Box>
    </>
  );
}
