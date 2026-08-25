"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import gsap from "gsap";

interface FashionSlide {
  id: string;
  category: string;
  slideNumber: string;
  title: string;
  description: string;
  bgClass: string;
  textColor: string;
  accentColor: string;
  words: [string, string];
  garment: string;
}

const FASHION_SLIDES: FashionSlide[] = [
  {
    id: "hijab-rose",
    category: "01 / HIJAB SERIES",
    slideNumber: "01",
    title: "Imperial Silk Drape",
    description:
      "Fluid dusty rose silhouette shaped around lightweight fabric weight, effortless drape, and subtle shimmer.",
    bgClass: "bg-[#F5F0E9]",
    textColor: "text-[#1C1B1B]",
    accentColor: "#B98388",
    words: ["SOFT", "GRACE."],
    garment: "/assets/editorial/look-1-drape.webp",
  },
  {
    id: "abaya-cocoa",
    category: "02 / ABAYA SERIES",
    slideNumber: "02",
    title: "Royal Emerald Velvet",
    description:
      "Generous full-coverage silhouette embellished with traditional golden hand-finished cuff embroidery.",
    bgClass: "bg-[#3A2620]",
    textColor: "text-[#FAF8F4]",
    accentColor: "#C5A059",
    words: ["FLOWING", "FORM."],
    garment: "/assets/editorial/look-2-emerald.webp",
  },
  {
    id: "hijab-sage",
    category: "03 / SAGE SERIES",
    slideNumber: "03",
    title: "Whisper Layered Ensemble",
    description:
      "Overlapping front panels designed with minimal tailoring and soft linen-blend hand-feel for serene movement.",
    bgClass: "bg-[#2D3A30]",
    textColor: "text-[#FAF8F4]",
    accentColor: "#D8C8B9",
    words: ["QUIET", "BEAUTY."],
    garment: "/assets/editorial/look-3-sage.webp",
  },
  {
    id: "abaya-charcoal",
    category: "04 / NOIR ABAYA",
    slideNumber: "04",
    title: "Scalloped Noir Lace",
    description:
      "Classic obsidian open abaya adorned with delicate scalloped lace trimming along the collar and cuffs.",
    bgClass: "bg-[#1C1B1B]",
    textColor: "text-[#FAF8F4]",
    accentColor: "#C5A059",
    words: ["MODEST", "MOTION."],
    garment: "/assets/editorial/look-4-noir.webp",
  },
];

export default function EditorialRevealSection() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const activeGarmentRef = useRef<HTMLDivElement>(null);
  const bgWordsRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    activeIndexRef.current = activeSlideIndex;
  }, [activeSlideIndex]);
  const currentSlide = FASHION_SLIDES[activeSlideIndex];

  // Motion Architecture: Promoting small preview character into main position
  const goToSlide = useCallback((newIndex: number) => {
    if (newIndex === activeIndexRef.current || isAnimatingRef.current) return;
    if (!activeGarmentRef.current || !bgWordsRef.current || !infoRef.current) return;

    isAnimatingRef.current = true;

    const isNext =
      newIndex > activeIndexRef.current ||
      (activeIndexRef.current === FASHION_SLIDES.length - 1 && newIndex === 0);
    const exitX = isNext ? 80 : -80;
    const enterX = isNext ? -80 : 80;

    const tlOut = gsap.timeline({
      onComplete: () => {
        setActiveSlideIndex(newIndex);

        requestAnimationFrame(() => {
          const tlIn = gsap.timeline({
            onComplete: () => {
              isAnimatingRef.current = false;
            },
          });

          tlIn.fromTo(
            activeGarmentRef.current,
            { scale: 0.28, y: 110, x: enterX, opacity: 0 },
            { scale: 1.0, y: 0, x: 0, opacity: 1, duration: 0.75, ease: "power3.out" }
          )
            .fromTo(
              bgWordsRef.current,
              { y: 35, opacity: 0 },
              { y: 0, opacity: 0.18, duration: 0.6, ease: "power2.out" },
              "-=0.5"
            )
            .fromTo(
              infoRef.current,
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
              "-=0.4"
            );
        });
      },
    });

    tlOut
      .to(activeGarmentRef.current, {
        scale: 0.35,
        y: 80,
        x: exitX,
        opacity: 0,
        duration: 0.45,
        ease: "power2.in",
      })
      .to(
        bgWordsRef.current,
        { y: -30, opacity: 0, duration: 0.35, ease: "power2.in" },
        "<"
      )
      .to(
        infoRef.current,
        { y: -18, opacity: 0, duration: 0.3, ease: "power2.in" },
        "<"
      );
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isPaused || !isVisible || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const interval = setInterval(() => {
      const nextIdx = (activeIndexRef.current + 1) % FASHION_SLIDES.length;
      goToSlide(nextIdx);
    }, 3800);

    return () => clearInterval(interval);
  }, [isPaused, isVisible, goToSlide]);

  return (
    <section
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`relative h-[100dvh] max-h-[100dvh] min-h-[580px] w-full flex items-center justify-center py-4 sm:py-6 lg:py-8 overflow-hidden transition-colors duration-1000 select-none ${
        currentSlide.bgClass
      } ${currentSlide.textColor}`}
    >
      {/* Background Soft Glow Accent */}
      <div
        className="absolute w-[450px] h-[450px] rounded-full blur-3xl pointer-events-none transition-all duration-1000 opacity-25"
        style={{
          backgroundColor: currentSlide.accentColor,
          top: "30%",
          left: "40%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Section Index Header */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-12 z-30 flex items-center gap-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-current/20 backdrop-blur-sm text-[10px] uppercase tracking-[0.25em] font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#B98388]" />
          <span>02 / ANIMATED COLLECTION STAGE</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center h-full max-h-[calc(100dvh-3rem)] pt-10 sm:pt-4">
        {/* Main Stage (Left / Center Column: Giant Words + Transparent Hero Cut-out) */}
        <div className="lg:col-span-8 relative flex items-center justify-center h-full max-h-[58dvh] sm:max-h-[66dvh] min-h-[340px]">
          {/* Oversized Editorial Background Typography */}
          <div
            ref={bgWordsRef}
            className="absolute left-0 sm:left-4 select-none pointer-events-none font-serif-display text-[14vw] sm:text-[10vw] font-bold tracking-tighter leading-[0.88] z-0 opacity-18 transition-opacity duration-500 text-left"
          >
            <div>{currentSlide.words[0]}</div>
            <div className="italic font-light text-[#B98388]">{currentSlide.words[1]}</div>
          </div>

          {/* Main Active Full-Body Transparent Cut-out Garment */}
          <div
            ref={activeGarmentRef}
            className="relative w-full max-w-xs sm:max-w-md h-full max-h-[54dvh] sm:max-h-[64dvh] aspect-[3/4] z-10 flex items-center justify-center transform transition-transform"
          >
            <Image
              src={currentSlide.garment}
              alt={`${currentSlide.title} Silhouette`}
              fill
              className="object-contain drop-shadow-2xl"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Supporting Information Rail (Right Column) */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4 sm:space-y-6 z-20 text-left">
          <div ref={infoRef} className="space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-3 text-xs font-mono opacity-60">
              <span>{currentSlide.slideNumber} / 0{FASHION_SLIDES.length}</span>
              <span>—</span>
              <span className="uppercase tracking-widest">{currentSlide.category}</span>
            </div>

            <h2 className="font-serif-display text-3xl sm:text-5xl font-medium tracking-tight leading-none">
              {currentSlide.title}
            </h2>

            <p className="text-xs sm:text-sm font-light leading-relaxed opacity-80 max-w-sm">
              {currentSlide.description}
            </p>

            <div className="pt-1">
              <Link
                href="/products"
                className="group inline-flex items-center gap-3 px-6 py-3 bg-[#3A2620] text-[#FAF8F4] text-xs uppercase tracking-[0.2em] font-semibold rounded-full shadow-lg hover:bg-[#1C1B1B] transition-all duration-300 hover:scale-105"
              >
                <span>Explore Collection</span>
                <ArrowUpRight className="w-4 h-4 text-[#B98388] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </div>

          {/* Small Interactive Preview Cut-outs */}
          <div className="pt-4 border-t border-current/15">
            <div className="text-[10px] uppercase tracking-[0.25em] opacity-60 mb-2 font-semibold">
              Select Look:
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              {FASHION_SLIDES.map((slide, idx) => {
                const isActive = activeSlideIndex === idx;
                return (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(idx)}
                    aria-label={`Select ${slide.title}`}
                    className={`relative w-12 h-16 sm:w-14 sm:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 bg-[#FAF8F4]/30 backdrop-blur-xs p-1 ${
                      isActive
                        ? "border-[#C5A059] shadow-xl scale-105 -translate-y-0.5 bg-[#FAF8F4]/80"
                        : "border-current/20 hover:border-current/60 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={slide.garment}
                      alt={slide.title}
                      fill
                      className="object-contain p-1"
                      sizes="60px"
                    />
                    {isActive && (
                      <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-[#B98388]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
