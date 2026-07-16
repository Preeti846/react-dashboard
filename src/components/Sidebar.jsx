import { NavLink } from 'react-router-dom'
import {
  GridIcon,
  ChartIcon,
  WalletIcon,
  UsersIcon,
  BagIcon,
  SettingsIcon,
  HelpIcon,
} from './Icons'

const navItems = [
  { label: 'Dashboard', to: '/', icon: GridIcon, end: true },
  { label: 'Analytics', to: '/analytics', icon: ChartIcon },
  { label: 'Revenue', to: '/revenue', icon: WalletIcon },
  { label: 'Customers', to: '/customers', icon: UsersIcon },
  { label: 'Products', to: '/products', icon: BagIcon },
]

const bottomItems = [
  { label: 'Settings', to: '/settings', icon: SettingsIcon },
  { label: 'Help Center', to: '/help', icon: HelpIcon },
]

function NavRow({ item, onNavigate }) {
  const Icon = item.icon
  return (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={onNavigate}
      className={({ isActive }) =>
        `group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors
        ${
          isActive
            ? 'bg-brand-600 text-white shadow-[0_8px_20px_-6px_rgba(108,63,240,0.5)]'
            : 'text-ink-500 hover:bg-brand-50 hover:text-brand-700'
        }`
      }
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span>{item.label}</span>
    </NavLink>
  )
}

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-ink-900/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 max-w-[80vw] flex-col overflow-y-auto border-r border-slate-200/70 bg-white px-4 py-6
          transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0
          ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 px-2 pb-8">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-600 text-lg font-extrabold text-white">
            A
          </div>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-base font-extrabold tracking-tight text-ink-900">Aforro</p>
            <p className="truncate text-xs font-medium text-ink-400">Sales Suite</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          <p className="px-3.5 pb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-400">
            Menu
          </p>
          {navItems.map((item) => (
            <NavRow key={item.label} item={item} onNavigate={onClose} />
          ))}

          <p className="mt-6 px-3.5 pb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-400">
            General
          </p>
          {bottomItems.map((item) => (
            <NavRow key={item.label} item={item} onNavigate={onClose} />
          ))}
        </nav>

        {/* Upgrade card */}
        <div className="mt-6 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-4 text-white">
          <p className="text-sm font-semibold">Upgrade to Pro</p>
          <p className="mt-1 text-xs text-brand-100">
            Unlock advanced reports and unlimited exports.
          </p>
          <button className="mt-3 w-full rounded-lg bg-white/95 py-2 text-xs font-semibold text-brand-700 transition hover:bg-white">
            Upgrade now
          </button>
        </div>
      </aside>
    </>
  )
}
