"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Phone, Mail, Clock } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Please enter your full name.";
    if (!formData.email.trim()) {
      errs.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.subject.trim()) errs.subject = "Please enter a message subject.";
    if (!formData.message.trim()) errs.message = "Please write your message.";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate structured local submission demo
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedSuccess(true);
    }, 800);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Left Column: Direct Official Contact Info */}
      <div className="lg:col-span-5 space-y-8 bg-[#FAF8F4] p-8 sm:p-10 rounded-3xl border border-[#3A2620]/10 shadow-xs">
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#B98388]">
            DIRECT ATELIER CHANNELS
          </span>
          <h2 className="font-serif-display text-3xl font-semibold text-[#1C1B1B]">
            Get In Touch
          </h2>
          <p className="text-xs text-[#1C1B1B]/70 font-light leading-relaxed">
            Have questions regarding sizing, custom tailoring, or order tracking? Reach out directly via phone or email.
          </p>
        </div>

        <div className="space-y-4">
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className="flex items-center gap-4 p-4 rounded-xl bg-[#F5F0E9] border border-[#3A2620]/10 hover:border-[#B98388] transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-[#3A2620] text-[#FAF8F4] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Phone className="w-4 h-4 text-[#C5A059]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-[#3A2620]/60">
                Business Phone
              </span>
              <span className="font-mono text-sm text-[#1C1B1B] font-semibold">
                {siteConfig.phone}
              </span>
            </div>
          </a>

          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-4 p-4 rounded-xl bg-[#F5F0E9] border border-[#3A2620]/10 hover:border-[#B98388] transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-[#3A2620] text-[#FAF8F4] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Mail className="w-4 h-4 text-[#C5A059]" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-[10px] uppercase tracking-wider text-[#3A2620]/60">
                Business Email
              </span>
              <span className="font-mono text-xs text-[#1C1B1B] font-semibold truncate">
                {siteConfig.email}
              </span>
            </div>
          </a>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-[#F5F0E9] border border-[#3A2620]/10">
            <div className="w-10 h-10 rounded-full bg-[#B98388]/20 text-[#B98388] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-[#3A2620]/60">
                Response Time
              </span>
              <span className="text-xs text-[#1C1B1B] font-medium">
                Within 24 Business Hours
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Contact Form */}
      <div className="lg:col-span-7 bg-[#FAF8F4] p-8 sm:p-10 rounded-3xl border border-[#3A2620]/10 shadow-xs">
        {submittedSuccess ? (
          <div className="py-12 text-center space-y-4 animate-fade-in">
            <div className="w-16 h-16 bg-[#B98388]/20 text-[#B98388] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif-display text-3xl font-semibold text-[#1C1B1B]">
              Message Recorded (Demo)
            </h3>
            <p className="text-xs text-[#1C1B1B]/80 max-w-md mx-auto font-light leading-relaxed">
              Thank you, <strong className="font-semibold">{formData.name}</strong>. Your inquiry has been submitted locally to our demo handler.
            </p>
            <div className="p-4 bg-[#F5F0E9] rounded-xl text-left font-mono text-[11px] space-y-1 text-[#3A2620]/80 border border-[#3A2620]/10">
              <div>Subject: {formData.subject}</div>
              <div>Email: {formData.email}</div>
              <div>Phone: {formData.phone || "N/A"}</div>
            </div>
            <button
              onClick={() => {
                setSubmittedSuccess(false);
                setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
              }}
              className="px-6 py-2.5 bg-[#3A2620] text-[#FAF8F4] text-xs uppercase tracking-widest rounded-full hover:bg-[#1C1B1B] transition-colors mt-4"
            >
              Send Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="contact-name" className="block text-xs uppercase tracking-wider font-semibold text-[#3A2620]">
                  Full Name <span className="text-[#B98388]">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Fatima Ali"
                  className={`w-full px-4 py-3 bg-[#F5F0E9] border rounded-xl text-xs text-[#1C1B1B] focus:outline-none focus:ring-2 focus:ring-[#B98388] transition-all ${
                    errors.name ? "border-red-500" : "border-[#3A2620]/15"
                  }`}
                />
                {errors.name && (
                  <p className="text-[11px] text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="contact-email" className="block text-xs uppercase tracking-wider font-semibold text-[#3A2620]">
                  Email Address <span className="text-[#B98388]">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="fatima@example.com"
                  className={`w-full px-4 py-3 bg-[#F5F0E9] border rounded-xl text-xs text-[#1C1B1B] focus:outline-none focus:ring-2 focus:ring-[#B98388] transition-all ${
                    errors.email ? "border-red-500" : "border-[#3A2620]/15"
                  }`}
                />
                {errors.email && (
                  <p className="text-[11px] text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Phone (Optional) */}
              <div className="space-y-2">
                <label htmlFor="contact-phone" className="block text-xs uppercase tracking-wider font-semibold text-[#3A2620]">
                  Phone (Optional)
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="0300 0000000"
                  className="w-full px-4 py-3 bg-[#F5F0E9] border border-[#3A2620]/15 rounded-xl text-xs text-[#1C1B1B] focus:outline-none focus:ring-2 focus:ring-[#B98388] transition-all"
                />
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label htmlFor="contact-subject" className="block text-xs uppercase tracking-wider font-semibold text-[#3A2620]">
                  Subject <span className="text-[#B98388]">*</span>
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Sizing or Product Inquiry"
                  className={`w-full px-4 py-3 bg-[#F5F0E9] border rounded-xl text-xs text-[#1C1B1B] focus:outline-none focus:ring-2 focus:ring-[#B98388] transition-all ${
                    errors.subject ? "border-red-500" : "border-[#3A2620]/15"
                  }`}
                />
                {errors.subject && (
                  <p className="text-[11px] text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.subject}
                  </p>
                )}
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label htmlFor="contact-message" className="block text-xs uppercase tracking-wider font-semibold text-[#3A2620]">
                Your Message <span className="text-[#B98388]">*</span>
              </label>
              <textarea
                id="contact-message"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write your message or custom request here..."
                className={`w-full px-4 py-3 bg-[#F5F0E9] border rounded-xl text-xs text-[#1C1B1B] focus:outline-none focus:ring-2 focus:ring-[#B98388] transition-all resize-none ${
                  errors.message ? "border-red-500" : "border-[#3A2620]/15"
                }`}
              />
              {errors.message && (
                <p className="text-[11px] text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 py-4 bg-[#3A2620] text-[#FAF8F4] text-xs uppercase tracking-[0.2em] font-semibold rounded-xl hover:bg-[#1C1B1B] transition-all duration-300 shadow-md hover:shadow-xl disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Processing...</span>
              ) : (
                <>
                  <span>Submit Inquiry</span> <Send className="w-4 h-4 text-[#B98388]" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
