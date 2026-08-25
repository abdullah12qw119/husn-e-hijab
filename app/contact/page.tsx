import ContactForm from "@/components/contact/ContactForm";
import Image from "next/image";
import { Sparkles, MessageSquareHeart, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Contact Us — Husn-e-Hijab Modest Fashion",
  description:
    "Get in touch with Husn-e-Hijab for direct inquiries, phone contact, and custom order assistance.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen w-full bg-[#F5F0E9] pt-32 pb-24 text-[#1C1B1B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-b border-[#3A2620]/10 pb-16">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#3A2620]/20 text-[10px] uppercase tracking-[0.3em] font-semibold text-[#B98388] bg-[#FAF8F4]/80">
              <Sparkles className="w-3.5 h-3.5" /> ATELIER CONCIERGE
            </div>

            <h1 className="font-serif-display text-5xl sm:text-7xl font-light tracking-tight text-[#1C1B1B]">
              LET&rsquo;S <span className="font-semibold italic text-[#B98388]">CONNECT.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#1C1B1B]/80 max-w-xl font-light leading-relaxed">
              We are here to assist with fitting inquiries, custom order requests, and dedicated customer care. Send us a message or reach us directly via phone or email.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAF8F4] border border-[#3A2620]/10 text-xs text-[#3A2620]">
                <MessageSquareHeart className="w-4 h-4 text-[#B98388]" />
                <span>Personal Consultation</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAF8F4] border border-[#3A2620]/10 text-xs text-[#3A2620]">
                <ShieldCheck className="w-4 h-4 text-[#B98388]" />
                <span>Dedicated Customer Care</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-[#FAF8F4] border border-[#3A2620]/10 group">
            <Image
              src="/images/contact/contact_hero_atelier.webp"
              alt="Husn-e-Hijab Concierge Workspace"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3A2620]/40 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#FAF8F4]/90 backdrop-blur-md border border-[#FAF8F4]/30 text-xs text-[#3A2620] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold uppercase tracking-wider text-[10px]">Atelier Support Active</span>
              </div>
              <span className="font-mono text-[10px] text-[#B98388]">24h Response</span>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
