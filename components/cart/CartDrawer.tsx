"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from "lucide-react";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotalPrice,
    totalItemsCount,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-[#3A2620]/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F4] border-l border-[#3A2620]/10 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-[#3A2620]/10 flex items-center justify-between bg-[#F5F0E9]/80">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#3A2620] text-[#FAF8F4] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-[#B98388]" />
              </div>
              <div>
                <h2 className="font-serif-display text-xl font-semibold text-[#1C1B1B]">
                  Your Shopping Cart
                </h2>
                <p className="text-[11px] text-[#3A2620]/60 font-mono">
                  {totalItemsCount} {totalItemsCount === 1 ? "item" : "items"} selected
                </p>
              </div>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-[#1C1B1B]/60 hover:text-[#1C1B1B] hover:bg-[#3A2620]/5 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#B98388]/10 text-[#B98388] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif-display text-2xl font-semibold text-[#1C1B1B]">
                  Your Cart is Empty
                </h3>
                <p className="text-xs text-[#1C1B1B]/70 max-w-xs mx-auto font-light leading-relaxed">
                  Explore our luxury modest collection of abayas, hijabs, and niqabs to select your items.
                </p>
                <Link
                  href="/products"
                  onClick={closeCart}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#3A2620] text-[#FAF8F4] text-xs uppercase tracking-[0.15em] font-semibold rounded-full hover:bg-[#1C1B1B] transition-colors mt-2"
                >
                  Browse Products <ArrowRight className="w-4 h-4 text-[#B98388]" />
                </Link>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-4 rounded-2xl bg-[#F5F0E9] border border-[#3A2620]/10 shadow-xs relative group"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-[#FAF8F4] border border-[#3A2620]/5 shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  {/* Metadata & Controls */}
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full bg-[#3A2620] text-[#FAF8F4]">
                          {product.category}
                        </span>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-[#3A2620]/40 hover:text-red-600 transition-colors p-1"
                          title="Remove Item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <h4 className="font-serif-display text-sm font-semibold text-[#1C1B1B] mt-1 line-clamp-1">
                        {product.name}
                      </h4>
                      <p className="text-[11px] font-mono text-[#B98388] font-semibold mt-0.5">
                        Rs. {product.price.toLocaleString()}
                      </p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="inline-flex items-center border border-[#3A2620]/20 rounded-lg bg-[#FAF8F4] overflow-hidden">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="p-1.5 hover:bg-[#3A2620]/10 text-[#1C1B1B] transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-mono font-semibold text-[#1C1B1B]">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="p-1.5 hover:bg-[#3A2620]/10 text-[#1C1B1B] transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-xs font-mono font-bold text-[#3A2620]">
                        Rs. {(product.price * quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#3A2620]/10 bg-[#F5F0E9] space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#1C1B1B]/70">
                  <span>Subtotal</span>
                  <span className="font-mono font-medium">Rs. {subtotalPrice.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-[#1C1B1B]/70">
                  <span>Delivery Fee</span>
                  <span className="font-mono text-emerald-700 font-semibold uppercase tracking-wider text-[10px]">
                    FREE Standard Shipping
                  </span>
                </div>
                <div className="pt-2 border-t border-[#3A2620]/10 flex items-center justify-between text-base font-semibold text-[#1C1B1B]">
                  <span>Total Amount</span>
                  <span className="font-mono text-[#3A2620] text-lg font-bold">
                    Rs. {subtotalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-[#3A2620]/70 bg-[#FAF8F4] p-2.5 rounded-xl border border-[#3A2620]/10">
                <ShieldCheck className="w-4 h-4 text-[#B98388] shrink-0" />
                <span>Global ATM/Cards & Direct WhatsApp Order Dispatch Available</span>
              </div>

              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full inline-flex items-center justify-center gap-2 py-4 bg-[#3A2620] text-[#FAF8F4] text-xs uppercase tracking-[0.2em] font-semibold rounded-xl hover:bg-[#1C1B1B] transition-all shadow-md hover:shadow-xl"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#B98388]" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
