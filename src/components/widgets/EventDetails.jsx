import { useMemo } from "react";
import Modal from "./Modal";
import { useDashboard } from "../../context/DashboardContext";

export default function EventDetails() {
  const { modal, closeModal, calendarEvents } = useDashboard();
  const event = useMemo(() => {
    if (modal.type !== "eventDetails") return null;
    const events = calendarEvents[modal.payload.date] || [];
    return events[modal.payload.index] || null;
  }, [modal, calendarEvents]);

  if (!event) return null;

  return (
    <Modal open={modal.type === "eventDetails"} onClose={closeModal} title="Event Details">
      <div className="space-y-4 text-sm text-ink dark:text-white">
        <p className="text-muted">Event</p>
        <p className="font-semibold">{event}</p>
        <p className="text-muted">Date</p>
        <p className="font-semibold">{modal.payload.date}</p>
      </div>
    </Modal>
  );
}
