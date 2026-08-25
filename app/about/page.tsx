import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Heart, Sparkles } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export const metadata = {
  title: "About Us — Husn-e-Hijab Modest Fashion",
  description:
    "Learn about Husn-e-Hijab: our philosophy of grace, comfort, and dignified coverage in contemporary modest apparel.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full bg-[#F5F0E9] pt-32 pb-24 text-[#1C1B1B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Page Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-[#3A2620]/10 pb-16">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#3A2620]/20 text-[10px] uppercase tracking-[0.3em] font-semibold text-[#B98388] bg-[#FAF8F4]/80">
              <Sparkles className="w-3.5 h-3.5" /> BRAND PHILOSOPHY
            </div>

            <h1 className="font-serif-display text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight">
              MODESTY, <br />
              <span className="font-semibold italic text-[#B98388]">REIMAGINED.</span>
            </h1>

            <p className="text-sm sm:text-lg text-[#1C1B1B]/80 max-w-2xl font-light leading-relaxed">
              Husn-e-Hijab explores modest dressing through graceful silhouettes, thoughtful coverage and contemporary simplicity.
            </p>
          </div>

          <div className="lg:col-span-5 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-[#3A2620]/10">
            <Image
              src="/images/about/about_hero_boutique.jpg"
              alt="Husn-e-Hijab Boutique Philosophy"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
          </div>
        </div>

        {/* Editorial Story Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-[#FAF8F4] border border-[#3A2620]/10">
            <Image
              src="/images/about/about_brand_story_boutique.jpg"
              alt="Husn-e-Hijab Brand Story Visual"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif-display text-3xl sm:text-5xl font-medium text-[#3A2620]">
              Elegance in Every Layer
            </h2>
            <p className="text-xs sm:text-base text-[#1C1B1B]/80 font-light leading-relaxed">
              Founded on the principle that modesty is an empowering form of personal expression, Husn-e-Hijab blends traditional dignified coverage with modern tailoring standards.
            </p>
            <p className="text-xs sm:text-base text-[#1C1B1B]/80 font-light leading-relaxed">
              Every drape, fold, and sleeve contour is meticulously proportioned to provide weightless comfort, effortless draping, and total opacity for everyday peace of mind.
            </p>

            <div className="pt-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#3A2620] text-[#FAF8F4] text-xs uppercase tracking-[0.2em] font-medium rounded-full hover:bg-[#1C1B1B] transition-colors"
              >
                <span>View Our Works</span>
                <ArrowUpRight className="w-4 h-4 text-[#B98388]" />
              </Link>
            </div>
          </div>
        </div>

        {/* Three Core Brand Principles */}
        <div className="space-y-12 pt-12 border-t border-[#3A2620]/10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#B98388]">
              CORE PILLARS
            </span>
            <h3 className="font-serif-display text-4xl font-semibold">
              The Three Guiding Standards
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {siteConfig.principles.map((p, idx) => (
              <div
                key={p.title}
                className="p-8 rounded-2xl bg-[#FAF8F4] border border-[#3A2620]/10 space-y-4 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#B98388]">0{idx + 1}</span>
                  <div className="w-8 h-8 rounded-full bg-[#B98388]/10 flex items-center justify-center text-[#B98388] group-hover:scale-110 transition-transform">
                    {idx === 0 ? <Sparkles className="w-4 h-4" /> : idx === 1 ? <Heart className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                  </div>
                </div>

                <h4 className="font-serif-display text-2xl font-semibold text-[#1C1B1B]">
                  {p.title}
                </h4>

                <div className="text-xs uppercase tracking-wider font-semibold text-[#B98388]">
                  {p.tagline}
                </div>

                <p className="text-xs text-[#1C1B1B]/70 font-light leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Secondary Story Visual Section */}
        <div className="relative rounded-3xl overflow-hidden bg-[#3A2620] text-[#FAF8F4] p-8 sm:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-semibold">
              DIRECT INQUIRIES & ORDERS
            </span>
            <h3 className="font-serif-display text-3xl sm:text-5xl font-light">
              Connect Directly with Our Atelier
            </h3>
            <p className="text-xs sm:text-sm text-[#FAF8F4]/80 max-w-lg font-light leading-relaxed">
              We welcome custom orders, sizing consultations, and fabric questions. Call or email us directly for dedicated customer support.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono">
              <a href={`tel:${siteConfig.phoneRaw}`} className="underline text-[#C5A059] hover:text-[#FAF8F4]">
                {siteConfig.phone}
              </a>
              <span>•</span>
              <a href={`mailto:${siteConfig.email}`} className="underline text-[#C5A059] hover:text-[#FAF8F4]">
                {siteConfig.email}
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-xs aspect-square rounded-2xl overflow-hidden border border-[#FAF8F4]/20 shadow-2xl">
              <Image
                src="/images/about/about_atelier_contact.jpg"
                alt="Husn-e-Hijab Atelier Representation"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
