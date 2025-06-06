// ----------------------------------------------------
// Run with:  node seedRecipes.js
// ----------------------------------------------------
import admin, { db } from "./firebase.js";

const AUTHOR = "David Villon";
const USER_ID = "qJWG2eJInYhaped4qOZp0lQtbhf1"; // Change to your USER_ID from firebase
const NOW = admin.firestore.Timestamp.fromDate(new Date());

const recipes = [
  {
    title: "Blueberry Banana Overnight Oats",
    image: "https://root24farms.com/wp-content/uploads/2020/06/blueberry-banana-overnight-oats.jpg",
    description: "Creamy oats soaked overnight with bananas, blueberries, and a hint of maple.",
    mealType: "Breakfast",
    totalTime: 10,
    calories: 420,
    servings: 2,
    ingredients: [
      "1 cup rolled oats",
      "1 cup unsweetened almond milk",
      "1 ripe banana, mashed",
      "1/2 cup fresh blueberries",
      "1 tbsp chia seeds",
      "1 tbsp pure maple syrup",
      "1/2 tsp vanilla extract",
    ],
    instructions: [
      "In a jar, combine oats, almond milk, mashed banana, chia seeds, maple syrup, and vanilla.",
      "Stir well, then fold in blueberries.",
      "Seal and refrigerate at least 6 hours (preferably overnight).",
      "Serve chilled; top with extra blueberries if desired.",
    ],
  },

  {
    title: "Spinach & Feta Egg Muffins",
    image:
      "https://thenaturalnurturer.com/wp-content/uploads/2023/12/SpinachFetaEggBites-11-480x270.jpg",
    description: "Portable baked egg cups loaded with spinach, feta, and sun-dried tomatoes.",
    mealType: "Breakfast",
    totalTime: 30,
    calories: 150,
    servings: 6,
    ingredients: [
      "6 large eggs",
      "1 cup fresh spinach, chopped",
      "1/3 cup crumbled feta",
      "2 tbsp sun-dried tomatoes, chopped",
      "Salt & pepper to taste",
      "Cooking spray",
    ],
    instructions: [
      "Preheat oven to 350°F (175 °C). Spray a 6-cup muffin tin.",
      "Whisk eggs with salt and pepper.",
      "Stir in spinach, feta, and sun-dried tomatoes.",
      "Divide mixture evenly; bake 18-20 min until set.",
      "Cool 5 min, then run a knife around edges to release.",
    ],
  },

  {
    title: "Chickpea Avocado Salad Wrap",
    image:
      "https://www.ambitiouskitchen.com/wp-content/uploads/fly-images/71364/buffalo-chickpea-wraps-5-1-480x270-c.jpg",
    description:
      "Mashed chickpeas and avocado tossed with crisp veggies, wrapped in a whole-wheat tortilla.",
    mealType: "Lunch",
    totalTime: 15,
    calories: 390,
    servings: 1,
    ingredients: [
      "1 (15-oz) can chickpeas, drained & rinsed",
      "1 ripe avocado",
      "1/4 cup diced cucumber",
      "1/4 cup diced red bell pepper",
      "1 tbsp fresh lime juice",
      "Salt & pepper",
      "1 large whole-wheat tortilla",
    ],
    instructions: [
      "In a bowl, mash chickpeas and avocado together.",
      "Stir in cucumber, bell pepper, lime juice, salt, and pepper.",
      "Spoon filling into tortilla, roll tightly, slice in half.",
    ],
  },

  {
    title: "Garlic Herb Baked Salmon",
    image: "https://cdn.momsdish.com/wp-content/uploads/2021/05/Garlic-Herb-Roasted-Salmon012.jpg",
    description: "Tender salmon fillets baked in foil with garlic, lemon, and fresh herbs.",
    mealType: "Dinner",
    totalTime: 25,
    calories: 480,
    servings: 2,
    ingredients: [
      "2 salmon fillets (6 oz each)",
      "2 tbsp butter, melted",
      "2 cloves garlic, minced",
      "1 tbsp fresh dill, chopped",
      "1 tbsp fresh parsley, chopped",
      "1 lemon, sliced",
      "Salt & pepper",
    ],
    instructions: [
      "Preheat oven to 400°F (200 °C).",
      "Place each salmon fillet on a sheet of foil.",
      "Stir butter, garlic, dill, parsley; brush over salmon. Season.",
      "Top with lemon slices, seal foil packets.",
      "Bake 12-14 min until flaky.",
    ],
  },

  {
    title: "Creamy Tuscan Chicken Skillet",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/creamy-tuscan-chicken-index-6583ac66027fc.jpeg?crop=0.7503795272175232xw:1xh;center,top&resize=1200:*",
    description: "Pan-seared chicken simmered in a creamy sun-dried-tomato and spinach sauce.",
    mealType: "Dinner",
    totalTime: 35,
    calories: 620,
    servings: 4,
    ingredients: [
      "4 boneless chicken breasts",
      "2 tbsp olive oil",
      "3 cloves garlic, minced",
      "1/2 cup sun-dried tomatoes, chopped",
      "1 cup heavy cream",
      "1/2 cup chicken broth",
      "2 cups baby spinach",
      "1/4 cup grated Parmesan",
      "Salt, pepper, Italian seasoning",
    ],
    instructions: [
      "Season chicken with salt, pepper, Italian seasoning; sear in olive oil 5 min per side.",
      "Add garlic, cook 30 sec.",
      "Stir in sun-dried tomatoes, cream, broth; simmer 5 min.",
      "Add spinach and Parmesan; cook until spinach wilts.",
      "Return chicken, simmer 2 min; serve.",
    ],
  },

  {
    title: "Classic Chocolate Chip Cookies",
    image:
      "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2014/7/17/1/FN_Simple-Chocolate-Chip-Cookies_s4x3.jpg.rend.hgtvcom.1280.960.suffix/1438794106265.webp",
    description: "Chewy-centered cookies loaded with semi-sweet chocolate chips.",
    mealType: "Dessert",
    totalTime: 25,
    calories: 210,
    servings: 24,
    ingredients: [
      "2 1/4 cups all-purpose flour",
      "1 tsp baking soda",
      "1/2 tsp salt",
      "1 cup unsalted butter, softened",
      "3/4 cup brown sugar",
      "3/4 cup granulated sugar",
      "2 eggs",
      "2 tsp vanilla extract",
      "2 cups chocolate chips",
    ],
    instructions: [
      "Preheat oven to 350°F (175 °C).",
      "Whisk flour, baking soda, salt.",
      "Cream butter and sugars; beat in eggs and vanilla.",
      "Stir in dry ingredients, then chocolate chips.",
      "Scoop onto baking sheet; bake 10-12 min.",
    ],
  },

  {
    title: "Strawberry Shortcake Parfaits",
    image:
      "https://daniliciousdishes.com/wp-content/uploads/2021/04/strawberry-shortcake-jars-1-3-500x375.jpg?crop=1",
    description: "Layers of vanilla pound cake, macerated strawberries, and whipped cream.",
    mealType: "Dessert",
    totalTime: 20,
    calories: 330,
    servings: 4,
    ingredients: [
      "2 cups fresh strawberries, diced",
      "2 tbsp sugar",
      "1 tsp lemon zest",
      "2 cups whipped cream",
      "8 oz vanilla pound cake, cubed",
    ],
    instructions: [
      "Toss strawberries with sugar and lemon zest; sit 10 min.",
      "Layer pound-cake cubes, berries, whipped cream in glasses.",
      "Repeat layers; finish with berries on top. Serve immediately.",
    ],
  },

  {
    title: "Spicy Roasted Chickpeas",
    image: "https://s.lightorangebean.com/media/20240914141910/Spicy-Roasted-Chickpeas_-done.png",
    description: "Crispy oven-roasted chickpeas seasoned with smoked paprika and cayenne.",
    mealType: "Snack",
    totalTime: 45,
    calories: 180,
    servings: 4,
    ingredients: [
      "1 (15-oz) can chickpeas, drained & dried",
      "1 tbsp olive oil",
      "1 tsp smoked paprika",
      "1/2 tsp garlic powder",
      "1/4 tsp cayenne pepper",
      "1/4 tsp salt",
    ],
    instructions: [
      "Preheat oven to 400°F (200 °C). Pat chickpeas dry.",
      "Toss with oil and spices; spread on baking sheet.",
      "Roast 30-35 min, shaking pan halfway, until crispy.",
      "Cool completely before storing.",
    ],
  },

  {
    title: "Honey Lime Fruit Skewers",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSshVUB7-jOyDYcwOG5TM5ZcCoN7IalfeVePA&s",
    description: "Colorful fruit skewers brushed with a honey-lime glaze and fresh mint.",
    mealType: "Snack",
    totalTime: 15,
    calories: 140,
    servings: 6,
    ingredients: [
      "1 cup pineapple chunks",
      "1 cup strawberries, halved",
      "1 cup green grapes",
      "1 cup cantaloupe cubes",
      "2 tbsp honey",
      "1 tbsp fresh lime juice",
      "1 tbsp chopped mint",
      "12 wooden skewers",
    ],
    instructions: [
      "Thread fruit alternately onto skewers.",
      "Whisk honey, lime juice, mint; brush over fruit.",
      "Serve immediately or chill 10 min for extra flavour.",
    ],
  },
];

function enrich(rec) {
  return {
    ...rec,
    author: AUTHOR,
    createdBy: USER_ID,
    source: "user",
    status: "pending",
    averageRating: 0,
    ratings: [],
    favorited: false,
    createdAt: NOW,
  };
}

async function seed() {
  try {
    console.log("⏳  Seeding recipes…");
    const batch = db.batch();
    const newIds = [];

    recipes.map(enrich).forEach((r) => {
      const ref = db.collection("recipes").doc(); // auto-id
      newIds.push(ref.id);
      batch.set(ref, r);
    });

    // add them to users/{UID}.draftRecipes
    const userRef = db.collection("users").doc(USER_ID);
    batch.update(userRef, {
      draftRecipes: admin.firestore.FieldValue.arrayUnion(...newIds),
    });

    await batch.commit();
    console.log("✅  Added", recipes.length, "recipes.");

    console.log("Done!");
    process.exit(0);
  } catch (err) {
    console.error("❌  Seed failed:", err);
    process.exit(1);
  }
}

seed();
