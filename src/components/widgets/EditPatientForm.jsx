import { useEffect, useMemo, useState } from "react";
import Modal from "./Modal";
import { useDashboard } from "../../context/DashboardContext";

const statuses = ["Stable", "Recovering", "Critical"];
const genders = ["Female", "Male", "Other"];

export default function EditPatientForm() {
  const { modal, closeModal, getPatientById, updatePatient } = useDashboard();
  const patient = useMemo(() => {
    if (modal.type !== "editPatient") return null;
    return getPatientById(modal.payload.patientId);
  }, [modal, getPatientById]);

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    disease: "",
    doctor: "",
    status: "",
    lastVisit: "",
    medicalSummary: "",
  });

  useEffect(() => {
    if (!patient) return;
    setForm({
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      disease: patient.disease,
      doctor: patient.doctor,
      status: patient.status,
      lastVisit: patient.lastVisit,
      medicalSummary: patient.medicalSummary,
    });
  }, [patient]);

  if (!patient) return null;

  return (
    <Modal
      open={modal.type === "editPatient"}
      onClose={closeModal}
      title="Edit Patient"
      footer={
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button onClick={closeModal} className="px-4 py-2 rounded-2xl bg-slate-100 text-sm text-ink hover:bg-slate-200 transition-colors">
            Cancel
          </button>
          <button
            onClick={() => updatePatient(patient.id, form)}
            className="px-4 py-2 rounded-2xl bg-brand-gradient text-white text-sm font-semibold hover:bg-indigo-600 transition-colors"
          >
            Save changes
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[
          { label: "Full Name", name: "name", type: "text" },
          { label: "Age", name: "age", type: "number" },
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
            {genders.map((item) => (
              <option key={item} value={item}>{item}</option>
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
            {statuses.map((item) => (
              <option key={item} value={item}>{item}</option>
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
