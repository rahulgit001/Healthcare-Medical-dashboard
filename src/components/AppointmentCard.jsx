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
      className="flex h-[72px] w-full min-w-0 min-h-0 box-border items-center gap-3 overflow-hidden rounded-lg border border-[#E3E8EE] bg-[#F5F7FA] p-3 text-left transition-all hover:bg-white hover:shadow-soft dark:border-dark-border dark:bg-slate-900 dark:hover:bg-slate-800"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#DDF4F2] text-sm font-bold text-[#159A9C]">
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
        className="hidden h-9 shrink-0 items-center gap-2 rounded-md bg-[#DDF4F2] px-3 text-xs font-semibold text-[#159A9C] transition-colors hover:bg-[#159A9C]/20 disabled:cursor-not-allowed disabled:opacity-40 sm:inline-flex"
      >
        <Video size={14} />
        Join
      </button>
    </motion.button>
  );
}
