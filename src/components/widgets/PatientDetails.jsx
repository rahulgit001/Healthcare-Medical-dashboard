import { useMemo } from "react";
import Modal from "./Modal";
import { useDashboard } from "../../context/DashboardContext";

export default function PatientDetails() {
  const { modal, closeModal, getPatientById } = useDashboard();
  const patient = useMemo(() => {
    if (modal.type !== "patientDetails") return null;
    return getPatientById(modal.payload.patientId);
  }, [modal, getPatientById]);

  if (!patient) return null;

  return (
    <Modal open={modal.type === "patientDetails"} onClose={closeModal} title="Patient Details">
      <div className="space-y-5 text-sm text-ink dark:text-white">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-muted">Patient Name</p>
            <p className="font-semibold">{patient.name}</p>
          </div>
          <div>
            <p className="text-muted">Patient ID</p>
            <p className="font-semibold">{patient.id}</p>
          </div>
          <div>
            <p className="text-muted">Age</p>
            <p className="font-semibold">{patient.age}</p>
          </div>
          <div>
            <p className="text-muted">Gender</p>
            <p className="font-semibold">{patient.gender}</p>
          </div>
          <div>
            <p className="text-muted">Phone</p>
            <p className="font-semibold">{patient.phone}</p>
          </div>
          <div>
            <p className="text-muted">Email</p>
            <p className="font-semibold">{patient.email}</p>
          </div>
          <div>
            <p className="text-muted">Disease</p>
            <p className="font-semibold">{patient.disease}</p>
          </div>
          <div>
            <p className="text-muted">Doctor</p>
            <p className="font-semibold">{patient.doctor}</p>
          </div>
          <div>
            <p className="text-muted">Status</p>
            <p className="font-semibold">{patient.status}</p>
          </div>
          <div>
            <p className="text-muted">Last Visit</p>
            <p className="font-semibold">{patient.lastVisit}</p>
          </div>
          <div className="col-span-2">
            <p className="text-muted">Next Appointment</p>
            <p className="font-semibold">{patient.nextAppointment}</p>
          </div>
        </div>

        <div>
          <p className="text-muted">Medical Summary</p>
          <p className="mt-2 text-sm leading-7">{patient.medicalSummary}</p>
        </div>

        <div>
          <p className="text-muted">Recent Activity</p>
          <ul className="mt-3 space-y-2">
            {patient.recentActivity.map((item, index) => (
              <li key={index} className="rounded-2xl bg-slate-50 dark:bg-slate-950 p-3 text-sm">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
}
