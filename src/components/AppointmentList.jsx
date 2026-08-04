import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import AppointmentCard from "./AppointmentCard";
import { useDashboard } from "../context/DashboardContext";

export default function AppointmentList({ appointments, title = "Upcoming Appointments", subtitle = "Today’s schedule and next check-ins." }) {
  const navigate = useNavigate();
  const { openAppointmentDetails } = useDashboard();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const filteredAppointments = useMemo(() => {
    const q = search.toLowerCase();
    return appointments.filter(
      (appt) =>
        (appt.patient.toLowerCase().includes(q) || appt.doctor.toLowerCase().includes(q) || appt.department.toLowerCase().includes(q)) &&
        (filterStatus ? appt.status === filterStatus : true)
    );
  }, [appointments, search, filterStatus]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 240, damping: 20, duration: 0.45 }}
      className="relative overflow-hidden min-w-0 min-h-0 box-border rounded-[28px] bg-white dark:bg-dark-card border border-slate-200 shadow-soft p-6 h-[440px]"
    >
      <div className="flex flex-col gap-4 mb-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold text-ink dark:text-white text-xl">{title}</h3>
            <p className="text-sm text-muted mt-1">{subtitle}</p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/appointments")}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4F7DFF] hover:text-[#346ad6] transition-colors"
          >
            View all
            <ArrowRight size={14} />
          </button>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-[240px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search appointments..."
              className="w-full pl-10 pr-3 py-2 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm outline-none text-ink dark:text-white"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full sm:w-[180px] rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 px-4 py-2 text-sm text-ink dark:text-white outline-none"
          >
            <option value="">All statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="space-y-3 overflow-y-auto pr-2 h-[calc(100%-134px)]">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appt, i) => (
            <AppointmentCard key={appt.id} appt={appt} index={i} onClick={() => openAppointmentDetails(appt.id)} />
          ))
        ) : (
          <div className="text-center text-muted py-8">No appointments found.</div>
        )}
      </div>
    </motion.div>
  );
}
