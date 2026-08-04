import { motion } from "framer-motion";
import { CalendarPlus } from "lucide-react";
import AppointmentList from "../components/AppointmentList";
import CalendarWidget from "../components/widgets/Calendar";
import { useDashboard } from "../context/DashboardContext";

export default function Appointments() {
  const { appointments, openBookAppointment } = useDashboard();

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-extrabold text-ink dark:text-white">Appointments</h1>
          <p className="text-sm text-muted mt-1">Today's schedule at a glance.</p>
        </div>
        <button
          type="button"
          onClick={() => openBookAppointment()}
          className="flex items-center gap-2 bg-brand-gradient text-white text-sm font-semibold px-4 py-2.5 rounded-2xl shadow-soft hover:shadow-lift transition-shadow"
        >
          <CalendarPlus size={16} />
          Book Appointment
        </button>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <AppointmentList appointments={appointments} />
        </div>
        <CalendarWidget />
      </div>
    </div>
  );
}
