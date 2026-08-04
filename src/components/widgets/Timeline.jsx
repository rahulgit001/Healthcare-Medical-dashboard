import { motion } from "framer-motion";
import { Check, Clock3, CircleDot } from "lucide-react";
import { timeline } from "../../data/dummyData";

const statusConfig = {
  done: { icon: Check, color: "#22C55E" },
  active: { icon: CircleDot, color: "#3B82F6" },
  upcoming: { icon: Clock3, color: "#9CA3AF" },
};

export default function Timeline() {
  return (
    <div className="relative overflow-hidden min-w-0 min-h-0 box-border rounded-3xl bg-card dark:bg-dark-card border border-slate-100 shadow-lg p-6">
      <h3 className="font-bold text-ink dark:text-white mb-5">Today's Activity</h3>
      <div className="relative pl-6">
        <div className="absolute left-[11px] top-1 bottom-1 w-px bg-gray-100 dark:bg-dark-border" />
        <div className="space-y-6">
          {timeline.map((t, i) => {
            const cfg = statusConfig[t.status];
            const Icon = cfg.icon;
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="relative flex items-start gap-3"
              >
                <span
                  className="absolute -left-6 w-6 h-6 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-dark-card"
                  style={{ backgroundColor: `${cfg.color}1A`, color: cfg.color }}
                >
                  <Icon size={12} />
                </span>
                <div>
                  <p className="text-sm font-medium text-ink dark:text-white">{t.title}</p>
                  <p className="text-xs text-muted">{t.time}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
