import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function FormHeader() {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#F25C54",
          color: "#fff",
          px: 3,
          py: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Create an account
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Please fill in the information below to create your account
        </Typography>
      </Box>
      {/* Already have an account? Login */}
      <Box sx={{ mt: 1, mb: -2, textAlign: "center" }}>
        <Typography variant="body2">
          Already have an account?{" "}
          <Button
            onClick={() => navigate("/?login=true")}
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
