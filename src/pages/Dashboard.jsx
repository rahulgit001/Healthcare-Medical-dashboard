import { motion } from "framer-motion";
import { HeartPulse } from "lucide-react";
import Hero from "../components/layout/Hero";
import StatCard from "../components/StatCard";
import HealthChart from "../components/charts/HealthChart";
import DemographicsChart from "../components/charts/PieChart";
import AppointmentList from "../components/AppointmentList";
import PatientTable from "../components/PatientTable";
import HealthCard from "../components/HealthCard";
import QuickActions from "../components/widgets/QuickActions";
import Timeline from "../components/widgets/Timeline";
import CalendarWidget from "../components/widgets/Calendar";
import RecentPatients from "../components/RecentPatients";
import Skeleton from "../components/Skeleton";
import useLoading from "../hooks/useLoading";
import { statCards, healthStatus } from "../data/dummyData";
import { useDashboard } from "../context/DashboardContext";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  const loading = useLoading(500);
  const { patients, appointments, recentPatients, activeTab, setActiveTab } = useDashboard();

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-56 w-full" />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-36 w-full" />
          ))}
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Skeleton className="h-80 xl:col-span-2 w-full" />
          <Skeleton className="h-80 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Hero />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {statCards.map((s, i) => (
          <StatCard key={s.id} stat={s} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
        <motion.div className="self-start" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
          <HealthChart />
        </motion.div>
        <motion.div className="self-start" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
          <DemographicsChart />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
          <AppointmentList appointments={appointments} />
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
          <CalendarWidget />
        </motion.div>
      </div>

      <PatientTable />

      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FEE2E2] text-[#EF4444] shadow-[0_12px_40px_rgba(15,23,42,0.05)]">
            <HeartPulse size={18} />
          </div>
          <h3 className="font-bold text-ink dark:text-white">Health Status Overview</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
          {healthStatus.map((h, i) => (
            <HealthCard key={h.id} item={h} index={i} />
          ))}
        </div>
      </div>

      <QuickActions />

      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
        <div>
          <Timeline />
        </div>

        <RecentPatients patients={recentPatients} />
      </div>
    </div>
  );
}
