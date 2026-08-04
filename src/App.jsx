import { useState } from "react";
import AnimatedRoutes from "./components/layout/AnimatedRoutes";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import PatientDetails from "./components/widgets/PatientDetails";
import EditPatientForm from "./components/widgets/EditPatientForm";
import ConfirmDelete from "./components/widgets/ConfirmDelete";
import AddPatientForm from "./components/widgets/AddPatientForm";
import BookAppointmentForm from "./components/widgets/BookAppointmentForm";
import ReportModal from "./components/widgets/ReportModal";
import SendMessageModal from "./components/widgets/SendMessageModal";
import UploadRecordsModal from "./components/widgets/UploadRecordsModal";
import AppointmentDetails from "./components/widgets/AppointmentDetails";
import EventDetails from "./components/widgets/EventDetails";
import ToastContainer from "./components/widgets/ToastContainer";
import { useDashboard } from "./context/DashboardContext";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toasts } = useDashboard();

  return (
    <div className="flex min-h-screen bg-bg dark:bg-dark-bg">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 min-w-0 flex flex-col">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-hidden">
          <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 xl:px-10 py-8">
            <AnimatedRoutes />
          </div>
        </main>

        <Footer />
      </div>

      <PatientDetails />
      <EditPatientForm />
      <ConfirmDelete />
      <AddPatientForm />
      <BookAppointmentForm />
      <ReportModal />
      <SendMessageModal />
      <UploadRecordsModal />
      <AppointmentDetails />
      <EventDetails />
      <ToastContainer toasts={toasts} />
    </div>
  );
}
