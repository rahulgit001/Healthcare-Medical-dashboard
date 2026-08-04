import { createContext, useContext, useMemo, useState } from "react";
import {
  appointments as initialAppointments,
  calendarEvents as initialCalendarEvents,
  notifications as initialNotifications,
  patients as initialPatients,
  records as initialRecords,
} from "../data/dummyData";

const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {
  const [patients, setPatients] = useState(initialPatients);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [records] = useState(initialRecords);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("weekly");
  const [modal, setModal] = useState({ type: null, payload: null });
  const [toasts, setToasts] = useState([]);

  const recentPatients = useMemo(
    () => patients.slice(0, 4).map((p) => ({ ...p, visitDate: p.lastVisit })),
    [patients]
  );

  const calculatedCalendarEvents = useMemo(() => {
    const events = { ...initialCalendarEvents };
    appointments.forEach((appt) => {
      const key = appt.date;
      events[key] = events[key] ? [...events[key], `${appt.time} • ${appt.patient} (${appt.department})`] : [`${appt.time} • ${appt.patient} (${appt.department})`];
    });
    return events;
  }, [appointments]);

  const doctors = useMemo(() => {
    const set = new Set();
    patients.forEach((p) => set.add(p.doctor));
    appointments.forEach((a) => set.add(a.doctor));
    return Array.from(set);
  }, [patients, appointments]);

  const getPatientById = (id) => patients.find((p) => p.id === id) || null;
  const getAppointmentById = (id) => appointments.find((appt) => appt.id === id) || null;

  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4200);
  };

  const closeModal = () => setModal({ type: null, payload: null });
  const openModal = (type, payload = null) => setModal({ type, payload });

  const openPatientDetails = (patientId) => openModal("patientDetails", { patientId });
  const openEditPatient = (patientId) => openModal("editPatient", { patientId });
  const openDeletePatient = (patientId) => openModal("confirmDelete", { patientId });
  const openBookAppointment = (appointment = null) => openModal("bookAppointment", appointment);
  const openAddPatient = () => openModal("addPatient");
  const openAppointmentDetails = (appointmentId) => openModal("appointmentDetails", { appointmentId });
  const openReportModal = () => openModal("generateReport");
  const openMessageModal = () => openModal("sendMessage");
  const openUploadModal = () => openModal("uploadRecords");
  const openEventDetails = (date, index) => openModal("eventDetails", { date, index });
  const openLogoutConfirm = () => openModal("logoutConfirm");

  const addPatient = (values) => {
    const nextId = Math.max(0, ...patients.map((p) => p.id)) + 1;
    const patient = {
      id: nextId,
      name: values.name,
      age: Number(values.age),
      gender: values.gender,
      phone: values.phone,
      email: values.email,
      disease: values.disease,
      doctor: values.doctor,
      status: values.status,
      lastVisit: values.lastVisit,
      medicalSummary: values.medicalSummary || "Patient record created successfully.",
      recentActivity: ["Patient registered", "Record created"],
      nextAppointment: values.lastVisit,
    };
    setPatients((prev) => [patient, ...prev]);
    addToast("Patient added successfully");
    closeModal();
  };

  const updatePatient = (patientId, values) => {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === patientId
          ? {
              ...p,
              name: values.name,
              age: Number(values.age),
              gender: values.gender,
              disease: values.disease,
              doctor: values.doctor,
              status: values.status,
              lastVisit: values.lastVisit,
              medicalSummary: values.medicalSummary ?? p.medicalSummary,
            }
          : p
      )
    );
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.patientId === patientId
          ? {
              ...appt,
              patient: values.name,
              doctor: values.doctor,
            }
          : appt
      )
    );
    addToast("Patient updated successfully");
    closeModal();
  };

  const deletePatient = (patientId) => {
    setPatients((prev) => prev.filter((p) => p.id !== patientId));
    setAppointments((prev) => prev.filter((appt) => appt.patientId !== patientId));
    addToast("Patient deleted successfully");
    closeModal();
  };

  const addAppointment = (values) => {
    const nextId = Math.max(0, ...appointments.map((appt) => appt.id)) + 1;
    const patient = patients.find((p) => p.id === Number(values.patientId));
    const appointment = {
      id: nextId,
      patientId: patient?.id ?? null,
      patient: patient?.name ?? values.patientName,
      doctor: values.doctor,
      department: values.department,
      type: values.type,
      date: values.date,
      time: values.time,
      status: values.status,
      notes: values.notes,
      avatar: patient
        ? patient.name
            .split(" ")
            .map((segment) => segment[0])
            .join("")
        : values.patientName
            .split(" ")
            .map((segment) => segment[0])
            .join(""),
    };
    setAppointments((prev) => [appointment, ...prev]);
    if (patient) {
      setPatients((prev) =>
        prev.map((p) =>
          p.id === patient.id ? { ...p, nextAppointment: `${values.date} at ${values.time}` } : p
        )
      );
    }
    addToast("Appointment booked successfully");
    closeModal();
  };

  const updateAppointment = (appointmentId, values) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === appointmentId
          ? {
              ...appt,
              patient: values.patientName || appt.patient,
              doctor: values.doctor,
              department: values.department,
              type: values.type,
              date: values.date,
              time: values.time,
              status: values.status,
              notes: values.notes,
            }
          : appt
      )
    );
    addToast("Appointment updated successfully");
    closeModal();
  };

  const cancelAppointment = (appointmentId) => {
    setAppointments((prev) => prev.map((appt) => (appt.id === appointmentId ? { ...appt, status: "Cancelled" } : appt)));
    addToast("Appointment updated successfully");
  };

  const confirmAppointment = (appointmentId) => {
    setAppointments((prev) => prev.map((appt) => (appt.id === appointmentId ? { ...appt, status: "Confirmed" } : appt)));
    addToast("Appointment updated successfully");
  };

  const markNotificationRead = (notificationId) => {
    setNotifications((prev) => prev.map((item) => (item.id === notificationId ? { ...item, unread: false } : item)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, unread: false })));
  };

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return { patients: [], doctors: [], appointments: [], records: [] };
    }

    const patientsMatch = patients.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.disease.toLowerCase().includes(query) ||
        p.doctor.toLowerCase().includes(query) ||
        String(p.id).includes(query)
    );

    const doctorsMatch = doctors
      .filter((name) => name.toLowerCase().includes(query))
      .map((name) => ({ name }));

    const appointmentsMatch = appointments.filter(
      (appt) =>
        appt.patient.toLowerCase().includes(query) ||
        appt.doctor.toLowerCase().includes(query) ||
        appt.department.toLowerCase().includes(query) ||
        appt.notes.toLowerCase().includes(query)
    );

    const recordsMatch = records.filter(
      (record) =>
        record.title.toLowerCase().includes(query) ||
        String(record.patientId).includes(query)
    );

    return {
      patients: patientsMatch.slice(0, 4),
      doctors: doctorsMatch.slice(0, 4),
      appointments: appointmentsMatch.slice(0, 4),
      records: recordsMatch.slice(0, 4),
    };
  }, [searchQuery, patients, appointments, doctors, records]);

  return (
    <DashboardContext.Provider
      value={{
        patients,
        appointments,
        records,
        notifications,
        searchQuery,
        setSearchQuery,
        searchResults,
        activeTab,
        setActiveTab,
        recentPatients,
        calendarEvents: calculatedCalendarEvents,
        doctors,
        toasts,
        modal,
        closeModal,
        openPatientDetails,
        openEditPatient,
        openDeletePatient,
        openBookAppointment,
        openAddPatient,
        openAppointmentDetails,
        openReportModal,
        openMessageModal,
        openUploadModal,
        openEventDetails,
        openLogoutConfirm,
        addPatient,
        updatePatient,
        deletePatient,
        addAppointment,
        updateAppointment,
        cancelAppointment,
        confirmAppointment,
        markNotificationRead,
        markAllNotificationsRead,
        addToast,
        getPatientById,
        getAppointmentById,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be used within DashboardProvider");
  return ctx;
}
