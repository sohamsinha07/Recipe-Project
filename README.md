# Savorly - Recipe Project

## Description
Using a React frontend and Express backend, this web app shows a collection of both user-generated and official Edamam API-fetched recipes. Users are able to click on recipes to view more details, leave comments and ratings, and the app features a chatbot to assist users with any queries they might have. Additionally, admin accounts can review user-submitted recipes.

## Features
* Recipe Page
    * Displays both official recipes (Edamam API) and user-generated recipes (Firestore)
* Recipe Detail Page
    * Displays detailed information about a selected recipe
    * Includes section at the bottom for comments and ratings
    * Chatbot that helps with an individual recipe
    * Ability to save a recipe
* My Recipes Page
    * Toggle between recipes you have created and recipes you have saved
    * Edit/delete created recipes
* Create Recipe Page
    * Allows users to create new recipes
* Admin Page: (only shows when signed in to admin account)
    * Displays all user-submitted recipes for review
    * Allows admin to verify and publish recipes

 ## Installation Guide

 ### .env
 1. Place a .env file in the frontend (/savorly-recipe-app) and backend (/backend) directories:
 2. Frontend .env should have the following information:
   ```
   VITE_FIREBASE_API_KEY=
   VITE_FIREBASE_AUTH_DOMAIN=
   VITE_FIREBASE_PROJECT_ID=
   VITE_FIREBASE_STORAGE_BUCKET=
   VITE_FIREBASE_MESSAGING_SENDER_ID=
   VITE_FIREBASE_APP_ID=
   VITE_FIREBASE_MEASUREMENT_ID=
   ```
3. Backend .env should have the following information:
  ```
   VITE_FIREBASE_API_KEY=
   VITE_FIREBASE_AUTH_DOMAIN=
   VITE_FIREBASE_PROJECT_ID=
   VITE_FIREBASE_STORAGE_BUCKET=
   VITE_FIREBASE_MESSAGING_SENDER_ID=
   VITE_FIREBASE_APP_ID=
   VITE_FIREBASE_MEASUREMENT_ID=
   
   OPENAI_API_KEY=
   VITE_EDAMAM_API_KEY=
   VITE_EDAMAM_APP_ID=
   ```
### Backend
* First add the permissions.json file to your backend directory
* Then proceed to run the following commands to setup the backend through your terminal
    * `cd backend`
    * `npm install`
    * `npm start`

### Frontend
* Run the following commands to setup the frontend through your terminal
    * `cd frontend`
    * `npm install`
    * `npm run dev`

## How to Use Project

1. Sign in or create an account for the full experience of the website
2. Explore recipes via the recipe page
   * Navigate to specific recipes via the recipe cards to view cooking information, as well as leave or view comments and reviews
4. View your saved recipes in 'My Kitchen,' or make your own recipes by navigating to the 'Create Recipe' page.
5. As an admin of the site, head to the Admin page to approve of new user-submitted recipes.
