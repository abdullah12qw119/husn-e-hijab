"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";

const TRAIL_IMAGES = [
  "/images/Black_abaya_apparel_mockup_2K_202608071224.png",
  "/images/Model_wearing_black_niqab_2K_202608071228.png",
  "/images/Viscose_hijab_on_display_bust_202608071226.png",
  "/images/Model_wearing_emerald_green_abaya_202608071229.png",
  "/images/Satin_silk_hijab_mockup_render_202608071226.png",
  "/images/Khimar_on_display_stand_2K_202608071226.png",
];

interface TrailItem {
  id: number;
  x: number;
  y: number;
  img: string;
  rotation: number;
}

export default function MouseTrailCTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [trailItems, setTrailItems] = useState<TrailItem[]>([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const lastPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const indexRef = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsTouchDevice(true);
    }
  }, []);

  // Desktop Mouse Trail Engine (Ref: 20260812_235532.mp4)
  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      // Check if mouse is inside CTA section
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        return;
      }

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Distance check to throttle trail spawning
      const dist = Math.hypot(x - lastPosRef.current.x, y - lastPosRef.current.y);

      if (dist > 80) {
        lastPosRef.current = { x, y };

        const newTrailItem: TrailItem = {
          id: Date.now() + Math.random(),
          x,
          y,
          img: TRAIL_IMAGES[indexRef.current % TRAIL_IMAGES.length],
          rotation: (Math.random() - 0.5) * 24, // -12 to +12 degrees
        };

        indexRef.current += 1;

        // Maintain ring buffer of max 7 items
        setTrailItems((prev) => [...prev.slice(-6), newTrailItem]);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isTouchDevice]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] w-full bg-[#F5F0E9] text-[#1C1B1B] py-24 flex items-center justify-center overflow-hidden border-t border-[#3A2620]/10 select-none"
    >
      {/* Ring-Buffer Mouse Trail Pool (Ref: 20260812_235532.mp4) */}
      {!isTouchDevice &&
        trailItems.map((item) => (
          <div
            key={item.id}
            className="absolute pointer-events-none z-0 w-32 h-44 rounded-xl overflow-hidden shadow-2xl border-2 border-[#FAF8F4] bg-[#FAF8F4] transition-all duration-700 animate-fade-in"
            style={{
              left: item.x - 64,
              top: item.y - 88,
              transform: `rotate(${item.rotation}deg) scale(0.95)`,
            }}
          >
            <Image src={item.img} alt="Trail thumbnail" fill className="object-cover" />
          </div>
        ))}

      {/* Mobile Stacked Card Fallback */}
      {isTouchDevice && (
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <div className="relative w-64 h-80">
            <div className="absolute top-0 left-0 w-44 h-60 rounded-xl overflow-hidden shadow-lg -rotate-6">
              <Image src={TRAIL_IMAGES[0]} alt="Mobile Card 1" fill className="object-cover" />
            </div>
            <div className="absolute top-8 right-0 w-44 h-60 rounded-xl overflow-hidden shadow-lg rotate-6">
              <Image src={TRAIL_IMAGES[1]} alt="Mobile Card 2" fill className="object-cover" />
            </div>
          </div>
        </div>
      )}

      {/* Main Central Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#3A2620]/20 text-[10px] uppercase tracking-[0.3em] font-semibold text-[#B98388] bg-[#FAF8F4]/80 backdrop-blur-sm">
          06 / SIGNATURE COLLECTION CTA
        </div>

        <h2 className="font-serif-display text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight text-[#1C1B1B] leading-none">
          FIND YOUR <br />
          <span className="font-semibold italic text-[#B98388]">SIGNATURE LAYER.</span>
        </h2>

        <p className="text-xs sm:text-base text-[#1C1B1B]/80 max-w-lg mx-auto font-light leading-relaxed">
          Discover modest pieces shaped around coverage, comfort and effortless movement. Step into timeless grace today.
        </p>

        <div className="pt-4 flex justify-center">
          <Link
            href="/products"
            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-[#3A2620] text-[#FAF8F4] text-xs uppercase tracking-[0.25em] font-semibold rounded-full overflow-hidden shadow-2xl hover:bg-[#1C1B1B] transition-all duration-500 hover:scale-105"
          >
            <span>Explore the Collection</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-[#B98388]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
