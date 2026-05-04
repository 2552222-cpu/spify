import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Truck, Package, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function SuccessPage({ selectedProduct, name, address, phone }) {
  const steps = [
    { icon: Package, label: "הזמנה אומתה", desc: "אנחנו יצרנו את הזמנתך", completed: true },
    { icon: Truck, label: "בדרך אליך", desc: "בעד 10 ימי עסקים", completed: false, highlight: true },
    { icon: CheckCircle, label: "הגעה", desc: "המתנה תגיע לכתובתך", completed: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background pt-20 pb-16 px-4 font-heebo overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 max-w-2xl mx-auto px-2">
        {/* Checkmark animation */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}
        >
          <div className="relative w-24 h-24">
            {/* Outer ring pulse */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary"
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 1.2, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
            />
            {/* Main circle */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/30">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.2 }}
              >
                <CheckCircle className="w-12 h-12 text-white" strokeWidth={1.5} />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-2xl sm:text-4xl font-black text-center mb-1 sm:mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          המתנה בדרך אליך!
        </motion.h1>

        <motion.p
          className="text-center text-muted-foreground text-sm sm:text-lg mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          בחרת משהו מדהים — תגיע בעד 10 ימי עסקים
        </motion.p>

        {/* Selected Product Card */}
        <motion.div
          className="bg-white rounded-2xl sm:rounded-3xl border-2 border-primary/20 p-4 sm:p-6 mb-8 sm:mb-10 shadow-lg hover:shadow-xl transition-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 sm:gap-5">
            <motion.img
              src={selectedProduct?.image}
              alt={selectedProduct?.title}
              className="w-16 sm:w-20 h-16 sm:h-20 rounded-lg sm:rounded-2xl object-cover flex-shrink-0"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
            />
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm sm:text-lg mb-1 line-clamp-2">{selectedProduct?.title}</div>
              <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
                <span className="text-2xl sm:text-3xl font-black text-primary">₪0</span>
                <span className="text-[10px] sm:text-sm text-muted-foreground whitespace-nowrap">
                  שווי: ₪{(selectedProduct?.consumer_price ?? 0).toLocaleString()}
                </span>
              </div>
            </div>
            <motion.div
              className="bg-green-100 text-green-700 text-[9px] sm:text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full flex-shrink-0"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
            >
              ✓ בחרת
            </motion.div>
          </div>
        </motion.div>

        {/* Order Details */}
        <motion.div
          className="bg-card rounded-2xl sm:rounded-3xl border border-border p-4 sm:p-6 mb-8 sm:mb-10 space-y-3 sm:space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <h2 className="text-base sm:text-lg font-black mb-4 sm:mb-5">פרטי ההזמנה</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {[
              { label: "שם", value: name, icon: "👤" },
              { label: "כתובת משלוח", value: address, icon: "📍" },
              { label: "טלפון", value: phone || "—", icon: "📱" },
              { label: "זמן הגעה", value: "10 ימי עסקים", icon: "⏱️" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-2 sm:gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.05 }}
              >
                <span className="text-base sm:text-lg flex-shrink-0">{item.icon}</span>
                <div className="min-w-0">
                  <div className="text-[10px] sm:text-xs text-muted-foreground font-medium">{item.label}</div>
                  <div className="font-semibold text-xs sm:text-sm truncate">{item.value}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="mb-8 sm:mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-base sm:text-lg font-black mb-4 sm:mb-6">הצעדים הבאים</h2>
          <div className="space-y-3 sm:space-y-4">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className={`relative flex items-center gap-4 p-5 rounded-2xl border-2 transition-all ${
                  step.completed
                    ? "bg-green-50 border-green-200"
                    : step.highlight
                    ? "bg-primary/5 border-primary"
                    : "bg-card border-border"
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.08 }}
                whileHover={{ x: 4 }}
              >
                <motion.div
                  className={`w-10 sm:w-12 h-10 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 text-sm sm:text-lg font-bold ${
                    step.completed
                      ? "bg-green-200 text-green-700"
                      : step.highlight
                      ? "bg-primary text-white"
                      : "bg-secondary text-muted-foreground"
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.75 + i * 0.1, type: "spring" }}
                >
                  {step.completed ? "✓" : i + 1}
                </motion.div>
                  <div className="min-w-0">
                    <div className={`font-bold text-xs sm:text-sm ${step.highlight ? "text-primary" : ""}`}>
                      {step.label}
                    </div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">{step.desc}</div>
                  </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col gap-2 sm:gap-3 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <Link
            to="/catalog"
            className="flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 border-primary text-primary font-bold text-xs sm:text-sm hover:bg-primary/5 transition-all"
          >
            <ArrowLeft className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            חזור לקטלוג
          </Link>
          <div className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-green-100 text-green-700 font-bold text-xs sm:text-sm text-center">
            🎉 כל הכבוד על השגת היעד!
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          className="mt-10 sm:mt-16 pt-6 sm:pt-10 border-t border-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <h3 className="text-xs sm:text-sm font-black mb-3 sm:mb-4 text-muted-foreground">שאלות נפוצות</h3>
          <div className="space-y-2 sm:space-y-3">
            {[
              { q: "מתי המתנה תגיע?", a: "בתוך 10 ימי עסקים מהיום" },
              { q: "איך אדע שההזמנה התקבלה?", a: "תקבל אימייל של אישור הזמנה תוך מעט" },
              { q: "מה אם יש בעיה עם המתנה?", a: "צור קשר עם הממשק ותקבל סיוע מיידי" },
            ].map((faq, i) => (
              <motion.details
                key={i}
                className="group bg-card rounded-lg sm:rounded-xl border border-border p-3 sm:p-4 cursor-pointer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.15 + i * 0.05 }}
              >
                <summary className="flex items-center justify-between font-semibold text-xs sm:text-sm group-open:text-primary transition-colors">
                  <span>{faq.q}</span>
                  <span className="text-base sm:text-lg group-open:rotate-180 transition-transform">›</span>
                </summary>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-2 sm:mt-3 leading-relaxed">{faq.a}</p>
              </motion.details>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}