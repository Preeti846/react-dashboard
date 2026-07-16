import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Card from '../Card'

const data = [
  { month: 'Jan', loyal: 220, new: 140, unique: 340 },
  { month: 'Feb', loyal: 260, new: 180, unique: 380 },
  { month: 'Mar', loyal: 240, new: 210, unique: 360 },
  { month: 'Apr', loyal: 300, new: 190, unique: 420 },
  { month: 'May', loyal: 280, new: 230, unique: 400 },
  { month: 'Jun', loyal: 340, new: 260, unique: 470 },
  { month: 'Jul', loyal: 320, new: 240, unique: 450 },
  { month: 'Aug', loyal: 380, new: 290, unique: 510 },
  { month: 'Sep', loyal: 360, new: 270, unique: 490 },
  { month: 'Oct', loyal: 410, new: 310, unique: 540 },
  { month: 'Nov', loyal: 390, new: 300, unique: 520 },
  { month: 'Dec', loyal: 440, new: 330, unique: 580 },
]

const SERIES = [
  { key: 'loyal', label: 'Loyal Customers', color: '#2a78d6' },
  { key: 'new', label: 'New Customers', color: '#008300' },
  { key: 'unique', label: 'Unique Customers', color: '#e87ba4' },
]

function InsightsTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-lg">
      <p className="mb-1 text-xs font-semibold text-ink-900">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-xs text-ink-500">
          <span className="mr-1.5 inline-block h-2 w-2 rounded-full align-middle" style={{ backgroundColor: p.color }} />
          {SERIES.find((s) => s.key === p.dataKey)?.label}:{' '}
          <span className="font-semibold text-ink-900">{p.value}</span>
        </p>
      ))}
    </div>
  )
}

export default function VisitorInsights() {
  return (
    <Card
      title="Visitor Insights"
      subtitle="Customer visits by type, last 12 months"
      action={
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
          {SERIES.map((s) => (
            <span key={s.key} className="flex items-center gap-1.5 text-ink-500">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
              {s.label}
            </span>
          ))}
        </div>
      }
    >
      <div className="h-32 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 6, right: 6, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e1e0d9" vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#898781' }} />
            <YAxis tickLine={false} axisLine={false} width={40} tick={{ fontSize: 11, fill: '#898781' }} />
            <Tooltip content={<InsightsTooltip />} cursor={{ stroke: '#c3c2b7', strokeWidth: 1 }} />
            {SERIES.map((s) => (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                stroke={s.color}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
