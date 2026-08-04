export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-dark-border bg-card dark:bg-dark-card py-6">
      <div className="w-full max-w-[1440px] mx-auto px-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-sm text-muted">
        <p>© 2026 Healthcare Dashboard. Empowering care teams with patient insights.</p>
        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
          <a href="#" className="hover:text-ink dark:hover:text-white transition-colors">Support</a>
          <a href="#" className="hover:text-ink dark:hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-ink dark:hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}
