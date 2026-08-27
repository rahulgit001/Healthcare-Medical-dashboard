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
  {
    key: "patients",
    label: "Patients",
    color: "#3B82F6",
  },
  {
    key: "appointments",
    label: "Appointments",
    color: "#22C55E",
  },
  {
    key: "visits",
    label: "Visits",
    color: "#8B5CF6",
  },
];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div
      className="
        min-w-[150px]
        rounded-lg
        border
        border-[#E3E8EE]
        bg-white
        px-3
        py-2.5
        shadow-[0_8px_24px_rgba(18,48,74,0.10)]
      "
    >
      <p className="mb-2 text-[11px] font-semibold text-[#12304A]">
        {label}
      </p>

      <div className="space-y-1">
        {payload.map((item) => (
          <div
            key={item.dataKey}
            className="flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-1.5">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />

              <span className="text-[11px] text-[#6B7785]">
                {item.dataKey}
              </span>
            </div>

            <span className="text-[11px] font-bold text-[#17212B]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HealthChart() {
  const [range, setRange] = useState("weekly");

  const data = overviewData[range];

  const summary = useMemo(() => {
    const totals = data.reduce(
      (acc, item) => {
        acc.patients += item.patients || 0;
        acc.appointments += item.appointments || 0;
        acc.visits += item.visits || 0;

        return acc;
      },
      {
        patients: 0,
        appointments: 0,
        visits: 0,
      }
    );

    return [
      {
        label: "Patients",
        value: totals.patients.toLocaleString(),
        color: "#3B82F6",
      },
      {
        label: "Appointments",
        value: totals.appointments.toLocaleString(),
        color: "#22C55E",
      },
      {
        label: "Visits",
        value: totals.visits.toLocaleString(),
        color: "#8B5CF6",
      },
    ];
  }, [data]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="
        relative
        min-w-0
        overflow-hidden
        rounded-xl
        border
        border-[#E3E8EE]
        bg-white
        p-5
        shadow-[0_4px_16px_rgba(18,48,74,0.06)]
        dark:border-dark-border
        dark:bg-dark-card
      "
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          flex
          flex-col
          gap-3
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-[#EFF6FF]
              text-[#3B82F6]
            "
          >
            <TrendingUp size={18} />
          </div>

          <div className="min-w-0">
            <h3
              className="
                truncate
                text-[16px]
                font-bold
                leading-5
                text-[#17212B]
                dark:text-white
              "
            >
              Health Overview
            </h3>

            <p className="mt-0.5 text-[12px] text-[#6B7785]">
              Patients, appointments & visits
            </p>
          </div>
        </div>

        {/* Range selector */}

        <div
          className="
            flex
            h-9
            w-fit
            items-center
            gap-0.5
            rounded-md
            border
            border-[#E3E8EE]
            bg-[#F5F7FA]
            p-0.5
            dark:border-dark-border
            dark:bg-slate-900
          "
        >
          {ranges.map((item) => {
            const active = range === item.key;

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setRange(item.key)}
                className={`
                  h-8
                  rounded
                  px-2.5
                  text-[11px]
                  font-semibold
                  transition-all
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#3B82F6]
                  ${
                    active
                      ? "bg-white text-[#3B82F6] shadow-sm dark:bg-slate-800"
                      : "text-[#6B7785] hover:text-[#17212B] dark:hover:text-white"
                  }
                `}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* =====================================================
          SUMMARY
      ===================================================== */}

      <div
        className="
          mt-4
          grid
          grid-cols-3
          gap-2.5
        "
      >
        {summary.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.25,
              delay: index * 0.04,
            }}
            className="
              min-w-0
              rounded-lg
              border
              border-[#E3E8EE]
              bg-[#FAFBFC]
              px-3
              py-2.5
              dark:border-dark-border
              dark:bg-slate-900
            "
          >
            <div className="flex items-center gap-1.5">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor: item.color,
                }}
              />

              <p
                className="
                  truncate
                  text-[10px]
                  font-semibold
                  text-[#6B7785]
                "
              >
                {item.label}
              </p>
            </div>

            <p
              className="
                mt-1
                truncate
                text-[20px]
                font-bold
                leading-6
                text-[#12304A]
                dark:text-white
              "
            >
              {item.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* =====================================================
          CHART
      ===================================================== */}

      <div
        className="
          relative
          mt-4
          h-[230px]
          min-w-0
          overflow-hidden
          rounded-lg
          border
          border-[#E3E8EE]
          bg-white
          dark:border-dark-border
          dark:bg-slate-900
        "
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart
            data={data}
            margin={{
              top: 28,
              right: 12,
              left: -20,
              bottom: 4,
            }}
          >
            <defs>
              {series.map((item) => (
                <linearGradient
                  key={item.key}
                  id={`health-gradient-${item.key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor={item.color}
                    stopOpacity={0.16}
                  />

                  <stop
                    offset="100%"
                    stopColor={item.color}
                    stopOpacity={0}
                  />
                </linearGradient>
              ))}
            </defs>

            <CartesianGrid
              stroke="#E8EDF2"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              tick={{
                fontSize: 10,
                fill: "#6B7785",
              }}
              axisLine={false}
              tickLine={false}
              dy={5}
            />

            <YAxis
              width={35}
              tick={{
                fontSize: 10,
                fill: "#6B7785",
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#CBD5E1",
                strokeDasharray: "4 4",
              }}
            />

            <Legend
              iconType="circle"
              verticalAlign="top"
              align="right"
              height={24}
              wrapperStyle={{
                fontSize: "10px",
                paddingTop: "2px",
              }}
            />

            {series.map((item) => (
              <Area
                key={item.key}
                type="monotone"
                dataKey={item.key}
                stroke={item.color}
                strokeWidth={2}
                fill={`url(#health-gradient-${item.key})`}
                activeDot={{
                  r: 4,
                  strokeWidth: 2,
                }}
                dot={false}
                animationDuration={700}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* =====================================================
          HEALTH STATUS
      ===================================================== */}

      <div
        className="
          mt-4
          grid
          grid-cols-2
          gap-2.5
          lg:grid-cols-4
        "
      >
        {healthStatus.slice(0, 4).map((item, index) => (
          <div
            key={item.id}
            className="
              min-w-0
              overflow-hidden
            "
          >
            <HealthCard
              item={item}
              index={index}
            />
          </div>
        ))}
      </div>
    </motion.section>
  );
}