"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CreditCard,
  Building2,
  Smartphone,
  Banknote,
  ShieldCheck,
  ArrowLeft,
  MessageSquare,
  CheckCircle,
  Sparkles,
  Globe2,
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export default function CheckoutPage() {
  const { items, subtotalPrice, totalItemsCount } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Pakistan",
    notes: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "paypal" | "bank" | "mobile_wallet" | "cod"
  >("card");

  const [cardDetails, setCardDetails] = useState({
    holderName: "",
    number: "",
    expiry: "",
    cvc: "",
  });

  const [walletDetails, setWalletDetails] = useState({
    senderNumber: "",
    senderName: "",
    transactionId: "",
  });

  const [bankDetails, setBankDetails] = useState({
    senderBank: "",
    senderAccount: "",
    refNo: "",
  });

  const [paypalDetails, setPaypalDetails] = useState({
    paypalEmail: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Full Name is required.";
    if (!formData.phone.trim()) errs.phone = "Phone/WhatsApp Number is required.";
    if (!formData.email.trim()) {
      errs.email = "Email Address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Valid email address required.";
    }
    if (!formData.address.trim()) errs.address = "Delivery Address is required.";
    if (!formData.city.trim()) errs.city = "City is required.";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleProceedToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (items.length === 0) return;

    setIsSubmitting(true);

    // Save order data with credentials to sessionStorage for the success page
    const orderData = {
      orderId: `HNJ-${Math.floor(100000 + Math.random() * 900000)}`,
      customer: formData,
      items,
      subtotalPrice,
      paymentMethod,
      paymentCredentials: {
        card: cardDetails,
        wallet: walletDetails,
        bank: bankDetails,
        paypal: paypalDetails,
      },
      createdAt: new Date().toISOString(),
    };

    try {
      sessionStorage.setItem("husn_latest_order", JSON.stringify(orderData));
    } catch (err) {
      console.error("Failed to save order info:", err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/checkout/success");
    }, 600);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen w-full bg-[#F5F0E9] pt-36 pb-24 text-[#1C1B1B]">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-6">
          <div className="w-20 h-20 bg-[#B98388]/10 text-[#B98388] rounded-full flex items-center justify-center mx-auto">
            <Sparkles className="w-10 h-10" />
          </div>
          <h1 className="font-serif-display text-4xl font-semibold text-[#1C1B1B]">
            Your Shopping Cart is Empty
          </h1>
          <p className="text-sm text-[#1C1B1B]/70 max-w-md mx-auto font-light leading-relaxed">
            Please add items to your cart from our collection before proceeding to checkout.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#3A2620] text-[#FAF8F4] text-xs uppercase tracking-[0.2em] font-semibold rounded-full hover:bg-[#1C1B1B] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#B98388]" /> Return to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#F5F0E9] pt-32 pb-24 text-[#1C1B1B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#3A2620]/10 pb-8">
          <div className="space-y-2">
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#B98388] hover:text-[#3A2620] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
            </Link>
            <h1 className="font-serif-display text-4xl sm:text-5xl font-semibold text-[#1C1B1B]">
              Secure Checkout & WhatsApp Order
            </h1>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-[#FAF8F4] border border-[#3A2620]/10 rounded-xl text-xs text-[#3A2620]">
            <ShieldCheck className="w-4 h-4 text-[#B98388]" />
            <span>Encrypted Order Processing</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form Left Column */}
          <div className="lg:col-span-7 space-y-10">
            {/* Step 1: Customer Details */}
            <form onSubmit={handleProceedToWhatsApp} noValidate className="space-y-8">
              <div className="bg-[#FAF8F4] p-8 rounded-3xl border border-[#3A2620]/10 shadow-xs space-y-6">
                <div className="flex items-center justify-between border-b border-[#3A2620]/10 pb-4">
                  <h2 className="font-serif-display text-2xl font-semibold text-[#1C1B1B]">
                    1. Shipping & Customer Details
                  </h2>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#B98388] font-bold">
                    Step 1 of 2
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#3A2620]">
                      Full Name <span className="text-[#B98388]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Fatima Ali"
                      className={`w-full px-4 py-3 bg-[#F5F0E9] border rounded-xl text-xs text-[#1C1B1B] focus:outline-none focus:ring-2 focus:ring-[#B98388] transition-all ${
                        errors.name ? "border-red-500" : "border-[#3A2620]/15"
                      }`}
                    />
                    {errors.name && <p className="text-[11px] text-red-500">{errors.name}</p>}
                  </div>

                  {/* Phone / WhatsApp */}
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#3A2620]">
                      Phone / WhatsApp Number <span className="text-[#B98388]">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 0300 1234567"
                      className={`w-full px-4 py-3 bg-[#F5F0E9] border rounded-xl text-xs text-[#1C1B1B] focus:outline-none focus:ring-2 focus:ring-[#B98388] transition-all ${
                        errors.phone ? "border-red-500" : "border-[#3A2620]/15"
                      }`}
                    />
                    {errors.phone && <p className="text-[11px] text-red-500">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#3A2620]">
                      Email Address <span className="text-[#B98388]">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="fatima@example.com"
                      className={`w-full px-4 py-3 bg-[#F5F0E9] border rounded-xl text-xs text-[#1C1B1B] focus:outline-none focus:ring-2 focus:ring-[#B98388] transition-all ${
                        errors.email ? "border-red-500" : "border-[#3A2620]/15"
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-red-500">{errors.email}</p>}
                  </div>

                  {/* City */}
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#3A2620]">
                      City <span className="text-[#B98388]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Lahore, Karachi, Islamabad"
                      className={`w-full px-4 py-3 bg-[#F5F0E9] border rounded-xl text-xs text-[#1C1B1B] focus:outline-none focus:ring-2 focus:ring-[#B98388] transition-all ${
                        errors.city ? "border-red-500" : "border-[#3A2620]/15"
                      }`}
                    />
                    {errors.city && <p className="text-[11px] text-red-500">{errors.city}</p>}
                  </div>
                </div>

                {/* Delivery Street Address */}
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#3A2620]">
                    Complete Delivery Address <span className="text-[#B98388]">*</span>
                  </label>
                  <textarea
                    rows={2}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="House / Apartment number, Street address, Sector or Area"
                    className={`w-full px-4 py-3 bg-[#F5F0E9] border rounded-xl text-xs text-[#1C1B1B] focus:outline-none focus:ring-2 focus:ring-[#B98388] transition-all resize-none ${
                      errors.address ? "border-red-500" : "border-[#3A2620]/15"
                    }`}
                  />
                  {errors.address && <p className="text-[11px] text-red-500">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Country */}
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#3A2620]">
                      Country
                    </label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="Pakistan or International"
                      className="w-full px-4 py-3 bg-[#F5F0E9] border border-[#3A2620]/15 rounded-xl text-xs text-[#1C1B1B]"
                    />
                  </div>

                  {/* Postal Code */}
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#3A2620]">
                      Postal Code (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      placeholder="54000"
                      className="w-full px-4 py-3 bg-[#F5F0E9] border border-[#3A2620]/15 rounded-xl text-xs text-[#1C1B1B]"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#3A2620]">
                    Order Notes / Custom Fitting Requests (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Specific sleeve length, fitting details, or delivery time preference..."
                    className="w-full px-4 py-3 bg-[#F5F0E9] border border-[#3A2620]/15 rounded-xl text-xs text-[#1C1B1B] resize-none"
                  />
                </div>
              </div>

              {/* Step 2: Global Payment Methods */}
              <div className="bg-[#FAF8F4] p-8 rounded-3xl border border-[#3A2620]/10 shadow-xs space-y-6">
                <div className="flex items-center justify-between border-b border-[#3A2620]/10 pb-4">
                  <div>
                    <h2 className="font-serif-display text-2xl font-semibold text-[#1C1B1B]">
                      2. Payment Method (World-Wide & Local)
                    </h2>
                    <p className="text-xs text-[#1C1B1B]/70 font-light mt-1">
                      Choose how you would like to complete your payment. All global ATM cards & local methods supported.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#B98388] font-bold">
                    Step 2 of 2
                  </span>
                </div>

                {/* Payment Channel Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Option 1: Credit / Debit Cards (ATM) */}
                  <label
                    className={`flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${
                      paymentMethod === "card"
                        ? "bg-[#F5F0E9] border-[#3A2620] shadow-sm ring-1 ring-[#3A2620]"
                        : "bg-[#FAF8F4] border-[#3A2620]/10 hover:border-[#3A2620]/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_method"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="mt-1 accent-[#3A2620]"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#1C1B1B]">
                        <CreditCard className="w-4 h-4 text-[#B98388]" />
                        <span>ATM / Credit & Debit Cards</span>
                      </div>
                      <p className="text-[11px] text-[#1C1B1B]/70 leading-relaxed font-light">
                        Visa, MasterCard, UnionPay, PayPak, Amex (World-wide ATM cards).
                      </p>
                      <div className="pt-1 flex flex-wrap gap-1 text-[9px] font-mono font-bold text-[#3A2620]/60">
                        <span className="px-1.5 py-0.5 bg-[#FAF8F4] border border-[#3A2620]/10 rounded">VISA</span>
                        <span className="px-1.5 py-0.5 bg-[#FAF8F4] border border-[#3A2620]/10 rounded">MasterCard</span>
                        <span className="px-1.5 py-0.5 bg-[#FAF8F4] border border-[#3A2620]/10 rounded">PayPak</span>
                      </div>
                    </div>
                  </label>

                  {/* Option 2: PayPal / International */}
                  <label
                    className={`flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${
                      paymentMethod === "paypal"
                        ? "bg-[#F5F0E9] border-[#3A2620] shadow-sm ring-1 ring-[#3A2620]"
                        : "bg-[#FAF8F4] border-[#3A2620]/10 hover:border-[#3A2620]/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_method"
                      value="paypal"
                      checked={paymentMethod === "paypal"}
                      onChange={() => setPaymentMethod("paypal")}
                      className="mt-1 accent-[#3A2620]"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#1C1B1B]">
                        <Globe2 className="w-4 h-4 text-[#B98388]" />
                        <span>PayPal & International Transfer</span>
                      </div>
                      <p className="text-[11px] text-[#1C1B1B]/70 leading-relaxed font-light">
                        Overseas customers can pay securely via PayPal account or remittance.
                      </p>
                    </div>
                  </label>

                  {/* Option 3: JazzCash / EasyPaisa */}
                  <label
                    className={`flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${
                      paymentMethod === "mobile_wallet"
                        ? "bg-[#F5F0E9] border-[#3A2620] shadow-sm ring-1 ring-[#3A2620]"
                        : "bg-[#FAF8F4] border-[#3A2620]/10 hover:border-[#3A2620]/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_method"
                      value="mobile_wallet"
                      checked={paymentMethod === "mobile_wallet"}
                      onChange={() => setPaymentMethod("mobile_wallet")}
                      className="mt-1 accent-[#3A2620]"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#1C1B1B]">
                        <Smartphone className="w-4 h-4 text-[#B98388]" />
                        <span>JazzCash / EasyPaisa / Raast</span>
                      </div>
                      <p className="text-[11px] text-[#1C1B1B]/70 leading-relaxed font-light">
                        Instant mobile wallet payment across Pakistan.
                      </p>
                    </div>
                  </label>

                  {/* Option 4: Direct Bank Transfer */}
                  <label
                    className={`flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${
                      paymentMethod === "bank"
                        ? "bg-[#F5F0E9] border-[#3A2620] shadow-sm ring-1 ring-[#3A2620]"
                        : "bg-[#FAF8F4] border-[#3A2620]/10 hover:border-[#3A2620]/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_method"
                      value="bank"
                      checked={paymentMethod === "bank"}
                      onChange={() => setPaymentMethod("bank")}
                      className="mt-1 accent-[#3A2620]"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#1C1B1B]">
                        <Building2 className="w-4 h-4 text-[#B98388]" />
                        <span>Direct Bank Wire / IBAN</span>
                      </div>
                      <p className="text-[11px] text-[#1C1B1B]/70 leading-relaxed font-light">
                        Online banking or ATM transfer to official bank account.
                      </p>
                    </div>
                  </label>

                  {/* Option 5: Cash on Delivery */}
                  <label
                    className={`flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer sm:col-span-2 ${
                      paymentMethod === "cod"
                        ? "bg-[#F5F0E9] border-[#3A2620] shadow-sm ring-1 ring-[#3A2620]"
                        : "bg-[#FAF8F4] border-[#3A2620]/10 hover:border-[#3A2620]/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_method"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="mt-1 accent-[#3A2620]"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#1C1B1B]">
                        <Banknote className="w-4 h-4 text-[#B98388]" />
                        <span>Cash on Delivery (COD)</span>
                      </div>
                      <p className="text-[11px] text-[#1C1B1B]/70 leading-relaxed font-light">
                        Pay cash to courier driver upon doorstep delivery.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Personal Payment Credential Inputs */}
                {paymentMethod === "card" && (
                  <div className="p-6 rounded-2xl bg-[#F5F0E9] border border-[#3A2620]/15 space-y-6 animate-fade-in">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider font-semibold text-[#3A2620] flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#B98388]" /> Enter Your ATM / Credit Card Credentials
                      </span>
                      <span className="text-[10px] font-mono text-[#B98388]">256-Bit SSL Secure</span>
                    </div>

                    {/* Visual Card Preview */}
                    <div className="relative aspect-[1.8/1] w-full max-w-sm mx-auto rounded-2xl bg-gradient-to-tr from-[#1C1B1B] via-[#3A2620] to-[#5C3D34] text-[#FAF8F4] p-6 shadow-2xl overflow-hidden flex flex-col justify-between border border-[#C5A059]/30">
                      <div className="flex items-center justify-between">
                        <span className="font-serif-display text-lg tracking-wider text-[#C5A059]">Husn-e-Hijab</span>
                        <span className="font-mono text-xs tracking-widest uppercase font-semibold text-[#FAF8F4]/80">
                          {cardDetails.number.startsWith("4") ? "VISA" : cardDetails.number.startsWith("5") ? "MasterCard" : "PayPak"}
                        </span>
                      </div>

                      <div className="space-y-4">
                        <div className="w-10 h-7 rounded bg-gradient-to-r from-amber-200 to-yellow-400 shadow-sm border border-amber-300 opacity-90" />
                        <div className="font-mono text-lg sm:text-xl tracking-widest font-semibold text-[#FAF8F4]">
                          {cardDetails.number || "•••• •••• •••• ••••"}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[#FAF8F4]/80">
                        <div>
                          <div className="text-[8px] text-[#C5A059]">Cardholder Name</div>
                          <div className="font-semibold truncate max-w-[180px]">
                            {cardDetails.holderName || "FATIMA ALI"}
                          </div>
                        </div>
                        <div>
                          <div className="text-[8px] text-[#C5A059]">Expires</div>
                          <div className="font-semibold">{cardDetails.expiry || "MM/YY"}</div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#3A2620]">
                          Cardholder Name <span className="text-[#B98388]">*</span>
                        </label>
                        <input
                          type="text"
                          value={cardDetails.holderName}
                          onChange={(e) => setCardDetails({ ...cardDetails, holderName: e.target.value })}
                          placeholder="Name printed on card"
                          className="w-full px-4 py-2.5 bg-[#FAF8F4] border border-[#3A2620]/20 rounded-xl text-xs text-[#1C1B1B] focus:outline-none focus:ring-2 focus:ring-[#B98388]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#3A2620]">
                          Card Number (16 Digits) <span className="text-[#B98388]">*</span>
                        </label>
                        <input
                          type="text"
                          maxLength={19}
                          value={cardDetails.number}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
                            setCardDetails({ ...cardDetails, number: val });
                          }}
                          placeholder="4000 1234 5678 9010"
                          className="w-full px-4 py-2.5 bg-[#FAF8F4] border border-[#3A2620]/20 rounded-xl text-xs font-mono text-[#1C1B1B] focus:outline-none focus:ring-2 focus:ring-[#B98388]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#3A2620]">
                          Expiry Date <span className="text-[#B98388]">*</span>
                        </label>
                        <input
                          type="text"
                          maxLength={5}
                          value={cardDetails.expiry}
                          onChange={(e) => {
                            let val = e.target.value.replace(/\D/g, "");
                            if (val.length >= 3) val = `${val.slice(0, 2)}/${val.slice(2, 4)}`;
                            setCardDetails({ ...cardDetails, expiry: val });
                          }}
                          placeholder="MM/YY"
                          className="w-full px-4 py-2.5 bg-[#FAF8F4] border border-[#3A2620]/20 rounded-xl text-xs font-mono text-[#1C1B1B] focus:outline-none focus:ring-2 focus:ring-[#B98388]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#3A2620]">
                          CVV / Security Code <span className="text-[#B98388]">*</span>
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardDetails.cvc}
                          onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value.replace(/\D/g, "") })}
                          placeholder="3 or 4 digits"
                          className="w-full px-4 py-2.5 bg-[#FAF8F4] border border-[#3A2620]/20 rounded-xl text-xs font-mono text-[#1C1B1B] focus:outline-none focus:ring-2 focus:ring-[#B98388]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "mobile_wallet" && (
                  <div className="p-6 rounded-2xl bg-[#F5F0E9] border border-[#3A2620]/15 space-y-4 animate-fade-in">
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#3A2620] flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-[#B98388]" /> Enter Mobile Wallet Transfer Details
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#3A2620]">
                          Sender Wallet Number <span className="text-[#B98388]">*</span>
                        </label>
                        <input
                          type="tel"
                          value={walletDetails.senderNumber}
                          onChange={(e) => setWalletDetails({ ...walletDetails, senderNumber: e.target.value })}
                          placeholder="0300 0000000"
                          className="w-full px-4 py-2.5 bg-[#FAF8F4] border border-[#3A2620]/20 rounded-xl text-xs text-[#1C1B1B]"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#3A2620]">
                          Sender Account Title
                        </label>
                        <input
                          type="text"
                          value={walletDetails.senderName}
                          onChange={(e) => setWalletDetails({ ...walletDetails, senderName: e.target.value })}
                          placeholder="Name on JazzCash/EasyPaisa"
                          className="w-full px-4 py-2.5 bg-[#FAF8F4] border border-[#3A2620]/20 rounded-xl text-xs text-[#1C1B1B]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "bank" && (
                  <div className="p-6 rounded-2xl bg-[#F5F0E9] border border-[#3A2620]/15 space-y-4 animate-fade-in">
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#3A2620] flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#B98388]" /> Enter Your Bank Transfer References
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#3A2620]">
                          Your Bank Name
                        </label>
                        <input
                          type="text"
                          value={bankDetails.senderBank}
                          onChange={(e) => setBankDetails({ ...bankDetails, senderBank: e.target.value })}
                          placeholder="e.g. HBL, Meezan, Allied"
                          className="w-full px-4 py-2.5 bg-[#FAF8F4] border border-[#3A2620]/20 rounded-xl text-xs text-[#1C1B1B]"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#3A2620]">
                          Sender IBAN / Account No.
                        </label>
                        <input
                          type="text"
                          value={bankDetails.senderAccount}
                          onChange={(e) => setBankDetails({ ...bankDetails, senderAccount: e.target.value })}
                          placeholder="PKxx..."
                          className="w-full px-4 py-2.5 bg-[#FAF8F4] border border-[#3A2620]/20 rounded-xl text-xs font-mono text-[#1C1B1B]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "paypal" && (
                  <div className="p-6 rounded-2xl bg-[#F5F0E9] border border-[#3A2620]/15 space-y-4 animate-fade-in">
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#3A2620] flex items-center gap-2">
                      <Globe2 className="w-4 h-4 text-[#B98388]" /> Enter Your PayPal Account Email
                    </span>
                    <div className="space-y-1.5">
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#3A2620]">
                        PayPal Email Address
                      </label>
                      <input
                        type="email"
                        value={paypalDetails.paypalEmail}
                        onChange={(e) => setPaypalDetails({ ...paypalDetails, paypalEmail: e.target.value })}
                        placeholder="yourpaypal@example.com"
                        className="w-full px-4 py-2.5 bg-[#FAF8F4] border border-[#3A2620]/20 rounded-xl text-xs text-[#1C1B1B]"
                      />
                    </div>
                  </div>
                )}

                {/* Submit Action */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-3 py-4 bg-[#3A2620] text-[#FAF8F4] text-xs uppercase tracking-[0.2em] font-semibold rounded-2xl hover:bg-[#1C1B1B] transition-all duration-300 shadow-lg hover:shadow-2xl disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Processing Order...</span>
                    ) : (
                      <>
                        <MessageSquare className="w-4 h-4 text-[#C5A059]" />
                        <span>Place Order & Open WhatsApp</span>
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-center text-[#3A2620]/60 mt-3 font-light">
                    Clicking will record your selection and format a direct WhatsApp message to {siteConfig.phone}.
                  </p>
                </div>
              </div>
            </form>
          </div>

          {/* Right Column: Order Summary Box */}
          <div className="lg:col-span-5 bg-[#FAF8F4] p-8 rounded-3xl border border-[#3A2620]/10 shadow-xs space-y-6 sticky top-28">
            <div className="flex items-center justify-between border-b border-[#3A2620]/10 pb-4">
              <h3 className="font-serif-display text-2xl font-semibold text-[#1C1B1B]">
                Order Summary
              </h3>
              <span className="text-xs font-mono font-semibold text-[#B98388]">
                {totalItemsCount} {totalItemsCount === 1 ? "Item" : "Items"}
              </span>
            </div>

            {/* List of Cart Items */}
            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 p-3 rounded-2xl bg-[#F5F0E9] border border-[#3A2620]/10"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#FAF8F4] border border-[#3A2620]/5 shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-1.5"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] uppercase tracking-widest font-semibold px-2 py-0.5 bg-[#3A2620] text-[#FAF8F4] rounded-full">
                      {product.category}
                    </span>
                    <h4 className="font-serif-display text-sm font-semibold text-[#1C1B1B] truncate mt-1">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-[#1C1B1B]/60 font-mono">
                      Qty: {quantity} × Rs. {product.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="font-mono text-xs font-bold text-[#3A2620] shrink-0">
                    Rs. {(product.price * quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Subtotal Calculations */}
            <div className="pt-4 border-t border-[#3A2620]/10 space-y-3 text-xs">
              <div className="flex items-center justify-between text-[#1C1B1B]/70">
                <span>Subtotal</span>
                <span className="font-mono font-medium">Rs. {subtotalPrice.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-[#1C1B1B]/70">
                <span>Shipping & Handling</span>
                <span className="font-mono text-emerald-700 font-semibold uppercase tracking-wider text-[10px]">
                  FREE (Complementary)
                </span>
              </div>
              <div className="pt-3 border-t border-[#3A2620]/10 flex items-center justify-between text-base font-semibold text-[#1C1B1B]">
                <span>Total Due</span>
                <span className="font-mono text-xl font-bold text-[#3A2620]">
                  Rs. {subtotalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Protection Note */}
            <div className="p-4 bg-[#F5F0E9] rounded-2xl border border-[#3A2620]/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#3A2620]">
                <CheckCircle className="w-4 h-4 text-[#B98388]" />
                <span>Husn-e-Hijab Guarantee</span>
              </div>
              <p className="text-[11px] text-[#1C1B1B]/70 font-light leading-relaxed">
                Direct WhatsApp order dispatch ensures immediate personal confirmation by our atelier team with full payment verification support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
