import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import HealthChart from "../components/charts/HealthChart";
import DemographicsChart from "../components/charts/PieChart";
import { overviewData } from "../data/dummyData";

export default function Analytics() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-extrabold text-ink dark:text-white">Analytics</h1>
        <p className="text-sm text-muted mt-1">Deeper insight into clinic performance.</p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <HealthChart />
        </div>
        <DemographicsChart />
      </div>

      <div className="bg-card dark:bg-dark-card rounded-card p-6 shadow-soft border border-gray-50 dark:border-dark-border">
        <h3 className="font-bold text-ink dark:text-white mb-6">Monthly Revenue Breakdown</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={overviewData.monthly} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 16, border: "none", boxShadow: "0 12px 32px rgba(17,24,39,0.12)" }} />
              <Bar dataKey="revenue" fill="#3B82F6" radius={[8, 8, 0, 0]} animationDuration={900} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
