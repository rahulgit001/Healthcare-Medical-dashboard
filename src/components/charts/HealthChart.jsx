import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { overviewData, healthStatus } from "../../data/dummyData";
import HealthCard from "../HealthCard";

const ranges = [
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" },
  { key: "yearly", label: "Yearly" },
];

const series = [
  { key: "patients", color: "#3B82F6" },
  { key: "appointments", color: "#22C55E" },
  { key: "visits", color: "#8B5CF6" },
];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-dark-card rounded-2xl shadow-lift border border-gray-100 dark:border-dark-border px-4 py-3 text-xs">
      <p className="font-semibold text-ink dark:text-white mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center gap-2 text-sm text-muted">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="capitalize">{p.dataKey}:</span>
          <span className="font-semibold text-ink dark:text-white">{p.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function HealthChart() {
  const [range, setRange] = useState("weekly");
  const data = overviewData[range];

  const summary = useMemo(() => {
    const totals = data.reduce(
      (acc, item) => {
        acc.patients += item.patients;
        acc.appointments += item.appointments;
        acc.visits += item.visits;
        return acc;
      },
      { patients: 0, appointments: 0, visits: 0 }
    );

    return [
      { label: "Patients", value: totals.patients.toLocaleString(), color: "#3B82F6" },
      { label: "Appointments", value: totals.appointments.toLocaleString(), color: "#22C55E" },
      { label: "Visits", value: totals.visits.toLocaleString(), color: "#8B5CF6" },
    ];
  }, [data]);

  return (
    <div className="relative overflow-hidden min-w-0 min-h-0 box-border bg-white dark:bg-dark-card rounded-[28px] p-6 shadow-soft border border-slate-200 flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-[#EEF6FF] text-[#3B82F6] shadow-sm">
            <TrendingUp size={22} />
          </div>
          <div>
            <h3 className="font-bold text-ink dark:text-white text-lg">Health Overview</h3>
            <p className="text-xs text-muted mt-1">Patients, appointments &amp; visits</p>
          </div>
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-900 rounded-full p-1.5">
          {ranges.map((r) => (
            <button
              key={r.key}
              onClick={() => setRange(r.key)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                range === r.key
                  ? "bg-white text-[#4F7DFF] shadow-sm"
                  : "text-muted hover:text-ink dark:hover:text-white"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        {summary.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 260, damping: 22, delay: i * 0.05 }}
            className="rounded-[24px] bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 h-[138px]"
          >
            <p className="text-xs uppercase tracking-[0.16em] text-muted mb-2">{item.label}</p>
            <p className="font-extrabold text-2xl text-ink dark:text-white">{item.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="relative min-w-0 min-h-0 overflow-hidden h-[320px] rounded-[24px] bg-slate-50 dark:bg-slate-950 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ left: -16, right: 10, top: 18, bottom: 18 }}>
            <defs>
              {series.map((s) => (
                <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={s.color} stopOpacity={0.28} />
                  <stop offset="95%" stopColor={s.color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              iconType="circle"
              verticalAlign="top"
              align="left"
              layout="horizontal"
              wrapperStyle={{ fontSize: 12, textTransform: "capitalize", marginTop: -12, paddingBottom: 12 }}
            />
            {series.map((s) => (
              <Area
                key={s.key}
                type="monotone"
                dataKey={s.key}
                stroke={s.color}
                strokeWidth={2.5}
                fill={`url(#grad-${s.key})`}
                animationDuration={900}
                dot={{ r: 3 }}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {healthStatus.slice(0, 4).map((h, i) => (
          <div key={h.id} className="min-h-[140px]">
            <HealthCard item={h} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}
