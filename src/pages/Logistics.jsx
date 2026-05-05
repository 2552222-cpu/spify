import React from "react";
import { motion } from "framer-motion";
import { Package, ShieldCheck } from "lucide-react";
import NavBar from "../components/spify/NavBar";
import { Link } from "react-router-dom";

const steps = [
  { num: "01", emoji: "🎁", title: "העובד בוחר מתנה", desc: "דרך הלינק האישי שנשלח אליו — בחירה פשוטה ומהירה." },
  { num: "02", emoji: "💾", title: "המערכת שומרת הבחירה", desc: "כל בחירה מתועדת אוטומטית בממשק הניהול שלכם." },
  { num: "03", emoji: "📬", title: "צוות boombuy מקבל עדכון", desc: "התראה בזמן אמת לצוות הרכש שלנו." },
  { num: "04", emoji: "🛍️", title: "מתבצע רכש", desc: "אנחנו מבצעים את הרכישה מול הספקים — אתם לא מתעסקים בכלום." },
  { num: "05", emoji: "🚚", title: "משלוח יוצא", desc: "המתנה נשלחת ישירות לכתובת שהעובד הזין." },
];

export default function Logistics() {
  return (
    <div className="min-h-screen bg-background font-heebo">
      <NavBar />
      <div className="pt-28 pb-20 px-4 max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black mb-3">איך זה עובד בפועל</h1>
            <p className="text-muted-foreground text-lg">אתם לא מתעסקים בכלום</p>
          </div>

          {/* Steps */}
          <div className="space-y-4 mb-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex gap-5 items-start"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex-shrink-0 text-center">
                  <div className="text-2xl mb-1">{step.emoji}</div>
                  <div className="text-xs font-bold text-muted-foreground">{step.num}</div>
                </div>
                <div>
                  <h3 className="font-black text-base mb-1">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* SLA + Guarantee */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 rounded-2xl p-5 text-center">
              <Package className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="font-black text-xl text-blue-700">10 ימי עסקים</div>
              <div className="text-xs text-blue-600 mt-1">זמן אספקה מקסימלי (SLA)</div>
            </div>
            <div className="bg-green-50 rounded-2xl p-5 text-center">
              <ShieldCheck className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="font-black text-xl text-green-700">אחריות מלאה</div>
              <div className="text-xs text-green-600 mt-1">על כל המשלוחים</div>
            </div>
          </div>

          <div className="bg-foreground text-background rounded-2xl p-6 text-center mb-8">
            <p className="font-black text-xl">אתם לא מתעסקים בכלום</p>
            <p className="text-background/70 text-sm mt-2">אנחנו מנהלים את כל שרשרת האספקה מקצה לקצה</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/terms" className="flex-1 text-center py-4 rounded-2xl border border-border font-semibold hover:bg-secondary transition-all text-sm">
              תנאי עבודה
            </Link>
            <Link to="/catalog" className="flex-1 text-center gradient-primary text-white py-4 rounded-2xl font-bold hover:opacity-90 transition-all text-sm">
              צפה בקטלוג ←
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}