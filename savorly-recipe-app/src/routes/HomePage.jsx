import { useState, useEffect, useContext } from "react";
import { Box } from "@mui/material";
import { AuthContext } from "../AuthContext";

import TitleSection from "../components/homepage/TitleSection";
import StatsSection from "../components/homepage/StatsSection";
import FeaturesSection from "../components/homepage/FeaturesSection";
import NewSection from "../components/homepage/NewSection";
import PopularSection from "../components/homepage/PopularSection";
// import CategorySection from "../components/homepage/CategorySection";
import LoginModal from "../components/LoginModal";
import Footer from "../components/homepage/Footer";

let hasSeenHomeThisSession = false;

export default function HomePage() {
  const { user } = useContext(AuthContext);

  const initialLoading = !hasSeenHomeThisSession;
  const [loading, setLoading] = useState(initialLoading);

  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    if (initialLoading) {
      hasSeenHomeThisSession = true;

      const timer = setTimeout(() => setLoading(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [initialLoading]);

  const openLoginModal = () => {
    setLoginOpen(true);
  };
  const closeLoginModal = () => {
    setLoginOpen(false);
  };

  return (
    <Box>
      {/* Pass `loading` into every section */}
      <TitleSection loading={loading} user={user} onRequireLogin={openLoginModal} />
      <StatsSection loading={loading} />
      <FeaturesSection loading={loading} user={user} onRequireLogin={openLoginModal} />
      <NewSection loading={loading} user={user} onRequireLogin={openLoginModal} />
      <PopularSection loading={loading} user={user} onRequireLogin={openLoginModal} />
      <Box sx={{ mb: 10 }} />
      {/* <CategorySection loading={loading} /> */}
      <Footer loading={loading} />
      <LoginModal open={loginOpen} onClose={closeLoginModal} />
    </Box>
  );
}
