import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Direct', value: 42, color: '#2a78d6' },
  { name: 'Referral', value: 27, color: '#008300' },
  { name: 'Social', value: 19, color: '#e87ba4' },
  { name: 'Organic', value: 12, color: '#eda100' },
]

function TrafficTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-lg">
      <p className="flex items-center gap-1.5 text-xs font-semibold text-ink-900">
        <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: d.color }} />
        {d.name}
      </p>
      <p className="mt-0.5 text-xs text-ink-500">
        Share: <span className="font-semibold text-ink-900">{d.value}%</span>
      </p>
    </div>
  )
}

export default function TrafficChart() {
  const total = data.reduce((s, d) => s + d.value, 0)

  return (
    <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-card sm:p-6">
      <h2 className="text-base font-bold text-ink-900">Traffic sources</h2>
      <p className="text-sm text-ink-500">Where your customers come from</p>

      <div className="relative mx-auto mt-4 h-44 w-44">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={58}
              outerRadius={82}
              paddingAngle={3}
              stroke="none"
            >
              {data.map((d) => (
                <Cell key={d.name} fill={d.color} />
              ))}
            </Pie>
            <Tooltip content={<TrafficTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-extrabold text-ink-900">{total}%</span>
          <span className="text-xs text-ink-400">total reach</span>
        </div>
      </div>

      <ul className="mt-5 space-y-2.5">
        {data.map((d) => (
          <li key={d.name} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-ink-500">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
              {d.name}
            </span>
            <span className="font-semibold text-ink-900">{d.value}%</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
