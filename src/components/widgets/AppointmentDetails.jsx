import { useMemo } from "react";
import Modal from "./Modal";
import { useDashboard } from "../../context/DashboardContext";

export default function AppointmentDetails() {
  const { modal, closeModal, getAppointmentById, confirmAppointment, cancelAppointment } = useDashboard();
  const appointment = useMemo(() => {
    if (modal.type !== "appointmentDetails") return null;
    return getAppointmentById(modal.payload.appointmentId);
  }, [modal, getAppointmentById]);

  if (!appointment) return null;

  return (
    <Modal
      open={modal.type === "appointmentDetails"}
      onClose={closeModal}
      title="Appointment Details"
      footer={
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button onClick={closeModal} className="px-4 py-2 rounded-2xl bg-slate-100 text-sm text-ink hover:bg-slate-200 transition-colors">
            Close
          </button>
          <button
            onClick={() => confirmAppointment(appointment.id)}
            className="px-4 py-2 rounded-2xl bg-success text-white text-sm font-semibold hover:bg-emerald-600 transition-colors"
          >
            Confirm
          </button>
          <button
            onClick={() => cancelAppointment(appointment.id)}
            className="px-4 py-2 rounded-2xl bg-danger text-white text-sm font-semibold hover:bg-red-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      }
    >
      <div className="space-y-5 text-sm text-ink dark:text-white">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-muted">Patient</p>
            <p className="font-semibold">{appointment.patient}</p>
          </div>
          <div>
            <p className="text-muted">Doctor</p>
            <p className="font-semibold">{appointment.doctor}</p>
          </div>
          <div>
            <p className="text-muted">Department</p>
            <p className="font-semibold">{appointment.department}</p>
          </div>
          <div>
            <p className="text-muted">Appointment Type</p>
            <p className="font-semibold">{appointment.type}</p>
          </div>
          <div>
            <p className="text-muted">Date</p>
            <p className="font-semibold">{appointment.date}</p>
          </div>
          <div>
            <p className="text-muted">Time</p>
            <p className="font-semibold">{appointment.time}</p>
          </div>
          <div>
            <p className="text-muted">Status</p>
            <p className="font-semibold">{appointment.status}</p>
          </div>
        </div>
        <div>
          <p className="text-muted">Notes</p>
          <p className="mt-2 leading-7">{appointment.notes}</p>
        </div>
      </div>
    </Modal>
  );
}
