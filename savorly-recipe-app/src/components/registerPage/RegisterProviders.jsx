import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, IconButton, Tooltip, Box } from "@mui/material";
import axios from "axios";
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";

import { auth } from "../../firebase";
import { AuthContext } from "../../AuthContext";

import GoogleLogo from "../../assets/providerLogos/google.png";
import GitHubLogo from "../../assets/providerLogos/github.png";

export default function RegisterProviders() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const signIn = async (provider) => {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const idToken = await user.getIdToken();
    await axios.post("/auth/provider", { idToken }); // backend treats all providers the same
    await login({ firebaseUser: user });
    navigate("/my_kitchen");
  };

  return (
    <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
      <ProviderButton
        title="Google"
        logo={GoogleLogo}
        onClick={() => signIn(new GoogleAuthProvider())}
      />

      <ProviderButton
        title="GitHub"
        logo={GitHubLogo}
        onClick={() => signIn(new GithubAuthProvider())}
      />
    </Stack>
  );
}

function ProviderButton({ title, logo, onClick }) {
  return (
    <Tooltip title={title}>
      <IconButton onClick={onClick} sx={circleStyle}>
        <Box component="img" src={logo} alt={`${title} logo`} sx={{ width: 24, height: 24 }} />
      </IconButton>
    </Tooltip>
  );
}

const circleStyle = {
  width: 48,
  height: 48,
  backgroundColor: "rgba(0, 0, 0, 0.12)",
  "&:hover": { backgroundColor: "rgba(0,0,0,0.15)" },
};
