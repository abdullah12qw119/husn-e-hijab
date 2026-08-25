"use client";

import { useEffect, useState, useMemo } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import {
  CheckCircle2,
  MessageSquare,
  CreditCard,
  Building2,
  Smartphone,
  Globe2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

interface OrderData {
  orderId: string;
  customer: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    postalCode?: string;
    country: string;
    notes?: string;
  };
  items: Array<{
    product: {
      id: string;
      name: string;
      category: string;
      price: number;
    };
    quantity: number;
  }>;
  subtotalPrice: number;
  paymentMethod: "card" | "paypal" | "bank" | "mobile_wallet" | "cod";
  paymentCredentials?: {
    card?: { holderName: string; number: string; expiry: string; cvc: string };
    wallet?: { senderNumber: string; senderName: string; transactionId: string };
    bank?: { senderBank: string; senderAccount: string; refNo: string };
    paypal?: { paypalEmail: string };
  };
  createdAt: string;
}

export default function OrderSuccessPage() {
  const { clearCart } = useCart();
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    const t = window.setTimeout(() => {
      try {
        const saved = sessionStorage.getItem("husn_latest_order");
        if (saved) {
          setOrder(JSON.parse(saved));
        }
      } catch (err) {
        console.error("Failed to parse order from session:", err);
      }
    }, 0);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (order) {
      clearCart();
    }
  }, [order, clearCart]);

  // Construct structured WhatsApp URL
  const whatsAppUrl = useMemo(() => {
    if (!order) return `https://wa.me/923180290447`;

    const paymentLabelMap: Record<string, string> = {
      card: "ATM / Credit & Debit Cards (Global Visa/MasterCard/PayPak)",
      paypal: "PayPal & International Remittance",
      bank: "Direct Bank Transfer / IBAN",
      mobile_wallet: "JazzCash / EasyPaisa / Raast",
      cod: "Cash on Delivery (COD)",
    };

    let paymentDetailsStr = "";
    if (order.paymentCredentials) {
      const { card, wallet, bank, paypal } = order.paymentCredentials;
      if (order.paymentMethod === "card" && card?.number) {
        paymentDetailsStr = `\n💳 *CARD DETAILS:* Holder: ${card.holderName || "N/A"} | No: ${card.number} | Exp: ${card.expiry || "N/A"}`;
      } else if (order.paymentMethod === "mobile_wallet" && wallet?.senderNumber) {
        paymentDetailsStr = `\n📱 *WALLET DETAILS:* Sender No: ${wallet.senderNumber} ${wallet.senderName ? `(${wallet.senderName})` : ""}`;
      } else if (order.paymentMethod === "bank" && bank?.senderBank) {
        paymentDetailsStr = `\n🏛️ *BANK DETAILS:* ${bank.senderBank} | Account: ${bank.senderAccount || "N/A"}`;
      } else if (order.paymentMethod === "paypal" && paypal?.paypalEmail) {
        paymentDetailsStr = `\n🅿️ *PAYPAL EMAIL:* ${paypal.paypalEmail}`;
      }
    }

    const itemsFormatted = order.items
      .map(
        (item, idx) =>
          `${idx + 1}. *${item.product.name}* (${item.product.category}) x${item.quantity} = Rs. ${(
            item.product.price * item.quantity
          ).toLocaleString()}`
      )
      .join("\n");

    const messageText = `🛍️ *NEW ORDER - HUSN-E-HIJAB*

🆔 *Order ID:* ${order.orderId}
👤 *Customer Name:* ${order.customer.name}
📞 *Phone:* ${order.customer.phone}
✉️ *Email:* ${order.customer.email}
📍 *Delivery Address:* ${order.customer.address}, ${order.customer.city}, ${order.customer.country || "Pakistan"}

📦 *ORDERED ITEMS:*
${itemsFormatted}

💰 *TOTAL AMOUNT:* Rs. ${order.subtotalPrice.toLocaleString()}
💳 *PAYMENT METHOD:* ${paymentLabelMap[order.paymentMethod] || order.paymentMethod}${paymentDetailsStr}

${order.customer.notes ? `📝 *Notes:* ${order.customer.notes}\n` : ""}Please confirm my order and share payment instructions!`;

    const cleanPhone = siteConfig.phoneRaw.replace(/^0/, "92");
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageText)}`;
  }, [order]);

  if (!order) {
    return (
      <div className="min-h-screen w-full bg-[#F5F0E9] pt-36 pb-24 text-[#1C1B1B]">
        <div className="max-w-xl mx-auto px-4 text-center space-y-6">
          <div className="w-16 h-16 bg-[#B98388]/20 text-[#B98388] rounded-full flex items-center justify-center mx-auto">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="font-serif-display text-3xl font-semibold text-[#1C1B1B]">
            Order Confirmation Session Ended
          </h1>
          <p className="text-xs text-[#1C1B1B]/70 max-w-sm mx-auto font-light leading-relaxed">
            If you have already placed an order, please check your WhatsApp for confirmation.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#3A2620] text-[#FAF8F4] text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-[#1C1B1B] transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#F5F0E9] pt-32 pb-24 text-[#1C1B1B]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Banner */}
        <div className="bg-[#FAF8F4] p-8 sm:p-12 rounded-3xl border border-[#3A2620]/10 shadow-sm text-center space-y-6">
          <div className="w-20 h-20 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] font-bold text-[#B98388]">
              ORDER RECORDED • {order.orderId}
            </span>
            <h1 className="font-serif-display text-4xl sm:text-5xl font-semibold text-[#1C1B1B]">
              Thank You, {order.customer.name}!
            </h1>
            <p className="text-xs sm:text-base text-[#1C1B1B]/80 max-w-lg mx-auto font-light leading-relaxed">
              Your order details have been assembled. Click the button below to send your structured order directly to our official WhatsApp.
            </p>
          </div>

          {/* Primary WhatsApp Action Button */}
          <div className="pt-4 max-w-md mx-auto space-y-3">
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-3 py-4 px-8 bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm uppercase tracking-[0.15em] font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5"
            >
              <MessageSquare className="w-5 h-5 fill-current" />
              <span>Open WhatsApp to Confirm Order</span>
            </a>
            <p className="text-[11px] text-[#3A2620]/60 font-mono">
              Official WhatsApp: {siteConfig.phone}
            </p>
          </div>
        </div>

        {/* Order Details & Payment Guide */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Box 1: Order Summary */}
          <div className="bg-[#FAF8F4] p-8 rounded-3xl border border-[#3A2620]/10 space-y-6">
            <h2 className="font-serif-display text-2xl font-semibold text-[#1C1B1B] border-b border-[#3A2620]/10 pb-3">
              Order Summary
            </h2>

            <div className="space-y-3 text-xs">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b border-[#3A2620]/5">
                  <div>
                    <div className="font-semibold text-[#1C1B1B]">{item.product.name}</div>
                    <div className="text-[10px] text-[#3A2620]/60 font-mono">Qty: {item.quantity}</div>
                  </div>
                  <div className="font-mono font-bold text-[#3A2620]">
                    Rs. {(item.product.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}

              <div className="pt-2 flex justify-between items-center text-sm font-bold text-[#1C1B1B]">
                <span>Total Amount:</span>
                <span className="font-mono text-lg text-[#3A2620]">
                  Rs. {order.subtotalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="p-4 bg-[#F5F0E9] rounded-2xl space-y-1 text-xs font-mono text-[#3A2620]/80">
              <div><strong>Deliver To:</strong> {order.customer.name}</div>
              <div><strong>Phone:</strong> {order.customer.phone}</div>
              <div><strong>Address:</strong> {order.customer.address}, {order.customer.city}</div>
            </div>
          </div>

          {/* Box 2: Payment Instructions */}
          <div className="bg-[#FAF8F4] p-8 rounded-3xl border border-[#3A2620]/10 space-y-6">
            <h2 className="font-serif-display text-2xl font-semibold text-[#1C1B1B] border-b border-[#3A2620]/10 pb-3">
              Payment Instructions
            </h2>

            {order.paymentMethod === "card" && (
              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-2 font-semibold text-[#3A2620]">
                  <CreditCard className="w-4 h-4 text-[#B98388]" />
                  <span>ATM / Credit Card (Visa, MasterCard, PayPak)</span>
                </div>
                <p className="text-[#1C1B1B]/70 font-light leading-relaxed">
                  We accept all worldwide ATM debit and credit cards. Once you send the order on WhatsApp, our team will provide a secure online payment link or account IBAN for direct card settlement.
                </p>
                <div className="p-3 bg-[#F5F0E9] rounded-xl text-[11px] font-mono text-[#3A2620] space-y-1">
                  <div>• Supported: Visa, MasterCard, PayPak, UnionPay</div>
                  <div>• Verification: Instant via WhatsApp agent</div>
                </div>
              </div>
            )}

            {order.paymentMethod === "paypal" && (
              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-2 font-semibold text-[#3A2620]">
                  <Globe2 className="w-4 h-4 text-[#B98388]" />
                  <span>PayPal / International Wire</span>
                </div>
                <p className="text-[#1C1B1B]/70 font-light leading-relaxed">
                  For international orders outside Pakistan:
                </p>
                <div className="p-3 bg-[#F5F0E9] rounded-xl text-[11px] font-mono text-[#3A2620] space-y-1">
                  <div>PayPal Email: {siteConfig.email}</div>
                  <div>Reference: {order.orderId}</div>
                </div>
              </div>
            )}

            {order.paymentMethod === "mobile_wallet" && (
              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-2 font-semibold text-[#3A2620]">
                  <Smartphone className="w-4 h-4 text-[#B98388]" />
                  <span>JazzCash / EasyPaisa / Raast</span>
                </div>
                <p className="text-[#1C1B1B]/70 font-light leading-relaxed">
                  Transfer payment to our official business wallet:
                </p>
                <div className="p-3 bg-[#F5F0E9] rounded-xl text-[11px] font-mono text-[#3A2620] space-y-1">
                  <div>Account Title: Husn-e-Hijab</div>
                  <div>Number: {siteConfig.phone}</div>
                </div>
              </div>
            )}

            {order.paymentMethod === "bank" && (
              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-2 font-semibold text-[#3A2620]">
                  <Building2 className="w-4 h-4 text-[#B98388]" />
                  <span>Direct Bank Wire / IBAN</span>
                </div>
                <p className="text-[#1C1B1B]/70 font-light leading-relaxed">
                  Transfer directly via mobile app or ATM:
                </p>
                <div className="p-3 bg-[#F5F0E9] rounded-xl text-[11px] font-mono text-[#3A2620] space-y-1">
                  <div>Bank Name: Meezan Bank Ltd</div>
                  <div>Account Title: Husn-e-Hijab Store</div>
                  <div>Account No: 03180290447105</div>
                </div>
              </div>
            )}

            {order.paymentMethod === "cod" && (
              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-2 font-semibold text-[#3A2620]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Cash on Delivery</span>
                </div>
                <p className="text-[#1C1B1B]/70 font-light leading-relaxed">
                  You will pay cash to the rider upon parcel delivery. Please open WhatsApp to confirm your phone number and address.
                </p>
              </div>
            )}

            <div className="pt-4 flex flex-col gap-2">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#3A2620] text-[#FAF8F4] text-xs uppercase tracking-wider font-semibold rounded-xl hover:bg-[#1C1B1B] transition-colors"
              >
                <span>Send WhatsApp Order Now</span>
                <ArrowRight className="w-4 h-4 text-[#B98388]" />
              </a>
              <Link
                href="/products"
                className="text-center text-xs text-[#3A2620]/60 hover:underline pt-2 font-mono"
              >
                Back to Store Catalog
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
