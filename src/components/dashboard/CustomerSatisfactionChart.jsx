import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts'
import Card from '../Card'

const data = [
  { day: 'Mon', lastMonth: 380, thisMonth: 580 },
  { day: 'Tue', lastMonth: 410, thisMonth: 610 },
  { day: 'Wed', lastMonth: 395, thisMonth: 640 },
  { day: 'Thu', lastMonth: 430, thisMonth: 660 },
  { day: 'Fri', lastMonth: 405, thisMonth: 690 },
  { day: 'Sat', lastMonth: 460, thisMonth: 700 },
  { day: 'Sun', lastMonth: 524, thisMonth: 624 },
]

const compactUSD = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(n)

function SatisfactionTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-lg">
      <p className="mb-1 text-xs font-semibold text-ink-900">{label}</p>
      <p className="text-xs text-ink-500">
        This month: <span className="font-semibold text-ink-900">{compactUSD(payload.find((p) => p.dataKey === 'thisMonth')?.value)}</span>
      </p>
      <p className="text-xs text-ink-500">
        Last month: <span className="font-semibold text-ink-900">{compactUSD(payload.find((p) => p.dataKey === 'lastMonth')?.value)}</span>
      </p>
    </div>
  )
}

export default function CustomerSatisfactionChart() {
  return (
    <Card title="Customer Satisfaction" subtitle="Sales performance, last month vs. this month">
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 6, right: 6, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="thisMonth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2a78d6" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#2a78d6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#898781' }} />
            <Tooltip content={<SatisfactionTooltip />} cursor={{ stroke: '#c3c2b7', strokeWidth: 1 }} />
            {/* This Month is the taller series — draw its fill first so Last Month's line
                (drawn second, fill-less) always stays visible on top instead of being tinted. */}
            <Area
              type="monotone"
              dataKey="thisMonth"
              stroke="#2a78d6"
              strokeWidth={2}
              fill="url(#thisMonth)"
            />
            <Area
              type="monotone"
              dataKey="lastMonth"
              stroke="#1baf7a"
              strokeWidth={2}
              fill="none"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex items-center gap-8 border-t border-slate-100 pt-3">
        <div>
          <p className="flex items-center gap-1.5 text-xs font-medium text-ink-500">
            <span className="h-2.5 w-2.5 rounded-full bg-[#1baf7a]" /> Last Month
          </p>
          <p className="mt-1 text-sm font-bold text-ink-900">{compactUSD(3004)}</p>
        </div>
        <div>
          <p className="flex items-center gap-1.5 text-xs font-medium text-ink-500">
            <span className="h-2.5 w-2.5 rounded-full bg-[#2a78d6]" /> This Month
          </p>
          <p className="mt-1 text-sm font-bold text-ink-900">{compactUSD(4504)}</p>
        </div>
      </div>
    </Card>
  )
}
