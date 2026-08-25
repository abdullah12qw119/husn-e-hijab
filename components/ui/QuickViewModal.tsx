import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Phone, Mail, CheckCircle2, ShieldCheck, ShoppingBag, Plus, Minus } from "lucide-react";
import { Product } from "@/data/products";
import { siteConfig } from "@/data/siteConfig";
import { useCart } from "@/context/CartContext";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    setQuantity(1);
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (product) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fade-in"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1C1B1B]/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl bg-[#FAF8F4] border border-[#3A2620]/20 rounded-2xl overflow-hidden shadow-2xl z-10 grid grid-cols-1 md:grid-cols-2 max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 p-2 text-[#1C1B1B]/60 hover:text-[#3A2620] bg-white/80 backdrop-blur-sm rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#B98388]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Viewer */}
        <div className="relative h-72 md:h-full bg-[#F5F0E9] flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-[#3A2620]/10">
          <div className="relative w-full h-full min-h-[260px]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain drop-shadow-xl"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.2em] px-3 py-1 bg-[#1C1B1B]/80 text-[#FAF8F4] rounded-full">
            {product.category} Series
          </div>
        </div>

        {/* Details Panel */}
        <div className="p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[60vh] md:max-h-full">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.25em] text-[#B98388] font-semibold">
                {product.tag}
              </span>
              <span className="text-xs text-[#3A2620]/60 font-mono">
                {product.colorTone}
              </span>
            </div>

            <h3 id="modal-product-title" className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#1C1B1B]">
              {product.name}
            </h3>

            <div className="font-mono text-xl font-bold text-[#3A2620]">
              Rs. {product.price.toLocaleString()}
            </div>

            <p className="text-xs text-[#1C1B1B]/80 leading-relaxed font-light">
              {product.description}
            </p>

            <div className="pt-2">
              <h4 className="text-[11px] uppercase tracking-wider font-semibold text-[#3A2620] mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" /> Key Design Features
              </h4>
              <ul className="space-y-1.5">
                {product.specifications.map((spec, i) => (
                  <li key={i} className="text-xs text-[#1C1B1B]/70 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B98388]" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Ordering & Add to Cart CTA */}
          <div className="pt-6 mt-6 border-t border-[#3A2620]/10 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#3A2620] uppercase tracking-wider">Qty:</span>
                <div className="inline-flex items-center border border-[#3A2620]/20 rounded-lg bg-[#F5F0E9]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-[#3A2620]/10 text-[#1C1B1B]"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-xs font-mono font-bold text-[#1C1B1B]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-[#3A2620]/10 text-[#1C1B1B]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-6 bg-[#3A2620] text-[#FAF8F4] text-xs uppercase tracking-[0.15em] font-semibold rounded-xl hover:bg-[#1C1B1B] transition-all shadow-md"
              >
                <ShoppingBag className="w-4 h-4 text-[#B98388]" /> Add to Cart
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 py-2 px-3 bg-[#F5F0E9] border border-[#3A2620]/20 text-[#3A2620] text-[11px] font-medium rounded-lg hover:bg-[#3A2620] hover:text-[#FAF8F4] transition-colors"
              >
                <Phone className="w-3.5 h-3.5" /> Call {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}?subject=Inquiry: ${product.name}`}
                className="inline-flex items-center justify-center gap-2 py-2 px-3 border border-[#3A2620]/20 text-[#3A2620] text-[11px] font-medium rounded-lg hover:bg-[#F5F0E9] transition-colors"
              >
                <Mail className="w-3.5 h-3.5" /> Email Inquiry
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
