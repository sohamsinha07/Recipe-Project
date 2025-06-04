import { useState } from "react";
import { Container, Box } from "@mui/material";
import KitchenHeader from "../components/mykitchen/KitchenHeader";
import KitchenTabs from "../components/mykitchen/KitchenTabs";
import KitchenControls from "../components/mykitchen/KitchenControls";
import RecipeGrid from "../components/mykitchen/RecipeGrid";

export default function MyKitchenPage() {
  const [activeTab, setActiveTab] = useState("my");
  const [viewMode, setViewMode] = useState("grid");

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>     
      <KitchenHeader />

      <KitchenTabs value={activeTab} onChange={setActiveTab} />

      <KitchenControls viewMode={viewMode} onViewChange={setViewMode} />

    </Container>
  );
}