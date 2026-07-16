import { useEffect, useState } from 'react'
import StatCard from '../components/StatCard'
import Card from '../components/Card'
import Pagination from '../components/Pagination'
import { BagIcon, WalletIcon, ChartIcon } from '../components/Icons'
import { statTint } from '../lib/statTints'

const PAGE_SIZE = 5

const stats = [
  {
    label: 'Total Products',
    value: '186',
    delta: '4.0%',
    trendUp: true,
    icon: BagIcon,
    accent: statTint(0),
    trend: [150, 155, 160, 162, 165, 170, 172, 175, 178, 180, 183, 186],
  },
  {
    label: 'Low Stock Items',
    value: '9',
    delta: '2 new',
    trendUp: false,
    icon: ChartIcon,
    accent: statTint(1),
    trend: [4, 5, 5, 6, 6, 7, 7, 8, 8, 8, 9, 9],
  },
  {
    label: 'Top Product Revenue',
    value: '$8,940',
    delta: '11.2%',
    trendUp: true,
    icon: WalletIcon,
    accent: statTint(2),
    trend: [5000, 5400, 5800, 6200, 6600, 7000, 7300, 7600, 7900, 8200, 8600, 8940],
  },
]

const products = [
  { name: 'Aforro Starter Plan', category: 'Subscription', price: '$29.00', stock: 'In stock' },
  { name: 'Aforro Pro Plan', category: 'Subscription', price: '$79.00', stock: 'In stock' },
  { name: 'Aforro Enterprise Plan', category: 'Subscription', price: '$199.00', stock: 'In stock' },
  { name: 'Analytics Add-on', category: 'Add-on', price: '$15.00', stock: 'Low stock' },
  { name: 'Custom Reports Pack', category: 'Add-on', price: '$45.00', stock: 'In stock' },
  { name: 'White-label Branding', category: 'Add-on', price: '$99.00', stock: 'Out of stock' },
  { name: 'Priority Support', category: 'Service', price: '$25.00', stock: 'In stock' },
  { name: 'Onboarding Concierge', category: 'Service', price: '$149.00', stock: 'In stock' },
  { name: 'API Access Pack', category: 'Add-on', price: '$35.00', stock: 'In stock' },
  { name: 'Data Export Pack', category: 'Add-on', price: '$19.00', stock: 'Low stock' },
  { name: 'Team Seats (5-pack)', category: 'Subscription', price: '$120.00', stock: 'In stock' },
  { name: 'Custom Domain', category: 'Add-on', price: '$9.00', stock: 'Out of stock' },
]

const statusStyles = {
  'In stock': { dot: '#0ca30c', bg: 'bg-emerald-50', text: 'text-emerald-700' },
  'Low stock': { dot: '#fab219', bg: 'bg-amber-50', text: 'text-amber-700' },
  'Out of stock': { dot: '#d03b3b', bg: 'bg-rose-50', text: 'text-rose-700' },
}

function StatusPill({ status }) {
  const s = statusStyles[status]
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${s.bg} ${s.text}`}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: s.dot }} />
      {status}
    </span>
  )
}

export default function Products() {
  const [page, setPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageProducts = products.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [page, totalPages])

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <Card title="Product catalog" subtitle="All active products and add-ons">
        {/* Desktop table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200/70 text-xs font-semibold uppercase tracking-wider text-ink-400">
                <th className="py-3 pr-4">Product</th>
                <th className="py-3 pr-4">Category</th>
                <th className="py-3 pr-4">Price</th>
                <th className="py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pageProducts.map((p) => (
                <tr key={p.name}>
                  <td className="py-3.5 pr-4 text-sm font-semibold text-ink-900">{p.name}</td>
                  <td className="py-3.5 pr-4 text-sm text-ink-500">{p.category}</td>
                  <td className="py-3.5 pr-4 text-sm text-ink-700">{p.price}</td>
                  <td className="py-3.5">
                    <StatusPill status={p.stock} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <ul className="divide-y divide-slate-100 md:hidden">
          {pageProducts.map((p) => (
            <li key={p.name} className="py-4 first:pt-0 last:pb-0">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink-900">{p.name}</p>
                  <p className="text-xs text-ink-400">{p.category}</p>
                </div>
                <span className="shrink-0 text-sm font-medium text-ink-700">{p.price}</span>
              </div>
              <div className="mt-2">
                <StatusPill status={p.stock} />
              </div>
            </li>
          ))}
        </ul>

        <div className="pt-4">
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onChange={setPage}
            totalItems={products.length}
            pageSize={PAGE_SIZE}
            itemLabel="products"
          />
        </div>
      </Card>
    </>
  )
}
