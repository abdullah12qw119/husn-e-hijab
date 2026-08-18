import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1C1B1B] text-[#FAF8F4] pt-16 pb-12 border-t border-[#C5A059]/20 relative overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B98388]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-[#FAF8F4]/10">
          {/* Column 1: Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 overflow-hidden rounded-full border border-[#C5A059]/40 p-1 bg-[#FAF8F4]/10">
                <Image
                  src={siteConfig.logoMark}
                  alt="Husn-e-Hijab Mark"
                  width={40}
                  height={40}
                  className="object-contain w-full h-full transform transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <span className="font-serif-display text-2xl tracking-wider text-[#FAF8F4]">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-xs text-[#FAF8F4]/70 leading-relaxed font-light">
              Crafting contemporary modest apparel shaped around grace, effortless movement, and quiet confidence.
            </p>
            <div className="pt-2 text-[10px] tracking-[0.25em] text-[#C5A059] uppercase font-semibold">
              EST. PAKISTAN
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] font-semibold text-[#B98388]">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF8F4]/80 font-light">
              {siteConfig.navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-[#B98388] transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#B98388]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Collections */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] font-semibold text-[#B98388]">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF8F4]/80 font-light">
              {siteConfig.categoryList
                .filter((cat) => cat !== "All")
                .map((category) => (
                  <li key={category}>
                    <Link
                      href={`/products?category=${category}`}
                      className="hover:text-[#B98388] transition-colors"
                    >
                      {category} Series
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Column 4: Official Contact */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] font-semibold text-[#B98388]">
              Direct Contact
            </h4>
            <div className="space-y-3 text-xs text-[#FAF8F4]/80">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="flex items-center gap-3 p-2.5 rounded-lg bg-[#FAF8F4]/5 border border-[#FAF8F4]/10 hover:border-[#B98388]/50 hover:bg-[#FAF8F4]/10 transition-all group"
              >
                <Phone className="w-4 h-4 text-[#C5A059] group-hover:scale-110 transition-transform" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#FAF8F4]/50 uppercase tracking-wider">Business Phone</span>
                  <span className="font-mono text-xs text-[#FAF8F4]">{siteConfig.phone}</span>
                </div>
              </a>

              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 p-2.5 rounded-lg bg-[#FAF8F4]/5 border border-[#FAF8F4]/10 hover:border-[#B98388]/50 hover:bg-[#FAF8F4]/10 transition-all group"
              >
                <Mail className="w-4 h-4 text-[#C5A059] group-hover:scale-110 transition-transform" />
                <div className="flex flex-col overflow-hidden">
                  <span className="text-[10px] text-[#FAF8F4]/50 uppercase tracking-wider">Business Email</span>
                  <span className="font-mono text-xs text-[#FAF8F4] truncate">{siteConfig.email}</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF8F4]/50">
          <p>© {currentYear} {siteConfig.name}. All rights reserved.</p>
          <div className="flex items-center space-x-6 text-[11px]">
            <span>Grace</span>
            <span>•</span>
            <span>Coverage</span>
            <span>•</span>
            <span>Elegance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
