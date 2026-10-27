"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";
import axios from "axios";
import "./AddRecipes.css";
import { IsLoginContext } from "../../../context/isLoginContext";
function AddRecipes() {
  const { showToast } = useToast();
  const { isToken, setOpenMoadle, isAuthLoading } = useContext(IsLoginContext);
  const router = useRouter();
  useEffect(() => {
    if (isAuthLoading) return;
    if (isToken === false) {
      router.replace("/");
      setOpenMoadle(true);
      showToast("You must log in to access this page", "error");
    }
  }, [isAuthLoading, isToken, router, setOpenMoadle, showToast]);
  const [recipes, setRecipes] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    coverImage: null,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("title", recipes.title);
    formData.append("ingredients", recipes.ingredients);
    formData.append("instructions", recipes.instructions);
    if (recipes.coverImage) {
      formData.append("coverImage", recipes.coverImage);
    }
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/recipe`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        router.push("/");
        showToast(res.data.message, "success");
      })
      .catch((error) => {
        const errorMsg =
          error.response?.data?.errors?.[0]?.msg ||
          error.response?.data?.message ||
          "Something went wrong";
        showToast(errorMsg, "error");
      });
  };
  return (
    <div className="add-recipe-container">
      <form onSubmit={handleSubmit} className="recipe-form">
        {/* حقل اسم الوصفة */}
        <div>
          <input
            name="title"
            type="text"
            className="form-input"
            placeholder="Pasta"
            value={recipes.title}
            onChange={(e) => {
              setRecipes({ ...recipes, [e.target.name]: e.target.value });
            }}
          />
        </div>
        {/* حقل المكونات */}
        <div>
          <textarea
            name="ingredients"
            className="form-textarea"
            placeholder="Pasta, Olive oil, Garlic, Parmesan"
            value={recipes.ingredients}
            onChange={(e) => {
              setRecipes({ ...recipes, [e.target.name]: e.target.value });
            }}
            rows="3"
          />
        </div>
        {/* حقل خطوات التحضير */}
        <div>
          <textarea
            name="instructions"
            className="form-textarea"
            placeholder="Boil pasta, sauté garlic in olive oil, mix together, and sprinkle with Parmesan"
            value={recipes.instructions}
            onChange={(e) => {
              setRecipes({ ...recipes, [e.target.name]: e.target.value });
            }}
            rows="4"
          />
        </div>
        {/* حقل رفع الصورة */}
        <div className="image-upload-group">
          <label className="image-label">Add Image</label>
          <input
            name="coverImage"
            type="file"
            className="file-input"
            accept="image/*"
            onChange={(e) => {
              setRecipes({ ...recipes, [e.target.name]: e.target.files[0] });
            }}
          />
        </div>
        {/* زر الإرسال */}
        <div>
          <button type="submit" className="submit-btn">
            Add Recipe
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddRecipes;
