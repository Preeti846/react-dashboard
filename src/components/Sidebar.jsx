import { NavLink } from 'react-router-dom'
import {
  GridIcon,
  ChartIcon,
  WalletIcon,
  UsersIcon,
  BagIcon,
  SettingsIcon,
  HelpIcon,
  DashboardIcon,
  LeaderboardIcon,
  CartIcon,
  SalesReportIcon,
  MessageIcon,
  LogoutIcon,
} from './Icons'

const navItems = [
  { label: 'Dashboard', to: '/', icon: DashboardIcon, end: true },
  { label: 'Leaderboard', to: '/analytics', icon: LeaderboardIcon },
  { label: 'Order', to: '/revenue', icon: CartIcon },
  { label: 'Customers', to: '/customers', icon: UsersIcon },
  { label: 'Products', to: '/products', icon: BagIcon },
  { label: 'Sales Report', to: '/sales-report', icon: SalesReportIcon },
  { label: 'Messages', to: '/messages', icon: MessageIcon },
]

const bottomItems = [
  { label: 'Settings', to: '/settings', icon: SettingsIcon },
  { label: 'Help Center', to: '/help', icon: HelpIcon },
  { label: 'Sign Out', to: '/logout', icon: LogoutIcon },
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
            D
          </div>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-base font-extrabold tracking-tight text-ink-900">Dabang</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
         
          {navItems.map((item) => (
            <NavRow key={item.label} item={item} onNavigate={onClose} />
          ))}

          {bottomItems.map((item) => (
            <NavRow key={item.label} item={item} onNavigate={onClose} />
          ))}
        </nav>

        {/* Upgrade card */}
        <div className="mt-6 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-4 text-white">
          <p className="text-sm font-semibold">Dabang Pro</p>
          <p className="mt-1 text-xs text-brand-100">
            Get access to all features on tetembus.
          </p>
          <button className="mt-3 w-full rounded-lg bg-white/95 py-2 text-xs font-semibold text-brand-700 transition hover:bg-white">
            Get Pro
          </button>
        </div>
      </aside>
    </>
  )
}
