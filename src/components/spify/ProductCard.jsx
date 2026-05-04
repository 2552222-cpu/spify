import React from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const PLACEHOLDER = "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600&q=80";

export default function ProductCard({ product, onSelect, showSelectButton = false, selected = false, employeeView = false }) {
  const stockLow = product.stock != null && product.stock <= 5;
  const displayPrice = product.consumer_price ?? 0;

  return (
    <motion.div
      className={`relative bg-white rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer group ${
        selected
          ? "shadow-[0_4px_24px_rgba(0,0,0,0.12)] ring-2 ring-primary/40"
          : "shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.10)]"
      }`}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      onClick={() => onSelect && onSelect(product)}
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-3 right-3 z-10 px-3 py-1 rounded-full text-xs font-bold bg-primary text-white">
          {product.badge}
        </div>
      )}

      {/* Stock Warning */}
      {stockLow && (
        <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-bold bg-red-500 text-white">
          נותרו {product.stock} יחידות
        </div>
      )}

      {/* Image — square aspect ratio */}
      <div className="relative aspect-square bg-secondary overflow-hidden">
        <img
          src={product.image || PLACEHOLDER}
          alt={product.title}
          onError={e => { e.currentTarget.src = PLACEHOLDER; }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Disclaimer overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/30 text-white text-[10px] text-center py-1">
          תמונות להמחשה בלבד
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-base text-foreground leading-tight mb-1 line-clamp-2">{product.title}</h3>

        {/* Pricing */}
        <div className="space-y-1 mb-4 mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-foreground">₪{displayPrice.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground">שווי המתנה</span>
          </div>
          {employeeView && (
            <div className="inline-flex items-center gap-1 bg-green-50 px-3 py-1 rounded-full">
              <span className="text-base font-black text-green-600">₪0</span>
              <span className="text-xs text-green-600 font-medium">המחיר שלך</span>
            </div>
          )}
        </div>

        {/* Warranty */}
        {product.warranty && (
          <div className="flex items-center gap-1.5 mb-4 text-xs text-muted-foreground">
            <Shield className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>{product.warranty}</span>
          </div>
        )}

        {/* Select Button */}
        {showSelectButton && (
          <button
            className={`w-full py-3 rounded-2xl font-semibold text-sm transition-all duration-200 ${
              selected
                ? "bg-primary text-white"
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