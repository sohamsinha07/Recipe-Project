import { db } from './firebase'; // assume Firestore initialized
import { doc, setDoc, getDoc } from 'firebase/firestore';

async function saveEdamamRecipe(edamamRecipe) {
  const recipeId = encodeURIComponent(edamamRecipe.uri);
  const docRef = doc(db, 'recipes', recipeId);

  const existingDoc = await getDoc(docRef);
  if (existingDoc.exists()) {
    return; // already saved
  }

  const recipeData = {
    id: recipeId,
    source: 'edamam',
    label: edamamRecipe.label,
    image: edamamRecipe.image,
    ingredients: edamamRecipe.ingredientLines,
    instructions: '',
    url: edamamRecipe.url,
    servings: edamamRecipe.yield,
    calories: edamamRecipe.calories,
    totalTime: edamamRecipe.totalTime,
    createdBy: null,
    createdAt: new Date()
  };

  await setDoc(docRef, recipeData);
}
