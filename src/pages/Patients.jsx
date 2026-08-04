import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import PatientTable from "../components/PatientTable";
import { useDashboard } from "../context/DashboardContext";

export default function Patients() {
  const { openAddPatient } = useDashboard();

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-extrabold text-ink dark:text-white">Patients</h1>
          <p className="text-sm text-muted mt-1">Manage and review every registered patient.</p>
        </div>
        <button
          type="button"
          onClick={openAddPatient}
          className="flex items-center gap-2 bg-brand-gradient text-white text-sm font-semibold px-4 py-2.5 rounded-2xl shadow-soft hover:shadow-lift transition-shadow"
        >
          <UserPlus size={16} />
          Add Patient
        </button>
      </motion.div>
      <PatientTable />
    </div>
  );
}
