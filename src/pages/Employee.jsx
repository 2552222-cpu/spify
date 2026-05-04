import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Gift, Star, CheckCircle, ChevronLeft, Sparkles, Trophy } from "lucide-react";
import ProductCard from "../components/spify/ProductCard";
import { MOCK_PRODUCTS } from "../lib/mockData";

const EMPLOYEE_PRODUCTS = MOCK_PRODUCTS.filter(p => p.price_tier === 1000 && p.active);
const RECOMMENDED = EMPLOYEE_PRODUCTS.reduce((best, p) => (!best || p.perceived > best.perceived) ? p : best, null);

export default function Employee() {
  const [selected, setSelected] = useState(null);
  const [step, setStep] = useState("browse"); // browse | confirm | done
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleSelect = (product) => setSelected(product);

  const handleConfirm = () => {
    if (!name || !address) return;
    setStep("done");
  };

  if (step === "done") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex items-center justify-center px-4 font-heebo">
        <motion.div
          className="max-w-md w-full text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <motion.div
            className="w-28 h-28 gradient-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary/40"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: 3, duration: 0.5 }}
          >
            <Trophy className="w-14 h-14 text-white" />
          </motion.div>
          <h1 className="text-3xl font-black mb-3">המתנה בדרך אליך!</h1>
          <p className="text-muted-foreground text-lg mb-8">
            בחרת: <strong className="text-foreground">{selected?.title}</strong><br />
            תגיע תוך 10 ימי עסקים
          </p>
          <div className="bg-card rounded-3xl p-6 border border-border text-right space-y-3 mb-8">
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">שם</span><span className="font-semibold">{name}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">כתובת</span><span className="font-semibold">{address}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">מוצר</span><span className="font-semibold">{selected?.title}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">SLA</span><span className="font-semibold text-green-600">10 ימי עסקים</span></div>
          </div>
          <p className="text-sm text-muted-foreground">🎉 כל הכבוד על השגת היעד!</p>
        </motion.div>
      </div>
    );
  }

  if (step === "confirm") {
    return (
      <div className="min-h-screen bg-background font-heebo">
        <div className="max-w-lg mx-auto px-4 pt-16 pb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <button
              onClick={() => setStep("browse")}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              חזרה לקטלוג
            </button>

            <h1 className="text-3xl font-black mb-2">אישור בחירה</h1>
            <p className="text-muted-foreground mb-8">כמעט סיימנו — מלא פרטי משלוח</p>

            {/* Selected Product Preview */}
            {selected && (
              <div className="bg-card rounded-3xl border border-primary/30 p-4 flex items-center gap-4 mb-8">
                <img src={selected.image} alt={selected.title} className="w-16 h-16 rounded-2xl object-cover" />
                <div>
                  <div className="font-bold">{selected.title}</div>
                  <div className="text-sm text-muted-foreground">שווי נתפס: <span className="font-bold text-foreground">₪{selected.perceived.toLocaleString()}</span></div>
                </div>
                <div className="mr-auto bg-green-100 text-green-700 text-sm font-bold px-3 py-1 rounded-full">₪0</div>
              </div>
            )}

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">שם מלא *</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="ישראל ישראלי"
                  className="w-full bg-card border border-border rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">כתובת למשלוח *</label>
                <input
                  type="text"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="רחוב, עיר, מיקוד"
                  className="w-full bg-card border border-border rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">מספר טלפון</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="050-0000000"
                  className="w-full bg-card border border-border rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
              <div className="bg-secondary rounded-2xl p-4 text-sm text-muted-foreground">
                ✔ SLA: 10 ימי עסקים ממועד האישור
              </div>
              <button
                onClick={handleConfirm}
                disabled={!name || !address}
                className="w-full gradient-primary text-white py-4 rounded-2xl font-bold text-lg disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-all mt-2 shadow-lg shadow-primary/30"
              >
                אשר ושלח מתנה
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-heebo">
      {/* Employee Hero */}
      <div className="gradient-primary py-16 px-4 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24" />
        </div>
        <motion.div
          className="relative z-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-black mb-3">בחר את המתנה שלך</h1>
          <p className="text-white/80 text-lg mb-6">הגעת ליעד — מגיע לך לחגוג!</p>
          <div className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 w-fit mx-auto">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-semibold">14 ימים לבחירה</span>
          </div>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 pb-32">
        {/* Recommended */}
        {RECOMMENDED && (
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-gold" />
              <h2 className="text-xl font-black">ההמלצה שלנו</h2>
              <span className="text-sm text-muted-foreground">(ערך נתפס גבוה ביותר)</span>
            </div>
            <div className="max-w-sm">
              <ProductCard
                product={RECOMMENDED}
                employeeView={true}
                showSelectButton={true}
                selected={selected?.id === RECOMMENDED.id}
                onSelect={(p) => { setSelected(p); setStep("confirm"); }}
              />
            </div>
          </motion.div>
        )}

        {/* All Products */}
        <div>
          <h2 className="text-xl font-black mb-6">כל המתנות</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {EMPLOYEE_PRODUCTS.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <ProductCard
                  product={product}
                  employeeView={true}
                  showSelectButton={true}
                  selected={selected?.id === product.id}
                  onSelect={(p) => { setSelected(p); setStep("confirm"); }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky bottom: selected gift + change button */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-40 glass border-t border-border px-4 py-4"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
          >
            <div className="max-w-5xl mx-auto flex items-center gap-4">
              <img src={selected.image} alt={selected.title} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm truncate">{selected.title}</div>
                <div className="text-xs text-muted-foreground">שווי נתפס: ₪{selected.perceived.toLocaleString()}</div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-xs text-muted-foreground underline flex-shrink-0"
              >
                בחר מתנה אחרת
              </button>
              <button
                onClick={() => setStep("confirm")}
                className="gradient-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm flex-shrink-0 hover:opacity-90 transition-all"
              >
                המשך
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}