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
      yup.object({
        value: yup.string().required(),
      })
    )
    .min(1),
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
      url: "",
    },
  });

  /* --------------------------- submit ---------------------------- */
  const onSubmit = async (values) => {
    try {
      const fd = new FormData();

      Object.entries(values).forEach(([k, v]) => {
        if (k === "ingredients" || k === "instructions") {
          fd.append(k, JSON.stringify(v));
        } else {
          fd.append(k, v);
        }
      });

      // 1) author: “First Last” or “Anonymous”
      if (user && user.firstName && user.lastName) {
        fd.append("author", `${user.firstName} ${user.lastName}`);
      } else {
        fd.append("author", "Anonymous");
      }

      // 2) createdBy: <UID>
      if (user && user.uid) {
        fd.append("createdBy", user.uid);
      } else {
        // In case something is off, we still send an empty string:
        fd.append("createdBy", "");
      }
      // 3) source: always “user” for a user‐generated recipe
      fd.append("source", "user");

      // 4) status: initially “pending”
      fd.append("status", "pending");
      fd.append("url", values.url || "");

      await axios.post("/create_recipe", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onSuccess?.();
    } catch (err) {
      console.error("save failed:", err.response?.data || err);
      alert(err.response?.data?.message || "Failed to save recipe");
    }
  };

  return { ...methods, onSubmit };
}
