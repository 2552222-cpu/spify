import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function WizardStep({ step, currentStep, label }) {
  const done = currentStep > step;
  const active = currentStep === step;

  return (
    <div className="flex items-center gap-2">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
        done ? "gradient-primary text-white" :
        active ? "bg-primary text-white ring-4 ring-primary/20" :
        "bg-secondary text-muted-foreground"
      }`}>
        {done ? <Check className="w-4 h-4" /> : step}
      </div>
      <span className={`text-sm font-medium hidden sm:block ${active ? "text-foreground" : "text-muted-foreground"}`}>
        {label}
      </span>
    </div>
  );
}