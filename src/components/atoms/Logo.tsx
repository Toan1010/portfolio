import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-violet-500 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
        <div className="w-full h-full bg-[#0b0f19] rounded-[10px] flex items-center justify-center text-white font-extrabold text-lg">
          P
        </div>
      </div>
      <div className="flex flex-col text-left">
        <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
          Toan<span className="text-indigo-500">.dev</span>
        </span>
      </div>
    </Link>
  )
}
