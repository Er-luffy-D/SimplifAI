"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const useScrollAnimations = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Fade in up animation for elements
      gsap.utils.toArray('[data-animate="fade-up"]').forEach((element) => {
        gsap.fromTo(
          element,
          {
            y: 100,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Stagger animation for cards
      gsap.utils.toArray('[data-animate="stagger"]').forEach((container) => {
        const children = container.children;
        gsap.fromTo(
          children,
          {
            y: 60,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: container,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Scale in animation
      gsap.utils.toArray('[data-animate="scale-in"]').forEach((element) => {
        gsap.fromTo(
          element,
          {
            scale: 0.8,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Slide from left
      gsap.utils.toArray('[data-animate="slide-left"]').forEach((element) => {
        gsap.fromTo(
          element,
          {
            x: -100,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Slide from right
      gsap.utils.toArray('[data-animate="slide-right"]').forEach((element) => {
        gsap.fromTo(
          element,
          {
            x: 100,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Parallax effect for backgrounds
      gsap.utils.toArray("[data-parallax]").forEach((element) => {
        const speed = element.dataset.parallax || 0.5;
        gsap.to(element, {
          yPercent: -50 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Text reveal animation
      gsap.utils.toArray('[data-animate="text-reveal"]').forEach((element) => {
        const words = element.textContent.split(" ");
        element.innerHTML = words
          .map(
            (word) =>
              `<span class="inline-block overflow-hidden"><span class="inline-block">${word}</span></span>`
          )
          .join(" ");

        const spans = element.querySelectorAll("span span");
        gsap.fromTo(
          spans,
          {
            y: "100%",
          },
          {
            y: "0%",
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.05,
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Rotate in animation
      gsap.utils.toArray('[data-animate="rotate-in"]').forEach((element) => {
        gsap.fromTo(
          element,
          {
            rotation: -5,
            scale: 0.9,
            opacity: 0,
          },
          {
            rotation: 0,
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Counter animation
      gsap.utils.toArray('[data-animate="counter"]').forEach((element) => {
        const target = parseFloat(element.dataset.target) || 100;
        const suffix = element.dataset.suffix || "";
        const duration = parseFloat(element.dataset.duration) || 2;

        let counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: duration,
          ease: "power2.out",
          onUpdate: function () {
            element.textContent = Math.round(counter.value) + suffix;
          },
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return containerRef;
};

export const useMagneticEffect = () => {
  const magnetRef = useRef(null);

  useEffect(() => {
    const element = magnetRef.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(element, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return magnetRef;
};

export default useScrollAnimations;
