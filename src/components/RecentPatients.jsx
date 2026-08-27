import { motion } from "framer-motion";
import { useDashboard } from "../context/DashboardContext";

export default function RecentPatients({ patients, title = "Recent Patients" }) {
  const { openPatientDetails } = useDashboard();

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 260, damping: 22, duration: 0.45 }}
      className="relative min-w-0 min-h-0 box-border rounded-lg border border-[#E3E8EE] bg-white p-5 shadow-soft dark:border-dark-border dark:bg-dark-card h-[320px]"
    >
      <div className="flex items-center justify-between gap-3 mb-5">
        <div>
          <h3 className="font-semibold text-ink dark:text-white text-xl">{title}</h3>
          <p className="text-sm text-muted mt-1">Latest patient activity and visits.</p>
        </div>
        <button className="text-sm font-semibold text-[#4F7DFF] hover:text-[#346ad6] transition-colors">View all</button>
      </div>
      <div className="space-y-3 overflow-y-auto h-[calc(100%-64px)] pr-2">
        {patients.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: i * 0.05 }}
            className="flex items-center gap-3 p-3 rounded-[20px] hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors h-[72px]"
          >
            <div className="w-[48px] h-[48px] rounded-full bg-brand-gradient text-white text-sm font-bold flex items-center justify-center shrink-0">
              {p.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-ink dark:text-white truncate">{p.name}</p>
              <p className="text-xs text-muted">{p.age} yrs · {p.gender}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-ink dark:text-white">{p.visitDate}</p>
              <button type="button" onClick={() => openPatientDetails(p.id)} className="mt-1 text-xs font-semibold text-[#4F7DFF] hover:text-[#346ad6] transition-colors">View</button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
