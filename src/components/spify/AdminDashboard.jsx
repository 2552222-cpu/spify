import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { AlertCircle, TrendingUp, Package } from "lucide-react";
import { MOCK_PRODUCTS, MOCK_ORDERS, STATUS_LABELS } from "../../lib/mockData";

export default function AdminDashboard() {
  // Order status breakdown
  const ordersByStatus = useMemo(() => {
    const counts = { pending: 0, selected: 0, ordered: 0, shipped: 0, delivered: 0 };
    MOCK_ORDERS.forEach(order => {
      if (order.status in counts) counts[order.status]++;
    });
    return [
      { name: STATUS_LABELS.pending || "ממתין", value: counts.pending, fill: "#FCD34D" },
      { name: STATUS_LABELS.selected || "נבחר", value: counts.selected, fill: "#60A5FA" },
      { name: STATUS_LABELS.ordered || "הוזמן", value: counts.ordered, fill: "#818CF8" },
      { name: STATUS_LABELS.shipped || "בדרך", value: counts.shipped, fill: "#A78BFA" },
      { name: STATUS_LABELS.delivered || "נמסר", value: counts.delivered, fill: "#34D399" },
    ];
  }, []);

  // Low stock products
  const lowStockProducts = useMemo(() => {
    return MOCK_PRODUCTS
      .filter(p => p.stock != null && p.stock <= 5 && p.active)
      .sort((a, b) => a.stock - b.stock)
      .slice(0, 8);
  }, []);

  // Most popular products (by selection in orders)
  const popularProducts = useMemo(() => {
    const productCount = {};
    MOCK_ORDERS.forEach(order => {
      productCount[order.product_title] = (productCount[order.product_title] || 0) + 1;
    });
    
    return Object.entries(productCount)
      .map(([title, count]) => {
        const product = MOCK_PRODUCTS.find(p => p.title === title);
        return { title, count, price: product?.consumer_price };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, []);

  const popularChartData = popularProducts.map((p, i) => ({
    name: p.title.length > 15 ? p.title.substring(0, 12) + "..." : p.title,
    orders: p.count,
    fullName: p.title,
  }));

  return (
    <div className="min-h-screen bg-background font-heebo">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-black mb-2">דשבורד ניהול</h1>
          <p className="text-muted-foreground">סטטיסטיקות וניתוח הזמנות ומוצרים בזמן אמת</p>
        </motion.div>

        {/* KPI Cards */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {[
            { label: "סך הזמנות", value: MOCK_ORDERS.length, icon: "📦", color: "bg-blue-100" },
            { label: "מוצרים פעילים", value: MOCK_PRODUCTS.filter(p => p.active).length, icon: "✅", color: "bg-green-100" },
            { label: "מוצרים בתור", value: MOCK_PRODUCTS.filter(p => p.stock != null && p.stock <= 5).length, icon: "⚠️", color: "bg-amber-100" },
            { label: "הזמנות נמסרות", value: MOCK_ORDERS.filter(o => o.status === "delivered").length, icon: "✓", color: "bg-emerald-100" },
          ].map((kpi, i) => (
            <motion.div
              key={i}
              className={`${kpi.color} rounded-2xl p-4 text-right`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-foreground">{kpi.value}</span>
                <span className="text-2xl">{kpi.icon}</span>
              </div>
              <div className="text-xs text-muted-foreground font-medium mt-1">{kpi.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Order Status Pie Chart */}
          <motion.div
            className="bg-card rounded-3xl p-6 border border-border shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-lg font-black mb-4">הזמנות לפי סטטוס</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={ordersByStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {ordersByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} הזמנות`} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Most Popular Products Bar Chart */}
          <motion.div
            className="bg-card rounded-3xl p-6 border border-border shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <h2 className="text-lg font-black mb-4">מוצרים הכי מבוקשים</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={popularChartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} fontSize={12} />
                <Tooltip formatter={(value) => `${value} הזמנות`} />
                <Bar dataKey="orders" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Low Stock Alert */}
        {lowStockProducts.length > 0 && (
          <motion.div
            className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-amber-600" />
              <h2 className="text-lg font-black text-amber-900">⚠️ מוצרים בתור נמוך</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {lowStockProducts.map((product) => (
                <motion.div
                  key={product.id}
                  className="bg-white rounded-xl p-3 border border-amber-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-sm font-bold line-clamp-2 mb-1">{product.title}</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-amber-600">{product.stock}</span>
                    <span className="text-xs text-muted-foreground">יח׳ נותרו</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Detailed Analytics Table */}
        <motion.div
          className="bg-card rounded-3xl p-6 border border-border shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <h2 className="text-lg font-black mb-4">הזמנות אחרונות</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr className="text-right text-muted-foreground text-xs font-semibold">
                  <th className="pb-3">שם עובד</th>
                  <th className="pb-3">מוצר</th>
                  <th className="pb-3">מדרגה</th>
                  <th className="pb-3">סטטוס</th>
                  <th className="pb-3">תאריך</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_ORDERS.slice(0, 8).map((order) => (
                  <tr key={order.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="py-3 font-semibold">{order.employee_name}</td>
                    <td className="py-3 text-muted-foreground line-clamp-1">{order.product_title}</td>
                    <td className="py-3 font-bold text-primary">₪{order.price_tier?.toLocaleString()}</td>
                    <td className="py-3">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        order.status === "delivered" ? "bg-green-100 text-green-700" :
                        order.status === "shipped" ? "bg-purple-100 text-purple-700" :
                        order.status === "ordered" ? "bg-indigo-100 text-indigo-700" :
                        order.status === "selected" ? "bg-blue-100 text-blue-700" :
                        "bg-amber-100 text-amber-700"
                      }`}>
                        {STATUS_LABELS[order.status] || order.status}
                      </span>
                    </td>
                    <td className="py-3 text-muted-foreground text-xs">
                      {new Date(order.selected_at).toLocaleDateString('he-IL')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}