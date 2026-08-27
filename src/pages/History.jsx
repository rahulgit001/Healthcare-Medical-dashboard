import { motion } from "framer-motion";
import { Activity, CalendarDays, CheckCircle2, Clock3, UserRound } from "lucide-react";
import { useDashboard } from "../context/DashboardContext";

export default function History() {
  const { appointments, patients } = useDashboard();
  const visits = [...appointments].sort((a, b) => `${b.date} ${b.time}`.localeCompare(`${a.date} ${a.time}`));

  return (
    <div className="space-y-5">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Clinical activity</p>
        <h1 className="mt-1 text-2xl font-bold text-ink dark:text-white">History</h1>
        <p className="mt-1 text-sm text-muted">A clear record of recent visits, care updates, and patient activity.</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          ["Total patients", patients.length, UserRound],
          ["Recorded visits", visits.length, CalendarDays],
          ["Completed care", visits.filter((visit) => visit.status === "Confirmed").length, CheckCircle2],
        ].map(([label, value, Icon]) => (
          <div key={label} className="rounded-lg border border-[#E3E8EE] bg-white p-4 shadow-soft dark:border-dark-border dark:bg-dark-card">
            <Icon size={18} className="text-primary" />
            <p className="mt-3 text-xs text-muted">{label}</p>
            <p className="mt-1 text-2xl font-bold text-ink dark:text-white">{value}</p>
          </div>
        ))}
      </div>

      <section className="rounded-lg border border-[#E3E8EE] bg-white p-5 shadow-soft dark:border-dark-border dark:bg-dark-card">
        <div className="mb-4 flex items-center gap-2">
          <Activity size={18} className="text-primary" />
          <h2 className="text-base font-bold text-ink dark:text-white">Recent clinical history</h2>
        </div>
        <div className="divide-y divide-[#E3E8EE] dark:divide-dark-border">
          {visits.map((visit) => (
            <div key={visit.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#DDF4F2] text-xs font-bold text-primary">{visit.avatar}</div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink dark:text-white">{visit.patient}</p>
                <p className="truncate text-xs text-muted">{visit.type} · {visit.department} · {visit.doctor}</p>
              </div>
              <div className="hidden items-center gap-1 text-xs text-muted sm:flex"><Clock3 size={13} />{visit.date}</div>
              <span className="rounded-md bg-success/10 px-2 py-1 text-[11px] font-semibold text-success">{visit.status}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
