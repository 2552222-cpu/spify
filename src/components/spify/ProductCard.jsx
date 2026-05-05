import React from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const PLACEHOLDER = "https://media.base44.com/images/public/69f8ef4e14a99d2803ea13b4/ff6758d7e_generated_image.png";

export default function ProductCard({ product, onSelect, showSelectButton = false, selected = false, employeeView = false }) {
  const stockLow = product.stock != null && product.stock <= 5;
  const displayPrice = product.consumer_price ?? 0;

  return (
    <motion.div
      className={`relative bg-white rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer group flex flex-col ${
        selected
          ? "shadow-[0_8px_32px_rgba(0,0,0,0.15)] ring-2 ring-primary/40"
          : "shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
      }`}
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => onSelect && onSelect(product)}
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-3 right-3 z-20 px-3 py-1 rounded-full text-xs font-bold bg-primary text-white shadow-sm">
          {product.badge}
        </div>
      )}

      {/* Stock Warning */}
      {stockLow && (
        <div className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full text-xs font-bold bg-red-500 text-white shadow-sm">
          נותרו {product.stock}
        </div>
      )}

      {/* Image — 1:1 ratio, cover, centered */}
      <div className="relative w-full aspect-square bg-secondary overflow-hidden flex-shrink-0">
        <img
          src={product.image || PLACEHOLDER}
          alt={product.title}
          onError={e => { e.currentTarget.src = PLACEHOLDER; }}
          className="w-full h-full object-cover object-center transition-transform duration-400 group-hover:scale-105"
        />

        {/* Fixed overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-[10px] text-center py-1.5 font-medium tracking-wide">
          תמונות להמחשה בלבד
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title — no model numbers */}
        <h3 className="font-bold text-sm text-foreground leading-snug mb-3 line-clamp-2">
          {product.title}
        </h3>

        <div className="h-px bg-border/40 mb-3" />

        {/* Price block */}
        <div className="flex-grow space-y-1 mb-3">
          <div className="text-2xl font-black text-foreground">
            ₪{displayPrice.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">שווי המתנה</div>

          {employeeView && (
            <div className="inline-flex items-center gap-1.5 bg-green-50 px-3 py-1 rounded-full mt-1">
              <span className="text-sm font-black text-green-600">₪0</span>
              <span className="text-xs text-green-600 font-medium">המחיר שלך</span>
            </div>
          )}
        </div>

        {/* Warranty */}
        {product.warranty && (
          <div className="flex items-center gap-1.5 mb-3 text-xs text-muted-foreground py-1.5 px-2.5 bg-secondary/50 rounded-xl">
            <Shield className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.5} />
            <span className="line-clamp-1">{product.warranty}</span>
          </div>
        )}

        {/* Select Button */}
        {showSelectButton && (
          <button
            className={`w-full py-2.5 px-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
              selected
                ? "bg-primary text-white shadow-lg shadow-primary/30"
                : "bg-secondary text-foreground hover:bg-primary hover:text-white"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onSelect && onSelect(product);
            }}
          >
            {selected ? "✓ נבחר" : "אני רוצה את זה"}
          </button>
        )}
      </div>
    </motion.div>
  );
}