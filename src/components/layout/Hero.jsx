import { motion } from "framer-motion";
import {
  CalendarClock,
  Stethoscope,
  HeartPulse,
  Activity,
  ShieldCheck,
} from "lucide-react";
import { doctorProfile } from "../../data/dummyData";

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="
        relative
        w-full
        min-h-[180px]
        overflow-hidden
        rounded-xl
        border
        border-[#E3E8EE]
        bg-gradient-to-r
        from-[#F4F8FF]
        via-[#F7F5FF]
        to-[#F1FCF5]
        px-5
        py-5
        shadow-[0_4px_16px_rgba(18,48,74,0.06)]

        sm:px-6
        sm:py-5

        lg:min-h-[190px]
      "
    >
      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div
        className="
          relative
          flex
          min-h-[140px]
          items-center
          justify-between
          gap-5
        "
      >
        {/* =================================================
            LEFT CONTENT
        ================================================== */}

        <div className="min-w-0 flex-1">
          {/* Status */}
          <div
            className="
              mb-2.5
              inline-flex
              h-7
              items-center
              gap-2
              rounded-full
              border
              border-[#DDF4F2]
              bg-white
              px-3
              text-[11px]
              font-semibold
              text-[#12304A]
              shadow-sm
            "
          >
            <span
              className="
                h-2
                w-2
                rounded-full
                bg-[#22C55E]
                shadow-[0_0_0_3px_rgba(34,197,94,0.12)]
              "
            />

            24 appointments scheduled today
          </div>

          {/* Heading */}
          <h1
            className="
              text-[22px]
              font-bold
              leading-7
              text-[#12304A]

              sm:text-[24px]
              sm:leading-8
            "
          >
            Welcome back, {doctorProfile.name}
          </h1>

          {/* Description */}
          <p
            className="
              mt-1
              max-w-[580px]
              text-[13px]
              leading-5
              text-[#6B7785]

              sm:text-[14px]
            "
          >
            Review patient activity, appointments, and clinical
            insights at a glance.
          </p>

          {/* Button */}
          <motion.button
            type="button"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="
              mt-3.5
              inline-flex
              h-10
              items-center
              gap-2
              rounded-md
              bg-[#159A9C]
              px-4
              text-[13px]
              font-semibold
              text-white
              shadow-[0_4px_10px_rgba(21,154,156,0.20)]
              transition-colors

              hover:bg-[#128789]

              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#4CB8C4]
              focus-visible:ring-offset-2
            "
          >
            <CalendarClock size={17} />

            View Schedule
          </motion.button>
        </div>

        {/* =================================================
            RIGHT MEDICAL VISUAL
        ================================================== */}

        <div
          className="
            hidden
            shrink-0
            items-center
            justify-center
            md:flex
            md:w-[190px]

            lg:w-[220px]
          "
        >
          <div
            className="
              relative
              flex
              h-[135px]
              w-[175px]
              items-center
              justify-center
              overflow-hidden
              rounded-xl
              border
              border-white/80
              bg-gradient-to-br
              from-[#EFF6FF]
              via-[#F5F3FF]
              to-[#F0FDF4]
              shadow-[0_8px_24px_rgba(59,130,246,0.10)]
            "
          >
            {/* Background circles */}

            <div
              className="
                absolute
                -right-8
                -top-8
                h-24
                w-24
                rounded-full
                bg-[#3B82F6]/10
              "
            />

            <div
              className="
                absolute
                -bottom-8
                -left-8
                h-24
                w-24
                rounded-full
                bg-[#8B5CF6]/10
              "
            />

            {/* Main Stethoscope */}

            <div
              className="
                relative
                flex
                h-[82px]
                w-[82px]
                items-center
                justify-center
                rounded-full
                bg-white
                shadow-[0_6px_20px_rgba(18,48,74,0.08)]
              "
            >
              <Stethoscope
                size={48}
                strokeWidth={1.7}
                className="text-[#3B82F6]"
              />

              {/* Heart badge */}

              <div
                className="
                  absolute
                  -right-1
                  -top-1
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  bg-[#8B5CF6]
                  text-white
                  shadow-[0_4px_10px_rgba(139,92,246,0.25)]
                "
              >
                <HeartPulse
                  size={16}
                  strokeWidth={2.2}
                />
              </div>
            </div>

            {/* Heartbeat indicator */}

            <div
              className="
                absolute
                bottom-3
                left-3
                flex
                items-center
                gap-1.5
                rounded-md
                bg-white/90
                px-2
                py-1.5
                shadow-sm
              "
            >
              <Activity
                size={14}
                className="text-[#22C55E]"
              />

              <span
                className="
                  text-[10px]
                  font-bold
                  text-[#17212B]
                "
              >
                Healthy
              </span>
            </div>

            {/* Status indicator */}

            <div
              className="
                absolute
                right-3
                bottom-3
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-full
                bg-[#22C55E]/10
              "
            >
              <ShieldCheck
                size={15}
                className="text-[#22C55E]"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}