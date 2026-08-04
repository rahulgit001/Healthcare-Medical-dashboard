import { useEffect, useState } from "react";
import Modal from "./Modal";
import { useDashboard } from "../../context/DashboardContext";

const genders = ["Female", "Male", "Other"];
const statuses = ["Stable", "Recovering", "Critical"];

export default function AddPatientForm() {
  const { modal, closeModal, addPatient } = useDashboard();
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "Female",
    phone: "",
    email: "",
    disease: "",
    doctor: "",
    status: "Stable",
    lastVisit: "",
    medicalSummary: "",
  });

  useEffect(() => {
    if (modal.type === "addPatient") {
      setForm({
        name: "",
        age: "",
        gender: "Female",
        phone: "",
        email: "",
        disease: "",
        doctor: "",
        status: "Stable",
        lastVisit: "",
        medicalSummary: "",
      });
    }
  }, [modal.type]);

  const isValid = form.name && form.age && form.phone && form.email && form.disease && form.doctor && form.lastVisit;

  return (
    <Modal
      open={modal.type === "addPatient"}
      onClose={closeModal}
      title="Add Patient"
      footer={
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button onClick={closeModal} className="px-4 py-2 rounded-2xl bg-slate-100 text-sm text-ink hover:bg-slate-200 transition-colors">
            Cancel
          </button>
          <button
            onClick={() => addPatient(form)}
            disabled={!isValid}
            className={`px-4 py-2 rounded-2xl text-sm font-semibold transition-colors ${isValid ? "bg-brand-gradient text-white hover:bg-indigo-600" : "bg-slate-200 text-slate-500 cursor-not-allowed"}`}
          >
            Add Patient
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[
          { label: "Full Name", name: "name", type: "text" },
          { label: "Age", name: "age", type: "number" },
          { label: "Phone", name: "phone", type: "tel" },
          { label: "Email", name: "email", type: "email" },
          { label: "Disease", name: "disease", type: "text" },
          { label: "Doctor", name: "doctor", type: "text" },
          { label: "Last Visit", name: "lastVisit", type: "date" },
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

        <label className="space-y-2 text-sm text-ink dark:text-white">
          <span className="font-medium">Gender</span>
          <select
            value={form.gender}
            onChange={(e) => setForm((prev) => ({ ...prev, gender: e.target.value }))}
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm outline-none text-ink dark:text-white"
          >
            {genders.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="space-y-2 text-sm text-ink dark:text-white">
          <span className="font-medium">Status</span>
          <select
            value={form.status}
            onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm outline-none text-ink dark:text-white"
          >
            {statuses.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="block text-sm text-ink dark:text-white">
        <span className="font-medium">Medical Summary</span>
        <textarea
          rows={4}
          value={form.medicalSummary}
          onChange={(e) => setForm((prev) => ({ ...prev, medicalSummary: e.target.value }))}
          className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm outline-none text-ink dark:text-white"
        />
      </label>
    </Modal>
  );
}
