"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "@/context/ToastContext";
import { IsLoginContext } from "../../context/isLoginContext";

export default function EditRecipeClient({ recipeId }) {
  const { showToast } = useToast();
  const router = useRouter();
  const { isToken, setOpenMoadle, isAuthLoading } = useContext(IsLoginContext);

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  useEffect(() => {
    if (isAuthLoading) return;
    if (isToken === false) {
      router.replace("/");
      setOpenMoadle(true);
      showToast("You must log in to access this page", "error");
    }
  }, [ isAuthLoading,
  isToken,
  router,
  setOpenMoadle,
  showToast,]);
  useEffect(() => {
    if (isAuthLoading || isToken !== true || !recipeId) return;
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/recipe/${recipeId}`)
      .then((res) => {
        setTitle(res.data.model.title);
        setIngredients(res.data.model.ingredients);
        setInstructions(res.data.model.instructions);
        setCoverImage(res.data.model.coverImage);
      })
      .catch((error) => {
        const errorMsg =
          error.response?.data?.errors?.[0]?.msg ||
          error.response?.data?.message ||
          "Something went wrong";
        showToast(errorMsg, "error");
      });
  }, [recipeId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("ingredients", ingredients);
    formData.append("instructions", instructions);
    if (coverImage && coverImage instanceof File) {
      formData.append("coverImage", coverImage);
    }
    const token = localStorage.getItem("token");

    axios
      .put(`http://localhost:5000/api/recipe/${recipeId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        router.push(`/MyRecipes`);
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
    <div className="edit-recipe-container">
      <form onSubmit={handleSubmit} className="edit-recipe-form">
        <div className="form-group">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            placeholder="Title"
          />
        </div>
        <div className="form-group">
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="form-textarea"
            rows="3"
            placeholder="Ingredients"
          />
        </div>
        <div className="form-group">
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="form-textarea"
            rows="3"
            placeholder="Instructions"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Add Image</label>
          <input
            type="file"
            onChange={(e) => setCoverImage(e.target.files[0])}
            className="form-file-input"
          />
        </div>
        <button type="submit" className="edit-submit-btn">
          Edit Recipe
        </button>
      </form>
    </div>
  );
}
