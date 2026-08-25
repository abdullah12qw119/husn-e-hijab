"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, ShoppingBag } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalItemsCount, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Lock background scroll when mobile menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#F5F0E9]/90 backdrop-blur-md border-b border-[#3A2620]/10 py-3 shadow-xs"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 overflow-hidden rounded-full border border-[#C5A059]/30 p-1 bg-[#FAF8F4]/80">
            <Image
              src={siteConfig.logoMark}
              alt="Husn-e-Hijab Mark"
              width={48}
              height={48}
              className="object-contain w-full h-full transform transition-transform duration-500 group-hover:scale-110"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif-display text-xl sm:text-2xl tracking-wider font-semibold text-[#1C1B1B]">
              {siteConfig.name}
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#B98388] font-medium -mt-1">
              LUXURY MODEST WEAR
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {siteConfig.navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-xs uppercase tracking-[0.2em] font-medium transition-colors py-1 ${
                  isActive
                    ? "text-[#3A2620]"
                    : "text-[#1C1B1B]/70 hover:text-[#3A2620]"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B98388] rounded-full animate-fade-in" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Cart & Desktop CTA */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Cart Icon Button */}
          <button
            onClick={openCart}
            aria-label="View Shopping Cart"
            className="relative p-2.5 rounded-full bg-[#FAF8F4] border border-[#3A2620]/20 text-[#3A2620] hover:border-[#3A2620] hover:bg-[#3A2620] hover:text-[#FAF8F4] transition-all shadow-xs"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#B98388] text-[#FAF8F4] text-[10px] font-mono font-bold flex items-center justify-center border-2 border-[#FAF8F4] animate-pulse">
                {totalItemsCount}
              </span>
            )}
          </button>

          <div className="hidden md:flex items-center">
            <Link
              href="/products"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-[0.15em] font-medium border border-[#3A2620]/30 rounded-full overflow-hidden transition-all duration-500 hover:border-[#3A2620] hover:shadow-sm"
            >
              <span className="relative z-10 text-[#3A2620] transition-colors duration-500 group-hover:text-[#FAF8F4]">
                Explore Collection
              </span>
              <ArrowUpRight className="relative z-10 w-3.5 h-3.5 text-[#3A2620] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#FAF8F4]" />
              <span className="absolute inset-0 bg-[#3A2620] transform -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2 text-[#3A2620] focus:outline-none focus:ring-2 focus:ring-[#B98388] rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      <div
        className={`fixed inset-0 top-[60px] bg-[#3A2620]/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Drawer */}
      <aside
        className={`fixed top-[60px] right-0 bottom-0 w-4/5 max-w-sm bg-[#FAF8F4] border-l border-[#3A2620]/10 p-6 flex flex-col justify-between transform transition-transform duration-500 ease-in-out md:hidden shadow-xl z-50 ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col space-y-6 pt-4">
          <div className="text-[10px] tracking-[0.25em] uppercase text-[#B98388] font-semibold border-b border-[#3A2620]/10 pb-2">
            Navigation
          </div>
          {siteConfig.navLinks.map((link, idx) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                style={{ animationDelay: `${idx * 80}ms` }}
                className={`text-lg font-serif-display tracking-wider flex items-center justify-between transition-colors border-b border-[#3A2620]/5 pb-3 ${
                  isActive ? "text-[#B98388] font-semibold" : "text-[#1C1B1B] hover:text-[#3A2620]"
                }`}
              >
                <span>{link.name}</span>
                <span className="text-xs text-[#3A2620]/40">0{idx + 1}</span>
              </Link>
            );
          })}
        </div>

        <div className="space-y-4 pt-6 border-t border-[#3A2620]/10">
          <Link
            href="/products"
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#3A2620] text-[#FAF8F4] text-xs uppercase tracking-widest rounded-md hover:bg-[#1C1B1B] transition-colors"
          >
            Explore Collection <ArrowUpRight className="w-4 h-4" />
          </Link>
          <div className="text-center text-[11px] text-[#1C1B1B]/60">
            Contact: <a href={`tel:${siteConfig.phoneRaw}`} className="underline hover:text-[#3A2620]">{siteConfig.phone}</a>
          </div>
        </div>
      </aside>
    </header>
  );
}
