"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import AllRecipes from "./homeComponents/AllRecipes";
import { useToast } from "../context/ToastContext";
import { IsLoginContext } from "../context/isLoginContext";

export default function MyRecipesClient() {
  const { showToast } = useToast();
  const { isToken, setOpenMoadle, isAuthLoading } = useContext(IsLoginContext);
  const router = useRouter();

  useEffect(() => {
    if (!isToken) {
      if (isAuthLoading) return;
      router.replace("/");
      setOpenMoadle(true);
      showToast("You must log in to access this page", "error");
    }
  }, [isAuthLoading, isToken, router, setOpenMoadle, showToast]);
  if (isAuthLoading) {
    return <div>جاري التحقق من تسجيل الدخول...</div>;
  }

  if (!isToken) {
    return null;
  }
  return (
    <div className="container">
      <AllRecipes type="my-recipes" />
    </div>
  );
}
