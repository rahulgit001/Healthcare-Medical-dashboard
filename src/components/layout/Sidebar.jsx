import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Clock,
  CalendarDays,
  CalendarCheck,
  Users,
  Stethoscope,
  MessageCircle,
  Pill,
  LineChart,
  FileBarChart,
  Settings2,
  LogOut,
  HeartPulse,
  LifeBuoy,
  X,
} from "lucide-react";
import { menuItems } from "../../data/dummyData";

const iconMap = {
  home: LayoutDashboard,
  clock: Clock,
  calendarDays: CalendarDays,
  calendarCheck: CalendarCheck,
  users: Users,
  doctors: Stethoscope,
  messageCircle: MessageCircle,
  chartSpline: LineChart,
  pharmacy: Pill,
  fileBarChart: FileBarChart,
  lifeBuoy: LifeBuoy,
  settings2: Settings2,
};

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <motion.aside
        initial={false}
        animate={{ x: 0 }}
        className={`fixed lg:sticky top-0 left-0 h-screen w-[304px] shrink-0 z-40
        bg-white dark:bg-dark-card border-r border-gray-100 dark:border-dark-border
        flex flex-col transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex items-center justify-between px-5 pt-8 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-3xl bg-brand-gradient flex items-center justify-center shadow-soft">
              <HeartPulse size={22} className="text-white" />
            </div>
            <div>
              <p className="text-lg font-semibold text-ink dark:text-white">Healthcare<span className="text-primary">.</span></p>
              <p className="text-xs text-muted">Medical dashboard</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-muted" aria-label="Close sidebar">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-5 py-2 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 px-5 rounded-[16px] h-14 text-sm font-medium transition-all duration-200
                  ${isActive ? "bg-[#EAF2FF] text-[#3478F6]" : "text-muted hover:bg-gray-50 dark:hover:bg-white/5 hover:text-ink dark:hover:text-white"}`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="active-pill"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-7 rounded-full bg-[#3478F6]"
                      />
                    )}
                    <Icon size={20} className="shrink-0" />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="px-5 pb-6 pt-3">
          <button className="w-full flex items-center gap-3 px-5 py-3 rounded-[16px] text-sm font-semibold text-danger hover:bg-danger/10 transition-colors" aria-label="Logout">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </motion.aside>
    </>
  );
}
