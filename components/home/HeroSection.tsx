"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const HERO_STATES = [
  {
    id: "rose",
    label: "01 / DUSTY ROSE",
    bgClass: "bg-[#F5F0E9]",
    accentColor: "#B98388",
    garment: "/assets/hero-drape.png",
    subtitle: "Contemporary modest wear shaped around grace & motion.",
  },
  {
    id: "cocoa",
    label: "02 / DEEP COCOA",
    bgClass: "bg-[#3A2620]",
    accentColor: "#D8C8B9",
    garment: "/assets/cocoa-hero-new.png",
    subtitle: "Warm earth tones layered with quiet dignity.",
  },
  {
    id: "charcoal",
    label: "03 / OBSIDIAN CHARCOAL",
    bgClass: "bg-[#1C1B1B]",
    accentColor: "#C5A059",
    garment: "/assets/hero-niqab.png",
    subtitle: "Pure minimalist coverage crafted for timeless poise.",
  },
];

export default function HeroSection() {
  const [activeStateIndex, setActiveStateIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgTypeRef = useRef<HTMLHeadingElement>(null);
  const garmentRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const activeState = HERO_STATES[activeStateIndex];

  // GSAP Entrance Choreography & Continuous Idle Motion
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        bgTypeRef.current,
        { y: 120, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 0.15, scale: 1, duration: 1.4 }
      )
        .fromTo(
          garmentRef.current,
          { y: 80, opacity: 0, scale: 0.92 },
          { y: 0, opacity: 1, scale: 1, duration: 1.2 },
          "-=1.0"
        )
        .fromTo(
          ".hero-text-item",
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            onComplete: () => {
              // Subtle continuous floating motion on main garment after entrance settles
              if (
                window.innerWidth >= 768 &&
                !window.matchMedia("(prefers-reduced-motion: reduce)").matches
              ) {
                gsap.to(garmentRef.current, {
                  y: "-=6",
                  x: "+=2",
                  scale: 1.008,
                  rotation: 0.2,
                  duration: 5,
                  repeat: -1,
                  yoyo: true,
                  ease: "sine.inOut",
                });
              }
            },
          },
          "-=0.8"
        );

      // Part 1: Desktop Pointer Parallax with quickTo Physics
      if (
        window.innerWidth < 768 ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const xGarmentTo = gsap.quickTo(garmentRef.current, "x", { duration: 0.22, ease: "power2.out" });
      const yGarmentTo = gsap.quickTo(garmentRef.current, "y", { duration: 0.22, ease: "power2.out" });
      const scaleXGarmentTo = gsap.quickTo(garmentRef.current, "scaleX", { duration: 0.25, ease: "power2.out" });
      const scaleYGarmentTo = gsap.quickTo(garmentRef.current, "scaleY", { duration: 0.25, ease: "power2.out" });
      const rotGarmentTo = gsap.quickTo(garmentRef.current, "rotation", { duration: 0.25, ease: "power2.out" });

      const xHeadlineTo = gsap.quickTo(contentRef.current, "x", { duration: 0.28, ease: "power2.out" });
      const yHeadlineTo = gsap.quickTo(contentRef.current, "y", { duration: 0.28, ease: "power2.out" });

      const xBgTextTo = gsap.quickTo(bgTypeRef.current, "x", { duration: 0.35, ease: "power2.out" });
      const yBgTextTo = gsap.quickTo(bgTypeRef.current, "y", { duration: 0.35, ease: "power2.out" });

      const handleMouseMove = (e: MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        if (
          e.clientX < rect.left ||
          e.clientX > rect.right ||
          e.clientY < rect.top ||
          e.clientY > rect.bottom
        ) {
          return;
        }

        // Normalized relative coordinates from -1 to +1
        const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

        // Foreground garment: strongest movement (12px X, 8px Y, 1.015 max scale)
        const targetScale = 1 + Math.abs(normX * normY) * 0.015;
        xGarmentTo(normX * 12);
        yGarmentTo(normY * 8);
        scaleXGarmentTo(targetScale);
        scaleYGarmentTo(targetScale);
        rotGarmentTo(normX * 0.2);

        // Headline text group: medium movement (5px X, 3.5px Y)
        xHeadlineTo(normX * 5);
        yHeadlineTo(normY * 3.5);

        // Oversized background text: subtle movement (3px X, 2px Y)
        xBgTextTo(normX * 3);
        yBgTextTo(normY * 2);
      };

      const handleMouseLeave = () => {
        xGarmentTo(0);
        yGarmentTo(0);
        scaleXGarmentTo(1);
        scaleYGarmentTo(1);
        rotGarmentTo(0);
        xHeadlineTo(0);
        yHeadlineTo(0);
        xBgTextTo(0);
        yBgTextTo(0);
      };

      const el = containerRef.current;
      if (el) {
        el.addEventListener("mousemove", handleMouseMove);
        el.addEventListener("mouseleave", handleMouseLeave);
      }

      return () => {
        if (el) {
          el.removeEventListener("mousemove", handleMouseMove);
          el.removeEventListener("mouseleave", handleMouseLeave);
        }
      };
    },
    { scope: containerRef }
  );

  const isDarkState = activeStateIndex > 0;

  return (
    <section
      ref={containerRef}
      className={`relative min-h-screen lg:h-[100dvh] lg:min-h-[100dvh] w-full flex items-center justify-center pt-24 pb-16 lg:pt-20 lg:pb-8 overflow-hidden transition-colors duration-1000 ${
        activeState.bgClass
      } ${isDarkState ? "text-[#FAF8F4]" : "text-[#1C1B1B]"}`}
    >
      {/* Background Radial Light Accent */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none transition-all duration-1000 opacity-30"
        style={{
          backgroundColor: activeState.accentColor,
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Oversized Background Typography (Ref: 20260812_235221.mp4) */}
      <h1
        ref={bgTypeRef}
        className="absolute select-none pointer-events-none font-serif-display text-[16vw] font-bold tracking-tighter leading-none text-center z-0 opacity-15 transition-all duration-700"
        style={{ color: isDarkState ? "#FAF8F4" : "#3A2620" }}
      >
        MODESTY
      </h1>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[75vh] lg:min-h-0">
        {/* Left Column: Editorial Headline & Meta */}
        <div ref={contentRef} className="lg:col-span-6 space-y-5 lg:space-y-4 xl:space-y-6 text-left">
          <div className="hero-text-item inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-current/20 backdrop-blur-sm text-[11px] uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5 text-[#B98388]" />
            <span>01 / HUSN-E-HIJAB EDITORIAL</span>
          </div>

          <h2 className="hero-text-item font-serif-display text-5xl sm:text-7xl lg:text-7xl xl:text-8xl font-medium tracking-tight leading-[0.95]">
            MODESTY <br />
            <span className="italic font-light text-[#B98388] transition-colors duration-700">
              IN MOTION.
            </span>
          </h2>

          <p className="hero-text-item text-sm sm:text-base opacity-80 max-w-md font-light leading-relaxed">
            {activeState.subtitle} Contemporary modest wear shaped around grace, proportion, and quiet confidence.
          </p>

          {/* Action Buttons */}
          <div className="hero-text-item flex flex-wrap items-center gap-4 pt-2 lg:pt-3">
            <Link
              href="/products"
              className="group inline-flex items-center gap-3 px-7 py-3.5 bg-[#3A2620] text-[#FAF8F4] text-xs uppercase tracking-[0.2em] font-medium rounded-full hover:bg-[#1C1B1B] transition-all duration-300 shadow-md hover:shadow-xl"
            >
              <span>Explore Collection</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-current/30 text-xs uppercase tracking-[0.2em] font-medium rounded-full hover:bg-current/10 transition-all duration-300"
            >
              Our Story
            </Link>
          </div>

          {/* Color Atmosphere Switcher (Interactive visual state change) */}
          <div className="hero-text-item pt-4 lg:pt-5 border-t border-current/10 flex items-center space-x-3">
            <span className="text-[10px] uppercase tracking-widest opacity-60">Atmosphere:</span>
            {HERO_STATES.map((st, idx) => (
              <button
                key={st.id}
                onClick={() => setActiveStateIndex(idx)}
                className={`px-3 py-1 text-[11px] rounded-full uppercase tracking-wider transition-all border ${
                  activeStateIndex === idx
                    ? "bg-[#3A2620] text-[#FAF8F4] border-[#3A2620]"
                    : "border-current/20 hover:border-current/50 opacity-70"
                }`}
              >
                {st.id}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Dominant Central Garment Visual */}
        <div className="lg:col-span-6 flex justify-center items-center relative">
          <div
            ref={garmentRef}
            className="relative w-full max-w-lg lg:max-w-[390px] xl:max-w-[440px] aspect-[3/4] transition-all duration-700 transform"
          >
            <Image
              src={activeState.garment}
              alt="Husn-e-Hijab Hero Silhouette"
              fill
              className="object-contain drop-shadow-2xl"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
