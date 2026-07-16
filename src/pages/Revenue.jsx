import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import StatCard from '../components/StatCard'
import Card from '../components/Card'
import { WalletIcon, ChartIcon, BagIcon } from '../components/Icons'
import { statTint } from '../lib/statTints'

const stats = [
  {
    label: 'Monthly Recurring Revenue',
    value: '$18,420',
    delta: '9.6%',
    trendUp: true,
    icon: WalletIcon,
    accent: statTint(0),
    trend: [10, 11, 12, 13, 13, 14, 15, 16, 16, 17, 18, 18.4],
  },
  {
    label: 'Avg. Revenue per User',
    value: '$52.30',
    delta: '2.8%',
    trendUp: true,
    icon: ChartIcon,
    accent: statTint(1),
    trend: [42, 44, 43, 46, 47, 48, 47, 49, 50, 51, 52, 52.3],
  },
  {
    label: 'Refunds',
    value: '$1,204',
    delta: '0.4%',
    trendUp: false,
    icon: BagIcon,
    accent: statTint(2),
    trend: [900, 950, 1000, 980, 1010, 1050, 1080, 1100, 1150, 1180, 1190, 1204],
  },
]

const monthly = [
  { month: 'Jan', revenue: 18000 },
  { month: 'Feb', revenue: 24000 },
  { month: 'Mar', revenue: 21000 },
  { month: 'Apr', revenue: 32000 },
  { month: 'May', revenue: 28000 },
  { month: 'Jun', revenue: 41000 },
  { month: 'Jul', revenue: 38000 },
  { month: 'Aug', revenue: 49000 },
  { month: 'Sep', revenue: 44000 },
  { month: 'Oct', revenue: 57000 },
  { month: 'Nov', revenue: 52000 },
  { month: 'Dec', revenue: 64000 },
]

const breakdown = [
  { name: 'Subscriptions', share: 58, color: '#2a78d6' },
  { name: 'One-time purchases', share: 24, color: '#1baf7a' },
  { name: 'Add-ons', share: 12, color: '#eda100' },
  { name: 'Affiliate', share: 6, color: '#e87ba4' },
]

const compactUSD = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(n)

function RevenueTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-lg">
      <p className="text-xs font-semibold text-ink-900">{label}</p>
      <p className="mt-0.5 text-xs text-ink-500">
        Revenue: <span className="font-semibold text-ink-900">{compactUSD(payload[0].value)}</span>
      </p>
    </div>
  )
}

export default function Revenue() {
  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card title="Revenue trend" subtitle="Last 12 months" className="lg:col-span-2">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthly} margin={{ top: 6, right: 6, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="revTrend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2a78d6" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="#2a78d6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e1e0d9" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#898781' }} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  width={48}
                  tickFormatter={(v) => compactUSD(v)}
                  tick={{ fontSize: 12, fill: '#898781' }}
                />
                <Tooltip content={<RevenueTooltip />} cursor={{ stroke: '#c3c2b7', strokeWidth: 1 }} />
                <Area type="monotone" dataKey="revenue" stroke="#2a78d6" strokeWidth={2} fill="url(#revTrend)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Revenue by source" subtitle="Share of total income">
          <ul className="space-y-4">
            {breakdown.map((b) => (
              <li key={b.name}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-ink-700">{b.name}</span>
                  <span className="font-semibold text-ink-900">{b.share}%</span>
                </div>
                <div className="h-2 w-full rounded-full" style={{ backgroundColor: `${b.color}22` }}>
                  <div
                    className="h-2 rounded-full"
                    style={{ width: `${b.share}%`, backgroundColor: b.color }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  )
}
