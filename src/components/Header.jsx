import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SearchIcon, BellIcon, MenuIcon, ChevronIcon, MailIcon } from './Icons'

const LANGUAGES = [
  { code: 'en-US', label: 'Eng (US)', flag: '🇺🇸' },
  { code: 'en-GB', label: 'Eng (UK)', flag: '🇬🇧' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
]

const PAGE_META = {
  '/': { title: 'Dashboard', subtitle: "Welcome back, here's what's happening today." },
  '/analytics': { title: 'Analytics', subtitle: 'Deep dive into traffic and conversion trends.' },
  '/revenue': { title: 'Revenue', subtitle: 'Track income, breakdowns, and forecasts.' },
  '/customers': { title: 'Customers', subtitle: 'Browse and manage your customer base.' },
  '/products': { title: 'Products', subtitle: 'Manage your product catalog and stock.' },
  '/settings': { title: 'Settings', subtitle: 'Manage your account and preferences.' },
  '/help': { title: 'Help Center', subtitle: 'Guides, FAQs, and ways to reach support.' },
}

export default function Header({ onMenuClick }) {
  const { pathname } = useLocation()
  const meta = PAGE_META[pathname] ?? PAGE_META['/']

  const [profileOpen, setProfileOpen] = useState(false)
  const menuRef = useRef(null)

  const [langOpen, setLangOpen] = useState(false)
  const [language, setLanguage] = useState(LANGUAGES[0])
  const langRef = useRef(null)

  useEffect(() => {
    if (!profileOpen && !langOpen) return
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setProfileOpen(false)
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false)
    }
    const handleEscape = (e) => {
      if (e.key !== 'Escape') return
      setProfileOpen(false)
      setLangOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [profileOpen, langOpen])

  useEffect(() => {
    setProfileOpen(false)
    setLangOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-slate-200/70 bg-white/90 px-4 py-4 backdrop-blur-md sm:px-6 lg:px-8">
      <button
        onClick={onMenuClick}
        className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-ink-700 lg:hidden"
        aria-label="Open navigation"
      >
        <MenuIcon className="h-5 w-5" />
      </button>

      <div className="min-w-0">
        <h1 className="truncate text-lg font-bold text-ink-900 sm:text-xl">{meta.title}</h1>
        <p className="hidden truncate text-sm text-ink-500 sm:block">{meta.subtitle}</p>
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-56 rounded-xl border border-transparent bg-slate-100 py-2.5 pl-9 pr-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100 lg:w-72"
          />
        </div>

        {/* Language toggle */}
        <div className="relative" ref={langRef}>
          <button
            onClick={() => setLangOpen((o) => !o)}
            aria-expanded={langOpen}
            aria-haspopup="true"
            className="flex h-10 shrink-0 items-center gap-1 whitespace-nowrap rounded-xl border border-slate-200 bg-white pl-2.5 pr-2 text-ink-700 transition hover:bg-slate-50"
          >
            <span className="text-base leading-none">{language.flag}</span>
            <span className="hidden text-xs font-medium sm:block">{language.label}</span>
            <ChevronIcon
              className={`hidden h-3.5 w-3.5 text-ink-400 transition-transform sm:block ${langOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {langOpen && (
            <div
              role="menu"
              className="absolute right-0 top-[calc(100%+8px)] w-36 overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-1.5 shadow-card"
            >
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  role="menuitem"
                  onClick={() => {
                    setLanguage(l)
                    setLangOpen(false)
                  }}
                  className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-medium transition ${
                    l.code === language.code
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-ink-700 hover:bg-brand-50 hover:text-brand-700'
                  }`}
                >
                  <span className="text-base leading-none">{l.flag}</span>
                  {l.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white text-ink-700 transition hover:bg-slate-50"
          aria-label="Notifications"
        >
          <BellIcon className="h-5 w-5" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-brand-500 ring-2 ring-white" />
        </button>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setProfileOpen((o) => !o)}
            aria-expanded={profileOpen}
            aria-haspopup="true"
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white py-1.5 pl-1.5 pr-2 transition hover:bg-slate-50"
          >
            <img
              src="https://i.pravatar.cc/80?img=12"
              alt=""
              className="h-8 w-8 rounded-lg object-cover"
            />
            <span className="hidden text-left leading-tight sm:block">
              <span className="block text-sm font-semibold text-ink-900">Admin</span>
              <span className="block text-xs text-ink-400">Administrator</span>
            </span>
            <ChevronIcon
              className={`hidden h-4 w-4 text-ink-400 transition-transform sm:block ${profileOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {profileOpen && (
            <div
              role="menu"
              className="absolute right-0 top-[calc(100%+8px)] w-64 overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-card"
            >
              <div className="flex items-center gap-3 border-b border-slate-100 p-4">
                <img
                  src="https://i.pravatar.cc/80?img=12"
                  alt=""
                  className="h-11 w-11 rounded-xl object-cover"
                />
                <div className="min-w-0 leading-tight">
                  <p className="truncate text-sm font-semibold text-ink-900">Admin</p>
                  <p className="flex items-center gap-1 truncate text-xs text-ink-500">
                    <MailIcon className="h-3.5 w-3.5 shrink-0" />
                    admin@aforro.com
                  </p>
                </div>
              </div>
              <div className="p-1.5">
                <Link
                  to="/settings"
                  onClick={() => setProfileOpen(false)}
                  role="menuitem"
                  className="block rounded-xl px-3.5 py-2.5 text-sm font-medium text-ink-700 transition hover:bg-brand-50 hover:text-brand-700"
                >
                  Change password
                </Link>
                <button
                  role="menuitem"
                  onClick={() => setProfileOpen(false)}
                  className="block w-full rounded-xl px-3.5 py-2.5 text-left text-sm font-medium text-ink-700 transition hover:bg-brand-50 hover:text-brand-700"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
