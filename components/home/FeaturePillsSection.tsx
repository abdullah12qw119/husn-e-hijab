"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Sparkles, ChevronDown, Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FEATURE_PILLS = [
  {
    id: "drape",
    title: "Graceful Drape",
    description:
      "Designed to create a soft, flowing silhouette with effortless visual movement and soft fabric weight.",
  },
  {
    id: "coverage",
    title: "Full Coverage",
    description:
      "Tailored proportioning that ensures full dignity and modesty without sacrificing modern visual balance.",
  },
  {
    id: "comfort",
    title: "Comfort First",
    description:
      "Lightweight hand-feel and non-irritating woven seams engineered for seamless all-day wearability.",
  },
  {
    id: "movement",
    title: "Easy Movement",
    description:
      "Structured armhole flares allowing total freedom of movement during work, travel, and daily activity.",
  },
  {
    id: "elegance",
    title: "Everyday Elegance",
    description:
      "Minimalist aesthetic designed to transition gracefully from quiet home settings to formal gatherings.",
  },
];

export default function FeaturePillsSection() {
  const [expandedId, setExpandedId] = useState<string>("drape");
  const containerRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);

  const headerRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger with Replay on Enter & EnterBack (Fix 4)
  useGSAP(
    () => {
      if (!pillsRef.current) return;
      const pills = pillsRef.current.querySelectorAll(".feature-pill-item");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "bottom 15%",
          toggleActions: "restart reverse restart reverse",
        },
      });

      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      ).fromTo(
        pills,
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "back.out(1.3)",
        },
        "-=0.3"
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-gradient-to-b from-[#F5F0E9] via-[#FAF8F4] to-[#3A2620] text-[#1C1B1B] py-24 flex items-center overflow-hidden transition-colors duration-1000"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-[#B98388]" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#B98388]">
            04 / FLOATING FEATURE PILLS
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Garment Visual */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl bg-[#F5F0E9] border border-[#3A2620]/10">
              <Image
                src="/images/Sage_green_abaya_3D_mockup_202608071226.webp"
                alt="Feature Garment Detail"
                fill
                className="object-contain p-4"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute top-4 left-4 text-[10px] uppercase tracking-widest px-3 py-1 bg-[#1C1B1B]/80 text-[#FAF8F4] rounded-full">
                Tailoring Standard
              </div>
            </div>
          </div>

          {/* Right Column: Floating Pill Controls (Ref: 20260812_235251.mp4) */}
          <div className="lg:col-span-6 space-y-6">
            <div ref={headerRef} className="space-y-2">
              <h2 className="font-serif-display text-4xl sm:text-6xl font-light leading-tight">
                CRAFTED FOR <br />
                <span className="italic font-semibold text-[#B98388]">PERFECT POISE.</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#1C1B1B]/70 max-w-md font-light">
                Explore the core engineering principles behind every Husn-e-Hijab silhouette.
              </p>
            </div>

            <div ref={pillsRef} className="space-y-3 pt-4">
              {FEATURE_PILLS.map((pill) => {
                const isExpanded = expandedId === pill.id;
                return (
                  <div
                    key={pill.id}
                    className={`feature-pill-item transition-all duration-500 rounded-2xl border overflow-hidden backdrop-blur-md cursor-pointer ${
                      isExpanded
                        ? "bg-[#FAF8F4] border-[#B98388] shadow-lg translate-x-2"
                        : "bg-[#FAF8F4]/60 border-[#3A2620]/10 hover:border-[#3A2620]/30 hover:bg-[#FAF8F4]"
                    }`}
                    onClick={() => setExpandedId(isExpanded ? "" : pill.id)}
                    onMouseEnter={() => setExpandedId(pill.id)}
                  >
                    <div className="p-4 sm:p-5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors ${
                            isExpanded ? "bg-[#B98388] text-white" : "bg-[#3A2620]/10 text-[#3A2620]"
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-serif-display text-lg sm:text-xl font-medium text-[#1C1B1B]">
                          {pill.title}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-[#3A2620] transition-transform duration-300 ${
                          isExpanded ? "rotate-180 text-[#B98388]" : ""
                        }`}
                      />
                    </div>

                    {isExpanded && (
                      <div className="px-5 pb-5 text-xs text-[#1C1B1B]/80 font-light leading-relaxed animate-fade-in border-t border-[#3A2620]/5 pt-3">
                        {pill.description}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
