"use client";
import Recipes from "../../../components/homeComponents/Recipes";
import "../../../components/homeComponents/AllRecipes.css";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IsLoginContext } from "../../../context/isLoginContext";
import axios from "axios";
import { useToast } from "../../../context/ToastContext";

function MyFavourites() {
  const { showToast } = useToast();
  const router = useRouter();
  const { isToken, setOpenMoadle, isAuthLoading } = useContext(IsLoginContext);
  useEffect(() => {
    if (isAuthLoading) return;
    if (isToken === false) {
      router.replace("/");
      setOpenMoadle(true);
      showToast("You must log in to access this page", "error");
    }
  }, [isAuthLoading, isToken, router, setOpenMoadle, showToast]);
  const [myFavourtites, setMyFavourtites] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/favourites`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("this is res", res.data.model);
        setMyFavourtites(res.data.model);
      })
      .catch((error) => {
        const errorMsg =
          error.response?.data?.errors?.[0]?.msg ||
          error.response?.data?.message ||
          "Something went wrong";
      });
  }, []);
  return (
    <div style={{ padding: "20px" }}>
      {/* رأس الصفحة */}
      <div
        style={{
          maxWidth: "1300px",
          margin: "0 auto 30px auto",
          borderBottom: "2px solid #eee",
          paddingBottom: "15px",
        }}
      >
        <h1 style={{ fontSize: "28px", color: "#333", marginBottom: "8px" }}>
          Favorite Recipes ❤️
        </h1>
        <span style={{ color: "#666", fontSize: "16px" }}>
          Saved Recipes: <strong>{myFavourtites.length}</strong>
        </span>
      </div>

      {/* المحتوى */}
      {myFavourtites.length === 0 ? (
        <div style={{ textAlign: "center", padding: "50px", color: "#777" }}>
          <p style={{ fontSize: "18px" }}>No favorite recipes saved yet.</p>
          <span style={{ fontSize: "14px", color: "#999" }}>
            Explore recipes and add your favorites!
          </span>
        </div>
      ) : (
        <Recipes recipes={myFavourtites} type="null" />
      )}
    </div>
  );
}

export default MyFavourites;
