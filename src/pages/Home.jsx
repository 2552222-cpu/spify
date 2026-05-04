import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, CheckCircle, Users, Building2, ChevronLeft, ChevronRight, ArrowLeft, Sparkles } from "lucide-react";
import NavBar from "../components/spify/NavBar";
import WizardStep from "../components/spify/WizardStep";
import { Link } from "react-router-dom";

const TIERS = [1000, 2500];

export default function Home() {
  const [wizardStep, setWizardStep] = useState(null);
  const [form, setForm] = useState({ employees: 50, successRate: 80, tier: 1000 });
  const wizardRef = useRef(null);

  const expectedRecipients = Math.round(form.employees * (form.successRate / 100));
  const totalCost = expectedRecipients * form.tier;
  const perceivedTotal = expectedRecipients * (form.tier === 1000 ? 1900 : 5000);
  const roi = form.tier > 0 ? (perceivedTotal / totalCost).toFixed(1) : 0;

  const startWizard = () => {
    setWizardStep(1);
    setTimeout(() => wizardRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const STEP_LABELS = ["פרטי קמפיין", "סיכום ROI", "בחירת מדרגה", "אישור"];

  return (
    <div className="min-h-screen bg-background font-heebo">
      <NavBar />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video BG */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://media.base44.com/videos/public/69f8ef4e14a99d2803ea13b4/19289e39a_____.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-sm text-white/90 font-medium">פלטפורמת התמריצים המובילה בישראל</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
              עובדים לא מתאמצים<br />
              בשביל שובר<br />
              הם מתאמצים <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-purple-400">לנצח</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              פלטפורמת תמריצים חכמה שהופכת כל יעד עסקי להזדמנות לחגוג. מנהל מגדיר – המערכת עושה הכל.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={startWizard}
                className="group flex items-center gap-3 gradient-primary text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all hover:opacity-90 hover:scale-105 shadow-2xl shadow-primary/40"
              >
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                הפעל דמו
              </button>
              <Link
                to="/catalog"
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-white/20 transition-all"
              >
                צפה בקטלוג
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
              <div className="flex items-center gap-2 text-white/70">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm"><strong className="text-white">1,248</strong> עובדים קיבלו מתנה</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm"><strong className="text-white">14</strong> חברות משתמשות</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center pt-2">
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* WIZARD */}
      <section ref={wizardRef} className="py-20 px-4 bg-background">
        <div className="max-w-3xl mx-auto">
          {wizardStep === null ? (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-black mb-4">בנה קמפיין בדקות</h2>
              <p className="text-muted-foreground text-lg mb-8">המנהל מגדיר — המערכת עושה הכל</p>
              <button onClick={startWizard} className="gradient-primary text-white px-8 py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition-all">
                התחל עכשיו
              </button>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={wizardStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Steps Indicator */}
                <div className="flex items-center justify-center gap-4 mb-10">
                  {STEP_LABELS.map((label, i) => (
                    <React.Fragment key={i}>
                      <WizardStep step={i + 1} currentStep={wizardStep} label={label} />
                      {i < STEP_LABELS.length - 1 && (
                        <div className={`h-px flex-1 max-w-8 transition-all duration-300 ${wizardStep > i + 1 ? "bg-primary" : "bg-border"}`} />
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Step 1 */}
                {wizardStep === 1 && (
                  <div className="bg-card rounded-3xl p-8 border border-border shadow-sm">
                    <h3 className="text-2xl font-black mb-2">פרטי הקמפיין</h3>
                    <p className="text-muted-foreground mb-8">הגדר את היקף הקמפיין</p>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold mb-3">מספר עובדים: <span className="text-primary">{form.employees}</span></label>
                        <input
                          type="range" min="5" max="500" value={form.employees}
                          onChange={e => setForm(f => ({ ...f, employees: +e.target.value }))}
                          className="w-full accent-primary"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>5</span><span>500</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-3">אחוז הצלחה משוער: <span className="text-primary">{form.successRate}%</span></label>
                        <input
                          type="range" min="10" max="100" value={form.successRate}
                          onChange={e => setForm(f => ({ ...f, successRate: +e.target.value }))}
                          className="w-full accent-primary"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>10%</span><span>100%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2 */}
                {wizardStep === 2 && (
                  <div className="bg-card rounded-3xl p-8 border border-border shadow-sm">
                    <h3 className="text-2xl font-black mb-2">סיכום ROI</h3>
                    <p className="text-muted-foreground mb-8">ראה בדיוק מה ההשקעה מביאה</p>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {[
                        { label: "אתה משלם", value: `₪${totalCost.toLocaleString()}`, color: "bg-red-50 text-red-700" },
                        { label: "עובדים מקבלים", value: `₪${perceivedTotal.toLocaleString()}`, color: "bg-green-50 text-green-700" },
                        { label: "פי X ערך", value: `×${roi}`, color: "bg-purple-50 text-purple-700" },
                      ].map(item => (
                        <div key={item.label} className={`rounded-2xl p-4 text-center ${item.color}`}>
                          <div className="text-2xl font-black">{item.value}</div>
                          <div className="text-xs font-medium mt-1">{item.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-secondary rounded-2xl p-4 text-sm text-muted-foreground text-center">
                      מתוך {form.employees} עובדים, <strong className="text-foreground">{expectedRecipients}</strong> צפויים להשיג יעד
                    </div>
                  </div>
                )}

                {/* Step 3 */}
                {wizardStep === 3 && (
                  <div className="bg-card rounded-3xl p-8 border border-border shadow-sm">
                    <h3 className="text-2xl font-black mb-2">בחירת מדרגה</h3>
                    <p className="text-muted-foreground mb-8">בחר את ערך המתנה לעובד</p>
                    <div className="grid grid-cols-2 gap-4">
                      {TIERS.map(tier => (
                        <button
                          key={tier}
                          onClick={() => setForm(f => ({ ...f, tier }))}
                          className={`p-6 rounded-2xl border-2 transition-all duration-200 text-right ${
                            form.tier === tier
                              ? "border-primary bg-primary/5 shadow-md"
                              : "border-border hover:border-primary/40"
                          }`}
                        >
                          <div className="text-3xl font-black text-primary mb-1">₪{tier.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">לעובד</div>
                          {form.tier === tier && (
                            <div className="mt-2 text-xs font-bold text-primary">✓ נבחר</div>
                          )}
                        </button>
                      ))}
                    </div>
                    <div className="mt-6 bg-green-50 border border-green-200 rounded-2xl p-4 text-sm text-green-700 font-medium text-center">
                      ✔ אתה משלם רק על מי שבחר מתנה
                    </div>
                  </div>
                )}

                {/* Step 4 */}
                {wizardStep === 4 && (
                  <div className="bg-card rounded-3xl p-8 border border-border shadow-sm text-center">
                    <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-black mb-2">הקמפיין מוכן!</h3>
                    <p className="text-muted-foreground mb-8">הכל הוגדר — המערכת תעשה את השאר</p>
                    <div className="bg-secondary rounded-2xl p-6 text-right mb-8 space-y-3">
                      <div className="flex justify-between"><span className="text-muted-foreground">עובדים</span><span className="font-bold">{form.employees}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">מדרגה</span><span className="font-bold">₪{form.tier.toLocaleString()}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">תקציב צפוי</span><span className="font-bold">₪{totalCost.toLocaleString()}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">ROI</span><span className="font-black text-primary">×{roi}</span></div>
                    </div>
                    <Link
                      to="/dashboard"
                      className="block w-full gradient-primary text-white py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition-all"
                    >
                      צפה בדשבורד
                    </Link>
                  </div>
                )}

                {/* Navigation */}
                {wizardStep < 4 && (
                  <div className="flex items-center justify-between mt-6">
                    <button
                      onClick={() => setWizardStep(s => Math.max(1, s - 1))}
                      className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                      חזרה
                    </button>
                    <button
                      onClick={() => setWizardStep(s => s + 1)}
                      className="flex items-center gap-2 gradient-primary text-white px-8 py-3 rounded-2xl font-semibold hover:opacity-90 transition-all"
                    >
                      המשך
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-4">איך זה עובד?</h2>
          <p className="text-muted-foreground text-lg mb-16">שלושה שלבים פשוטים</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: "01", title: "מגדיר יעדים", desc: "המנהל מגדיר יעדים ותקציב — פעם אחת, ואז מנוח", icon: "🎯" },
              { num: "02", title: "עובדים משיגים", desc: "העובד מקבל הודעה אישית עם הגדרת היעד שלו", icon: "🏆" },
              { num: "03", title: "בוחרים מתנה", desc: "כל עובד בוחר את המתנה שמושכת אותו מהקטלוג", icon: "🎁" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-card rounded-3xl p-8 border border-border text-right"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="text-xs font-bold text-muted-foreground mb-2">{item.num}</div>
                <h3 className="text-xl font-black mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 px-4 bg-foreground text-background">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-4">מוכן להתחיל?</h2>
          <p className="text-background/70 text-lg mb-8">הצטרף ל-14 חברות שכבר עובדות עם SPIFY</p>
          <button onClick={startWizard} className="bg-background text-foreground px-10 py-4 rounded-2xl font-bold text-lg hover:bg-background/90 transition-all">
            הפעל קמפיין ראשון
          </button>
        </div>
      </section>
    </div>
  );
}