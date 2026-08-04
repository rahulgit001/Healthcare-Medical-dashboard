import Modal from "./Modal";
import { useDashboard } from "../../context/DashboardContext";

export default function ConfirmDelete() {
  const { modal, closeModal, deletePatient, getPatientById } = useDashboard();
  const patient = modal.type === "confirmDelete" ? getPatientById(modal.payload.patientId) : null;

  return (
    <Modal
      open={modal.type === "confirmDelete"}
      onClose={closeModal}
      title="Delete Patient?"
      footer={
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button onClick={closeModal} className="px-4 py-2 rounded-2xl bg-slate-100 text-sm text-ink hover:bg-slate-200 transition-colors">
            Cancel
          </button>
          <button
            onClick={() => patient && deletePatient(patient.id)}
            className="px-4 py-2 rounded-2xl bg-danger text-white text-sm font-semibold hover:bg-red-600 transition-colors"
          >
            Delete Patient
          </button>
        </div>
      }
    >
      <p className="text-sm text-muted">This action will permanently remove the patient and related appointments from the dashboard.</p>
      {patient && (
        <div className="mt-4 rounded-2xl bg-slate-50 dark:bg-slate-950 p-4">
          <p className="text-sm font-semibold text-ink dark:text-white">{patient.name}</p>
          <p className="text-xs text-muted">Patient ID: {patient.id}</p>
        </div>
      )}
    </Modal>
  );
}
