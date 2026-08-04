import { useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun, Bell, Lock, Globe } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { doctorProfile } from "../data/dummyData";

function Toggle({ on, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-11 h-6 rounded-pill flex items-center px-0.5 transition-colors ${
        on ? "bg-primary justify-end" : "bg-gray-200 dark:bg-white/10 justify-start"
      }`}
    >
      <motion.span layout className="w-5 h-5 rounded-full bg-white shadow" />
    </button>
  );
}

export default function Settings() {
  const { dark, toggleDark } = useTheme();

  const rows = [
    { icon: Bell, label: "Email notifications", desc: "Get notified about new appointments", key: "email" },
    { icon: Lock, label: "Two-factor authentication", desc: "Add an extra layer of security", key: "2fa" },
    { icon: Globe, label: "Public profile", desc: "Show your profile to patients", key: "public" },
  ];

  return (
    <div className="space-y-6 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-extrabold text-ink dark:text-white">Settings</h1>
        <p className="text-sm text-muted mt-1">Manage your account and preferences.</p>
      </motion.div>

      <div className="bg-card dark:bg-dark-card rounded-card p-6 shadow-soft border border-gray-50 dark:border-dark-border">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-brand-gradient text-white text-xl font-bold flex items-center justify-center">
            {doctorProfile.avatar}
          </div>
          <div>
            <p className="font-semibold text-ink dark:text-white">{doctorProfile.name}</p>
            <p className="text-sm text-muted">{doctorProfile.role}</p>
          </div>
        </div>

        <div className="flex items-center justify-between py-3 border-t border-gray-100 dark:border-dark-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              {dark ? <Moon size={16} /> : <Sun size={16} />}
            </div>
            <div>
              <p className="text-sm font-medium text-ink dark:text-white">Dark mode</p>
              <p className="text-xs text-muted">Switch between light and dark theme</p>
            </div>
          </div>
          <Toggle on={dark} onClick={toggleDark} />
        </div>

        {rows.map((r) => (
          <ToggleRow key={r.key} {...r} />
        ))}
      </div>
    </div>
  );
}

function ToggleRow({ icon: Icon, label, desc }) {
  const [on, setOn] = useState(true);
  return (
    <div className="flex items-center justify-between py-3 border-t border-gray-100 dark:border-dark-border">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          <Icon size={16} />
        </div>
        <div>
          <p className="text-sm font-medium text-ink dark:text-white">{label}</p>
          <p className="text-xs text-muted">{desc}</p>
        </div>
      </div>
      <Toggle on={on} onClick={() => setOn((v) => !v)} />
    </div>
  );
}
