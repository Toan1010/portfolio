import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <div className="w-10 h-10 rounded-xl bg-theme-accent p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-300">
        <div className="w-full h-full bg-theme-main rounded-[10px] flex items-center justify-center text-theme-main font-extrabold text-lg">
          P
        </div>
      </div>
      <div className="flex flex-col text-left">
        <span className="font-extrabold text-lg tracking-tight text-theme-main group-hover:opacity-80 transition-opacity">
          Toan<span className="opacity-70">.dev</span>
        </span>
      </div>
    </Link>
  )
}
