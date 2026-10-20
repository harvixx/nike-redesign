import { useRef, useState } from "react";
import gsap from "gsap";
import "../styles/hero.css";
// apne asli paths / file names ke hisaab se imports rakh
import blackLogo from "../assets/logo/blacklogo.png";
import blackSneaker from "../assets/shoes/blacksneaker.webp";
import blueSneaker from "../assets/shoes/bluesneaker.webp";
import orangeSneaker from "../assets/shoes/orangesneaker.webp";

const SIZES = [12, 14, 16];
const TOE = { x: 0.1, y: 0.75 };
// bg = hero background gradient ke 4 colors (center -> edge)
const SHOES = [
  { id: "black", src: blackSneaker, bg: ["#252525", "#1c1c1c", "#131313", "#0d0d0d"] },
  { id: "blue", src: blueSneaker, bg: ["#1f63dc", "#1448b4", "#0b3089", "#061b57"] },
  { id: "orange", src: orangeSneaker, bg: ["#f08a3a", "#d2661a", "#9a4208", "#4f2004"] },
];

function Hero() {
  const [size, setSize] = useState(12);
  const [qty, setQty] = useState(1);

  const heroRef = useRef(null);
  const stageRef = useRef(null);
  const shoeRefs = useRef([]);
  const current = useRef(0);
  const busy = useRef(false);

  const handleClick = (e) => {
    const hero = heroRef.current;

    // intro khatam hone ke baad hi, aur animation ke beech me nahi
    if (hero.dataset.ready !== "true" || busy.current) return;
    // buttons (size, qty, buy) pe click se joota nahi badlega (sirf ellipse knob se badlega)
    if (e.target.closest("button:not(.hero__floor-center)")) return;
    if (window.scrollY > 10) return;
    busy.current = true;

    const next = (current.current + 1) % SHOES.length;
    const outEl = shoeRefs.current[current.current];
    const inEl = shoeRefs.current[next];

    // ellipse ke right corner ki jagah (stage ke anchor point se offset)
    const corner = hero.querySelector(".hero__corner").getBoundingClientRect();
    const anchor = stageRef.current.getBoundingClientRect();
    const cx = corner.left - anchor.left;
    const cy = corner.top - anchor.top;
    // naye joote ka toe, center me aakar tilt (-15deg) hone ke baad kahan hoga
    const w = inEl.offsetWidth;
    const h = inEl.offsetHeight;
    const rad = (-15 * Math.PI) / 180;
    const lx = (TOE.x - 0.5) * w;
    const ly = (TOE.y - 0.5) * h;
    const toeX = lx * Math.cos(rad) - ly * Math.sin(rad);
    const toeY = lx * Math.sin(rad) + ly * Math.cos(rad);
    // aane wala joota corner pe 0 size se shuru
    gsap.set(inEl, { x: cx, y: cy, scale: 0, rotation: -15, autoAlpha: 1, zIndex: 2 });
    gsap.set(outEl, { zIndex: 1 });

    const bg = SHOES[next].bg;

    const tl = gsap.timeline({
      defaults: { duration: 1.2, ease: "power3.inOut" },
      onComplete: () => {
        gsap.set(outEl, { autoAlpha: 0 });
        current.current = next;
        busy.current = false;
      },
    });

    tl
      // naya joota corner se bada hoke center me
      .to(inEl, { x: 0, y: 0, scale: 1 }, 0)
      // purana joota center se corner pe 0 size me
      .to(outEl, { x: toeX, y: toeY, scale: 0 }, 0)
      // background smooth transition (joote ke saath hi)
      .to(
        hero,
        { "--bg-1": bg[0], "--bg-2": bg[1], "--bg-3": bg[2], "--bg-4": bg[3] },
        0
      );
  };

  return (
    <section className="hero" ref={heroRef} onClick={handleClick}>
      {/* BACKGROUND LOGOS */}
      <div className="background_logo">
        <img src={blackLogo} alt="" className="background_logo__img background_logo__img--small" />
        <img src={blackLogo} alt="" className="background_logo__img background_logo__img--medium" />
        <img src={blackLogo} alt="" className="background_logo__img background_logo__img--large" />
      </div>

      {/* LEFT CONTENT */}
      <div className="hero__content">
        <h1 className="hero__title">
          Wear your Style
          <br />
          with Comfort
        </h1>
        <p className="hero__product-name">Nike Airmax 270</p>
      </div>

      {/* SIZE SELECTOR */}
      <div className="hero__sizes">
        {SIZES.map((s) => (
          <button
            key={s}
            className={`hero__size ${size === s ? "hero__size--active" : ""}`}
            onClick={() => setSize(s)}
          >
            {s}
          </button>
        ))}
      </div>

      {/* FLOOR ELLIPSE (ring + corner anchor + knob) */}
      <div className="hero__floor">
        <span className="hero__corner" />
        <button className="hero__floor-center">‹›</button>
      </div>

      {/* SHOES + SHADOW */}
      <div className="hero__float">
        <div className="shoes_container" ref={stageRef}>
          <div className="hero__shadow" />
          {SHOES.map((shoe, i) => (
            <img
              key={shoe.id}
              ref={(el) => (shoeRefs.current[i] = el)}
              src={shoe.src}
              alt=""
              className="shoe"
              data-shoe={i}
            />
          ))}
        </div>
      </div>

      {/* BOTTOM LEFT */}
      <div className="hero__description">
        <p>
          Iconic visible air cushions
          <br />
          every single step forward.
        </p>
      </div>

      {/* BOTTOM RIGHT */}
      <div className="hero__controls">
        <div className="hero__counter">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
          <span>{String(qty).padStart(2, "0")}</span>
          <button onClick={() => setQty((q) => q + 1)}>+</button>
        </div>
        <button className="hero__buy">Buy Now</button>
      </div>
    </section>
  );
}

export default Hero;