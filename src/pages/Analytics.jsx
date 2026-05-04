import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Clock, AlertCircle, Award, BarChart3 } from "lucide-react";
import NavBar from "../components/spify/NavBar";
import FunnelChart from "../components/spify/FunnelChart";
import KPICard from "../components/spify/KPICard";
import { MOCK_CAMPAIGN, MOCK_ORDERS } from "../lib/mockData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from "recharts";

const INSIGHTS = [
  { icon: Clock, text: "80% בחרו מתנה תוך 24 שעות מרגע קבלת ההודעה", color: "text-blue-600", bg: "bg-blue-50" },
  { icon: AlertCircle, text: "12 עובדים לא פתחו את ההודעה — שלח תזכורת", color: "text-amber-600", bg: "bg-amber-50" },
  { icon: Award, text: "המתנה הפופולרית ביותר: שובר ספא פרמיום (28%)", color: "text-purple-600", bg: "bg-purple-50" },
  { icon: TrendingUp, text: "ROI גבוה מהממוצע בענף ב-40%", color: "text-green-600", bg: "bg-green-50" },
];

const categoryData = [
  { name: "ספא", value: 28, fill: "#6366f1" },
  { name: "AirPods", value: 24, fill: "#8b5cf6" },
  { name: "שעון", value: 18, fill: "#a78bfa" },
  { name: "iPad", value: 16, fill: "#c4b5fd" },
  { name: "אחר", value: 14, fill: "#ddd6fe" },
];

const dailyData = [
  { day: "יום 1", selected: 18, opened: 25 },
  { day: "יום 2", selected: 12, opened: 15 },
  { day: "יום 3", selected: 8, opened: 10 },
  { day: "יום 4", selected: 6, opened: 8 },
  { day: "יום 5", selected: 5, opened: 7 },
  { day: "יום 6+", selected: 3, opened: 6 },
];

const benchmarkData = [
  { name: "שלי", roi: 1.8, fill: "#6366f1" },
  { name: "ממוצע ענף", roi: 1.3, fill: "#e2e8f0" },
  { name: "מובילי שוק", roi: 2.1, fill: "#a78bfa" },
];

export default function Analytics() {
  const campaign = MOCK_CAMPAIGN;
  const totalPerceived = MOCK_ORDERS.reduce((sum, o) => sum + o.perceived, 0);
  const totalCost = MOCK_ORDERS.reduce((sum, o) => sum + o.price_tier, 0);
  const roi = totalCost > 0 ? (totalPerceived / totalCost).toFixed(1) : 0;
  const notSelected = campaign.employee_count - campaign.selected_count;

  return (
    <div className="min-h-screen bg-background font-heebo">
      <NavBar />
      <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-4xl font-black mb-2">אנליטיקס</h1>
          <p className="text-muted-foreground text-lg">תובנות ועמוקות על הקמפיין</p>
        </motion.div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KPICard label="ROI כולל" value={`×${roi}`} sub="ערך נתפס / עלות" icon={TrendingUp} color="gold" delay={0} />
          <KPICard label="זמן ממוצע לבחירה" value="3.2 שעות" sub="מהיר מהממוצע" icon={Clock} color="green" delay={0.1} />
          <KPICard label="שביעות רצון" value="94%" sub="מהבחירות" icon={Award} color="primary" delay={0.2} />
          <KPICard label="לא בחרו" value={notSelected} sub={`${Math.round((notSelected/campaign.employee_count)*100)}% מהעובדים`} icon={AlertCircle} color="red" delay={0.3} />
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Funnel */}
          <motion.div
            className="lg:col-span-1 bg-card rounded-3xl p-8 border border-border"
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

          {/* Daily Activity */}
          <motion.div
            className="lg:col-span-2 bg-card rounded-3xl p-8 border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-black mb-6">פעילות לפי יום</h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={dailyData} barGap={4}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
                <Tooltip
                  contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: 12 }}
                  formatter={(v, n) => [v, n === "selected" ? "בחרו" : "פתחו"]}
                />
                <Bar dataKey="opened" fill="#e0e7ff" radius={[6, 6, 0, 0]} name="opened" />
                <Bar dataKey="selected" fill="#6366f1" radius={[6, 6, 0, 0]} name="selected" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Pie Chart - Product Distribution */}
          <motion.div
            className="bg-card rounded-3xl p-8 border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-xl font-black mb-6">התפלגות בחירות</h2>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {categoryData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [`${v}%`, "בחרו"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Benchmark */}
          <motion.div
            className="bg-card rounded-3xl p-8 border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-xl font-black mb-6">Benchmark ענפי</h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={benchmarkData} layout="vertical">
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: "#64748b" }} width={80} />
                <Tooltip formatter={(v) => [`×${v}`, "ROI"]} />
                <Bar dataKey="roi" radius={[0, 8, 8, 0]}>
                  {benchmarkData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Insights */}
        <motion.div
          className="bg-card rounded-3xl p-8 border border-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-xl font-black mb-6">תובנות חכמות</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {INSIGHTS.map((insight, i) => {
              const Icon = insight.icon;
              return (
                <div key={i} className={`flex items-start gap-4 p-4 rounded-2xl ${insight.bg}`}>
                  <div className={`p-2 rounded-xl bg-white ${insight.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className={`text-sm font-medium ${insight.color}`}>{insight.text}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}