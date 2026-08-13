interface StatItemProps {
  value: string
  label: string
}

export default function StatItem({ value, label }: StatItemProps) {
  return (
    <div className="flex flex-col text-left">
      <span className="text-2xl sm:text-3xl font-black text-theme-main">
        {value}
      </span>
      <span className="text-xs font-bold opacity-80 text-theme-main mt-1">
        {label}
      </span>
    </div>
  )
}
