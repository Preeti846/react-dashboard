export default function Card({ title, subtitle, action, children, className = '' }) {
  return (
    <section className={`rounded-2xl border border-slate-200/70 bg-white p-5 shadow-card sm:p-6 ${className}`}>
      {(title || action) && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            {title && <h2 className="text-base font-bold text-ink-900">{title}</h2>}
            {subtitle && <p className="text-sm text-ink-500">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      <div className={title || action ? 'mt-5' : ''}>{children}</div>
    </section>
  )
}
