import React, { useState } from "react";
import { motion } from "framer-motion";
import NavBar from "../components/spify/NavBar";
import { Link } from "react-router-dom";

export default function Calculator() {
  const [employees, setEmployees] = useState(50);
  const [successRate, setSuccessRate] = useState(80);
  const [tier, setTier] = useState(1000);

  const winners = Math.round(employees * (successRate / 100));
  const budget = winners * tier;
  const perceivedPerPerson = tier <= 1000 ? 2200 : 5500;
  const perceivedTotal = winners * perceivedPerPerson;
  const roi = budget > 0 ? (perceivedTotal / budget).toFixed(1) : 0;

  return (
    <div className="min-h-screen bg-background font-heebo">
      <NavBar />
      <div className="pt-28 pb-20 px-4 max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black mb-3">חשב את העלות שלך</h1>
            <p className="text-muted-foreground text-lg">אתם משלמים רק על מי שמגיע ליעד</p>
          </div>

          {/* Inputs */}
          <div className="bg-white rounded-3xl p-8 shadow-[0_2px_20px_rgba(0,0,0,0.06)] mb-6 space-y-8">
            <div>
              <label className="block text-sm font-semibold mb-3">
                מספר עובדים: <span className="text-primary font-black">{employees}</span>
              </label>
              <input type="range" min="5" max="500" value={employees}
                onChange={e => setEmployees(+e.target.value)}
                className="w-full accent-primary" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>5</span><span>500</span></div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-3">
                אחוז הצלחה צפוי: <span className="text-primary font-black">{successRate}%</span>
              </label>
              <input type="range" min="10" max="100" value={successRate}
                onChange={e => setSuccessRate(+e.target.value)}
                className="w-full accent-primary" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>10%</span><span>100%</span></div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-3">מדרגת תגמול</label>
              <div className="grid grid-cols-2 gap-3">
                {[1000, 2500].map(t => (
                  <button key={t}
                    onClick={() => setTier(t)}
                    className={`p-4 rounded-2xl border-2 font-bold transition-all ${tier === t ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}>
                    ₪{t.toLocaleString()}
                    <div className="text-xs text-muted-foreground font-normal mt-1">
                      {t === 1000 ? "שווי נתפס ~₪2,200" : "שווי נתפס ~₪5,500"}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <motion.div
            className="bg-white rounded-3xl p-8 shadow-[0_2px_20px_rgba(0,0,0,0.06)] mb-6"
            key={`${employees}-${successRate}-${tier}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2 className="text-xl font-black mb-6">תוצאות החישוב</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-secondary rounded-2xl">
                <span className="text-muted-foreground">עובדים שישיגו יעד</span>
                <span className="font-black text-2xl">{winners}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-secondary rounded-2xl">
                <span className="text-muted-foreground">תקציב בפועל</span>
                <span className="font-black text-2xl">₪{budget.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-purple-50 rounded-2xl">
                <span className="text-purple-700 font-medium">שווי נתפס כולל</span>
                <span className="font-black text-2xl text-purple-700">₪{perceivedTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-4 gradient-primary rounded-2xl text-white">
                <span className="font-semibold">מכפיל ROI</span>
                <span className="font-black text-3xl">×{roi}</span>
              </div>
            </div>
          </motion.div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-center mb-8">
            <p className="text-amber-800 font-bold text-lg">העובדים מרגישים פי 2–3 ממה שאתם משלמים</p>
            <p className="text-amber-600 text-sm mt-1">כי המתנה האמיתית שווה הרבה יותר מהעלות שלה</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/" className="flex-1 text-center py-4 rounded-2xl border border-border font-semibold hover:bg-secondary transition-all text-sm">
              חזרה לדף הבית
            </Link>
            <Link to="/terms" className="flex-1 text-center gradient-primary text-white py-4 rounded-2xl font-bold hover:opacity-90 transition-all text-sm">
              לתנאי עבודה ←
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}