import { motion } from "framer-motion";
import {
  HeartPulse,
  Wind,
  Smile,
  Bone,
  Brain,
  Gauge,
} from "lucide-react";

const iconMap = {
  heart: HeartPulse,
  lungs: Wind,
  teeth: Smile,
  bones: Bone,
  brain: Brain,
  bp: Gauge,
};

const statusColors = {
  Healthy: "#22C55E",
  Warning: "#F59E0B",
  Critical: "#EF4444",
};

export default function HealthCard({ item, index = 0 }) {
  const Icon = iconMap[item?.icon] || HeartPulse;

  const value = Math.min(
    100,
    Math.max(0, Number(item?.value) || 0)
  );

  const color =
    item?.color ||
    statusColors[item?.status] ||
    "#2563EB";

  const statusColor =
    statusColors[item?.status] || color;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.35,
        delay: index * 0.05,
      }}
      whileHover={{
        y: -3,
      }}
      className="
        group
        relative
        min-w-0
        overflow-hidden
        rounded-[18px]
        border
        border-slate-200
        bg-white
        p-4
        shadow-[0_4px_20px_rgba(15,23,42,0.04)]
        transition-all
        duration-300
        hover:border-slate-300
        hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)]
        dark:border-slate-800
        dark:bg-slate-950
        dark:hover:border-slate-700
      "
    >
      {/* Top */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2.5">
          {/* Icon */}
          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
            "
            style={{
              backgroundColor: `${color}15`,
            }}
          >
            <Icon
              size={18}
              strokeWidth={2}
              style={{ color }}
            />
          </div>

          {/* Label */}
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
              {item?.label || "Health"}
            </p>

            <p className="mt-0.5 text-[10px] text-slate-400">
              Health status
            </p>
          </div>
        </div>

        {/* Status Dot */}
        <span
          className="h-2 w-2 shrink-0 rounded-full"
          style={{
            backgroundColor: statusColor,
            boxShadow: `0 0 0 3px ${statusColor}15`,
          }}
        />
      </div>

      {/* Bottom */}
      <div className="mt-4">
        <div className="flex items-end justify-between gap-3">
          <div className="flex items-baseline gap-1">
            <span className="text-[26px] font-extrabold leading-none tracking-tight text-slate-900 dark:text-white">
              {value}
            </span>

            <span className="text-xs font-semibold text-slate-400">
              %
            </span>
          </div>

          <span
            className="text-[10px] font-semibold"
            style={{ color: statusColor }}
          >
            {item?.status || "Unknown"}
          </span>
        </div>

        {/* Progress */}
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${value}%` }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
              delay: index * 0.05,
            }}
            className="h-full rounded-full"
            style={{
              backgroundColor: color,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}