import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import OpenAi from "openai";
import cors from "cors";

dotenv.config(); // Load the .env file

const app = express();
const port = 3000;

import chatbotRouter from "./routes/chatbot.js";
import edamamRouter from "./routes/edamam.js";
import recipeDetailsRouter from "./routes/recipe-details.js";
import recipeRoutes from "./routes/recipespage.js";
import authRouter from "./routes/auth.js";
import createRouter from "./routes/create.js";
import adminRouter from "./routes/admin.js";
import notificationsRouter from "./routes/notifications.js";
import myKitchenRecipesRouter from "./routes/myKitchenRecipes.js"

// use middleware to parse json request bodies
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// use routes
app.use("/chat", chatbotRouter);
app.use("/edamam", edamamRouter);
app.use("/recipe-details", recipeDetailsRouter);
app.use("/recipes", recipeRoutes);
app.use("/auth", authRouter);
app.use("/create_recipe", createRouter);
app.use("/api/admin", adminRouter);
app.use("/api/notifications", notificationsRouter);
app.use("/my_kitchen/recipes", myKitchenRecipesRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
