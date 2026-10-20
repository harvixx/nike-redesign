import "../styles/loader.css";
// apne asli paths ke hisaab se imports rakh
import whiteLogo from "../assets/logo/whitelogo.svg";
import blackLogo from "../assets/logo/blacklogo.png";

function Loader() {
  return (
    <div className="loader">
      {/* faint background logos (hero jaise) */}
      <div className="background_logo">
        <img src={blackLogo} alt="" className="background_logo__img background_logo__img--small" />
        <img src={blackLogo} alt="" className="background_logo__img background_logo__img--medium" />
        <img src={blackLogo} alt="" className="background_logo__img background_logo__img--large" />
      </div>

      {/* center logo: dim base + white fill (left to right) */}
      <div className="loader__logo">
        <img src={whiteLogo} alt="Nike" className="loader__base" />
        <img src={whiteLogo} alt="" className="loader__fill" />
      </div>
    </div>
  );
}

export default Loader;