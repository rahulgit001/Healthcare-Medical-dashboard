import { motion } from "framer-motion";
import { Mail, MessageSquare, Send, Users } from "lucide-react";
import { useDashboard } from "../context/DashboardContext";

export default function Messages() {
  const { notifications, openMessageModal, markNotificationRead } = useDashboard();
  const unread = notifications.filter((item) => item.unread).length;

  return (
    <div className="space-y-5">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Care coordination</p><h1 className="mt-1 text-2xl font-bold text-ink dark:text-white">Messages</h1><p className="mt-1 text-sm text-muted">Keep conversations with your care team visible and actionable.</p></div><button onClick={openMessageModal} className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-white transition hover:bg-[#128789]"><Send size={16} /> New message</button></motion.div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">{[["Unread", unread, Mail], ["Team updates", notifications.length, Users], ["Response status", "Active", MessageSquare]].map(([label, value, Icon]) => <div key={label} className="rounded-lg border border-[#E3E8EE] bg-white p-4 shadow-soft dark:border-dark-border dark:bg-dark-card"><Icon size={18} className="text-primary" /><p className="mt-3 text-xs text-muted">{label}</p><p className="mt-1 text-xl font-bold text-ink dark:text-white">{value}</p></div>)}</div>
      <section className="rounded-lg border border-[#E3E8EE] bg-white p-5 shadow-soft dark:border-dark-border dark:bg-dark-card"><div className="mb-4 flex items-center gap-2"><MessageSquare size={18} className="text-primary" /><h2 className="text-base font-bold text-ink dark:text-white">Inbox</h2></div><div className="divide-y divide-[#E3E8EE] dark:divide-dark-border">{notifications.map((item) => <button key={item.id} onClick={() => markNotificationRead(item.id)} className="flex w-full items-start gap-3 py-4 text-left first:pt-0 last:pb-0"><div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${item.unread ? "bg-[#DDF4F2] text-primary" : "bg-[#F5F7FA] text-muted"}`}><Mail size={16} /></div><div className="min-w-0 flex-1"><div className="flex items-center gap-2"><p className="truncate text-sm font-semibold text-ink dark:text-white">{item.title}</p>{item.unread && <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />}</div><p className="mt-1 text-xs text-muted">{item.desc}</p></div><span className="shrink-0 text-[11px] text-muted">{item.time}</span></button>)}</div></section>
    </div>
  );
}
