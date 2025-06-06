import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

/* -------------------------- validation --------------------------- */
const schema = yup.object({
  title: yup.string().required().max(120),
  description: yup.string().required().max(1000),
  totalTime: yup.number().required().positive().integer(),
  calories: yup.number().positive().integer().nullable(),
  mealType: yup.string().required(),
  servings: yup.number().required().positive().integer(),
  ingredients: yup
    .array()
    .of(
      yup.object({
        qty: yup.string(),
        unit: yup.string(),
        item: yup.string().required(),
      })
    )
    .min(1),
  instructions: yup
    .array()
    .of(
      yup.string().required()
    )
    .min(1),
  imageDataURL: yup
    .string()
    .required("Please upload an image for your recipe")
    .test(
      "is-data-url",
      "Upload a valid JPEG or PNG",
      (val) => typeof val === "string" && val.startsWith("data:image/")
    ),

  url: yup.string().url().nullable(),
});

export default function useCreateRecipeForm(onSuccess, user) {
  const navigate = useNavigate();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      totalTime: "",
      calories: "",
      mealType: "",
      servings: "",
      ingredients: [],
      instructions: [],
      imageDataURL: "",
      url: "",
    },
  });

  /* --------------------------- submit ---------------------------- */
  const onSubmit = async (values) => {
    try {
      // Build a plain‐object payload (no FormData, because we’re just sending JSON)
      const payload = {
        title: values.title,
        description: values.description,
        totalTime: Number(values.totalTime),
        calories: values.calories ? Number(values.calories) : null,
        mealType: values.mealType,
        servings: Number(values.servings),
        ingredients: JSON.stringify(values.ingredients),
        instructions: JSON.stringify(values.instructions),

        // THIS is the base64 string
        image: values.imageDataURL,

        // author / createdBy / source / status / url
        author:
          user && user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`
            : "Anonymous",
        createdBy: user?.uid || "",
        source: "user",
        status: "pending",
        url: values.url || "",
      };

      await axios.post("/create_recipe", payload);
      onSuccess?.();
    } catch (err) {
      console.error("save failed:", err.response?.data || err);
      alert(err.response?.data?.message || "Failed to save recipe");
    }
  };

  return { ...methods, onSubmit };
}
