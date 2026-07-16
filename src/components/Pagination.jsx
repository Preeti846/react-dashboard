import { ChevronIcon } from './Icons'

function pageList(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = new Set([1, 2, total - 1, total, current - 1, current, current + 1])
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b)

  const withGaps = []
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) withGaps.push('…')
    withGaps.push(p)
  })
  return withGaps
}

export default function Pagination({ page, totalPages, onChange, totalItems, pageSize, itemLabel = 'items' }) {
  if (totalPages <= 1) return null

  const start = (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, totalItems)

  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 px-1 pt-4 sm:flex-row">
      <p className="text-xs text-ink-500">
        Showing <span className="font-semibold text-ink-700">{start}–{end}</span> of{' '}
        <span className="font-semibold text-ink-700">{totalItems}</span> {itemLabel}
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
          className="grid h-8 w-8 place-items-center rounded-lg text-ink-500 transition hover:bg-slate-100 disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronIcon className="h-4 w-4 rotate-90" />
        </button>

        {pageList(page, totalPages).map((p, i) =>
          p === '…' ? (
            <span key={`gap-${i}`} className="grid h-8 w-8 place-items-center text-xs text-ink-400">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onChange(p)}
              aria-current={p === page ? 'page' : undefined}
              className={`grid h-8 w-8 place-items-center rounded-lg text-xs font-semibold transition ${
                p === page ? 'bg-brand-600 text-white' : 'text-ink-600 hover:bg-slate-100'
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => onChange(page + 1)}
          disabled={page === totalPages}
          aria-label="Next page"
          className="grid h-8 w-8 place-items-center rounded-lg text-ink-500 transition hover:bg-slate-100 disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronIcon className="h-4 w-4 -rotate-90" />
        </button>
      </div>
    </div>
  )
}
