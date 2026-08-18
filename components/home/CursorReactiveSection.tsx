"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function CursorReactiveSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const garmentRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch / reduced motion preference
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsTouchDevice(true);
    }
  }, []);

  // Fix 5A & 5B: Responsive Garment & Layered Typography Cursor Parallax
  useGSAP(
    () => {
      if (isTouchDevice || !containerRef.current) return;

      // Ultra-responsive quickTo setters for zero lag (0.2s - 0.3s)
      const xGarmentTo = gsap.quickTo(garmentRef.current, "x", { duration: 0.22, ease: "power2.out" });
      const yGarmentTo = gsap.quickTo(garmentRef.current, "y", { duration: 0.22, ease: "power2.out" });

      const xHeadlineTo = gsap.quickTo(headlineRef.current, "x", { duration: 0.28, ease: "power2.out" });
      const yHeadlineTo = gsap.quickTo(headlineRef.current, "y", { duration: 0.28, ease: "power2.out" });

      const xSubtextTo = gsap.quickTo(subtextRef.current, "x", { duration: 0.32, ease: "power2.out" });
      const ySubtextTo = gsap.quickTo(subtextRef.current, "y", { duration: 0.32, ease: "power2.out" });

      const xBgTextTo = gsap.quickTo(bgTextRef.current, "x", { duration: 0.38, ease: "power2.out" });
      const yBgTextTo = gsap.quickTo(bgTextRef.current, "y", { duration: 0.38, ease: "power2.out" });

      const xLabelTo = gsap.quickTo(labelRef.current, "x", { duration: 0.2, ease: "power2.out" });
      const yLabelTo = gsap.quickTo(labelRef.current, "y", { duration: 0.2, ease: "power2.out" });

      const xSpotlightTo = gsap.quickTo(spotlightRef.current, "x", { duration: 0.25, ease: "power2.out" });
      const ySpotlightTo = gsap.quickTo(spotlightRef.current, "y", { duration: 0.25, ease: "power2.out" });

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

        // Relative coordinates normalized from -1 to 1 across container
        const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

        // Apply layered parallax hierarchy
        xGarmentTo(normX * 15);
        yGarmentTo(normY * 10);

        xHeadlineTo(normX * 6);
        yHeadlineTo(normY * 4);

        xSubtextTo(normX * 3);
        ySubtextTo(normY * 2);

        xBgTextTo(normX * 3);
        yBgTextTo(normY * 2);

        xLabelTo(normX * 18);
        yLabelTo(normY * 12);

        xSpotlightTo(e.clientX - rect.left);
        ySpotlightTo(e.clientY - rect.top);
      };

      const handleMouseLeave = () => {
        // Smoothly return all reactive elements to x: 0, y: 0 when pointer leaves
        xGarmentTo(0);
        yGarmentTo(0);
        xHeadlineTo(0);
        yHeadlineTo(0);
        xSubtextTo(0);
        ySubtextTo(0);
        xBgTextTo(0);
        yBgTextTo(0);
        xLabelTo(0);
        yLabelTo(0);
      };

      const el = containerRef.current;
      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: containerRef, dependencies: [isTouchDevice] }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#1C1B1B] text-[#FAF8F4] py-24 flex items-center justify-center overflow-hidden"
    >
      {/* Soft Radial Atmospheric Cursor Spotlight (Ref: 20260812_235421.mp4) */}
      {!isTouchDevice && (
        <div
          ref={spotlightRef}
          className="absolute w-[500px] h-[500px] bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500"
        />
      )}

      {/* Background Oversized Text */}
      <div
        ref={bgTextRef}
        className="absolute select-none pointer-events-none text-center opacity-5 font-serif-display text-[18vw] font-bold tracking-tighter leading-none z-0"
      >
        CONFIDENCE
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Dark Scene Headline with Layered Parallax */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C5A059]/30 text-[10px] uppercase tracking-[0.3em] text-[#C5A059]">
            05 / CURSOR-REACTIVE DARK SCENE
          </div>

          <h2
            ref={headlineRef}
            className="font-serif-display text-5xl sm:text-7xl font-light tracking-wide leading-none transition-transform"
          >
            QUIET <br />
            <span className="font-semibold italic text-[#B98388]">CONFIDENCE.</span>
          </h2>

          <div ref={subtextRef} className="space-y-4">
            <p className="text-xs sm:text-base text-[#FAF8F4]/70 max-w-md font-light leading-relaxed">
              Modesty expressed through movement, proportion and graceful coverage. Crafted for women who navigate the world with quiet strength.
            </p>

            <div className="pt-2 flex items-center space-x-6 text-xs text-[#C5A059] font-mono">
              <span>• 100% OPACITY</span>
              <span>• ZERO STATIC</span>
              <span>• TAILORED DRAPE</span>
            </div>
          </div>
        </div>

        {/* Right Column: Garment Visual with Reactive Layers */}
        <div className="lg:col-span-6 flex justify-center items-center relative">
          <div
            ref={garmentRef}
            className="relative w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-[#FAF8F4]/10 bg-[#3A2620]/40 transition-transform"
          >
            <Image
              src="/images/Model_wearing_niqab_and_abaya_202608071229.png"
              alt="Quiet Confidence Dark Scene Garment"
              fill
              className="object-contain p-4"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Foreground Editorial Badge */}
          <div
            ref={labelRef}
            className="absolute bottom-6 right-4 sm:right-12 z-20 px-5 py-3 bg-[#FAF8F4] text-[#1C1B1B] rounded-xl shadow-2xl border border-[#C5A059]/30 text-xs font-serif-display font-semibold tracking-wider hidden sm:block transition-transform"
          >
            OBSIDIAN NIQAB EDITION
          </div>
        </div>
      </div>
    </section>
  );
}
