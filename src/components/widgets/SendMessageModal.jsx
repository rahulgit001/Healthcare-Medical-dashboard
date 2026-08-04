import { useState } from "react";
import Modal from "./Modal";
import { useDashboard } from "../../context/DashboardContext";

export default function SendMessageModal() {
  const { modal, closeModal, addToast } = useDashboard();
  const [form, setForm] = useState({ recipient: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  if (modal.type !== "sendMessage") return null;

  const valid = form.recipient && form.subject && form.message;

  const handleSend = () => {
    if (!valid) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      addToast("Message sent successfully");
      closeModal();
    }, 1000);
  };

  return (
    <Modal
      open={modal.type === "sendMessage"}
      onClose={closeModal}
      title="Send Message"
      footer={
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button onClick={closeModal} className="px-4 py-2 rounded-2xl bg-slate-100 text-sm text-ink hover:bg-slate-200 transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={!valid || loading}
            className={`px-4 py-2 rounded-2xl text-sm font-semibold transition-colors ${valid ? "bg-brand-gradient text-white hover:bg-indigo-600" : "bg-slate-200 text-slate-500 cursor-not-allowed"}`}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-4">
        {[
          { label: "Recipient", name: "recipient", type: "text" },
          { label: "Subject", name: "subject", type: "text" },
        ].map((field) => (
          <label key={field.name} className="space-y-2 text-sm text-ink dark:text-white">
            <span className="font-medium">{field.label}</span>
            <input
              type={field.type}
              value={form[field.name]}
              onChange={(e) => setForm((prev) => ({ ...prev, [field.name]: e.target.value }))}
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm outline-none text-ink dark:text-white"
            />
          </label>
        ))}
        <label className="block text-sm text-ink dark:text-white">
          <span className="font-medium">Message</span>
          <textarea
            rows={5}
            value={form.message}
            onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
            className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm outline-none text-ink dark:text-white"
          />
        </label>
      </div>
    </Modal>
  );
}
