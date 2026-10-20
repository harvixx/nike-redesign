import "../styles/navbar.css";
import { useState } from "react";
import { LogIn } from "lucide-react";
import whiteLogo from "../assets/logo/whitelogo.svg"
const LINKS = ["Home", "Shop", "Cart", "Gallery"];

function Navbar() {
  const [active, setActive] = useState("Home");

  return (
    <header className="navbar">
      <div className="navbar__logo">
        <img src={whiteLogo} alt="Nike" />
      </div>

      <nav className="navbar__menu">
        {LINKS.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className={`navbar__link ${active === link ? "navbar__link--active" : ""}`}
            onClick={() => setActive(link)}
          >
            {link}
          </a>
        ))}
      </nav>

      <button className="navbar__login">
        <LogIn className="navbar__login-icon" />
        <span>Login</span>
      </button>
    </header>
  );
}

export default Navbar;