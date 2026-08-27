import { motion } from "framer-motion";
import { Download, FileBarChart, FileText, Plus } from "lucide-react";
import { useDashboard } from "../context/DashboardContext";

export default function Reports() {
  const { records, openReportModal, patients } = useDashboard();

  return (
    <div className="space-y-5">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Clinic intelligence</p>
          <h1 className="mt-1 text-2xl font-bold text-ink dark:text-white">Reports</h1>
          <p className="mt-1 text-sm text-muted">Create, review, and share operational and clinical reports.</p>
        </div>
        <button onClick={openReportModal} className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-white transition hover:bg-[#128789]"><Plus size={16} /> Generate report</button>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[['Available records', records.length], ['Patients covered', patients.length], ['Report formats', 3]].map(([label, value]) => <div key={label} className="rounded-lg border border-[#E3E8EE] bg-white p-4 shadow-soft dark:border-dark-border dark:bg-dark-card"><p className="text-xs text-muted">{label}</p><p className="mt-2 text-2xl font-bold text-ink dark:text-white">{value}</p></div>)}
      </div>

      <section className="rounded-lg border border-[#E3E8EE] bg-white p-5 shadow-soft dark:border-dark-border dark:bg-dark-card">
        <div className="mb-4 flex items-center gap-2"><FileBarChart size={18} className="text-primary" /><h2 className="text-base font-bold text-ink dark:text-white">Recent reports and records</h2></div>
        <div className="grid gap-3">
          {records.map((record) => <div key={record.id} className="flex items-center gap-3 rounded-lg border border-[#E3E8EE] bg-[#F5F7FA] p-3 dark:border-dark-border dark:bg-slate-900"><div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#DDF4F2] text-primary"><FileText size={17} /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-ink dark:text-white">{record.title}</p><p className="text-xs text-muted">Created {record.date}</p></div><button aria-label={`Download ${record.title}`} className="flex h-9 w-9 items-center justify-center rounded-md text-muted transition hover:bg-primary/10 hover:text-primary"><Download size={16} /></button></div>)}
        </div>
      </section>
    </div>
  );
}
