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
import { doctorProfile, menuItems } from "../../data/dummyData";

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
        className={`fixed top-0 left-0 h-screen w-[280px] lg:w-[248px] shrink-0 z-40
        bg-[#12304A] border-r border-white/10
        flex flex-col transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex h-[76px] shrink-0 items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#159A9C]">
              <motion.div
                animate={{ rotate: [0, -5, 5, 0], y: [0, -1, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Stethoscope size={20} className="text-white" />
              </motion.div>
            </div>
            <div>
              <p className="text-base font-semibold text-white">Healthcare<span className="text-[#5FD0C5]">.</span></p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-muted" aria-label="Close sidebar">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-2">
          {menuItems.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `group relative mx-4 my-1 flex h-11 w-[calc(100%-32px)] items-center gap-3 rounded-[6px] px-4 text-sm font-medium transition-colors duration-200
                  ${isActive ? "bg-[#159A9C] text-white" : "text-[#B9CBD6] hover:bg-white/10 hover:text-white"}`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon size={20} className="shrink-0" />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="shrink-0 border-t border-white/10 px-4 pb-4 pt-3">
          <div className="mb-3 flex items-center gap-3 px-1">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D9F0EF] text-sm font-semibold text-[#159A9C]">
              {doctorProfile.avatar}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{doctorProfile.name}</p>
              <p className="truncate text-xs text-[#B9CBD6]">{doctorProfile.role}</p>
            </div>
          </div>
          <button className="flex h-11 w-full items-center gap-3 rounded-[6px] px-4 text-sm font-semibold text-danger transition-colors hover:bg-danger/10" aria-label="Logout">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </motion.aside>
    </>
  );
}
