export default function Footer() {
  return (
    <footer className="border-t border-[#E3E8EE] bg-card py-4 dark:border-dark-border dark:bg-dark-card">
      <div className="w-full max-w-[1320px] mx-auto px-4 flex flex-col gap-4 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
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
