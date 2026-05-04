import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, CheckCircle, ChevronLeft, ChevronRight, ArrowLeft, Sparkles, Zap, Plane } from "lucide-react";
import NavBar from "../components/spify/NavBar";
import WizardStep from "../components/spify/WizardStep";
import { Link } from "react-router-dom";
import { MOCK_PRODUCTS } from "../lib/mockData";

const TIERS = [1000, 2500];
const CAMPAIGN_TYPES = [
  { id: "sales", label: "יעדי מכירות", icon: "📈", desc: "תגמול על השגת יעד מכירות רבעוני" },
  { id: "retention", label: "שימור עובדים", icon: "🤝", desc: "תגמול על נאמנות ומחויבות לאורך זמן" },
  { id: "performance", label: "ביצועים אישיים", icon: "🏆", desc: "תגמול על ביצועים יוצאי דופן" },
  { id: "team", label: "הצלחה צוותית", icon: "👥", desc: "תגמול על עמידה ביעד צוותי" },
];

const STEP_LABELS = ["סוג קמפיין", "פרטי קמפיין", "מדרגות", "מודל אספקה", "סוג מתנות", "תצוגת מתנות", "עלות", "ערך"];

export default function Home() {
  const [wizardStep, setWizardStep] = useState(null);
  const [form, setForm] = useState({
    campaignType: null,
    employees: 50,
    successRate: 80,
    tier: 1000,
    rewardType: null,
    purchaseMode: 'on_demand',
  });
  const wizardRef = useRef(null);

  const expectedRecipients = Math.round(form.employees * (form.successRate / 100));
  const totalCost = expectedRecipients * form.tier;
  const avgPerceived = form.tier === 1000 ? 1900 : 6000;
  const perceivedTotal = expectedRecipients * avgPerceived;
  const multiplier = totalCost > 0 ? (perceivedTotal / totalCost).toFixed(1) : 0;

  // Products for preview (step 5)
  const previewProducts = MOCK_PRODUCTS.filter(p =>
    p.price_tier === form.tier &&
    p.active &&
    (!form.rewardType || p.rewardType === form.rewardType)
  ).slice(0, 3);

  const startWizard = () => {
    setWizardStep(1);
    setTimeout(() => wizardRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const canNext = () => {
    if (wizardStep === 1) return !!form.campaignType;
    if (wizardStep === 5) return !!form.rewardType;
    return true;
  };

  return (
    <div className="min-h-screen bg-background font-heebo">
      <NavBar />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="https://media.base44.com/videos/public/69f8ef4e14a99d2803ea13b4/19289e39a_____.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
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

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center pt-2">
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* WIZARD */}
      <section ref={wizardRef} className="py-20 px-4 bg-background">
        <div className="max-w-3xl mx-auto">
          {wizardStep === null ? (
            <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
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
                {/* Steps Indicator - compact for 7 steps */}
                <div className="flex items-center justify-center gap-1 mb-10 overflow-x-auto pb-2">
                  {STEP_LABELS.map((label, i) => (
                    <React.Fragment key={i}>
                      <WizardStep step={i + 1} currentStep={wizardStep} label={i + 1 === wizardStep ? label : ""} />
                      {i < STEP_LABELS.length - 1 && (
                        <div className={`h-px w-4 flex-shrink-0 transition-all duration-300 ${wizardStep > i + 1 ? "bg-primary" : "bg-border"}`} />
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* STEP 1 - Campaign Type */}
                {wizardStep === 1 && (
                  <div className="bg-card rounded-3xl p-8 border border-border shadow-sm">
                    <h3 className="text-2xl font-black mb-2">סוג קמפיין</h3>
                    <p className="text-muted-foreground mb-8">על מה אתה רוצה לתגמל?</p>
                    <div className="grid grid-cols-2 gap-4">
                      {CAMPAIGN_TYPES.map(type => (
                        <button
                          key={type.id}
                          onClick={() => setForm(f => ({ ...f, campaignType: type.id }))}
                          className={`p-5 rounded-2xl border-2 text-right transition-all duration-200 ${
                            form.campaignType === type.id
                              ? "border-primary bg-primary/5 shadow-md"
                              : "border-border hover:border-primary/40"
                          }`}
                        >
                          <div className="text-3xl mb-2">{type.icon}</div>
                          <div className="font-bold text-sm mb-1">{type.label}</div>
                          <div className="text-xs text-muted-foreground">{type.desc}</div>
                          {form.campaignType === type.id && <div className="mt-2 text-xs font-bold text-primary">✓ נבחר</div>}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2 - Employees + Success Rate */}
                {wizardStep === 2 && (
                  <div className="bg-card rounded-3xl p-8 border border-border shadow-sm">
                    <h3 className="text-2xl font-black mb-2">פרטי הקמפיין</h3>
                    <p className="text-muted-foreground mb-8">הגדר את היקף הקמפיין</p>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold mb-3">מספר עובדים: <span className="text-primary">{form.employees}</span></label>
                        <input type="range" min="5" max="500" value={form.employees}
                          onChange={e => setForm(f => ({ ...f, employees: +e.target.value }))}
                          className="w-full accent-primary" />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>5</span><span>500</span></div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-3">אחוז הצלחה משוער: <span className="text-primary">{form.successRate}%</span></label>
                        <input type="range" min="10" max="100" value={form.successRate}
                          onChange={e => setForm(f => ({ ...f, successRate: +e.target.value }))}
                          className="w-full accent-primary" />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>10%</span><span>100%</span></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3 - Tiers */}
                {wizardStep === 3 && (
                  <div className="bg-card rounded-3xl p-8 border border-border shadow-sm">
                    <h3 className="text-2xl font-black mb-2">מדרגות תגמול</h3>
                    <p className="text-muted-foreground mb-8">בחר את ערך המתנה לעובד</p>
                    <div className="grid grid-cols-2 gap-4">
                      {TIERS.map(tier => (
                        <button
                          key={tier}
                          onClick={() => setForm(f => ({ ...f, tier }))}
                          className={`p-6 rounded-2xl border-2 transition-all duration-200 text-right ${
                            form.tier === tier ? "border-primary bg-primary/5 shadow-md" : "border-border hover:border-primary/40"
                          }`}
                        >
                          <div className="text-3xl font-black text-primary mb-1">₪{tier.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">לעובד</div>
                          {form.tier === tier && <div className="mt-2 text-xs font-bold text-primary">✓ נבחר</div>}
                        </button>
                      ))}
                    </div>
                    <div className="mt-4 bg-green-50 border border-green-200 rounded-2xl p-4 text-sm text-green-700 font-medium text-center">
                      ✔ אתה משלם רק על מי שבחר מתנה
                    </div>
                  </div>
                )}

                {/* STEP 4 - Purchase Mode */}
                {wizardStep === 4 && (
                  <div className="bg-card rounded-3xl p-8 border border-border shadow-sm">
                    <h3 className="text-2xl font-black mb-2">איך תרצה לנהל את התגמולים?</h3>
                    <p className="text-muted-foreground mb-8">בחר את מודל האספקה המתאים לקמפיין שלך</p>
                    <div className="space-y-4">
                      {[
                        {
                          id: 'on_demand',
                          label: 'רכישה לאחר בחירת העובדים',
                          sub: 'גמישות מלאה · ללא התחייבות למלאי',
                          desc: 'הרכישה מתבצעת לאחר שהעובדים בחרו. ייתכנו שינויים בדגם בהתאם לזמינות.',
                          tag: 'ברירת מחדל',
                          tagColor: 'bg-blue-100 text-blue-700',
                        },
                        {
                          id: 'pre_purchase',
                          label: 'רכישה מראש ושריון מוצרים',
                          sub: 'שמירת מלאי · ניתן להציג פרסים במשרד',
                          desc: 'המוצרים נשמרים עבורך מראש. ניתן להציגם לעובדים במשרד ולהגביר מוטיבציה.',
                          tag: '🔥 אפקט וואו',
                          tagColor: 'bg-orange-100 text-orange-700',
                        },
                      ].map(opt => (
                        <button
                          key={opt.id}
                          onClick={() => setForm(f => ({ ...f, purchaseMode: opt.id }))}
                          className={`w-full p-6 rounded-2xl border-2 text-right transition-all duration-200 ${
                            form.purchaseMode === opt.id
                              ? 'border-primary bg-primary/5 shadow-md'
                              : 'border-border hover:border-primary/40'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div>
                              <div className="font-black text-base mb-0.5">{opt.label}</div>
                              <div className="text-sm text-muted-foreground">{opt.sub}</div>
                            </div>
                            <span className={`text-xs font-bold px-3 py-1 rounded-full flex-shrink-0 ${opt.tagColor}`}>{opt.tag}</span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-3 leading-relaxed">{opt.desc}</div>
                          {form.purchaseMode === opt.id && <div className="mt-3 text-xs font-bold text-primary">✓ נבחר</div>}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 5 - Reward Type */}
                {wizardStep === 5 && (
                  <div className="bg-card rounded-3xl p-8 border border-border shadow-sm">
                    <h3 className="text-2xl font-black mb-2">סוג מתנות</h3>
                    <p className="text-muted-foreground mb-8">איזה סוג מתנות יציג הקמפיין?</p>
                    <div className="grid grid-cols-2 gap-6">
                      {[
                        { id: "electric", label: "מוצרי חשמל", icon: <Zap className="w-10 h-10" />, desc: "אוזניות, שעונים, מחשבים ועוד" },
                        { id: "vacation", label: "חופשות", icon: <Plane className="w-10 h-10" />, desc: "ספא, נסיעות, חוויות בלתי נשכחות" },
                      ].map(type => (
                        <button
                          key={type.id}
                          onClick={() => setForm(f => ({ ...f, rewardType: type.id }))}
                          className={`p-8 rounded-2xl border-2 text-center transition-all duration-200 ${
                            form.rewardType === type.id ? "border-primary bg-primary/5 shadow-md" : "border-border hover:border-primary/40"
                          }`}
                        >
                          <div className={`mb-4 mx-auto w-fit ${form.rewardType === type.id ? "text-primary" : "text-muted-foreground"}`}>
                            {type.icon}
                          </div>
                          <div className="font-black text-lg mb-1">{type.label}</div>
                          <div className="text-xs text-muted-foreground">{type.desc}</div>
                          {form.rewardType === type.id && <div className="mt-3 text-xs font-bold text-primary">✓ נבחר</div>}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 6 - Gift Preview */}
                {wizardStep === 6 && (
                  <div className="bg-card rounded-3xl p-8 border border-border shadow-sm">
                    <h3 className="text-2xl font-black mb-2">כך יראו המתנות לעובדים</h3>
                    <p className="text-muted-foreground mb-6">מתנות אמיתיות מהקטלוג למדרגת ₪{form.tier.toLocaleString()}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {previewProducts.length > 0 ? previewProducts.map(p => (
                        <div key={p.id} className="rounded-2xl border border-border overflow-hidden bg-background">
                          <div className="h-36 overflow-hidden">
                            <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="p-3">
                            <div className="font-bold text-sm mb-1 line-clamp-1">{p.title}</div>
                            <div className="text-2xl font-black text-foreground">₪{p.perceived.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground mb-3">שווי נתפס</div>
                            <div className="w-full py-2 rounded-xl bg-secondary text-xs font-semibold text-center text-muted-foreground cursor-default">
                              בחר מתנה זו
                            </div>
                          </div>
                        </div>
                      )) : (
                        <div className="col-span-3 text-center py-8 text-muted-foreground">
                          <div className="text-4xl mb-2">🎁</div>
                          <p>אין מוצרים בקטגוריה זו למדרגה זו</p>
                        </div>
                      )}
                    </div>
                    {previewProducts.length > 0 && (
                      <div className="mt-4 text-center text-sm text-muted-foreground">
                        + עוד מוצרים בקטלוג המלא
                      </div>
                    )}
                  </div>
                )}

                {/* STEP 7 - Cost */}
                {wizardStep === 7 && (
                  <div className="bg-card rounded-3xl p-8 border border-border shadow-sm">
                    <h3 className="text-2xl font-black mb-2">עלות בפועל</h3>
                    <p className="text-muted-foreground mb-8">תשלם רק על עובדים שבחרו מתנה</p>
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center p-4 bg-secondary rounded-2xl">
                        <span className="text-muted-foreground">עובדים שישיגו יעד</span>
                        <span className="font-black text-xl">{expectedRecipients}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-secondary rounded-2xl">
                        <span className="text-muted-foreground">מדרגה לעובד</span>
                        <span className="font-black text-xl">₪{form.tier.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 gradient-primary rounded-2xl text-white">
                        <span className="font-semibold">סכום כולל</span>
                        <span className="font-black text-2xl">₪{totalCost.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-sm text-green-700 font-medium text-center">
                      ✔ אתה משלם רק על מי שבחר — לא על כל העובדים
                    </div>
                  </div>
                )}

                {/* STEP 8 - Value */}
                {wizardStep === 8 && (
                  <div className="bg-card rounded-3xl p-8 border border-border shadow-sm text-center">
                    <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-black mb-2">הקמפיין מוכן!</h3>
                    <p className="text-muted-foreground mb-8">הכל הוגדר — המערכת תעשה את השאר</p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-purple-50 rounded-2xl p-5 text-center">
                        <div className="text-3xl font-black text-purple-700">₪{perceivedTotal.toLocaleString()}</div>
                        <div className="text-xs font-medium text-purple-600 mt-1">שווי כולל שיקבלו העובדים</div>
                      </div>
                      <div className="bg-green-50 rounded-2xl p-5 text-center">
                        <div className="text-3xl font-black text-green-700">×{multiplier}</div>
                        <div className="text-xs font-medium text-green-600 mt-1">מכפיל ערך</div>
                      </div>
                    </div>

                    <div className="bg-secondary rounded-2xl p-5 text-right mb-8 space-y-3">
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">עובדים</span><span className="font-bold">{form.employees}</span></div>
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">מדרגה</span><span className="font-bold">₪{form.tier.toLocaleString()}</span></div>
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">סוג מתנות</span><span className="font-bold">{form.rewardType === "electric" ? "מוצרי חשמל" : "חופשות"}</span></div>
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">מודל אספקה</span><span className="font-bold">{form.purchaseMode === 'pre_purchase' ? 'רכישה מראש' : 'רכישה לאחר בחירה'}</span></div>
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">עלות צפויה</span><span className="font-bold">₪{totalCost.toLocaleString()}</span></div>
                    </div>
                    <Link to="/dashboard" className="block w-full gradient-primary text-white py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition-all">
                      צפה בדשבורד
                    </Link>
                  </div>
                )}

                {/* Navigation */}
                {wizardStep < 8 && (
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
                      disabled={!canNext()}
                      className="flex items-center gap-2 gradient-primary text-white px-8 py-3 rounded-2xl font-semibold hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
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

      {/* Comparison Table */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-3">שוברים vs SPIFY</h2>
            <p className="text-muted-foreground text-lg">למה עובדים אוהבים מתנות אמיתיות יותר</p>
          </div>
          <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-sm">
            {/* Header */}
            <div className="grid grid-cols-3 text-sm font-bold">
              <div className="p-4 text-muted-foreground border-b border-border">פרמטר</div>
              <div className="p-4 text-center border-b border-r border-l border-border text-muted-foreground bg-secondary/50">שוברים</div>
              <div className="p-4 text-center border-b border-border gradient-primary text-white rounded-tl-none">SPIFY ✨</div>
            </div>
            {[
              { param: "מה העובד מקבל", voucher: "שובר גנרי", spify: "מתנה אמיתית שבחר" },
              { param: "שווי נתפס", voucher: "₪1,000", spify: "₪2,800+" },
              { param: "מוטיבציה", voucher: "נמוכה", spify: "גבוהה מאוד" },
              { param: "תפעול", voucher: "מורכב", spify: "אפס" },
              { param: "חוויה", voucher: "נמוכה", spify: "גבוהה" },
            ].map((row, i) => (
              <div key={i} className={`grid grid-cols-3 text-sm ${i < 4 ? "border-b border-border" : ""}`}>
                <div className="p-4 font-semibold text-foreground">{row.param}</div>
                <div className="p-4 text-center text-muted-foreground border-r border-l border-border bg-secondary/30">{row.voucher}</div>
                <div className="p-4 text-center font-bold text-primary">{row.spify}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-background">
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