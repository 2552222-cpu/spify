import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";
import NavBar from "../components/spify/NavBar";
import { Link } from "react-router-dom";

const items = [
  { icon: "✅", title: "אין דמי הקמה", desc: "אפס עלות כניסה. משלמים רק על תוצאות." },
  { icon: "💳", title: "תשלום 50/50", desc: "50% מקדמה בעת אישור הקמפיין, 50% לפני שיגור המשלוחים." },
  { icon: "🏢", title: "תשלום מול PO", desc: "לחברות — ניתן לשלם מול הזמנת רכש (Purchase Order)." },
  { icon: "⚙️", title: "עמלת תפעול 7.5%", desc: "עמלה אחת כוללת לניהול, לוגיסטיקה ותפעול מלא." },
  { icon: "📦", title: "אין התחייבות למלאי", desc: "ללא תשלום מראש — אין שמירת מלאי. תשלום מראש = שריון מלאי." },
];

export default function Terms() {
  return (
    <div className="min-h-screen bg-background font-heebo">
      <NavBar />
      <div className="pt-28 pb-20 px-4 max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black mb-3">תנאי עבודה</h1>
            <p className="text-muted-foreground text-lg">שקיפות מלאה — לא נאהב הפתעות</p>
          </div>

          {/* Terms Items */}
          <div className="space-y-4 mb-8">
            {items.map((item, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex gap-4 items-start"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-black text-base mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Purchase Mode */}
          <div className="bg-white rounded-3xl p-8 shadow-[0_2px_20px_rgba(0,0,0,0.06)] mb-8">
            <h2 className="text-xl font-black mb-6">מודל רכישה — הלקוח בוחר</h2>
            <div className="space-y-4">
              <div className="p-5 rounded-2xl border-2 border-border">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl">🛒</span>
                  <h3 className="font-bold">רכישה לאחר בחירת עובדים</h3>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">ברירת מחדל</span>
                </div>
                <p className="text-sm text-muted-foreground">הרכישה מתבצעת רק לאחר שהעובדים בחרו. גמישות מלאה, ללא התחייבות למלאי.</p>
              </div>
              <div className="p-5 rounded-2xl border-2 border-border">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl">🔥</span>
                  <h3 className="font-bold">רכישה מראש ושריון מלאי</h3>
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-bold">אפקט WOW</span>
                </div>
                <p className="text-sm text-muted-foreground">המוצרים נשמרים עבורכם מראש. ניתן להציגם לעובדים במשרד ולהגביר מוטיבציה.</p>
              </div>
            </div>
          </div>

          {/* Critical Note */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-8 flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-red-700 text-sm">תנאי קריטי</p>
              <p className="text-red-600 text-sm mt-1">אין התחייבות לשמירת מלאי ללא תשלום מראש. מחירים כפופים לזמינות המוצר בעת ביצוע ההזמנה.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/calculator" className="flex-1 text-center py-4 rounded-2xl border border-border font-semibold hover:bg-secondary transition-all text-sm">
              חשב עלות
            </Link>
            <Link to="/logistics" className="flex-1 text-center gradient-primary text-white py-4 rounded-2xl font-bold hover:opacity-90 transition-all text-sm">
              איך זה עובד בפועל ←
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}