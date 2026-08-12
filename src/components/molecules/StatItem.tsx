interface StatItemProps {
  value: string
  label: string
}

export default function StatItem({ value, label }: StatItemProps) {
  return (
    <div className="flex flex-col text-left">
      <span className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
        {value}
      </span>
      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
        {label}
      </span>
    </div>
  )
}
