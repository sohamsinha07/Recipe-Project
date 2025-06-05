import { useState, useEffect } from "react";
import { Box } from "@mui/material";

import TitleSection from "../components/homepage/TitleSection";
import StatsSection from "../components/homepage/StatsSection";
import FeaturesSection from "../components/homepage/FeaturesSection";
import NewSection from "../components/homepage/NewSection";
import PopularSection from "../components/homepage/PopularSection";
import CategorySection from "../components/homepage/CategorySection";
import Footer from "../components/homepage/Footer";

let hasSeenHomeThisSession = false;

export default function HomePage() {
  const initialLoading = !hasSeenHomeThisSession;
  const [loading, setLoading] = useState(initialLoading);

  useEffect(() => {
    if (initialLoading) {
      hasSeenHomeThisSession = true;

      const timer = setTimeout(() => setLoading(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [initialLoading]);

  return (
    <Box>
      {/* Pass `loading` into every section */}
      <TitleSection loading={loading} />
      <StatsSection loading={loading} />
      <FeaturesSection loading={loading} />
      <NewSection loading={loading} />
      <PopularSection loading={loading} />
      <Box sx={{ mb: 10 }} />
      {/* <CategorySection loading={loading} /> */}
      <Footer loading={loading} />
    </Box>
  );
}
