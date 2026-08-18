import { Suspense } from "react";
import ProductGrid from "@/components/products/ProductGrid";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "The Collection — Husn-e-Hijab Modest Fashion",
  description:
    "Explore the complete catalog of luxury hijabs, niqabs, abayas, and khimars from Husn-e-Hijab.",
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen w-full bg-[#F5F0E9] pt-32 pb-24 text-[#1C1B1B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="space-y-4 mb-16 text-left border-b border-[#3A2620]/10 pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#3A2620]/20 text-[10px] uppercase tracking-[0.3em] font-semibold text-[#B98388] bg-[#FAF8F4]/80">
            <Sparkles className="w-3.5 h-3.5" /> OFFICIAL CATALOGUE
          </div>

          <h1 className="font-serif-display text-5xl sm:text-7xl font-light tracking-tight text-[#1C1B1B]">
            THE <span className="font-semibold italic text-[#B98388]">COLLECTION.</span>
          </h1>

          <p className="text-xs sm:text-base text-[#1C1B1B]/80 max-w-xl font-light leading-relaxed">
            Modest silhouettes created for graceful everyday expression. Explore hijabs, niqabs, abayas, and khimars tailored with uncompromised dignity.
          </p>
        </div>

        {/* Suspense wrapped Product Grid */}
        <Suspense fallback={<div className="text-center py-20 text-xs">Loading collection...</div>}>
          <ProductGrid />
        </Suspense>
      </div>
    </div>
  );
}
