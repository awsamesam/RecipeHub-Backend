"use client";

import { createContext, useEffect, useState } from "react";

export const IsLoginContext = createContext();

export function IsLoginProvider({ children }) {
  const [isLogin, setIsLogin] = useState(true);
  const [openMoadle, setOpenMoadle] = useState(false);
  const [isToken, setIsToken] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsToken(!!token);
    setIsAuthLoading(false);
  }, []);
  return (
    <IsLoginContext.Provider
      value={{
        isLogin,
        setIsLogin,
        openMoadle,
        setOpenMoadle,
        isToken,
        setIsToken,
        setIsAuthLoading,
        isAuthLoading,
      }}
    >
      {children}
    </IsLoginContext.Provider>
  );
}
