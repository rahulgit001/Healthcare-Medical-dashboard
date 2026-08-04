import { motion } from "framer-motion";
import { CalendarClock, HeartPulse, Pill, Plus, Leaf, Circle } from "lucide-react";
import { doctorProfile } from "../../data/dummyData";
import DoctorIllustration from "../../assets/doctor.svg";

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: "linear-gradient(90deg,#F4F8FF 0%,#EEF6FF 100%)",
        border: "1px solid #EEF2F7",
      }}
      className="relative overflow-hidden rounded-[28px] p-8 shadow-soft text-ink min-h-[280px]"
    >
      {/* Decorative Shapes */}
      <div className="absolute -top-16 -right-10 w-64 h-64 rounded-full bg-white/10 blur-2xl"></div>

      <div className="absolute bottom-0 right-24 w-40 h-40 rounded-full bg-white/10 blur-xl"></div>

      <div className="relative flex items-center justify-between h-full">
        {/* Left */}
        <div className="w-[65%]">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-xs font-semibold text-ink shadow-soft mb-4">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
            24 appointments scheduled today
          </div>

          <h1 className="font-bold mb-3 text-[28px] leading-tight">
            Welcome back, {doctorProfile.name}
          </h1>

          <p className="text-base leading-7 text-muted max-w-2xl mb-6">Everything is on track — review patient activity, appointments, and clinical insights at a glance.</p>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 bg-white text-primary px-6 h-[50px] rounded-[20px] shadow-soft font-semibold"
          >
            <CalendarClock size={18} />
            View Schedule
          </motion.button>
        </div>

        {/* Right */}
        <div className="w-[35%] flex items-center justify-end">
          <img src={DoctorIllustration} alt="Doctor illustration" className="w-56 h-40 object-contain" />
        </div>
      </div>
    </motion.div>
  );
}