import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
  FaEnvelope,
} from "react-icons/fa";
import "./headerAndFooter.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-text">
          <p>&copy; 2026 Recipe App. All rights reserved.</p>
        </div>

        <div className="footer-icons">
          <Link
            href="https://facebook.com"
            target="_blank"
            className="icon-box"
          >
            <FaFacebookF />
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            className="icon-box"
          >
            <FaInstagram />
          </Link>
          <Link
            href="https://telegram.org"
            target="_blank"
            className="icon-box"
          >
            <FaTelegramPlane />
          </Link>
          <Link href="mailto:example@email.com" className="icon-box">
            <FaEnvelope />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
