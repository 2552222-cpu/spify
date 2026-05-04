import React from "react";
import { motion } from "framer-motion";
import { Send, Eye, ShoppingBag, TrendingUp, DollarSign, Users, Clock, Package } from "lucide-react";
import NavBar from "../components/spify/NavBar";
import FunnelChart from "../components/spify/FunnelChart";
import KPICard from "../components/spify/KPICard";
import { MOCK_CAMPAIGN, MOCK_ORDERS, STATUS_LABELS, STATUS_COLORS } from "../lib/mockData";

export default function Dashboard() {
  const campaign = MOCK_CAMPAIGN;
  const totalPerceived = MOCK_ORDERS.reduce((sum, o) => sum + o.perceived, 0);
  const roi = campaign.budget_actual > 0 ? (totalPerceived / campaign.budget_actual).toFixed(1) : 0;

  return (
    <div className="min-h-screen bg-background font-heebo">
      <NavBar />
      <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-start justify-between mb-10 flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-black">{campaign.name}</h1>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">פעיל</span>
            </div>
            <p className="text-muted-foreground">{campaign.employee_count} עובדים • {campaign.deadline_days} ימים לסיום</p>
          </div>
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3">
            <Clock className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-semibold text-amber-700">{campaign.deadline_days} ימים לבחירה</span>
          </div>
        </motion.div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KPICard label="נשלח" value={campaign.sent_count} sub="הודעות" icon={Send} color="primary" delay={0} />
          <KPICard label="נפתח" value={campaign.opened_count} sub={`${Math.round((campaign.opened_count/campaign.sent_count)*100)}% אחוז פתיחה`} icon={Eye} color="purple" delay={0.1} />
          <KPICard label="בחר מתנה" value={campaign.selected_count} sub={`${Math.round((campaign.selected_count/campaign.sent_count)*100)}% מכלל העובדים`} icon={ShoppingBag} color="green" delay={0.2} />
          <KPICard label="ROI" value={`×${roi}`} sub="ערך נתפס vs עלות" icon={TrendingUp} color="gold" delay={0.3} />
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Funnel */}
          <motion.div
            className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-black mb-6">פאנל המרה</h2>
            <FunnelChart
              sent={campaign.sent_count}
              opened={campaign.opened_count}
              selected={campaign.selected_count}
            />
          </motion.div>

          {/* Budget */}
          <motion.div
            className="bg-white rounded-3xl p-8 shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-black mb-6">תקציב</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">תקציב צפוי</span>
                  <span className="font-bold">₪{campaign.budget_expected.toLocaleString()}</span>
                </div>
                <div className="h-3 bg-secondary rounded-full">
                  <div className="h-full bg-blue-400 rounded-full" style={{ width: "100%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">בפועל</span>
                  <span className="font-bold text-green-600">₪{campaign.budget_actual.toLocaleString()}</span>
                </div>
                <div className="h-3 bg-secondary rounded-full">
                  <motion.div
                    className="h-full gradient-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(campaign.budget_actual / campaign.budget_expected) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
                <div className="text-2xl font-black text-green-700">
                  ₪{(campaign.budget_expected - campaign.budget_actual).toLocaleString()}
                </div>
                <div className="text-xs text-green-600 font-medium mt-1">חסכון בפועל</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Orders */}
        <motion.div
          className="bg-white rounded-3xl overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-black">הזמנות אחרונות</h2>
          </div>
          <div className="divide-y divide-border">
            {MOCK_ORDERS.map((order, i) => (
              <motion.div
                key={order.id}
                className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 * i }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {order.employee_name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{order.employee_name}</div>
                    <div className="text-xs text-muted-foreground">{order.product_title}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[order.status]}`}>
                    {STATUS_LABELS[order.status]}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}