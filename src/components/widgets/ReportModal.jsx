import { useState } from "react";
import Modal from "./Modal";
import { useDashboard } from "../../context/DashboardContext";

const reportTypes = ["Summary", "Clinical", "Billing"];

export default function ReportModal() {
  const { modal, closeModal, addToast } = useDashboard();
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [form, setForm] = useState({ type: "Summary", patient: "", department: "", from: "", to: "" });

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowResult(true);
      addToast("Report generated successfully");
    }, 1200);
  };

  return (
    <Modal
      open={modal.type === "generateReport"}
      onClose={() => {
        setShowResult(false);
        closeModal();
      }}
      title="Generate Report"
      footer={
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button onClick={() => { setShowResult(false); closeModal(); }} className="px-4 py-2 rounded-2xl bg-slate-100 text-sm text-ink hover:bg-slate-200 transition-colors">
            Close
          </button>
          {!showResult ? (
            <button
              onClick={handleGenerate}
              disabled={loading}
              className={`px-4 py-2 rounded-2xl text-sm font-semibold transition-colors ${loading ? "bg-slate-200 text-slate-500 cursor-not-allowed" : "bg-brand-gradient text-white hover:bg-indigo-600"}`}
            >
              {loading ? "Generating..." : "Generate Report"}
            </button>
          ) : (
            <button className="px-4 py-2 rounded-2xl bg-brand-gradient text-white text-sm font-semibold hover:bg-indigo-600 transition-colors">
              View Report
            </button>
          )}
        </div>
      }
    >
      {!showResult ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm text-ink dark:text-white">
            <span className="font-medium">Report Type</span>
            <select
              value={form.type}
              onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm outline-none text-ink dark:text-white"
            >
              {reportTypes.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
          <label className="space-y-2 text-sm text-ink dark:text-white">
            <span className="font-medium">Patient</span>
            <input
              type="text"
              value={form.patient}
              onChange={(e) => setForm((prev) => ({ ...prev, patient: e.target.value }))}
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm outline-none text-ink dark:text-white"
            />
          </label>
          <label className="space-y-2 text-sm text-ink dark:text-white">
            <span className="font-medium">Department</span>
            <input
              type="text"
              value={form.department}
              onChange={(e) => setForm((prev) => ({ ...prev, department: e.target.value }))}
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm outline-none text-ink dark:text-white"
            />
          </label>
          <label className="space-y-2 text-sm text-ink dark:text-white">
            <span className="font-medium">From</span>
            <input
              type="date"
              value={form.from}
              onChange={(e) => setForm((prev) => ({ ...prev, from: e.target.value }))}
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm outline-none text-ink dark:text-white"
            />
          </label>
          <label className="space-y-2 text-sm text-ink dark:text-white">
            <span className="font-medium">To</span>
            <input
              type="date"
              value={form.to}
              onChange={(e) => setForm((prev) => ({ ...prev, to: e.target.value }))}
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm outline-none text-ink dark:text-white"
            />
          </label>
        </div>
      ) : (
        <div className="space-y-4 text-sm text-ink dark:text-white">
          <p className="font-semibold text-lg">Report Generated Successfully</p>
          <p className="text-muted">Your report is ready to view or download.</p>
          <div className="rounded-2xl bg-slate-50 dark:bg-slate-950 p-4">
            <p className="text-sm font-semibold">{form.type} report</p>
            <p className="text-xs text-muted mt-1">Selected dates: {form.from || "—"} to {form.to || "—"}</p>
          </div>
        </div>
      )}
    </Modal>
  );
}
