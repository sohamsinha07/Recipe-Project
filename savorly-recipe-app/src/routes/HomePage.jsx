import { useState, useEffect } from "react";
import { Box } from "@mui/material";

import TitleSection from "../components/homepage/TitleSection";
import StatsSection from "../components/homepage/StatsSection";
import FeaturesSection from "../components/homepage/FeaturesSection";
import PopularSection from "../components/homepage/PopularSection";
import CategorySection from "../components/homepage/CategorySection";
import Footer from "../components/homepage/Footer";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // After 5 seconds, flip loading→false
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box>
      {/* Pass `loading` into every section */}
      <TitleSection loading={loading} />
      <StatsSection loading={loading} />
      <FeaturesSection loading={loading} />
      <PopularSection loading={loading} />
      <CategorySection loading={loading} />
      <Footer loading={loading} />
    </Box>
  );
}
