import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./PageTransition";
import ProtectedRoute from "./ProtectedRoute";

import Login from "../../pages/Login";
import Dashboard from "../../pages/Dashboard";
import Patients from "../../pages/Patients";
import Appointments from "../../pages/Appointments";
import Doctors from "../../pages/Doctors";
import Analytics from "../../pages/Analytics";
import Settings from "../../pages/Settings";
import History from "../../pages/History";
import Reports from "../../pages/Reports";
import Messages from "../../pages/Messages";
import Support from "../../pages/Support";

export default function AnimatedRoutes() {
  const location = useLocation();

  // Don't show sidebar/navbar for login page
  const isLoginPage = location.pathname === "/login";

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <PageTransition>
                <Dashboard />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/patients"
          element={
            <ProtectedRoute>
              <PageTransition>
                <Patients />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <PageTransition>
                <Appointments />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <PageTransition>
                <Appointments />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <PageTransition>
                <History />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctors"
          element={
            <ProtectedRoute>
              <PageTransition>
                <Doctors />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <PageTransition>
                <Messages />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <PageTransition>
                <Analytics />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/pharmacy"
          element={
            <ProtectedRoute>
              <PageTransition>
                <Analytics />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <PageTransition>
                <Reports />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/support"
          element={
            <ProtectedRoute>
              <PageTransition>
                <Support />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <PageTransition>
                <Settings />
              </PageTransition>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
