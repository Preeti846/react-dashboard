import MiniStatTile from './MiniStatTile'
import { DownloadIcon } from '../Icons'

function exportStatsAsCsv(stats) {
  const header = 'Metric,Value,Change\n'
  const rows = stats
    .map((s) => `"${s.label}","${s.value}","${s.trendUp ? '+' : '-'}${s.delta}"`)
    .join('\n')
  const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'todays-sales.csv'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export default function TodaysSalesCard({ stats }) {
  return (
    <section className="flex flex-col rounded-2xl border border-slate-200/70 bg-white p-5 shadow-card sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3 pb-3">
        <div>
          <h2 className="text-base font-bold text-ink-900">Today's Sales</h2>
          <p className="text-sm text-ink-500">Sales Summary</p>
        </div>
        <button
          onClick={() => exportStatsAsCsv(stats)}
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-ink-700 transition hover:bg-slate-50"
        >
          <DownloadIcon className="h-3.5 w-3.5" />
          Export
        </button>
      </div>

      <div className="flex items-end">
        <div className="grid w-full grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((s) => (
            <MiniStatTile key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}
