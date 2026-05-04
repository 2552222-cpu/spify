import React from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const PLACEHOLDER = "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600&q=80";

export default function ProductCard({ product, onSelect, showSelectButton = false, selected = false, employeeView = false }) {
  const stockLow = product.stock != null && product.stock <= 5;
  const displayPrice = product.consumer_price ?? 0;

  return (
    <motion.div
      className={`relative bg-white rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer group h-full flex flex-col ${
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
        <motion.div
          className="absolute top-3 right-3 z-20 px-3.5 py-1.5 rounded-full text-xs font-bold bg-primary text-white"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {product.badge}
        </motion.div>
      )}

      {/* Stock Warning */}
      {stockLow && (
        <motion.div
          className="absolute top-3 left-3 z-20 px-3.5 py-1.5 rounded-full text-xs font-bold bg-red-500 text-white"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          נותרו {product.stock}
        </motion.div>
      )}

      {/* Image Container - larger and more prominent */}
      <div className="relative w-full aspect-[3/4] sm:aspect-[3/4] bg-gradient-to-b from-secondary to-secondary/80 overflow-hidden flex-shrink-0">
        <motion.img
          src={product.image || PLACEHOLDER}
          alt={product.title}
          onError={e => { e.currentTarget.src = PLACEHOLDER; }}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Disclaimer overlay - more prominent */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-[10px] sm:text-[11px] text-center py-2 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          תמונות להמחשה בלבד
        </motion.div>
      </div>

      {/* Content - grows to fill remaining space */}
      <motion.div
        className="p-3 sm:p-5 flex flex-col flex-grow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.3 }}
      >
        {/* Title */}
        <h3 className="font-bold text-xs sm:text-base text-foreground leading-snug mb-2 sm:mb-3 line-clamp-2">
          {product.title}
        </h3>

        {/* Divider */}
        <div className="h-px bg-border/50 mb-2 sm:mb-3" />

        {/* Pricing */}
        <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 flex-grow">
          <div className="flex items-baseline gap-2">
            <motion.span
              className="text-xl sm:text-3xl font-black text-foreground"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              ₪{displayPrice.toLocaleString()}
            </motion.span>
          </div>
          <span className="text-[10px] sm:text-xs text-muted-foreground block">שווי המתנה</span>
          
          {employeeView && (
            <motion.div
              className="inline-flex items-center gap-1 sm:gap-1.5 bg-green-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full mt-1.5 sm:mt-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 }}
            >
              <span className="text-sm sm:text-base font-black text-green-600">₪0</span>
              <span className="text-[10px] sm:text-xs text-green-600 font-medium">המחיר שלך</span>
            </motion.div>
          )}
        </div>

        {/* Warranty */}
        {product.warranty && (
          <motion.div
            className="flex items-center gap-1 sm:gap-1.5 mb-3 sm:mb-4 text-[10px] sm:text-xs text-muted-foreground py-1.5 sm:py-2 px-2 bg-secondary/30 rounded-lg sm:rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.22 }}
          >
            <Shield className="w-3 sm:w-3.5 h-3 sm:h-3.5 flex-shrink-0" strokeWidth={1.5} />
            <span className="line-clamp-1">{product.warranty}</span>
          </motion.div>
        )}

        {/* Select Button */}
        {showSelectButton && (
          <motion.button
            className={`w-full py-2.5 sm:py-3 px-3 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 ${
              selected
                ? "bg-primary text-white shadow-lg shadow-primary/30"
                : "bg-secondary text-foreground hover:bg-primary hover:text-white"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onSelect && onSelect(product);
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {selected ? "✓ נבחר" : "אני רוצה את זה"}
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
}