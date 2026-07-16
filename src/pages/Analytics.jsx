import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import StatCard from '../components/StatCard'
import TrafficChart from '../components/TrafficChart'
import Card from '../components/Card'
import { ChartIcon, UsersIcon, WalletIcon } from '../components/Icons'
import { statTint } from '../lib/statTints'

const stats = [
  {
    label: 'Sessions',
    value: '28,942',
    delta: '6.7%',
    trendUp: true,
    icon: UsersIcon,
    accent: statTint(0),
    trend: [20, 22, 21, 25, 24, 27, 26, 29, 28, 31, 30, 33],
  },
  {
    label: 'Avg. Session Duration',
    value: '4m 12s',
    delta: '2.3%',
    trendUp: true,
    icon: ChartIcon,
    accent: statTint(1),
    trend: [3.2, 3.4, 3.3, 3.6, 3.5, 3.8, 3.7, 4.0, 3.9, 4.1, 4.0, 4.2],
  },
  {
    label: 'Bounce Rate',
    value: '38.2%',
    delta: '1.1%',
    trendUp: false,
    icon: WalletIcon,
    accent: statTint(2),
    trend: [44, 43, 42, 41, 41, 40, 40, 39, 39, 38, 38, 38.2],
  },
]

const sessionsData = [
  { day: 'Mon', sessions: 3200 },
  { day: 'Tue', sessions: 3900 },
  { day: 'Wed', sessions: 4100 },
  { day: 'Thu', sessions: 3700 },
  { day: 'Fri', sessions: 4500 },
  { day: 'Sat', sessions: 5200 },
  { day: 'Sun', sessions: 4800 },
]

const topPages = [
  { path: '/pricing', views: '12,402', avgTime: '2m 41s' },
  { path: '/dashboard', views: '9,884', avgTime: '5m 03s' },
  { path: '/blog/sales-tips', views: '7,213', avgTime: '3m 12s' },
  { path: '/integrations', views: '4,905', avgTime: '1m 58s' },
]

function SessionsTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-lg">
      <p className="text-xs font-semibold text-ink-900">{label}</p>
      <p className="mt-0.5 text-xs text-ink-500">
        Sessions: <span className="font-semibold text-ink-900">{payload[0].value.toLocaleString()}</span>
      </p>
    </div>
  )
}

export default function Analytics() {
  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card title="Sessions this week" subtitle="Visits across the last 7 days" className="lg:col-span-2">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sessionsData} margin={{ top: 6, right: 6, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e1e0d9" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#898781' }} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  width={44}
                  tickFormatter={(v) => `${v / 1000}k`}
                  tick={{ fontSize: 12, fill: '#898781' }}
                />
                <Tooltip content={<SessionsTooltip />} cursor={{ stroke: '#c3c2b7', strokeWidth: 1 }} />
                <Line
                  type="monotone"
                  dataKey="sessions"
                  stroke="#2a78d6"
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#2a78d6', strokeWidth: 2, stroke: '#fff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <TrafficChart />
      </div>

      <Card title="Top pages" subtitle="Most visited pages this month">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200/70 text-xs font-semibold uppercase tracking-wider text-ink-400">
                <th className="py-3 pr-4">Page</th>
                <th className="py-3 pr-4">Views</th>
                <th className="py-3">Avg. time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {topPages.map((p) => (
                <tr key={p.path}>
                  <td className="py-3 pr-4 text-sm font-medium text-ink-900">{p.path}</td>
                  <td className="py-3 pr-4 text-sm text-ink-500">{p.views}</td>
                  <td className="py-3 text-sm text-ink-500">{p.avgTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  )
}
