"use client";

import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import { useToast } from "../../context/ToastContext";
function FaHeart1({ item }) {
  const { showToast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    const checkFavorite = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsFavorite(false);
        return;
      }

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/favourites`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!active) return;

        const favorites = res.data.model || [];

        setIsFavorite(favorites.some((recipe) => recipe._id === item._id));
      } catch (error) {
        if (active) {
          setIsFavorite(false);
          console.log(error);
        }
      }
    };

    checkFavorite();

    window.addEventListener("authChanged", checkFavorite);

    return () => {
      active = false;
      window.removeEventListener("authChanged", checkFavorite);
    };
  }, [item._id]);

  async function handleClickMyFavouritesContext() {
    const token = localStorage.getItem("token");

    if (!token || loading) return;

    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/favourites/${item._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setIsFavorite(res.data.message === "Added to favourites successfully");
      showToast(res.data.message, isFavorite ? "error" : "success");
    } catch (error) {
      const errorMsg =
            error.response?.data?.errors?.[0]?.msg ||
            error.response?.data?.message ||
            "Something went wrong";
      showToast(errorMsg,"error")
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="right"
      onClick={handleClickMyFavouritesContext}
      style={{
        cursor: loading ? "wait" : "pointer",
        opacity: loading ? 0.6 : 1,
      }}
    >
      <FaHeart
        className="heart-icon"
        title={isFavorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
        style={{
          color: isFavorite ? "red" : "gray",
          transition: "color 0.2s ease",
        }}
      />
    </div>
  );
}

export default FaHeart1;
