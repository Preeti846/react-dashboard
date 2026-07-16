export default function MiniStatTile({ label, value, delta, trendUp, icon: Icon, accent }) {
  return (
    <div className="rounded-xl p-3.5" style={{ backgroundColor: accent.bg }}>
      <div
        className="grid h-9 w-9 place-items-center rounded-lg bg-white/55"
        style={{ color: accent.fg }}
      >
        <Icon className="h-4.5 w-4.5" />
      </div>
      <p className="mt-3 text-lg font-extrabold tracking-tight text-ink-900">{value}</p>
      <p className="truncate text-xs font-medium text-ink-600">{label}</p>
      <p className={`mt-1 text-[11px] font-semibold ${trendUp ? 'text-emerald-700' : 'text-rose-600'}`}>
        {trendUp ? '+' : '-'}
        {delta} from yesterday
      </p>
    </div>
  )
}
