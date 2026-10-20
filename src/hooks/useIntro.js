import { useLayoutEffect } from "react";
import gsap from "gsap";

/**
 * 1. Loader: logo left se right fill hota hai
 * 2. Loader gayab
 * 3. Navbar upar se niche, hero elements side se, ellipse bada + tilted se aake normal,
 *    black joota right ke bahar se seedha aata hai aur aate-aate tilt hota hai
 *
 * `scope` = App ke root element ka ref
 */
export default function useIntro(scope) {
  useLayoutEffect(() => {
    document.body.style.overflow = "hidden";
    let cancelled = false;

    const ctx = gsap.context(() => {
      /* ---------- starting state ---------- */
      gsap.set(".navbar", { y: -90, autoAlpha: 0 });

      gsap.set(".hero__content, .hero__description", { x: -90, autoAlpha: 0 });
      gsap.set(".hero__sizes, .hero__controls", { x: 90, autoAlpha: 0 });

      gsap.set(".hero .background_logo", { autoAlpha: 0 });

      // ring + shadow: shuru me thoda bada aur zyada tilted
      gsap.set(".hero__floor, .hero__shadow", {
        autoAlpha: 0,
        "--floor-scale": 1.2,
        "--floor-rot": -12,
      });

      // sab jooton ko apne center se align karo (anchor = .shoes_container ka point)
      gsap.set(".shoe", { xPercent: -50, yPercent: -50 });

      // pehla (black) joota: right ke bahar, seedha
      gsap.set(".shoe[data-shoe='0']", { x: window.innerWidth * 0.95, rotation: 0 });

      // baaki joote: 0 size, invisible (click pe ellipse ke corner se aayenge)
      gsap.set(".shoe:not([data-shoe='0'])", { scale: 0, autoAlpha: 0, rotation: -15 });

      /* ---------- timeline ---------- */
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
        onComplete: () => {
          document.body.style.overflow = "";
          // ab hero pe click se joote badal sakte hain
          scope.current?.querySelector(".hero")?.setAttribute("data-ready", "true");
        },
      });

      // 1. logo fill (left -> right)
      tl.to(".loader__fill", {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.8,
        ease: "power2.out",
      })
        // 2. logo halka bada hoke gayab
        .to(
          ".loader__logo",
          { scale: 1.12, autoAlpha: 0, duration: 0.5, ease: "power2.in" },
          "+=0.2"
        )
        // 3. loader gayab (hero aane se pehle)
        .to(".loader", { autoAlpha: 0, duration: 0.4, ease: "none" }, "-=0.15")
        .set(".loader", { display: "none" })
        .addLabel("hero")

        // 4a. navbar upar se niche
        .to(".navbar", { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out" }, "hero")

        // 4b. background logos + ring + shadow fade-in
        .to(
          ".hero .background_logo, .hero__floor, .hero__shadow",
          { autoAlpha: 1, duration: 0.9, ease: "power2.out" },
          "hero"
        )

        // 4c. left / right elements side se
        .to(
          ".hero__content, .hero__description, .hero__sizes, .hero__controls",
          { x: 0, autoAlpha: 1, duration: 1, stagger: 0.1 },
          "hero+=0.15"
        )

        // 4d. black joota right se center tak slide + saath hi tilt
        .to(
          ".shoe[data-shoe='0']",
          { x: 0, rotation: -15, duration: 1.4, ease: "back.out(0.7)" },
          "hero"
        )

        // 5. ring + shadow normal size aur tilt (-5deg) pe settle, baaki elements ke saath hi
        .to(
          ".hero__floor, .hero__shadow",
          { "--floor-scale": 1, "--floor-rot": -5, duration: 1.3, ease: "power3.out" },
          "hero"
        );

      // images decode hone ke baad hi start (taaki fill beech me atke nahi)
      const imgs = [...scope.current.querySelectorAll("img")];
      const ready = Promise.all(imgs.map((img) => img.decode().catch(() => {})));
      const timeout = new Promise((res) => setTimeout(res, 3000));

      Promise.race([ready, timeout]).then(() => {
        if (!cancelled) tl.play();
      });
    }, scope);

    return () => {
      cancelled = true;
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [scope]);
}