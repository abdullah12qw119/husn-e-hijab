"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Eye, ArrowUpRight, Filter, ShoppingBag, Plus } from "lucide-react";
import { productsData, Product } from "@/data/products";
import QuickViewModal from "@/components/ui/QuickViewModal";
import { useCart } from "@/context/CartContext";

const CATEGORIES = ["All", "Hijab", "Niqab", "Abaya", "Khimar"];

export default function ProductGrid() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return productsData;
    return productsData.filter(
      (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [selectedCategory]);

  return (
    <div className="w-full">
      {/* Category Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-12 border-b border-[#3A2620]/10">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#3A2620]">
          <Filter className="w-4 h-4 text-[#B98388]" /> Filter Series:
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs uppercase tracking-[0.15em] font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-[#3A2620] text-[#FAF8F4] shadow-md"
                    : "bg-[#FAF8F4] text-[#1C1B1B]/70 border border-[#3A2620]/10 hover:border-[#3A2620]/40"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {filteredProducts.map((product) => {
          return (
            <div
              key={product.id}
              className="group relative bg-[#FAF8F4] border border-[#3A2620]/10 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
            >
              {/* Product Image Area */}
              <div className="relative aspect-[3/4] bg-[#F5F0E9] p-6 flex items-center justify-center overflow-hidden border-b border-[#3A2620]/5">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4 transition-transform duration-700 ease-out transform group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Category Tag */}
                <div className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.2em] font-semibold px-3 py-1 bg-[#1C1B1B]/80 text-[#FAF8F4] rounded-full backdrop-blur-sm">
                  {product.category}
                </div>

                {/* Quick View Overlay Button */}
                <div className="absolute inset-0 bg-[#1C1B1B]/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#FAF8F4] text-[#1C1B1B] text-[11px] uppercase tracking-wider font-semibold rounded-full shadow-2xl hover:bg-[#3A2620] hover:text-[#FAF8F4] transition-all transform translate-y-4 group-hover:translate-y-0"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#B98388]" /> Quick View
                  </button>
                  <button
                    onClick={() => addToCart(product)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#3A2620] text-[#FAF8F4] text-[11px] uppercase tracking-wider font-semibold rounded-full shadow-2xl hover:bg-[#B98388] transition-all transform translate-y-4 group-hover:translate-y-0"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#C5A059]" /> + Cart
                  </button>
                </div>
              </div>

              {/* Product Metadata */}
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-[#3A2620]/60 font-mono">
                  <span>{product.tag}</span>
                  <span className="font-semibold text-[#B98388]">Rs. {product.price.toLocaleString()}</span>
                </div>

                <h3 className="font-serif-display text-xl font-semibold text-[#1C1B1B] group-hover:text-[#B98388] transition-colors">
                  {product.name}
                </h3>

                <p className="text-xs text-[#1C1B1B]/70 font-light line-clamp-2 leading-relaxed">
                  {product.description}
                </p>

                <div className="pt-3 border-t border-[#3A2620]/5 flex items-center justify-between text-xs font-medium text-[#3A2620]">
                  <span className="text-[11px] text-[#B98388] uppercase tracking-wider">
                    {product.colorTone}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#3A2620]/5 hover:bg-[#3A2620] hover:text-[#FAF8F4] transition-all text-[11px] font-semibold"
                  >
                    <Plus className="w-3 h-3 text-[#B98388]" /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
