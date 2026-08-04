import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  PieChart as PieChartIcon,
  UsersRound,
  Baby,
  User,
  Users,
  Accessibility,
} from "lucide-react";

import { demographics } from "../../data/dummyData";

const total = 2543;

const iconMap = {
  Children: Baby,
  Adults: User,
  "Middle Age": Users,
  Senior: Accessibility,
};

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  const item = payload[0].payload;

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 shadow-[0_20px_60px_rgba(15,23,42,.12)] px-5 py-4">
      <div className="flex items-center gap-3">

        <span
          className="w-3 h-3 rounded-full"
          style={{ background: item.color }}
        />

        <p className="font-semibold text-slate-800 dark:text-white">
          {item.name}
        </p>

      </div>

      <p className="mt-2 text-lg font-bold text-slate-900 dark:text-white">
        {item.value}%
      </p>
    </div>
  );
}

export default function DemographicsChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden min-w-0 min-h-0 box-border rounded-[28px] bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-700 shadow-soft hover:shadow-[0_18px_48px_rgba(15,23,42,0.08)] transition-all duration-300 p-6"
    >

      {/* background blur */}

      <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-blue-100 blur-3xl opacity-40"/>

      <div className="absolute -bottom-10 -left-10 h-20 w-20 rounded-full bg-purple-100 blur-3xl opacity-40"/>

      {/* Header */}

      <div className="relative flex items-center justify-between mb-4">

        <div className="flex items-center gap-4">

          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-xl">

            <PieChartIcon size={26}/>

          </div>

          <div>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">

              Patient Demographics

            </h2>

            <p className="text-sm text-slate-500">

              Distribution by age group

            </p>

          </div>

        </div>

        <button className="rounded-xl bg-slate-100 dark:bg-slate-800 px-4 py-2 text-sm font-semibold">

          This Month

        </button>

      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-6 items-center">

        {/* Donut */}

        <div className="relative h-[300px]">

          <ResponsiveContainer width="100%" height="100%">

            <PieChart>

              <Pie
                data={demographics}
                dataKey="value"
                innerRadius={82}
                outerRadius={115}
                paddingAngle={5}
                cornerRadius={18}
                stroke="#fff"
                strokeWidth={5}
                animationDuration={1400}
              >

                {demographics.map((item) => (

                  <Cell
                    key={item.name}
                    fill={item.color}
                  />

                ))}

              </Pie>

              <Tooltip content={<CustomTooltip/>}/>

            </PieChart>

          </ResponsiveContainer>

          {/* Center */}

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="absolute h-32 w-32 rounded-full bg-blue-100/60 dark:bg-blue-500/10" />
            <UsersRound className="text-blue-500 mb-3 z-10" size={26} />
            <h2 className="text-4xl font-black text-slate-900 dark:text-white z-10">
              {total}
            </h2>
            <p className="text-sm text-slate-500 z-10">Total Patients</p>
          </div>

        </div>

        {/* PART 2 continues here... */}
                {/* Legend */}

        <div className="grid grid-cols-2 gap-4">

          {demographics.map((item, index) => {
            const Icon = iconMap[item.name] || Users;

            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -3,
                  scale: 1.02,
                }}
                className="rounded-[24px] border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-4 transition-all duration-300 h-full"
              >
                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div
                      className="flex h-5 w-8 items-center justify-center rounded-xl text-white shadow-md"
                      style={{
                        background: item.color,
                      }}
                    >
                      <Icon size={20} />
                    </div>

                    <div>

                      <h4 className="font-semibold text-slate-900 dark:text-white">
                        {item.name}
                      </h4>

                      <p className="text-xs text-slate-500">
                        Patient Group
                      </p>

                    </div>

                  </div>

                  <div className="text-right">

                    <h3
                      className="text-2xl font-black"
                      style={{
                        color: item.color,
                      }}
                    >
                      {item.value}%
                    </h3>

                  </div>

                </div>

                <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">

                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.value}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1,
                      delay: index * 0.15,
                    }}
                    className="h-full rounded-full"
                    style={{
                      background: item.color,
                    }}
                  />

                </div>

              </motion.div>
            );
          })}

        </div>

      </div>

      {/* Bottom Statistics */}

      <div className="mt-6 grid grid-cols-2 gap-4">

        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 p-5 text-white shadow-softer"
        >

          <p className="text-sm opacity-90">

            Total Patients

          </p>

          <h2 className="mt-2 text-3xl font-black">

            {total}

          </h2>

        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-softer"
        >

          <p className="text-sm text-slate-500">

            Average Age

          </p>

          <h2 className="mt-1 text-3xl font-black text-slate-900 dark:text-white">

            36.8

          </h2>

        </motion.div>

      </div>

    </motion.div>
  );
}