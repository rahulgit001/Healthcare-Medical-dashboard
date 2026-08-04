import { motion } from "framer-motion";
import { UserPlus, CalendarPlus, FileText, MessageSquare, Upload } from "lucide-react";
import { useDashboard } from "../../context/DashboardContext";
import { quickActions } from "../../data/dummyData";

const iconMap = {
  userPlus: UserPlus,
  calendarPlus: CalendarPlus,
  fileText: FileText,
  messageSquare: MessageSquare,
  upload: Upload,
};

export default function QuickActions() {
  const { openAddPatient, openBookAppointment, openReportModal, openMessageModal, openUploadModal } = useDashboard();

  const actionHandlers = {
    addPatient: openAddPatient,
    bookAppointment: openBookAppointment,
    generateReport: openReportModal,
    sendMessage: openMessageModal,
    uploadRecords: openUploadModal,
  };

  return (
    <div className="relative overflow-hidden min-w-0 min-h-0 box-border rounded-[28px] p-6 shadow-soft" style={{ background: "linear-gradient(90deg,#8B5CF6 0%,#6366F1 100%)", border: "1px solid rgba(255,255,255,0.16)" }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-semibold text-white text-xl">Quick Actions</h3>
          <p className="text-sm text-white/80 mt-1">Common tasks to keep workflows moving.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {quickActions.map((a, i) => {
          const Icon = iconMap[a.icon];
          return (
            <motion.button
              key={a.id}
              type="button"
              onClick={actionHandlers[a.action]}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: i * 0.06 }}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.99 }}
              className="group flex flex-col items-center justify-center gap-3 rounded-[24px] bg-white/10 border border-white/20 p-4 text-white hover:bg-white/15 transition-all"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/20 text-white shadow-soft">
                <Icon size={20} />
              </span>
              <span className="text-sm font-semibold text-white text-center leading-tight">{a.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
