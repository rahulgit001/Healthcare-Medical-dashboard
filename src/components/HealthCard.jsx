import { motion } from "framer-motion";
import { HeartPulse, Wind, Smile, Bone, Brain, Gauge } from "lucide-react";

const iconMap = { heart: HeartPulse, lungs: Wind, teeth: Smile, bones: Bone, brain: Brain, bp: Gauge };

const statusStyles = {
  Healthy: "bg-success/10 text-success",
  Warning: "bg-warning/10 text-warning",
  Critical: "bg-danger/10 text-danger",
};

export default function HealthCard({ item, index }) {
  const Icon = iconMap[item.icon] || HeartPulse;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 240, damping: 20, duration: 0.45, delay: index * 0.06 }}
      whileHover={{ y: -4, scale: 1.005 }}
      whileTap={{ scale: 0.997 }}
      className="relative overflow-hidden min-w-0 min-h-0 box-border rounded-[24px] bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-soft p-5 hover:shadow-[0_18px_48px_rgba(15,23,42,0.08)] transition-shadow h-full"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-12 rounded-3xl flex items-center justify-center" style={{ backgroundColor: `${item.color}1A` }}>
            <Icon size={22} style={{ color: item.color }} />
          </div>
          <div className="min-w-0">
            <p className="text-base font-semibold text-ink dark:text-white truncate">{item.label}</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: `${item.color}1A`, color: item.color }}>
          {item.status}
        </span>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-extrabold text-ink dark:text-white" style={{ fontSize: 'clamp(28px,2vw,32px)' }}>{item.value}%</p>
          <p className="text-xs text-muted">{item.status}</p>
        </div>
        <div className="flex-1 min-w-0">
          <div className="h-2 rounded-full bg-slate-100 overflow-hidden" style={{ backgroundColor: '#F1F5F9' }}>
            <div className="h-full rounded-full" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
