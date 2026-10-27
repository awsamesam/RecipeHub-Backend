import Image from "next/image";
import Navbar from "./Navbar";
import "./headerAndFooter.css";
function Header() {
  return (
    <div className="Header">
      <div className="container">
        <div className="photo">
          <Image src="/photo1.png" alt="صورة المطعم" width={200} height={200} />
        </div>
        <div className="nav">
          <Navbar />
        </div>
      </div>
    </div>
  );
}

export default Header;
