import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Pencil, Trash2, Upload, Package, LogOut,
  Eye, EyeOff, ShieldCheck, X, Check, Image as ImageIcon
} from "lucide-react";
import { base44 } from "@/api/base44Client";
import { MOCK_ORDERS, STATUS_LABELS, STATUS_COLORS } from "../lib/mockData";

const ADMIN_PASSWORD = "BOOMBUY123";
const CATEGORIES = ["אלקטרוניקה", "בית וגינה", "ספורט", "נסיעות", "אוכל ושתייה", "אופנה", "בריאות"];
const BADGES = ["", "BEST SELLER", "הבחירה המועדפת", "חדש", "מוגבל"];

const emptyProduct = {
  title: "", description: "", category: "אלקטרוניקה",
  rewardType: "electric",
  price_tier: 1000, consumer_price: 0, cost: 0,
  warranty: "שנה אחריות", stock: 10, popular: false, top: false,
  badge: "", image: "", active: true
};

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [pwError, setPwError] = useState(false);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [tab, setTab] = useState("products");
  const [modal, setModal] = useState(null); // null | { mode: "add"|"edit", product }
  const [form, setForm] = useState(emptyProduct);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    if (authed) loadProducts();
  }, [authed]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await base44.entities.Product.list();
      setProducts(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleLogin = () => {
    if (pwInput === ADMIN_PASSWORD) {
      setAuthed(true);
      setPwError(false);
    } else {
      setPwError(true);
    }
  };

  const openAdd = () => {
    setForm(emptyProduct);
    setModal({ mode: "add" });
  };

  const openEdit = (product) => {
    setForm({ ...product });
    setModal({ mode: "edit", product });
  };

  const handleSave = async () => {
    try {
      if (modal.mode === "add") {
        await base44.entities.Product.create(form);
      } else {
        await base44.entities.Product.update(modal.product.id, form);
      }
      setModal(null);
      loadProducts();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id) => {
    try {
      await base44.entities.Product.delete(id);
      setDeleteId(null);
      loadProducts();
    } catch (e) {
      console.error(e);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setForm(f => ({ ...f, image: file_url }));
    } catch (err) {
      console.error(err);
    }
    setUploading(false);
  };

  const handleOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const STATUS_FLOW = ["pending", "selected", "ordered", "shipped"];

  // Login Screen
  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 font-heebo">
        <motion.div
          className="w-full max-w-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-10">
            <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-black mb-1">ממשק ניהול</h1>
            <p className="text-muted-foreground text-sm">SPIFY Admin Panel</p>
          </div>
          <div className="bg-card rounded-3xl p-8 border border-border shadow-sm">
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">סיסמת כניסה</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={pwInput}
                  onChange={e => { setPwInput(e.target.value); setPwError(false); }}
                  onKeyDown={e => e.key === "Enter" && handleLogin()}
                  placeholder="הכנס סיסמה"
                  className={`w-full bg-secondary border rounded-2xl py-3 px-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${pwError ? "border-red-400" : "border-border"}`}
                />
                <button
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPw(s => !s)}
                  type="button"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {pwError && <p className="text-red-500 text-xs mt-2">סיסמה שגויה</p>}
            </div>
            <button
              onClick={handleLogin}
              className="w-full gradient-primary text-white py-3 rounded-2xl font-bold hover:opacity-90 transition-all"
            >
              כניסה
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-heebo">
      {/* Admin Header */}
      <div className="gradient-primary text-white py-6 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6" />
            <h1 className="text-xl font-black">SPIFY Admin</h1>
          </div>
          <button
            onClick={() => setAuthed(false)}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm font-medium transition-all"
          >
            <LogOut className="w-4 h-4" />
            יציאה
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-secondary rounded-2xl p-1 w-fit">
          {[["products", "מוצרים"], ["orders", "הזמנות"]].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === key ? "bg-card shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Products Tab */}
        {tab === "products" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black">ניהול מוצרים ({products.length})</h2>
              <button
                onClick={openAdd}
                className="flex items-center gap-2 gradient-primary text-white px-5 py-2.5 rounded-2xl font-semibold text-sm hover:opacity-90 transition-all"
              >
                <Plus className="w-4 h-4" />
                הוסף מוצר
              </button>
            </div>

            {loading ? (
              <div className="text-center py-20 text-muted-foreground">טוען...</div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map(product => (
                  <motion.div
                    key={product.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {product.image && (
                      <img src={product.image} alt={product.title} className="w-full h-36 object-cover" />
                    )}
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-sm leading-tight">{product.title}</h3>
                        {product.badge && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium flex-shrink-0">{product.badge}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3 flex-wrap">
                        <span>מדרגה ₪{product.price_tier}</span>
                        <span>·</span>
                        <span>צרכן ₪{product.consumer_price?.toLocaleString()}</span>
                        <span>·</span>
                        <span className="text-red-500 font-semibold">עלות ₪{product.cost?.toLocaleString() || "—"}</span>
                        <span>·</span>
                        <span>{product.stock} יח׳</span>
                        {product.top && <span className="text-orange-500 font-bold">🔥 TOP</span>}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(product)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-border text-xs font-medium hover:bg-secondary transition-all"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          עריכה
                        </button>
                        <button
                          onClick={() => setDeleteId(product.id)}
                          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-red-200 text-red-500 text-xs font-medium hover:bg-red-50 transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {tab === "orders" && (
          <div>
            <h2 className="text-2xl font-black mb-6">ניהול הזמנות ({orders.length})</h2>
            <div className="bg-white rounded-3xl overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.06)]">
              <div className="divide-y divide-border">
                {orders.map((order, i) => (
                  <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4 hover:bg-secondary/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {order.employee_name[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{order.employee_name}</div>
                        <div className="text-xs text-muted-foreground">{order.product_title}</div>
                        <div className="text-xs text-muted-foreground">₪{order.price_tier.toLocaleString()} מדרגה</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {STATUS_FLOW.map(s => (
                        <button
                          key={s}
                          onClick={() => handleOrderStatus(order.id, s)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all border ${
                            order.status === s
                              ? STATUS_COLORS[s] + " border-transparent"
                              : "border-border text-muted-foreground hover:bg-secondary"
                          }`}
                        >
                          {STATUS_LABELS[s]}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Product Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card z-10">
                <h2 className="text-xl font-black">{modal.mode === "add" ? "הוסף מוצר" : "עריכת מוצר"}</h2>
                <button onClick={() => setModal(null)} className="p-2 hover:bg-secondary rounded-xl transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                {/* Image */}
                <div>
                  <label className="block text-sm font-semibold mb-2">תמונה</label>
                  {form.image && (
                    <img src={form.image} alt="preview" className="w-full h-40 object-cover rounded-2xl mb-3" />
                  )}
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={form.image}
                        onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                        placeholder="הכנס URL תמונה..."
                        className="w-full bg-secondary border border-border rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <label className="flex items-center gap-2 px-4 py-2.5 bg-secondary border border-border rounded-xl text-sm font-medium cursor-pointer hover:bg-border transition-all flex-shrink-0">
                      <Upload className="w-4 h-4" />
                      {uploading ? "מעלה..." : "העלה"}
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                    </label>
                  </div>
                </div>

                {/* Fields */}
                {[
                  { key: "title", label: "שם המוצר *", type: "text", placeholder: "AirPods Pro 2" },
                  { key: "description", label: "תיאור", type: "textarea" },
                  { key: "warranty", label: "אחריות", type: "text", placeholder: "שנה אחריות יבואן" },
                ].map(field => (
                  <div key={field.key}>
                    <label className="block text-sm font-semibold mb-2">{field.label}</label>
                    {field.type === "textarea" ? (
                      <textarea
                        value={form[field.key] || ""}
                        onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                        rows={3}
                        className="w-full bg-secondary border border-border rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                      />
                    ) : (
                      <input
                        type="text"
                        value={form[field.key] || ""}
                        onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                        placeholder={field.placeholder}
                        className="w-full bg-secondary border border-border rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    )}
                  </div>
                ))}

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { key: "consumer_price", label: "מחיר צרכן ₪" },
                    { key: "cost", label: "מחיר עלות ₪ (אדמין בלבד)" },
                    { key: "stock", label: "מלאי" },
                  ].map(field => (
                    <div key={field.key}>
                      <label className="block text-sm font-semibold mb-2">{field.label}</label>
                      <input
                        type="number"
                        value={form[field.key] || ""}
                        onChange={e => setForm(f => ({ ...f, [field.key]: +e.target.value }))}
                        className="w-full bg-secondary border border-border rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-sm font-semibold mb-2">מדרגה ₪</label>
                    <select
                      value={form.price_tier}
                      onChange={e => setForm(f => ({ ...f, price_tier: +e.target.value }))}
                      className="w-full bg-secondary border border-border rounded-xl py-2.5 px-3 text-sm focus:outline-none"
                    >
                      <option value={1000}>₪1,000</option>
                      <option value={2500}>₪2,500</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">קטגוריה</label>
                  <select
                    value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full bg-secondary border border-border rounded-xl py-2.5 px-3 text-sm focus:outline-none"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Badge</label>
                  <select
                    value={form.badge || ""}
                    onChange={e => setForm(f => ({ ...f, badge: e.target.value || null }))}
                    className="w-full bg-secondary border border-border rounded-xl py-2.5 px-3 text-sm focus:outline-none"
                  >
                    {BADGES.map(b => <option key={b} value={b}>{b || "ללא"}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">סוג מתנה</label>
                  <select
                    value={form.rewardType || "electric"}
                    onChange={e => setForm(f => ({ ...f, rewardType: e.target.value }))}
                    className="w-full bg-secondary border border-border rounded-xl py-2.5 px-3 text-sm focus:outline-none"
                  >
                    <option value="electric">מוצרי חשמל</option>
                    <option value="vacation">חופשות</option>
                  </select>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="active"
                      checked={form.active}
                      onChange={e => setForm(f => ({ ...f, active: e.target.checked }))}
                      className="w-4 h-4 accent-primary"
                    />
                    <label htmlFor="active" className="text-sm font-medium">מוצר פעיל</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="popular"
                      checked={form.popular || false}
                      onChange={e => setForm(f => ({ ...f, popular: e.target.checked }))}
                      className="w-4 h-4 accent-primary"
                    />
                    <label htmlFor="popular" className="text-sm font-medium">פופולרי</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="top"
                      checked={form.top || false}
                      onChange={e => setForm(f => ({ ...f, top: e.target.checked }))}
                      className="w-4 h-4 accent-primary"
                    />
                    <label htmlFor="top" className="text-sm font-medium">🔥 TOP מוצר</label>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 p-6 border-t border-border">
                <button onClick={() => setModal(null)} className="flex-1 py-3 rounded-2xl border border-border text-sm font-semibold hover:bg-secondary transition-all">
                  ביטול
                </button>
                <button
                  onClick={handleSave}
                  disabled={!form.title}
                  className="flex-1 gradient-primary text-white py-3 rounded-2xl text-sm font-bold disabled:opacity-40 hover:opacity-90 transition-all"
                >
                  {modal.mode === "add" ? "הוסף מוצר" : "שמור שינויים"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirm */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="text-xl font-black mb-2">מחיקת מוצר</h3>
              <p className="text-muted-foreground text-sm mb-6">פעולה זו לא ניתנת לביטול</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="flex-1 py-3 rounded-2xl border border-border font-semibold text-sm hover:bg-secondary transition-all">ביטול</button>
                <button onClick={() => handleDelete(deleteId)} className="flex-1 py-3 rounded-2xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-all">מחק</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}