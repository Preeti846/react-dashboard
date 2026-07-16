import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Card from '../Card'

const data = [
  { day: 'Mon', online: 2400, offline: 1800 },
  { day: 'Tue', online: 2800, offline: 1600 },
  { day: 'Wed', online: 2200, offline: 2000 },
  { day: 'Thu', online: 3200, offline: 1900 },
  { day: 'Fri', online: 3600, offline: 2400 },
  { day: 'Sat', online: 4200, offline: 2800 },
  { day: 'Sun', online: 3800, offline: 2600 },
]

const compactUSD = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(n)

function RevenueTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-lg">
      <p className="mb-1 text-xs font-semibold text-ink-900">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-xs text-ink-500">
          <span className="mr-1.5 inline-block h-2 w-2 rounded-full align-middle" style={{ backgroundColor: p.fill }} />
          {p.dataKey === 'online' ? 'Online sales' : 'Offline sales'}:{' '}
          <span className="font-semibold text-ink-900">{compactUSD(p.value)}</span>
        </p>
      ))}
    </div>
  )
}

export default function TotalRevenueChart() {
  return (
    <Card
      title="Total Revenue"
      subtitle="Online vs. offline sales, this week"
      action={
        <div className="flex items-center gap-4 text-xs font-medium">
          <span className="flex items-center gap-1.5 text-ink-500">
            <span className="h-2.5 w-2.5 rounded-full bg-[#2a78d6]" /> Online sales
          </span>
          <span className="flex items-center gap-1.5 text-ink-500">
            <span className="h-2.5 w-2.5 rounded-full bg-[#008300]" /> Offline sales
          </span>
        </div>
      }
    >
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 6, right: 6, left: 0, bottom: 0 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e1e0d9" vertical={false} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#898781' }} />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={44}
              tickFormatter={(v) => compactUSD(v)}
              tick={{ fontSize: 11, fill: '#898781' }}
            />
            <Tooltip content={<RevenueTooltip />} cursor={{ fill: '#f0efec' }} />
            <Bar dataKey="online" fill="#2a78d6" radius={[4, 4, 0, 0]} maxBarSize={16} />
            <Bar dataKey="offline" fill="#008300" radius={[4, 4, 0, 0]} maxBarSize={16} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
