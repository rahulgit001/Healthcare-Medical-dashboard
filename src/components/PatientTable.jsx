import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, ArrowUpDown, Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useDashboard } from "../context/DashboardContext";

const statusStyles = {
  Stable: "bg-success/10 text-success",
  Recovering: "bg-warning/10 text-warning",
  Critical: "bg-danger/10 text-danger",
};

const PAGE_SIZE = 5;

export default function PatientTable() {
  const { patients, openPatientDetails, openEditPatient, openDeletePatient } = useDashboard();
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    let list = patients.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.disease.toLowerCase().includes(q) ||
        p.doctor.toLowerCase().includes(q) ||
        String(p.id).includes(q)
    );
    list = [...list].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === "number") return sortAsc ? av - bv : bv - av;
      return sortAsc ? String(av).localeCompare(bv) : String(bv).localeCompare(av);
    });
    return list;
  }, [query, sortKey, sortAsc]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleSort = (key) => {
    if (sortKey === key) setSortAsc((a) => !a);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const columns = [
    { key: "name", label: "Patient" },
    { key: "age", label: "Age" },
    { key: "gender", label: "Gender" },
    { key: "disease", label: "Disease" },
    { key: "doctor", label: "Doctor" },
    { key: "status", label: "Status" },
    { key: "lastVisit", label: "Last Visit" },
  ];

  return (
    <div className="relative min-w-0 min-h-0 box-border rounded-lg border border-[#E3E8EE] bg-white p-5 shadow-soft dark:border-dark-border dark:bg-dark-card">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">
        <div>
          <h3 className="font-bold text-ink dark:text-white text-base">Patient List</h3>
          <p className="text-xs text-muted mt-1">Manage patient records and quick actions.</p>
        </div>
        <div className="relative w-full lg:w-[360px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search patients..."
            className="h-10 w-full rounded-md border border-[#E3E8EE] bg-[#F5F7FA] pl-10 pr-3 text-sm outline-none
            focus:ring-2 focus:ring-primary/30 text-ink dark:border-dark-border dark:bg-slate-900 dark:text-white placeholder:text-muted"
          />
        </div>
      </div>

      <div className="overflow-x-auto min-w-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted border-b border-gray-100 dark:border-dark-border">
              {columns.map((c) => (
                <th key={c.key} className="h-12 border-b border-[#E3E8EE] pr-4 text-left font-semibold whitespace-nowrap dark:border-dark-border">
                  <button
                    onClick={() => toggleSort(c.key)}
                    className="flex items-center gap-1 hover:text-ink dark:hover:text-white transition-colors"
                  >
                    {c.label}
                    <ArrowUpDown size={12} />
                  </button>
                </th>
              ))}
              <th className="pb-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((p, i) => (
              <motion.tr
                key={p.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                className="border-b border-[#E3E8EE] hover:bg-[#F5F7FA] dark:border-dark-border dark:hover:bg-slate-900"
              >
                <td className="h-16 pr-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#DDF4F2] text-[12px] font-bold text-[#159A9C]">
                      {p.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <span className="font-semibold text-ink dark:text-white whitespace-nowrap">{p.name}</span>
                  </div>
                </td>
                <td className="h-16 pr-4 text-muted">{p.age}</td>
                <td className="h-16 pr-4 text-muted">{p.gender}</td>
                <td className="h-16 pr-4 text-muted whitespace-nowrap">{p.disease}</td>
                <td className="h-16 pr-4 text-muted whitespace-nowrap">{p.doctor}</td>
                <td className="h-16 pr-4">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusStyles[p.status]}`}>
                    {p.status}
                  </span>
                </td>
                <td className="h-16 pr-4 text-muted whitespace-nowrap">{p.lastVisit}</td>
                <td className="h-16">
                  <div className="flex items-center gap-1.5">
                    <button type="button" onClick={() => openPatientDetails(p.id)} aria-label="View patient" className="flex h-9 w-9 items-center justify-center rounded-md text-muted hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 transition-colors">
                      <Eye size={16} />
                    </button>
                    <button type="button" onClick={() => openEditPatient(p.id)} aria-label="Edit patient" className="flex h-9 w-9 items-center justify-center rounded-md text-muted hover:text-[#E9A23B] hover:bg-[#E9A23B]/10 transition-colors">
                      <Pencil size={16} />
                    </button>
                    <button type="button" onClick={() => openDeletePatient(p.id)} aria-label="Delete patient" className="flex h-9 w-9 items-center justify-center rounded-md text-muted hover:text-[#D95C5C] hover:bg-[#D95C5C]/10 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
            {pageItems.length === 0 && (
              <tr>
                <td colSpan={8} className="py-8 text-center text-muted">
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-5">
        <p className="text-xs text-muted">
          Showing {pageItems.length ? (page - 1) * PAGE_SIZE + 1 : 0}–
          {(page - 1) * PAGE_SIZE + pageItems.length} of {filtered.length}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-1.5 rounded-lg bg-gray-50 dark:bg-white/5 text-muted disabled:opacity-40"
          >
            <ChevronLeft size={14} />
          </button>
          <span className="text-xs text-muted px-2">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-1.5 rounded-lg bg-gray-50 dark:bg-white/5 text-muted disabled:opacity-40"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
