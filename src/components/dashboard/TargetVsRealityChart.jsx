import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Card from '../Card'
import { ArrowUpIcon, ChartIcon } from '../Icons'

const data = [
  { month: 'Jan', reality: 32, target: 40 },
  { month: 'Feb', reality: 38, target: 42 },
  { month: 'Mar', reality: 41, target: 44 },
  { month: 'Apr', reality: 45, target: 46 },
  { month: 'May', reality: 50, target: 48 },
  { month: 'Jun', reality: 54, target: 50 },
]

const compactUSD = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(n * 100)

function TargetTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-lg">
      <p className="mb-1 text-xs font-semibold text-ink-900">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-xs text-ink-500">
          <span className="mr-1.5 inline-block h-2 w-2 rounded-full align-middle" style={{ backgroundColor: p.fill }} />
          {p.dataKey === 'reality' ? 'Reality sales' : 'Target sales'}:{' '}
          <span className="font-semibold text-ink-900">{compactUSD(p.value)}</span>
        </p>
      ))}
    </div>
  )
}

const realityTotal = data.reduce((s, d) => s + d.reality, 0)
const targetTotal = data.reduce((s, d) => s + d.target, 0)

export default function TargetVsRealityChart() {
  return (
    <Card title="Target vs Reality" subtitle="Reality sales vs. target sales, H1">
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 6, right: 6, left: 0, bottom: 0 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e1e0d9" vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#898781' }} />
            <YAxis tickLine={false} axisLine={false} width={32} tick={{ fontSize: 11, fill: '#898781' }} />
            <Tooltip content={<TargetTooltip />} cursor={{ fill: '#f0efec' }} />
            <Bar dataKey="reality" fill="#1baf7a" radius={[4, 4, 0, 0]} maxBarSize={14} />
            <Bar dataKey="target" fill="#eda100" radius={[4, 4, 0, 0]} maxBarSize={14} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 space-y-3 border-t border-slate-100 pt-3">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#1baf7a]/15 text-[#0e9f6e]">
            <ArrowUpIcon className="h-4.5 w-4.5" />
          </div>
          <p className="min-w-0 flex-1 truncate text-sm text-ink-500">Reality Sales</p>
          <p className="shrink-0 text-sm font-bold text-ink-900">{compactUSD(realityTotal)}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#eda100]/15 text-[#c98500]">
            <ChartIcon className="h-4.5 w-4.5" />
          </div>
          <p className="min-w-0 flex-1 truncate text-sm text-ink-500">Target Sales</p>
          <p className="shrink-0 text-sm font-bold text-ink-900">{compactUSD(targetTotal)}</p>
        </div>
      </div>
    </Card>
  )
}
