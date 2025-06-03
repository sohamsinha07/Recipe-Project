import { useState } from "react";
import { Container, Box } from "@mui/material";
import KitchenHeader from "../components/mykitchen/KitchenHeader";
import KitchenTabs from "../components/mykitchen/KitchenTabs";
import KitchenControls from "../components/mykitchen/KitchenControls";
import KitchenStats from "../components/mykitchen/KitchenStats";
import RecipeGrid from "../components/mykitchen/RecipeGrid";

/* placeholder---swap this out for Firestore / Edamam results later */
const mockRecipes = [
  {
    id: "1",
    title: "Mediterranean Quinoa Bowl",
    description: "Healthy and delicious bowl with fresh vegetables",
    status: "Published",
    views: 234,
    likes: 18,
    gradient: "linear-gradient(135deg,#ff5858 0%,#ff9e42 100%)",
  },
  {
    id: "2",
    title: "Spicy Thai Green Curry",
    description: "Authentic Thai curry with coconut milk",
    status: "Draft",
    views: 0,
    likes: 0,
    gradient: "linear-gradient(135deg,#eaffc3 0%,#b0ffdc 100%)",
  },
  {
    id: "3",
    title: "Classic Chocolate Cake",
    description: "Rich and moist chocolate cake with ganache",
    status: "Published",
    views: 567,
    likes: 42,
    gradient: "linear-gradient(135deg,#efbc9b 0%,#cfd9df 100%)",
  },
  {
    id: "4",
    title: "Fresh Garden Salad",
    description: "Crisp vegetables with homemade vinaigrette",
    status: "Published",
    views: 123,
    likes: 9,
    gradient: "linear-gradient(135deg,#c2f9cb 0%,#8fd3f4 100%)",
  },
  {
    id: "5",
    title: "Draft",
    description: "",
    status: "Draft",
    views: 0,
    likes: 0,
    gradient: "linear-gradient(135deg,#d4beab 0%,#c6c1ab 100%)",
  },
];

export default function MyKitchenPage() {
  const [activeTab, setActiveTab] = useState("my");
  const [viewMode, setViewMode] = useState("grid");

  const stats = { created: 12, published: 8, drafts: 4, views: 1247 };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <KitchenHeader />

      <KitchenTabs value={activeTab} onChange={setActiveTab} />

      <KitchenControls viewMode={viewMode} onViewChange={setViewMode} />

      <KitchenStats {...stats} />

      <Box mt={4}>
        <RecipeGrid recipes={mockRecipes} view={viewMode} />
      </Box>
    </Container>
  );
}