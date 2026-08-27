import { motion } from "framer-motion";
import { BookOpen, LifeBuoy, MessageCircle, Search, ShieldCheck } from "lucide-react";
import { useDashboard } from "../context/DashboardContext";

const topics = [
  ["Getting started", "Learn the essentials for managing your clinic workspace.", BookOpen],
  ["Patient records", "Find guidance for updating, exporting, and protecting records.", ShieldCheck],
  ["Appointments", "Resolve scheduling, availability, and notification questions.", LifeBuoy],
];

export default function Support() {
  const { openMessageModal, addToast } = useDashboard();
  return (
    <div className="space-y-5">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Help center</p><h1 className="mt-1 text-2xl font-bold text-ink dark:text-white">Support</h1><p className="mt-1 text-sm text-muted">Practical guidance for keeping your clinic operations moving.</p></motion.div>
      <div className="relative"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" /><input aria-label="Search support articles" placeholder="Search help articles..." className="h-10 w-full rounded-md border border-[#E3E8EE] bg-white pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 dark:border-dark-border dark:bg-dark-card dark:text-white" /></div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">{topics.map(([title, description, Icon]) => <button key={title} className="rounded-lg border border-[#E3E8EE] bg-white p-5 text-left shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift dark:border-dark-border dark:bg-dark-card"><div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#DDF4F2] text-primary"><Icon size={18} /></div><h2 className="mt-4 text-sm font-bold text-ink dark:text-white">{title}</h2><p className="mt-1 text-xs leading-5 text-muted">{description}</p><span className="mt-4 inline-block text-xs font-semibold text-primary">View guidance</span></button>)}</div>
      <section className="flex flex-col items-start justify-between gap-4 rounded-lg border border-[#DDF4F2] bg-[#DDF4F2] p-5 sm:flex-row sm:items-center"><div className="flex items-start gap-3"><MessageCircle size={20} className="mt-0.5 text-primary" /><div><h2 className="text-base font-bold text-[#12304A]">Need a direct answer?</h2><p className="mt-1 text-sm text-[#456273]">Our clinic operations team is ready to help.</p></div></div><button onClick={openMessageModal} className="inline-flex h-10 items-center gap-2 rounded-md bg-[#12304A] px-4 text-sm font-semibold text-white hover:bg-[#1b4666]"><MessageCircle size={16} /> Contact support</button></section>
    </div>
  );
}
