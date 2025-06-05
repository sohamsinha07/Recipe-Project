import { Tabs, Tab, Box } from "@mui/material";

export default function KitchenTabs({ value, onChange }) {
  const handleChange = (_, newValue) => onChange(newValue);

  return (
    <Box mt={5} borderBottom={1} borderColor="divider">
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="inherit"
        indicatorColor="error"
      >
        <Tab value="my"      label="My Recipes" />
        <Tab value="saved"   label="Saved Recipes" />
      </Tabs>
    </Box>
  );
}