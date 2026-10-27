"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./home.css";
import AllRecipes from "../../../components/homeComponents/AllRecipes";
import { useContext } from "react";
import { IsLoginContext } from "@/context/isLoginContext";
import { useToast } from "@/context/ToastContext";
function Home1() {
  const { showToast } = useToast();

  const router = useRouter();
  const { isToken, setOpenMoadle } = useContext(IsLoginContext);
  const handleAddRecipeClick = () => {
    if (isToken) {
      router.push("/AddRecipes");
    } else {
      setOpenMoadle(true);
      showToast("You must log in to access this page", "error");
    }
  };
  return (
    <div className="home">
      <div className="container">
        <section>
          <div className="left">
            <h1>Share Your Favorite Recipe with the World</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
              corrupti modi in illo asperiores nam eum atque non consequatur.
              Enim.
            </p>

            <button onClick={handleAddRecipeClick}>Shere Your Recipe</button>
          </div>
          <div className="right">
            <Image
              src="/photo1.png"
              alt="صورة المطعم"
              width={200}
              height={200}
            />
          </div>
        </section>
      </div>
      <div className="bg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#ff9560"
            fillOpacity="1"
            d="M0,256L16,250.7C32,245,64,235,96,234.7C128,235,160,245,192,245.3C224,245,256,235,288,202.7C320,171,352,117,384,101.3C416,85,448,107,480,149.3C512,192,544,256,576,256C608,256,640,192,672,138.7C704,85,736,43,768,26.7C800,11,832,21,864,48C896,75,928,117,960,149.3C992,181,1024,203,1056,181.3C1088,160,1120,96,1152,96C1184,96,1216,160,1248,170.7C1280,181,1312,139,1344,149.3C1376,160,1408,224,1424,256L1440,288L1440,320L1424,320C1408,320,1376,320,1344,320C1312,320,1280,320,1248,320C1216,320,1184,320,1152,320C1120,320,1088,320,1056,320C1024,320,992,320,960,320C928,320,896,320,864,320C832,320,800,320,768,320C736,320,704,320,672,320C640,320,608,320,576,320C544,320,512,320,480,320C448,320,416,320,384,320C352,320,320,320,288,320C256,320,224,320,192,320C160,320,128,320,96,320C64,320,32,320,16,320L0,320Z"
          ></path>
        </svg>
      </div>
      {/* المنتجات */}
      <div className="container">
        <AllRecipes type="null" />
      </div>
    </div>
  );
}

export default Home1;
