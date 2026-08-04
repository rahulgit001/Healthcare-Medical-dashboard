import { motion } from "framer-motion";
import { Bell } from "lucide-react";

export default function NotificationsPanel({ onClose, markNotificationRead, markAllNotificationsRead, notifications }) {
  return (
    <>
      <div className="fixed inset-0 z-20" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: -8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.98 }}
        transition={{ duration: 0.15 }}
        className="absolute right-0 mt-2 w-80 bg-white dark:bg-dark-card rounded-2xl shadow-lift
        border border-gray-100 dark:border-dark-border z-30 overflow-hidden"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-dark-border">
          <span className="font-semibold text-sm text-ink dark:text-white">Notifications</span>
          <button onClick={markAllNotificationsRead} className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors">Mark all read</button>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.map((n, i) => (
            <motion.button
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              type="button"
              className="w-full text-left flex items-start gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 border-b border-gray-50 dark:border-dark-border/60 last:border-0"
            >
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Bell size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-ink dark:text-white truncate">{n.title}</p>
                <p className="text-xs text-muted truncate">{n.desc}</p>
                <p className="text-[11px] text-muted mt-0.5">{n.time}</p>
              </div>
              {n.unread && <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </>
  );
}
