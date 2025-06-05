import { Box, Button, Divider, Typography } from "@mui/material";
import RegisterProviders from "./RegisterProviders";

import "../../styles/loginAndRegister.css";

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
      <Box sx={{ display: "flex", alignItems: "center", mb: 2, mt: 2 }}>
        <Divider sx={{ flexGrow: 1 }} />

        <Typography className="register-divider-text">or register with</Typography>

        <Divider sx={{ flexGrow: 1 }} />
      </Box>
      <RegisterProviders /> {/* round provider buttons */}
    </>
  );
}
