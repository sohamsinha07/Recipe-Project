import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import OpenAi from "openai";
import cors from "cors";
import db from './firebase.js';


dotenv.config(); // Load the .env file

const app = express();
const port = 3000;

import chatbotRouter from './routes/chatbot.js'
import edamamRouter from './routes/edamam.js'
import recipeDetailsRouter from './routes/recipe-details.js'
import recipeRoutes from './routes/recipespage.js'

// use middleware to parse json request bodies
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// use routes
app.use("/chat", chatbotRouter);
app.use("/edamam", edamamRouter);
app.use("/recipe-details", recipeDetailsRouter)
app.use("/recipes", recipeRoutes);


app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});

