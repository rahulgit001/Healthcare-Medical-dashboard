import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./PageTransition";

import Dashboard from "../../pages/Dashboard";
import Patients from "../../pages/Patients";
import Appointments from "../../pages/Appointments";
import Doctors from "../../pages/Doctors";
import Analytics from "../../pages/Analytics";
import Settings from "../../pages/Settings";

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Dashboard /></PageTransition>} />
        <Route path="/patients" element={<PageTransition><Patients /></PageTransition>} />
        <Route path="/appointments" element={<PageTransition><Appointments /></PageTransition>} />
        <Route path="/calendar" element={<PageTransition><Appointments /></PageTransition>} />
        <Route path="/doctors" element={<PageTransition><Doctors /></PageTransition>} />
        <Route path="/messages" element={<PageTransition><Analytics /></PageTransition>} />
        <Route path="/analytics" element={<PageTransition><Analytics /></PageTransition>} />
        <Route path="/pharmacy" element={<PageTransition><Analytics /></PageTransition>} />
        <Route path="/reports" element={<PageTransition><Analytics /></PageTransition>} />
        <Route path="/settings" element={<PageTransition><Settings /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}
