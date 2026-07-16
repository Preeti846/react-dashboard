import Card from '../Card'

const products = [
  { name: 'Home Decor Range', popularity: 45, color: '#2a78d6' },
  { name: 'Disney Princess Pink Bag', popularity: 29, color: '#008300' },
  { name: 'Bathroom Essentials', popularity: 18, color: '#e87ba4' },
  { name: 'Apple Smartwatches', popularity: 25, color: '#eda100' },
]

export default function TopProductsList() {
  return (
    <Card title="Top Products" subtitle="Popularity by product">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-2.5 text-[11px] font-semibold uppercase text-ink-400">
        <span className="w-4 shrink-0" />
        <span className="min-w-0 flex-1">Name</span>
        <span className="w-14 shrink-0 truncate sm:w-20">Popularity</span>
        <span className="w-12 shrink-0 text-right">Sales</span>
      </div>

      <ul className="divide-y divide-slate-100">
        {products.map((p, i) => (
          <li key={p.name} className="flex items-center gap-3 py-3.5 first:pt-3">
            <span className="w-4 shrink-0 text-xs font-semibold text-ink-400">{String(i + 1).padStart(2, '0')}</span>
            <span className="min-w-0 flex-1 text-sm font-medium leading-snug text-ink-700">{p.name}</span>
            <div className="h-1.5 w-14 shrink-0 rounded-full sm:w-20" style={{ backgroundColor: `${p.color}22` }}>
              <div
                className="h-1.5 rounded-full"
                style={{ width: `${p.popularity}%`, backgroundColor: p.color }}
              />
            </div>
            <span
              className="w-12 shrink-0 rounded-full py-1 text-center text-xs font-semibold"
              style={{ backgroundColor: `${p.color}1a`, color: p.color }}
            >
              {p.popularity}%
            </span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
