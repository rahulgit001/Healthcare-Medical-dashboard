import { motion } from "framer-motion";
import { Video, Clock } from "lucide-react";

const statusStyles = {
  Confirmed: "bg-success/10 text-success",
  Pending: "bg-warning/10 text-warning",
  Cancelled: "bg-danger/10 text-danger",
};

export default function AppointmentCard({ appt, index, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, x: 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 260, damping: 22, delay: index * 0.06 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.995 }}
      className="flex items-center gap-4 p-4 rounded-[20px] bg-slate-50 dark:bg-slate-900 hover:bg-white dark:hover:bg-slate-800 hover:shadow-soft transition-all min-w-0 min-h-0 box-border overflow-hidden h-[82px] w-full text-left"
    >
      <div className="w-[50px] h-[50px] rounded-full bg-brand-gradient flex items-center justify-center text-white text-sm font-bold shrink-0">
        {appt.avatar}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-ink dark:text-white truncate">{appt.patient}</p>
        <p className="text-xs text-muted truncate">
          {appt.doctor} · {appt.department}
        </p>
      </div>

      <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted shrink-0">
        <Clock size={13} />
        {appt.time}
      </div>

      <span className={`text-xs font-semibold px-3 py-1 rounded-full shrink-0 ${statusStyles[appt.status]}`}>
        {appt.status}
      </span>

      <button
        disabled={appt.status === "Cancelled"}
        className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[#4F7DFF] bg-[#4F7DFF]/10 hover:bg-[#4F7DFF]/20 disabled:opacity-40 disabled:cursor-not-allowed rounded-[16px] transition-colors shrink-0 px-4 py-2"
      >
        <Video size={14} />
        Join
      </button>
    </motion.button>
  );
}
