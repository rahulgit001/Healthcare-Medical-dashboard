import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDashboard } from "../../context/DashboardContext";

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

function formatKey(y, m, d) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export default function CalendarWidget() {
  const { openEventDetails, calendarEvents: customEvents } = useDashboard();
  const today = new Date();
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(today);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  const monthLabel = cursor.toLocaleString("default", { month: "long", year: "numeric" });
  const selectedKey = formatKey(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
  const events = customEvents;

  const changeMonth = (delta) => setCursor(new Date(year, month + delta, 1));

  return (
    <div className="relative overflow-hidden min-w-0 min-h-0 box-border rounded-3xl bg-card dark:bg-dark-card border border-slate-100 shadow-lg p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-ink dark:text-white text-lg">{monthLabel}</h3>
        <div className="flex gap-2">
          <button onClick={() => changeMonth(-1)} className="p-2.5 rounded-2xl bg-gray-50 dark:bg-white/5 text-muted hover:bg-gray-100 dark:hover:bg-white/10 transition-colors" aria-label="Previous month">
            <ChevronLeft size={16} />
          </button>
          <button onClick={() => changeMonth(1)} className="p-2.5 rounded-2xl bg-gray-50 dark:bg-white/5 text-muted hover:bg-gray-100 dark:hover:bg-white/10 transition-colors" aria-label="Next month">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted mb-2">
        {weekDays.map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (!d) return <div key={i} />;
          const key = formatKey(year, month, d);
          const isToday =
            d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
          const isSelected =
            d === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear();
          const hasEvent = !!events[key];

          return (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setSelectedDate(new Date(year, month, d));
                const key = formatKey(year, month, d);
                if (events[key]?.length > 0) {
                  openEventDetails(key, 0);
                }
              }}
              className={`relative aspect-square rounded-2xl text-sm flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
              ${isSelected ? "bg-[#4F7DFF] text-white font-semibold" : isToday ? "bg-brand-gradient text-white font-semibold" : "text-ink dark:text-white hover:bg-gray-50 dark:hover:bg-white/5"}`}
            >
              {d}
              {hasEvent && !isSelected && (
                <span className="absolute bottom-2 w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="mt-5 pt-4 border-t border-gray-100 dark:border-dark-border space-y-3">
        <p className="text-sm font-semibold text-ink dark:text-white">Selected Date</p>
        <p className="text-sm text-muted">{selectedDate.toLocaleDateString("default", { weekday: "long", month: "long", day: "numeric" })}</p>
        <div className="space-y-3">
          {events[selectedKey] ? (
            events[selectedKey].map((event, index) => (
              <div key={`${selectedKey}-${index}`} className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0" />
                <div>
                  <p className="text-sm font-medium text-ink dark:text-white">{event}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center gap-3 text-sm text-muted">
              <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 shrink-0" />
              No events scheduled.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
