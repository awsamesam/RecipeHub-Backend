"use client";
import { IsLoginContext } from "@/context/isLoginContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { useToast } from "@/context/ToastContext";

function Navbar() {
  const { showToast } = useToast();

  const pathname = usePathname();
  const { setOpenMoadle, isToken, setIsToken } = useContext(IsLoginContext);

  const list = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: isToken ? "My Favourites" : "", link: "/MyFavourites" },
    { id: 3, name: isToken ? "My Recipes" : "", link: "/MyRecipes" },
    { id: 4, name: "Contact", link: "/Contact" },
    { id: 5, name: isToken ? "Log Out" : "Login", link: "#" },
  ];

  return (
    <div>
      {list.map((item) => {
        if (!item.name) return null;
        const isActive = pathname === item.link;
        return (
          <div key={item.id}>
            <Link
              href={item.link}
              className={isActive ? "active-page" : ""}
              onClick={() => {
                if (item.name == "Login") {
                  setOpenMoadle(true);
                }
                if (item.name == "Log Out") {
                  localStorage.removeItem("token");
                  window.dispatchEvent(new Event("authChanged"));
                  setIsToken(false);
                  showToast("Logged out successfully", "success");
                }
              }}
            >
              {item.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default Navbar;
