import React from "react";
import { motion } from "framer-motion";

export default function FunnelChart({ sent, opened, selected }) {
  const openRate = sent > 0 ? Math.round((opened / sent) * 100) : 0;
  const selectRate = opened > 0 ? Math.round((selected / opened) * 100) : 0;

  const steps = [
    { label: "נשלח", value: sent, pct: 100, color: "from-blue-500 to-blue-400" },
    { label: "נפתח", value: opened, pct: openRate, color: "from-purple-500 to-purple-400" },
    { label: "בחר", value: selected, pct: selectRate, color: "from-green-500 to-green-400" },
  ];

  return (
    <div className="space-y-4">
      {steps.map((step, i) => (
        <div key={step.label}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-foreground">{step.label}</span>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">{step.pct}%</span>
              <span className="text-base font-bold text-foreground">{step.value.toLocaleString()}</span>
            </div>
          </div>
          <div className="h-10 bg-secondary rounded-xl overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${step.color} rounded-xl flex items-center px-3`}
              initial={{ width: 0 }}
              animate={{ width: `${step.pct}%` }}
              transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
            >
              {step.pct > 20 && (
                <span className="text-xs font-bold text-white">{step.value.toLocaleString()}</span>
              )}
            </motion.div>
          </div>
        </div>
      ))}
    </div>
  );
}