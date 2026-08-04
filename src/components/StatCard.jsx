import { motion } from "framer-motion";
import {
  Users,
  Calendar,
  Wallet,
  Stethoscope,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const iconMap = {
  users: Users,
  calendar: Calendar,
  revenue: Wallet,
  doctors: Stethoscope,
};

export default function StatCard({ stat, index = 0 }) {
  const Icon = iconMap[stat.icon] || Users;

  const positive = stat.growth >= 0;

  const displayValue = stat.isCurrency
    ? `$${Number(stat.value).toLocaleString()}`
    : Number(stat.value).toLocaleString();

  const chartData = stat.spark.map((value, i) => ({
    name: i,
    value,
  }));

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
        type: "spring",
        stiffness: 220,
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.99,
      }}
      className="
      group
      relative
      overflow-hidden
      rounded-[28px]
      border border-slate-200
      bg-white
      dark:bg-slate-950
      shadow-soft
      hover:shadow-[0_18px_48px_rgba(15,23,42,0.1)]
      transition-all
      duration-300
      p-7
      h-[280px]
      "
    >
      {/* Background Glow */}

      <div
        className="
        absolute
        -right-16
        -top-5
        w-48
        h-48
        rounded-full
        blur-3xl
        opacity-20
        transition-all
        duration-500
        group-hover:opacity-40
        "
        style={{
          background: stat.color,
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,.35),transparent_45%)]" />

      {/* Grid Pattern */}

      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:10px_10px]" />

      <div className="relative z-10 flex justify-between items-start">
        {/* Icon */}

        <motion.div
          whileHover={{
            rotate: 8,
            scale: 1.08,
          }}
          className="
          relative
          w-10
          h-10
          rounded-3xl
          flex
          items-center
          justify-center
          shadow-xl
          "
          style={{
            background: `linear-gradient(135deg, ${stat.color}, ${stat.color}99)`,
          }}
        >
          <div className="absolute inset-0 rounded-3xl bg-white/20" />

          <Icon
            size={30}
            className="relative text-white"
          />
        </motion.div>

        {/* Badge */}

        <div
          className={`
          inline-flex
          items-center
          gap-1.5
          px-3.5
          py-1.5
          rounded-full
          text-xs
          font-bold
          border
          backdrop-blur-xl
          ${positive
              ? "bg-emerald-500/10 border-emerald-300/30 text-emerald-600"
              : "bg-red-500/10 border-red-300/30 text-red-500"
            }
          `}
        >
          {positive ? (
            <TrendingUp size={14} />
          ) : (
            <TrendingDown size={14} />
          )}

          {Math.abs(stat.growth)}%
        </div>
      </div>

      {/* Value */}

      <motion.h2
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.2,
        }}
        className="
        mt-3
        text-[32px]
        leading-none
        font-black
        tracking-tight
        text-slate-900
        dark:text-white
        "
      >
        {displayValue}
      </motion.h2>

      {/* Label */}

      <p className="mt-2 text-base font-medium text-slate-500 dark:text-slate-400">
        {stat.label}
      </p>

      {/* Chart */}

      <div className="h-16 mt-4 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient
                id={`gradient-${index}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor={stat.color}
                  stopOpacity={0.35}
                />

                <stop
                  offset="100%"
                  stopColor={stat.color}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <Area
              type="monotone"
              dataKey="value"
              stroke={stat.color}
              strokeWidth={3}
              fill={`url(#gradient-${index})`}
              dot={false}
              isAnimationActive
              animationDuration={1200}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}

      <div className="flex items-center justify-between mt-4">
        <span className="text-xs text-slate-400">
          Updated just now
        </span>

        <span
          className="text-sm font-semibold"
          style={{
            color: stat.color,
          }}
        >
          This Month
        </span>
      </div>
    </motion.div>
  );
}