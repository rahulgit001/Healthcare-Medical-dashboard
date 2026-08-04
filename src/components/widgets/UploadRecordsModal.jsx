import { useState } from "react";
import Modal from "./Modal";
import { useDashboard } from "../../context/DashboardContext";

export default function UploadRecordsModal() {
  const { modal, closeModal, addToast } = useDashboard();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  if (modal.type !== "uploadRecords") return null;

  const handleUpload = () => {
    if (!file) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      addToast("Record uploaded successfully");
      closeModal();
    }, 1200);
  };

  return (
    <Modal
      open={modal.type === "uploadRecords"}
      onClose={closeModal}
      title="Upload Records"
      footer={
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button onClick={closeModal} className="px-4 py-2 rounded-2xl bg-slate-100 text-sm text-ink hover:bg-slate-200 transition-colors">
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className={`px-4 py-2 rounded-2xl text-sm font-semibold transition-colors ${file ? "bg-brand-gradient text-white hover:bg-indigo-600" : "bg-slate-200 text-slate-500 cursor-not-allowed"}`}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="rounded-[24px] border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-6 text-center">
          <label className="cursor-pointer text-sm text-muted">
            Drag & drop files here or <span className="text-primary underline">browse</span>
            <input
              type="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>
        </div>
        {file && (
          <div className="rounded-2xl bg-slate-50 dark:bg-slate-950 p-4 text-sm text-ink dark:text-white">
            <p className="font-semibold">{file.name}</p>
            <p className="text-xs text-muted mt-1">{(file.size / 1024).toFixed(1)} KB</p>
          </div>
        )}
      </div>
    </Modal>
  );
}
