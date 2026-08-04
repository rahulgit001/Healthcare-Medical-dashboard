import { useEffect, useMemo, useState } from "react";
import Modal from "./Modal";
import { useDashboard } from "../../context/DashboardContext";

const statuses = ["Confirmed", "Pending", "Cancelled"];

export default function BookAppointmentForm() {
  const { modal, closeModal, addAppointment, patients, doctors, getAppointmentById } = useDashboard();
  const editing = modal.type === "bookAppointment" && modal.payload?.appointmentId;
  const appointment = useMemo(() => {
    if (!editing) return null;
    return getAppointmentById(modal.payload.appointmentId);
  }, [editing, modal, getAppointmentById]);

  const [form, setForm] = useState({
    patientId: "",
    patientName: "",
    doctor: doctors[0] || "",
    department: "",
    type: "Checkup",
    date: "",
    time: "",
    status: "Confirmed",
    notes: "",
  });

  useEffect(() => {
    if (appointment) {
      setForm({
        patientId: appointment.patientId ?? "",
        patientName: appointment.patient,
        doctor: appointment.doctor,
        department: appointment.department,
        type: appointment.type,
        date: appointment.date,
        time: appointment.time,
        status: appointment.status,
        notes: appointment.notes,
      });
    }
  }, [appointment]);

  useEffect(() => {
    if (!editing && patients.length > 0) {
      setForm((prev) => ({ ...prev, patientId: patients[0].id, patientName: patients[0].name }));
    }
  }, [editing, patients]);

  const handleSubmit = () => {
    addAppointment(form);
  };

  return (
    <Modal
      open={modal.type === "bookAppointment"}
      onClose={closeModal}
      title={editing ? "Edit Appointment" : "Book Appointment"}
      footer={
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button onClick={closeModal} className="px-4 py-2 rounded-2xl bg-slate-100 text-sm text-ink hover:bg-slate-200 transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-2xl bg-brand-gradient text-white text-sm font-semibold hover:bg-indigo-600 transition-colors"
          >
            {editing ? "Save appointment" : "Book Appointment"}
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-ink dark:text-white">
          <span className="font-medium">Patient</span>
          <select
            value={form.patientId}
            onChange={(e) => {
              const patient = patients.find((p) => p.id === Number(e.target.value));
              setForm((prev) => ({ ...prev, patientId: e.target.value, patientName: patient?.name || "" }));
            }}
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm outline-none text-ink dark:text-white"
          >
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>{patient.name}</option>
            ))}
          </select>
        </label>

        <label className="space-y-2 text-sm text-ink dark:text-white">
          <span className="font-medium">Doctor</span>
          <select
            value={form.doctor}
            onChange={(e) => setForm((prev) => ({ ...prev, doctor: e.target.value }))}
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm outline-none text-ink dark:text-white"
          >
            {doctors.map((doctor) => (
              <option key={doctor} value={doctor}>{doctor}</option>
            ))}
          </select>
        </label>

        <label className="space-y-2 text-sm text-ink dark:text-white">
          <span className="font-medium">Date</span>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm outline-none text-ink dark:text-white"
          />
        </label>

        <label className="space-y-2 text-sm text-ink dark:text-white">
          <span className="font-medium">Time</span>
          <input
            type="time"
            value={form.time}
            onChange={(e) => setForm((prev) => ({ ...prev, time: e.target.value }))}
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
          <span className="font-medium">Appointment Type</span>
          <input
            type="text"
            value={form.type}
            onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm outline-none text-ink dark:text-white"
          />
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
        <span className="font-medium">Notes</span>
        <textarea
          rows={4}
          value={form.notes}
          onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
          className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm outline-none text-ink dark:text-white"
        />
      </label>
    </Modal>
  );
}
