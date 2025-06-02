import TitleSection from "../components/homepage/TitleSection";
import StatsSection from "../components/homepage/StatsSection";
import FeaturesSection from "../components/homepage/FeaturesSection";
import PopularSection from "../components/homepage/PopularSection";
import CategorySection from "../components/homepage/CategorySection";
import Footer from "../components/homepage/Footer";

export default function HomePage() {
  return (
    <div>
      <TitleSection />
      <StatsSection />
      <FeaturesSection />
      <PopularSection />
      <CategorySection />
      <Footer />
    </div>
  );
}
