import React from "react";
import { motion } from "framer-motion";
import { Shield, Star, Package } from "lucide-react";

export default function ProductCard({ product, onSelect, showSelectButton = false, selected = false, employeeView = false }) {
  const stockLow = product.stock <= 5;

  return (
    <motion.div
      className={`relative bg-white rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer group ${
        selected
          ? "shadow-2xl shadow-primary/15 ring-2 ring-primary/40"
          : "shadow-[0_2px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)]"
      }`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={() => onSelect && onSelect(product)}
    >
      {/* Badge */}
      {product.badge && (
        <div className={`absolute top-3 right-3 z-10 px-3 py-1 rounded-full text-xs font-bold text-white ${
          product.badge === "BEST SELLER" ? "gradient-primary" : "gradient-gold"
        }`}>
          {product.badge}
        </div>
      )}

      {/* Stock Warning */}
      {stockLow && (
        <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-bold bg-red-500/90 text-white backdrop-blur-sm">
          נותרו {product.stock} יחידות
        </div>
      )}

      {/* Image */}
      <div className="relative h-52 bg-secondary overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-foreground leading-tight mb-1">{product.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{product.description}</p>

        {/* Pricing */}
        <div className="space-y-1 mb-4">
          {/* Perceived Value - BIG */}
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-foreground">₪{product.perceived.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground">שווי נתפס</span>
          </div>

          {/* Consumer Price - struck through */}
          {!employeeView && (
            <div className="flex items-center gap-2">
              <span className="text-sm line-through text-muted-foreground">₪{product.consumer_price.toLocaleString()}</span>
              <span className="text-xs text-muted-foreground">מחיר קמעונאי</span>
            </div>
          )}

          {/* Employee sees ₪0 */}
          {employeeView && (
            <div className="inline-flex items-center gap-1 bg-green-50 px-3 py-1 rounded-full">
              <span className="text-lg font-black text-green-600">₪0</span>
              <span className="text-xs text-green-600 font-medium">המחיר שלך</span>
            </div>
          )}
        </div>

        {/* Warranty */}
        <div className="flex items-center gap-1.5 mb-4 text-xs text-muted-foreground">
          <Shield className="w-3.5 h-3.5 text-green-500" />
          <span>{product.warranty}</span>
        </div>

        {/* Select Button */}
        {showSelectButton && (
          <button
            className={`w-full py-3 rounded-2xl font-semibold text-sm transition-all duration-200 ${
              selected
                ? "gradient-primary text-white shadow-lg shadow-primary/30"
                : "bg-secondary text-foreground hover:bg-primary hover:text-white"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onSelect && onSelect(product);
            }}
          >
            {selected ? "✓ נבחר" : "בחר מתנה זו"}
          </button>
        )}
      </div>
    </motion.div>
  );
}