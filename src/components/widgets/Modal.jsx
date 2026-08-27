import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function Modal({ open, onClose, title, children, footer }) {
  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-x-4 top-6 z-50 mx-auto max-h-[calc(100vh-3rem)] w-auto max-w-3xl overflow-hidden rounded-lg bg-white shadow-lift dark:bg-dark-card"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-lg font-semibold text-ink dark:text-white">{title}</h2>
              <button onClick={onClose} aria-label="Close modal" className="text-muted hover:text-ink dark:hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="max-h-[calc(100vh-13rem)] overflow-y-auto p-5">{children}</div>
            {footer && <div className="border-t border-slate-200 p-5 dark:border-dark-border">{footer}</div>}
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
