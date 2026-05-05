import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ChevronLeft, Trophy } from "lucide-react";
import ProductCard from "../components/spify/ProductCard";
import SuccessPage from "../components/spify/SuccessPage";
import { MOCK_PRODUCTS } from "../lib/mockData";

const EMPLOYEE_PRODUCTS = MOCK_PRODUCTS.filter(p => p.price_tier === 1000 && p.active).slice(0, 6);
const MANAGER_NAME = "מנהלת המכירות";
const EMPLOYEE_NAME = "ישראל";

export default function Employee() {
  const [selected, setSelected] = useState(null);
  const [step, setStep] = useState("browse"); // browse | confirm | done
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleConfirm = () => {
    if (!name || !address) return;
    setStep("done");
  };

  if (step === "done") {
    return <SuccessPage selectedProduct={selected} name={name} address={address} phone={phone} />;
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

            {selected && (
              <div className="bg-card rounded-3xl border border-primary/30 p-4 flex items-center gap-4 mb-8">
                <img src={selected.image} alt={selected.title} className="w-16 h-16 rounded-2xl object-cover" />
                <div>
                  <div className="font-bold">{selected.title}</div>
                  <div className="text-sm text-muted-foreground">שווי נתפס: <span className="font-bold text-foreground">₪{(selected.consumer_price ?? 0).toLocaleString()}</span></div>
                </div>
                <div className="mr-auto bg-green-100 text-green-700 text-sm font-bold px-3 py-1 rounded-full">₪0</div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">שם מלא *</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="ישראל ישראלי"
                  className="w-full bg-card border border-border rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">כתובת למשלוח *</label>
                <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="רחוב, עיר, מיקוד"
                  className="w-full bg-card border border-border rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">מספר טלפון</label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="050-0000000"
                  className="w-full bg-card border border-border rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
              </div>
              <div className="bg-secondary rounded-2xl p-4 text-sm text-muted-foreground">
                ✔ SLA: עד 10 ימי עסקים ממועד האישור
              </div>
              <button onClick={handleConfirm} disabled={!name || !address}
                className="w-full gradient-primary text-white py-4 rounded-2xl font-bold text-lg disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-all mt-2 shadow-lg shadow-primary/30">
                אשר ושלח מתנה 🎁
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-heebo">
      {/* HERO */}
      <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1400&q=80"
          alt="hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />
        <motion.div
          className="relative z-10 text-center px-4 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-5">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-4 leading-tight">
            הגעת ליעד<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">מגיע לך</span>
          </h1>
          <p className="text-white/80 text-xl mb-8">בחר את המתנה שלך</p>
          <div className="flex items-center justify-center gap-2 bg-red-500/80 backdrop-blur-sm rounded-full px-6 py-3 w-fit mx-auto">
            <Clock className="w-4 h-4 text-white" strokeWidth={1.5} />
            <span className="text-white text-sm font-bold">יש לך 14 ימים לבחור את המתנה שלך</span>
          </div>
        </motion.div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10 pb-32">
        {/* Personal Message */}
        <motion.div
          className="bg-white rounded-3xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)] mb-10 border border-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-base leading-relaxed text-foreground">
            <span className="font-black">{EMPLOYEE_NAME}, כל הכבוד על הביצועים 👏</span><br />
            <span className="text-muted-foreground">אנחנו גאים בך.</span><br />
            <span className="text-muted-foreground">בחר לך מתנה שמגיעה לך באמת.</span>
          </p>
          <div className="mt-4 pt-4 border-t border-border text-sm text-muted-foreground font-medium">
            — {MANAGER_NAME}
          </div>
        </motion.div>

        {/* Products Grid */}
        <h2 className="text-2xl font-black mb-6">בחר מתנה</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {EMPLOYEE_PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
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

      {/* Sticky bottom */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-40 glass border-t border-border px-4 py-4"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
          >
            <div className="max-w-2xl mx-auto flex items-center gap-4">
              <img src={selected.image} alt={selected.title} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm truncate">{selected.title}</div>
                <div className="text-xs text-muted-foreground">₪{(selected.consumer_price ?? 0).toLocaleString()}</div>
              </div>
              <button onClick={() => setSelected(null)} className="text-xs text-muted-foreground underline flex-shrink-0">
                החלף
              </button>
              <button onClick={() => setStep("confirm")}
                className="gradient-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm flex-shrink-0 hover:opacity-90 transition-all">
                המשך
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}