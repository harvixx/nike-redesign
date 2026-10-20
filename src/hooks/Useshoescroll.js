import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ---------- TUNE HERE ---------- */

const SCALE = 1.5;
const TARGET_Y = 0.4;


/* =========================================
   SHOE + ABOUT SCROLL
========================================= */

export default function useShoeScroll(scope) {
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            /* =========================================
               HERO → ABOUT
               SHOE
            ========================================= */

            gsap.to(".shoes_container", {
                x: () =>
                    document.documentElement.clientWidth * 0.22,

                y: () =>
                    window.innerHeight * (TARGET_Y - 0.45),

                scale: SCALE,

                ease: "power2.inOut",

                scrollTrigger: {
                    trigger: ".hero",

                    start: "top top",
                    end: "bottom top",

                    scrub: 1,

                    invalidateOnRefresh: true,
                },
            });


            const about = scope.current.querySelector(".about");

            if (about) {

                /* =========================================
                   ABOUT CONTENT
        
                   Pehle hidden rahega.
                   About ka kaafi portion visible hone ke
                   baad hi content move karega.
                ========================================= */

                gsap.fromTo(
                    ".about__content",
                    {
                        xPercent: -60,
                    },
                    {
                        xPercent: 0,
                        ease: "none",

                        scrollTrigger: {
                            trigger: ".about",
                            start: "top bottom",
                            end: "top top",
                            scrub: true,
                            invalidateOnRefresh: true,
                        },
                    }
                );

                gsap.to(".shoes_container", {
                    x: () => window.innerWidth * -0.25,
                    y: () => window.innerHeight * 0.15,

                    ease: "none",
                     scale: 1.2,
                    scrollTrigger: {
                        trigger: ".productFeatures",
                        start: "top bottom",
                        end: "top top",

                        scrub: true,

                        invalidateOnRefresh: true,
                    },
                });

            }

        }, scope);


        return () => ctx.revert();

    }, [scope]);
}