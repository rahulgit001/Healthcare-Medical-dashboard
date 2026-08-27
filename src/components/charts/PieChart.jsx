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
  CalendarDays,
} from "lucide-react";

import { demographics } from "../../data/dummyData";

const total = 2543;
const averageAge = 36.8;

const iconMap = {
  Children: Baby,
  Adults: User,
  "Middle Age": Users,
  Senior: Accessibility,
};

/* -------------------------------------------------------
   Make sure the four demographic values are:

   Children   → 18%
   Adults     → 32%
   Middle Age → 28%
   Senior     → 22%
------------------------------------------------------- */

const getDemographic = (name, fallbackValue, fallbackColor) => {
  const item = demographics.find((d) => d.name === name);

  return {
    name,
    value: item?.value ?? fallbackValue,
    color: item?.color ?? fallbackColor,
  };
};

const chartData = [
  getDemographic("Children", 18, "#60A5FA"),
  getDemographic("Adults", 32, "#3B82F6"),
  getDemographic("Middle Age", 28, "#6366F1"),
  getDemographic("Senior", 22, "#818CF8"),
];

/* -------------------------------------------------------
   Tooltip
------------------------------------------------------- */

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  const item = payload[0].payload;

  return (
    <div
      className="
        rounded-xl
        border
        border-[#E3E8EE]
        bg-white
        px-3
        py-2.5
        shadow-[0_10px_30px_rgba(18,48,74,0.12)]
      "
    >
      <div className="flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: item.color }}
        />

        <span className="text-xs font-semibold text-[#17212B]">
          {item.name}
        </span>
      </div>

      <p
        className="mt-1 text-lg font-bold"
        style={{ color: item.color }}
      >
        {item.value}%
      </p>
    </div>
  );
}

/* -------------------------------------------------------
   Demographic Card
------------------------------------------------------- */

function DemographicCard({
  item,
  position,
  index,
}) {
  const Icon = iconMap[item.name] || Users;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: position.includes("top") ? -8 : 8,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.35,
        delay: index * 0.06,
      }}
      whileHover={{
        y: -2,
        boxShadow: "0 12px 28px rgba(18,48,74,0.10)",
      }}
      className={`
        absolute
        z-20
        w-[135px]
        rounded-xl
        border
        border-[#E3E8EE]
        bg-white
        p-3
        shadow-[0_4px_16px_rgba(18,48,74,0.055)]
        transition-shadow

        ${position === "top-left"
          ? "left-0 top-0"
          : ""}

        ${position === "top-right"
          ? "right-0 top-0"
          : ""}

        ${position === "bottom-left"
          ? "bottom-0 left-0"
          : ""}

        ${position === "bottom-right"
          ? "bottom-0 right-0"
          : ""}

        max-w-[115px]
        sm:w-[150px]
        sm:max-w-none
      `}
    >
      {/* Icon + Percentage */}

      <div className="flex items-center justify-between gap-2">
        <div
          className="
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-lg
          "
          style={{
            backgroundColor: `${item.color}15`,
            color: item.color,
          }}
        >
          <Icon size={15} />
        </div>

        <span
          className="text-[18px] font-extrabold leading-none"
          style={{
            color: item.color,
          }}
        >
          {item.value}%
        </span>
      </div>

      {/* Name */}

      <p
        className="
          mt-2
          truncate
          text-[11px]
          font-semibold
          text-[#17212B]
        "
      >
        {item.name}
      </p>

      {/* Progress */}

      <div
        className="
          mt-2
          h-1.5
          w-full
          overflow-hidden
          rounded-full
          bg-[#E9EDF1]
        "
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{
            width: `${item.value}%`,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: index * 0.08,
          }}
          className="h-full rounded-full"
          style={{
            backgroundColor: item.color,
          }}
        />
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------
   Main Component
------------------------------------------------------- */

export default function DemographicsChart() {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 12,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.4,
      }}
      className="
        demographics-chart
        relative
        h-full
        min-h-0
        min-w-0
        overflow-hidden
        rounded-[10px]
        border
        border-[#E3E8EE]
        bg-white
        p-5
        shadow-[0_4px_16px_rgba(18,48,74,0.06)]
      "
    >
      {/* -------------------------------------------------
          HEADER
      ------------------------------------------------- */}

      <div
        className="
          relative
          z-30
          flex
          items-center
          justify-between
          gap-4
        "
      >
        {/* Title */}

        <div className="flex min-w-0 items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-[#EFF6FF]
              text-[#3B82F6]
            "
          >
            <PieChartIcon size={19} />
          </div>

          <div className="min-w-0">
            <h2
              className="
                truncate
                text-[16px]
                font-bold
                leading-5
                text-[#17212B]
              "
            >
              Patient Demographics
            </h2>

            <p className="mt-0.5 text-[12px] text-[#6B7785]">
              Distribution by age group
            </p>
          </div>
        </div>

        {/* Period */}

        <button
          type="button"
          className="
            hidden
            h-9
            shrink-0
            items-center
            rounded-md
            border
            border-[#E3E8EE]
            bg-white
            px-3
            text-[12px]
            font-semibold
            text-[#6B7785]
            transition-colors
            hover:bg-[#F5F7FA]
            sm:flex
          "
        >
          This Month
        </button>
      </div>

      {/* -------------------------------------------------
          RADIAL AREA
      ------------------------------------------------- */}

      <div
        className="
          relative
          mx-auto
          mt-4
          h-[360px]
          w-full
          max-w-[560px]
          sm:h-[380px]
        "
      >
        {/* ===============================================
            TOP LEFT — 18%
        =============================================== */}

        <DemographicCard
          item={chartData[0]}
          position="top-left"
          index={0}
        />

        {/* ===============================================
            TOP RIGHT — 32%
        =============================================== */}

        <DemographicCard
          item={chartData[1]}
          position="top-right"
          index={1}
        />

        {/* ===============================================
            BOTTOM LEFT — 22%
        =============================================== */}

        <DemographicCard
          item={chartData[3]}
          position="bottom-left"
          index={2}
        />

        {/* ===============================================
            BOTTOM RIGHT — 28%
        =============================================== */}

        <DemographicCard
          item={chartData[2]}
          position="bottom-right"
          index={3}
        />

        {/* ===============================================
            CENTER DONUT
        =============================================== */}

        <div
          className="
            absolute
            left-1/2
            top-1/2
            z-10
            aspect-square
            h-[180px]
            w-[180px]
            sm:h-[400px]
            sm:w-[400px]
            -translate-x-1/2
            -translate-y-1/2
          "
        >
          <ResponsiveContainer
            width="100%"
            height="100%"
            aspect={1}
          >
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="32%"
                outerRadius="45%"
                paddingAngle={3}
                cornerRadius={8}
                stroke="#FFFFFF"
                strokeWidth={3}
                animationDuration={700}
                animationBegin={100}
              >
                {chartData.map((item) => (
                  <Cell
                    key={item.name}
                    fill={item.color}
                  />
                ))}
              </Pie>

              <Tooltip
                content={<CustomTooltip />}
                cursor={false}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* =============================================
              CENTER CONTENT
          ============================================= */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              flex
              flex-col
              items-center
              justify-center
            "
          >
            {/* Icon */}

            <div
              className="
                mb-1.5
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                bg-[#EFF6FF]
              "
            >
              <UsersRound
                size={15}
                className="text-[#3B82F6]"
              />
            </div>

            {/* Number */}

            <h3
              className="
                text-[26px]
                font-extrabold
                leading-7
                tracking-tight
                text-[#12304A]
              "
            >
              {total.toLocaleString()}
            </h3>

            {/* Label */}

            <p
              className="
                mt-1
                text-[10px]
                font-medium
                text-[#6B7785]
              "
            >
              Total Patients
            </p>
          </div>
        </div>

      </div>

      {/* -------------------------------------------------
          AVERAGE AGE
      ------------------------------------------------- */}

      <motion.div
        initial={{
          opacity: 0,
          y: 8,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.35,
          delay: 0.25,
        }}
        className="
          relative
          z-20
          mx-auto
          mt-3
          flex
          max-w-[220px]
          items-center
          justify-center
          gap-3
          rounded-xl
          border
          border-[#E3E8EE]
          bg-[#FAFBFC]
          px-4
          py-2.5
        "
      >
        {/* Icon */}

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
          <CalendarDays size={16} />
        </div>

        {/* Text */}

        <div className="flex items-center gap-2">
          <div>
            <p
              className="
                text-[10px]
                font-medium
                leading-4
                text-[#6B7785]
              "
            >
              Average Age
            </p>

            <p
              className="
                text-[20px]
                font-extrabold
                leading-6
                text-[#12304A]
              "
            >
              {averageAge}
            </p>
          </div>

          <span
            className="
              mt-3
              text-[10px]
              font-medium
              text-[#6B7785]
            "
          >
            years
          </span>
        </div>
      </motion.div>

    </motion.section>
  );
}