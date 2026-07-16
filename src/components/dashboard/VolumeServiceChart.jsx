import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Card from '../Card'

const data = [
  { week: 'W1', volume: 72, service: 94 },
  { week: 'W2', volume: 78, service: 91 },
  { week: 'W3', volume: 65, service: 96 },
  { week: 'W4', volume: 82, service: 93 },
  { week: 'W5', volume: 88, service: 97 },
  { week: 'W6', volume: 76, service: 95 },
]

function VolumeTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-lg">
      <p className="mb-1 text-xs font-semibold text-ink-900">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-xs text-ink-500">
          <span className="mr-1.5 inline-block h-2 w-2 rounded-full align-middle" style={{ backgroundColor: p.fill }} />
          {p.dataKey === 'volume' ? 'Volume' : 'Service level'}:{' '}
          <span className="font-semibold text-ink-900">{p.value}%</span>
        </p>
      ))}
    </div>
  )
}

export default function VolumeServiceChart() {
  return (
    <Card
      title="Volume vs Service Level"
      subtitle="Capacity used vs. SLA met, weekly"
      action={
        <div className="flex items-center gap-4 text-xs font-medium">
          <span className="flex items-center gap-1.5 text-ink-500">
            <span className="h-2.5 w-2.5 rounded-full bg-[#2a78d6]" /> Volume
          </span>
          <span className="flex items-center gap-1.5 text-ink-500">
            <span className="h-2.5 w-2.5 rounded-full bg-[#1baf7a]" /> Services
          </span>
        </div>
      }
    >
      <div className="h-40 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 6, right: 6, left: 0, bottom: 0 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e1e0d9" vertical={false} />
            <XAxis dataKey="week" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#898781' }} />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={32}
              tickFormatter={(v) => `${v}%`}
              tick={{ fontSize: 11, fill: '#898781' }}
            />
            <Tooltip content={<VolumeTooltip />} cursor={{ fill: '#f0efec' }} />
            <Bar dataKey="volume" fill="#2a78d6" radius={[4, 4, 0, 0]} maxBarSize={14} />
            <Bar dataKey="service" fill="#1baf7a" radius={[4, 4, 0, 0]} maxBarSize={14} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex items-center gap-8 border-t border-slate-100 pt-3">
        <div>
          <p className="flex items-center gap-1.5 text-xs font-medium text-ink-500">
            <span className="h-2.5 w-2.5 rounded-full bg-[#2a78d6]" /> Volume
          </p>
          <p className="mt-1 text-sm font-bold text-ink-900">1,135 units</p>
        </div>
        <div>
          <p className="flex items-center gap-1.5 text-xs font-medium text-ink-500">
            <span className="h-2.5 w-2.5 rounded-full bg-[#1baf7a]" /> Services
          </p>
          <p className="mt-1 text-sm font-bold text-ink-900">98% SLA</p>
        </div>
      </div>
    </Card>
  )
}
