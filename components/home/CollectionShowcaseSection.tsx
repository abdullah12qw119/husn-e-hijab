"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";

const CATEGORIES = [
  {
    id: "HIJAB",
    name: "Hijab Series",
    word: "GRACE.",
    bgClass: "bg-[#F5F0E9]",
    accentColor: "#B98388",
    garment: "/images/showcase_hijab.webp",
    description: "Flowing chiffons and satin wraps that rest softly around the frame.",
  },
  {
    id: "NIQAB",
    name: "Niqab Series",
    word: "COVERAGE.",
    bgClass: "bg-[#3A2620]",
    accentColor: "#D8C8B9",
    garment: "/images/showcase_niqab.webp",
    description: "Triple-layered veil silhouettes combining complete opacity with effortless breathability.",
  },
  {
    id: "ABAYA",
    name: "Abaya Series",
    word: "MOVEMENT.",
    bgClass: "bg-[#1C1B1B]",
    accentColor: "#C5A059",
    garment: "/images/showcase_abaya.webp",
    description: "Generous silhouettes, hand-finished cuffs, and royal velvet drapes.",
  },
  {
    id: "KHIMAR",
    name: "Khimar Series",
    word: "ELEGANCE.",
    bgClass: "bg-[#D8C8B9]",
    accentColor: "#3A2620",
    garment: "/images/showcase_khimar.webp",
    description: "Full overhead coverage with shoulder flare and lightweight drape geometry.",
  },
];

export default function CollectionShowcaseSection() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const garmentContainerRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLHeadingElement>(null);
  const textDetailRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);
  const activeIndexRef = useRef(0);

  activeIndexRef.current = activeCategoryIndex;
  const currentCat = CATEGORIES[activeCategoryIndex];

  // Fix 3: Unified slide transition function with garment & text re-animation
  const transitionToCategory = useCallback((newIndex: number) => {
    if (newIndex === activeIndexRef.current || isAnimatingRef.current) return;
    if (!garmentContainerRef.current || !wordRef.current || !textDetailRef.current) return;

    isAnimatingRef.current = true;

    const tlOut = gsap.timeline({
      onComplete: () => {
        setActiveCategoryIndex(newIndex);

        // Animate in new garment & text
        requestAnimationFrame(() => {
          const tlIn = gsap.timeline({
            onComplete: () => {
              isAnimatingRef.current = false;
            },
          });

          tlIn.fromTo(
            garmentContainerRef.current,
            { scale: 0.93, rotate: 4, opacity: 0, y: 25 },
            { scale: 1, rotate: 0, opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
          )
            .fromTo(
              wordRef.current,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
              "-=0.4"
            )
            .fromTo(
              textDetailRef.current,
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
              "-=0.3"
            );
        });
      },
    });

    // Exit old elements
    tlOut
      .to(garmentContainerRef.current, {
        scale: 0.93,
        rotate: -4,
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
      })
      .to(
        wordRef.current,
        { y: -25, opacity: 0, duration: 0.3, ease: "power2.in" },
        "<"
      )
      .to(
        textDetailRef.current,
        { y: -15, opacity: 0, duration: 0.25, ease: "power2.in" },
        "<"
      );
  }, []);

  // Autoplay Slider Engine (4 seconds interval, loopable, pauses on hover)
  useEffect(() => {
    if (isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = setInterval(() => {
      const nextIndex = (activeIndexRef.current + 1) % CATEGORIES.length;
      transitionToCategory(nextIndex);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, transitionToCategory]);

  const handleManualSwitch = (idx: number) => {
    transitionToCategory(idx);
  };

  const isDarkBg = activeCategoryIndex === 1 || activeCategoryIndex === 2;

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`relative min-h-screen w-full transition-colors duration-1000 py-24 flex flex-col justify-center overflow-hidden ${
        currentCat.bgClass
      } ${isDarkBg ? "text-[#FAF8F4]" : "text-[#1C1B1B]"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Section Index Header */}
        <div className="flex items-center justify-between border-b border-current/15 pb-4 mb-12">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#B98388]">
            03 / INTERACTIVE COLLECTION SHOWCASE
          </span>
          <span className="text-xs font-mono opacity-60">
            0{activeCategoryIndex + 1} / 0{CATEGORIES.length}
          </span>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-12">
          {CATEGORIES.map((cat, idx) => (
            <button
              key={cat.id}
              onClick={() => handleManualSwitch(idx)}
              className={`px-6 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-500 border ${
                activeCategoryIndex === idx
                  ? "bg-[#3A2620] text-[#FAF8F4] border-[#3A2620] shadow-lg scale-105"
                  : "border-current/20 hover:border-current/60 opacity-70"
              }`}
            >
              {cat.id}
            </button>
          ))}
        </div>

        {/* Central Display Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[55vh]">
          {/* Left Column: Statement Typography & Category Copy */}
          <div className="lg:col-span-5 space-y-6">
            <h3
              ref={wordRef}
              className="font-serif-display text-6xl sm:text-8xl font-bold tracking-tight leading-none text-[#B98388] transition-colors duration-700"
            >
              {currentCat.word}
            </h3>

            <div ref={textDetailRef} className="space-y-6">
              <div className="space-y-2">
                <h4 className="text-xl sm:text-2xl font-serif-display font-medium">
                  {currentCat.name}
                </h4>
                <p className="text-xs sm:text-sm font-light leading-relaxed opacity-80 max-w-sm">
                  {currentCat.description}
                </p>
              </div>

              <div>
                <Link
                  href={`/products?category=${currentCat.id}`}
                  className="group inline-flex items-center gap-2 px-6 py-3 border border-current/30 rounded-full text-xs uppercase tracking-[0.15em] font-medium hover:bg-current/10 transition-all"
                >
                  <span>Explore {currentCat.id} Catalog</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Perspective Garment Showcase (Ref: 20260812_234827.mp4) */}
          <div className="lg:col-span-7 flex justify-center items-center relative min-h-[420px]">
            {/* Soft Glow */}
            <div
              className="absolute w-80 h-80 rounded-full blur-3xl opacity-30 pointer-events-none transition-all duration-1000"
              style={{ backgroundColor: currentCat.accentColor }}
            />

            <div
              ref={garmentContainerRef}
              className="relative w-full max-w-md aspect-[3/4] transition-transform duration-500 perspective-1000"
            >
              <Image
                src={currentCat.garment}
                alt={`${currentCat.name} Visual`}
                fill
                className="object-contain drop-shadow-2xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
