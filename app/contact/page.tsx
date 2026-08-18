import ContactForm from "@/components/contact/ContactForm";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Contact Us — Husn-e-Hijab Modest Fashion",
  description:
    "Get in touch with Husn-e-Hijab for direct inquiries, phone contact, and custom order assistance.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen w-full bg-[#F5F0E9] pt-32 pb-24 text-[#1C1B1B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Header */}
        <div className="space-y-4 text-left border-b border-[#3A2620]/10 pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#3A2620]/20 text-[10px] uppercase tracking-[0.3em] font-semibold text-[#B98388] bg-[#FAF8F4]/80">
            <Sparkles className="w-3.5 h-3.5" /> ATELIER CONCIERGE
          </div>

          <h1 className="font-serif-display text-5xl sm:text-7xl font-light tracking-tight text-[#1C1B1B]">
            LET'S <span className="font-semibold italic text-[#B98388]">CONNECT.</span>
          </h1>

          <p className="text-xs sm:text-base text-[#1C1B1B]/80 max-w-xl font-light leading-relaxed">
            We are here to assist with fitting inquiries, custom order requests, and customer care. Send us a message or reach us directly via phone.
          </p>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
