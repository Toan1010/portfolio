export default function Footer() {
  return (
    <footer className="py-12 border-t border-theme bg-theme-card-subtle text-theme-main">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-theme-accent flex items-center justify-center font-extrabold text-sm">
            P
          </div>
          <span className="font-extrabold tracking-tight">Portfolio SSR</span>
        </div>
        <p className="text-sm opacity-80 font-medium">
          &copy; {new Date().getFullYear()} Nguyễn Đức Toàn. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
