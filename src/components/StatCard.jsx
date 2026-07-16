import { AreaChart, Area, ResponsiveContainer } from 'recharts'
import { ArrowUpIcon, ArrowDownIcon } from './Icons'

export default function StatCard({ label, value, delta, trendUp, icon: Icon, accent, trend }) {
  return (
    <div className="rounded-2xl p-5 shadow-card" style={{ backgroundColor: accent.bg }}>
      <div className="flex items-start justify-between">
        <div
          className="grid h-11 w-11 place-items-center rounded-xl bg-white/55"
          style={{ color: accent.fg }}
        >
          <Icon className="h-5 w-5" />
        </div>
        <span
          className={`inline-flex items-center gap-1 rounded-full bg-white/70 px-2 py-1 text-xs font-semibold ${
            trendUp ? 'text-emerald-600' : 'text-rose-500'
          }`}
        >
          {trendUp ? (
            <ArrowUpIcon className="h-3.5 w-3.5" />
          ) : (
            <ArrowDownIcon className="h-3.5 w-3.5" />
          )}
          {delta}
        </span>
      </div>

      <div className="mt-4 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-ink-700">{label}</p>
          <p className="mt-1 text-2xl font-extrabold tracking-tight text-ink-900">{value}</p>
        </div>

        {trend?.length > 1 && (
          <div className="h-10 w-20 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend.map((v) => ({ v }))} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id={`spark-${label}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={accent.fg} stopOpacity={0.45} />
                    <stop offset="100%" stopColor={accent.fg} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke={accent.fg}
                  strokeWidth={1.5}
                  fill={`url(#spark-${label})`}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  )
}
