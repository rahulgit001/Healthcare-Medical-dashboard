import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  Menu,
  Settings,
  User,
  LogOut,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useDashboard } from "../../context/DashboardContext";
import { doctorProfile } from "../../data/dummyData";
import NotificationsPanel from "../widgets/Notifications";

const languages = ["English", "हिन्दी"];

export default function Navbar({ onMenuClick }) {
  const { dark, toggleDark } = useTheme();
  const {
    notifications,
    searchQuery,
    setSearchQuery,
    searchResults,
    openPatientDetails,
    openAppointmentDetails,
    openReportModal,
    openMessageModal,
    openUploadModal,
    markNotificationRead,
    markAllNotificationsRead,
  } = useDashboard();
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState("English");
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [showSearchPanel, setShowSearchPanel] = useState(false);
  const unread = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-20 glass border-b border-gray-100 dark:border-dark-border">
      <div className="flex items-center gap-5 px-4 sm:px-6 xl:px-10 py-0 h-[112px]">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-muted hover:text-ink dark:hover:text-white"
          aria-label="Open sidebar menu"
        >
          <Menu size={22} />
        </button>

        <div className="flex-1 min-w-0 max-w-[680px] relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchPanel(true);
            }}
            onFocus={() => setShowSearchPanel(true)}
            placeholder="Search patients, doctors, records..."
            className="w-full pl-12 pr-4 h-[56px] rounded-[28px] bg-gray-50 dark:bg-white/5 border border-transparent
            focus:border-primary/40 focus:bg-white dark:focus:bg-dark-card outline-none text-base
            text-ink dark:text-white placeholder:text-muted transition-all"
          />
          <AnimatePresence>
            {showSearchPanel && searchQuery.trim().length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute left-0 right-0 top-[70px] z-40 rounded-[28px] bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-700 shadow-lift p-4"
              >
                <div className="grid gap-3">
                  {[
                    { label: "Patients", items: searchResults.patients, empty: "No patients found" },
                    { label: "Doctors", items: searchResults.doctors, empty: "No doctors found" },
                    { label: "Appointments", items: searchResults.appointments, empty: "No appointments found" },
                    { label: "Records", items: searchResults.records, empty: "No records found" },
                  ].map((section) => (
                    <div key={section.label}>
                      <p className="text-xs uppercase tracking-[0.24em] text-muted mb-2">{section.label}</p>
                      {section.items.length === 0 ? (
                        <div className="rounded-2xl bg-slate-50 dark:bg-slate-950 p-3 text-sm text-muted">{section.empty}</div>
                      ) : (
                        <div className="space-y-2">
                          {section.items.slice(0, 4).map((item) => {
                            if (section.label === "Patients") {
                              return (
                                <button
                                  key={item.id}
                                  onClick={() => {
                                    openPatientDetails(item.id);
                                    setShowSearchPanel(false);
                                  }}
                                  className="w-full text-left rounded-2xl px-3 py-3 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                                >
                                  <p className="font-semibold text-ink dark:text-white">{item.name}</p>
                                  <p className="text-xs text-muted">{item.disease} • {item.doctor}</p>
                                </button>
                              );
                            }
                            if (section.label === "Doctors") {
                              return (
                                <button
                                  key={item.name}
                                  onClick={() => setShowSearchPanel(false)}
                                  className="w-full text-left rounded-2xl px-3 py-3 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                                >
                                  <p className="font-semibold text-ink dark:text-white">{item.name}</p>
                                  <p className="text-xs text-muted">Doctor</p>
                                </button>
                              );
                            }
                            if (section.label === "Appointments") {
                              return (
                                <button
                                  key={item.id}
                                  onClick={() => {
                                    openAppointmentDetails(item.id);
                                    setShowSearchPanel(false);
                                  }}
                                  className="w-full text-left rounded-2xl px-3 py-3 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                                >
                                  <p className="font-semibold text-ink dark:text-white">{item.patient} • {item.doctor}</p>
                                  <p className="text-xs text-muted">{item.date} {item.time}</p>
                                </button>
                              );
                            }
                            return (
                              <button
                                key={item.id}
                                onClick={() => setShowSearchPanel(false)}
                                className="w-full text-left rounded-2xl px-3 py-3 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                              >
                                <p className="font-semibold text-ink dark:text-white">{item.title}</p>
                                <p className="text-xs text-muted">{item.date}</p>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDark}
            className="w-10 h-10 rounded-2xl flex items-center justify-center bg-gray-50 dark:bg-white/5
            text-muted hover:text-primary transition-colors"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={dark ? "moon" : "sun"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {dark ? <Moon size={18} /> : <Sun size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>

          {/* Language dropdown */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1.5 px-3 h-10 rounded-2xl bg-gray-50 dark:bg-white/5 text-sm
              text-muted hover:text-ink dark:hover:text-white transition-colors"
            >
              {lang}
              <ChevronDown size={14} />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute right-0 mt-2 w-40 bg-white dark:bg-dark-card rounded-2xl shadow-lift
                  border border-gray-100 dark:border-dark-border p-1.5 z-30"
                >
                  {languages.map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        setLang(l);
                        setLangOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-sm text-ink dark:text-white
                      hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      {l}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen((v) => !v)}
              className="relative w-11 h-11 rounded-2xl flex items-center justify-center bg-gray-50 dark:bg-white/5
              text-muted hover:text-primary transition-colors"
              aria-label="Open notifications"
            >
              <Bell size={18} />
              {unread > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger" />
              )}
            </button>
            <AnimatePresence>
              {notifOpen && (
                <NotificationsPanel
                  onClose={() => setNotifOpen(false)}
                  notifications={notifications}
                  markNotificationRead={markNotificationRead}
                  markAllNotificationsRead={markAllNotificationsRead}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen((v) => !v)}
              className="flex items-center gap-3 pl-1 pr-2 sm:pr-3 h-[56px] rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
            >
              <div className="w-14 h-14 rounded-full bg-brand-gradient flex items-center justify-center text-white text-base font-semibold">
                {doctorProfile.avatar}
              </div>
              <div className="hidden sm:block text-left leading-tight">
                <p className="text-base font-semibold text-ink dark:text-white">
                  {doctorProfile.name}
                </p>
                <p className="text-sm text-muted">{doctorProfile.role}</p>
              </div>
              <ChevronDown size={14} className="hidden sm:block text-muted" />
            </button>
            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-card rounded-2xl shadow-lift
                  border border-gray-100 dark:border-dark-border p-1.5 z-30"
                >
                  {[
                    { label: "Profile", icon: User },
                    { label: "Settings", icon: Settings },
                    { label: "Logout", icon: LogOut, danger: true },
                  ].map(({ label, icon: Icon, danger }) => (
                    <button
                      key={label}
                      className={`w-full flex items-center gap-2.5 text-left px-3 py-2 rounded-xl text-sm transition-colors
                      ${
                        danger
                          ? "text-danger hover:bg-danger/10"
                          : "text-ink dark:text-white hover:bg-primary/10 hover:text-primary"
                      }`}
                    >
                      <Icon size={16} />
                      {label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
