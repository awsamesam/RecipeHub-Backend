"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Recipes from "./Recipes";
import SearchRecipes from "./SearchRecipes";
import Pagination from "./Pagination";
import { useToast } from "@/context/ToastContext";
import "./AllRecipes.css";

function AllRecipes({ type }) {
  const { showToast } = useToast();

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch recipes
  useEffect(() => {
    const timer = setTimeout(() => {
      const token = localStorage.getItem("token");
      setLoading(true);
      const endpoint =
        type === "my-recipes"
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/recipe/my-recipes`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/recipe`;

      const config = {
        params: {
          keyword: search.trim(),
          page: currentPage,
        },
        ...(type === "my-recipes" && token
          ? {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          : {}),
      };

      axios
        .get(endpoint, config)
        .then((res) => {
          setRecipes(res.data.model || []);

          setNumberOfPages(
            Math.max(1, Number(res.data.paginationResult?.numberOfPages) || 1),
          );
        })
        .catch((error) => {
          const errorMsg =
            error.response?.data?.errors?.[0]?.msg ||
            error.response?.data?.message ||
            "Something went wrong";
          showToast(errorMsg, "error");
        })
        .finally(() => {
          setLoading(false);
        });
    }, 1000);

    return () => clearTimeout(timer);
  }, [type, search, currentPage]);

  // Change page
  const handlePageChange = (page) => {
    if (page < 1 || page > numberOfPages) return;

    setCurrentPage(page);
  };

  // Delete recipe
  const handleDeleteRecipe = (deletedId) => {
    setRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe._id !== deletedId),
    );

    showToast("Deleted successfully", "success");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1
        style={{
          textAlign: "left",
          marginBottom: "30px",
          color: "#333",
        }}
      >
      
        {loading && recipes.length === 0
          ? "جاري تحميل الوصفات..."
          : recipes.length === 0
            ? "Not Found Recipes"
            : `All Recipes: ${recipes.length}`}
      </h1>

      <SearchRecipes
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setCurrentPage(1);
        }}
      />
      <Recipes
        recipes={recipes}
        type={type}
        onDeleteSuccess={handleDeleteRecipe}
      />
      <Pagination
        currentPage={currentPage}
        numberOfPages={numberOfPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default AllRecipes;
