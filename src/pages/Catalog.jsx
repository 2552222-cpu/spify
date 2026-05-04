import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import NavBar from "../components/spify/NavBar";
import ProductCard from "../components/spify/ProductCard";
import { MOCK_PRODUCTS } from "../lib/mockData";

const CATEGORIES = ["הכל", "אלקטרוניקה", "בית וגינה", "ספורט", "נסיעות", "אוכל ושתייה", "אופנה", "בריאות"];
const TIERS = ["הכל", "1000", "2500"];

export default function Catalog() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("הכל");
  const [tier, setTier] = useState("הכל");
  const [selected, setSelected] = useState(null);

  const filtered = MOCK_PRODUCTS.filter(p => {
    const matchSearch = p.title.includes(search) || p.description.includes(search);
    const matchCat = category === "הכל" || p.category === category;
    const matchTier = tier === "הכל" || p.price_tier === parseInt(tier);
    return matchSearch && matchCat && matchTier && p.active;
  });

  return (
    <div className="min-h-screen bg-background font-heebo">
      <NavBar />
      <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-black mb-2">קטלוג מתנות</h1>
          <p className="text-muted-foreground text-lg">{filtered.length} מוצרים זמינים</p>
        </motion.div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="חיפוש מוצר..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-card border border-border rounded-2xl py-3 pr-12 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  category === cat
                    ? "gradient-primary text-white shadow-md"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Tier Filter */}
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground font-medium">מדרגה:</span>
            <div className="flex gap-2">
              {TIERS.map(t => (
                <button
                  key={t}
                  onClick={() => setTier(t)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    tier === t
                      ? "bg-foreground text-background"
                      : "bg-secondary text-muted-foreground hover:bg-border"
                  }`}
                >
                  {t === "הכל" ? "הכל" : `₪${parseInt(t).toLocaleString()}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <ProductCard
                product={product}
                selected={selected?.id === product.id}
                onSelect={setSelected}
              />
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2">לא נמצאו מוצרים</h3>
            <p className="text-muted-foreground">נסה לשנות את הפילטרים</p>
          </div>
        )}
      </div>
    </div>
  );
}