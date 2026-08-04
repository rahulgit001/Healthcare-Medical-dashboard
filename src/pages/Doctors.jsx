import { motion } from "framer-motion";
import { Star, Mail, Phone } from "lucide-react";

const doctors = [
  { name: "Dr. Sarah Lee", dept: "Cardiology", rating: 4.9, patients: 320, avatar: "SL" },
  { name: "Dr. John Smith", dept: "Neurology", rating: 4.7, patients: 280, avatar: "JS" },
  { name: "Dr. Emily Chen", dept: "Pediatrics", rating: 4.8, patients: 410, avatar: "EC" },
  { name: "Dr. Mark Reed", dept: "Orthopedics", rating: 4.6, patients: 250, avatar: "MR" },
  { name: "Dr. Olivia Grant", dept: "Dermatology", rating: 4.9, patients: 190, avatar: "OG" },
  { name: "Dr. Ryan Patel", dept: "Ophthalmology", rating: 4.5, patients: 175, avatar: "RP" },
];

export default function Doctors() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-extrabold text-ink dark:text-white">Doctors</h1>
        <p className="text-sm text-muted mt-1">Meet the care team.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {doctors.map((d, i) => (
          <motion.div
            key={d.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -4 }}
            className="bg-card dark:bg-dark-card rounded-card p-6 shadow-soft hover:shadow-lift transition-shadow border border-gray-50 dark:border-dark-border"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-gradient text-white font-bold flex items-center justify-center">
                {d.avatar}
              </div>
              <div>
                <p className="font-semibold text-ink dark:text-white">{d.name}</p>
                <p className="text-xs text-muted">{d.dept}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-warning mb-4">
              <Star size={13} fill="currentColor" />
              <span className="font-semibold">{d.rating}</span>
              <span className="text-muted">· {d.patients} patients</span>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 hover:bg-primary/20 py-2.5 rounded-xl transition-colors">
                <Mail size={13} /> Message
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-ink dark:text-white bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 py-2.5 rounded-xl transition-colors">
                <Phone size={13} /> Call
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
