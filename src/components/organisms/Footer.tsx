export default function Footer() {
  return (
    <footer className="py-12 border-t border-slate-200 dark:border-slate-900/60 bg-slate-100 dark:bg-[#070a10]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-bold text-sm">
            P
          </div>
          <span className="font-extrabold tracking-tight text-slate-800 dark:text-slate-200">Portfolio SSR</span>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-500 font-medium">
          &copy; {new Date().getFullYear()} Nguyễn Đức Toàn. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
