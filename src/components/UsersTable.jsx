import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { SearchIcon, SortIcon, MailIcon, ChevronIcon } from './Icons'
import Pagination from './Pagination'

const API_URL = 'https://jsonplaceholder.typicode.com/users'
const PAGE_SIZE = 5

// Give each user a deterministic avatar based on their id
const avatarFor = (id) => `https://i.pravatar.cc/80?img=${(id % 70) + 1}`

export default function UsersTable() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading') // 'loading' | 'error' | 'success'

  const [search, setSearch] = useState('')
  const [cityFilter, setCityFilter] = useState('all')
  const [sortDir, setSortDir] = useState('asc') // 'asc' | 'desc'
  const [page, setPage] = useState(1)

  const fetchUsers = async () => {
    setStatus('loading')
    try {
      const { data } = await axios.get(API_URL)
      setUsers(data)
      setStatus('success')
    } catch (err) {
      console.error('Failed to fetch users:', err)
      setStatus('error')
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // Unique cities for the filter dropdown
  const cities = useMemo(() => {
    const set = new Set(users.map((u) => u.address?.city).filter(Boolean))
    return Array.from(set).sort()
  }, [users])

  // Search -> filter -> sort pipeline
  const visibleUsers = useMemo(() => {
    const term = search.trim().toLowerCase()

    let list = users.filter((u) => {
      const matchesSearch =
        !term ||
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term)
      const matchesCity = cityFilter === 'all' || u.address?.city === cityFilter
      return matchesSearch && matchesCity
    })

    list = [...list].sort((a, b) => {
      const cmp = a.name.localeCompare(b.name)
      return sortDir === 'asc' ? cmp : -cmp
    })

    return list
  }, [users, search, cityFilter, sortDir])

  const totalPages = Math.max(1, Math.ceil(visibleUsers.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageUsers = useMemo(
    () => visibleUsers.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [visibleUsers, currentPage]
  )

  // Reset to page 1 whenever the result set changes underneath the current page
  useEffect(() => {
    setPage(1)
  }, [search, cityFilter])

  const toggleSort = () => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))

  const resetFilters = () => {
    setSearch('')
    setCityFilter('all')
    setSortDir('asc')
    setPage(1)
  }

  return (
    <section className="rounded-2xl border border-slate-200/70 bg-white shadow-card">
      {/* Toolbar */}
      <div className="flex flex-col gap-4 border-b border-slate-200/70 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-ink-900">Customers</h2>
            <p className="text-sm text-ink-500">
              {status === 'success'
                ? `${visibleUsers.length} of ${users.length} customers`
                : 'Live data from the users API'}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-2.5 pl-9 pr-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
          </div>

          {/* City filter */}
          <div className="relative">
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/60 py-2.5 pl-3.5 pr-9 text-sm font-medium text-ink-700 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100 sm:w-48"
            >
              <option value="all">All cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <ChevronIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
          </div>

          {/* Sort */}
          <button
            onClick={toggleSort}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2.5 text-sm font-medium text-ink-700 transition hover:bg-white hover:shadow-sm"
            title="Sort by name"
          >
            <SortIcon className="h-4 w-4" />
            Name {sortDir === 'asc' ? 'A–Z' : 'Z–A'}
          </button>
        </div>
      </div>

      {/* Body */}
      {status === 'loading' && <TableSkeleton />}

      {status === 'error' && (
        <ErrorState onRetry={fetchUsers} />
      )}

      {status === 'success' && (
        <>
          {visibleUsers.length === 0 ? (
            <EmptyState onReset={resetFilters} />
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-200/70 text-xs font-semibold uppercase tracking-wider text-ink-400">
                      <th className="px-6 py-3.5">
                        <button
                          onClick={toggleSort}
                          className="inline-flex items-center gap-1.5 hover:text-ink-700"
                        >
                          Name
                          <SortIcon className="h-3.5 w-3.5" />
                        </button>
                      </th>
                      <th className="px-6 py-3.5">Email</th>
                      <th className="px-6 py-3.5">Company</th>
                      <th className="px-6 py-3.5">City</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {pageUsers.map((u) => (
                      <tr key={u.id} className="transition-colors hover:bg-slate-50/70">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={avatarFor(u.id)}
                              alt=""
                              className="h-9 w-9 rounded-full object-cover"
                            />
                            <div className="leading-tight">
                              <p className="text-sm font-semibold text-ink-900">{u.name}</p>
                              <p className="text-xs text-ink-400">@{u.username}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-ink-500">{u.email}</td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-ink-700">
                            {u.company?.name}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
                            {u.address?.city}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <ul className="divide-y divide-slate-100 md:hidden">
                {pageUsers.map((u) => (
                  <li key={u.id} className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={avatarFor(u.id)}
                        alt=""
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-ink-900">{u.name}</p>
                        <p className="flex items-center gap-1 truncate text-xs text-ink-400">
                          <MailIcon className="h-3.5 w-3.5 shrink-0" />
                          {u.email}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs">
                      <span className="font-medium text-ink-700">{u.company?.name}</span>
                      <span className="inline-flex items-center rounded-full bg-brand-50 px-2.5 py-1 font-medium text-brand-700">
                        {u.address?.city}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                <Pagination
                  page={currentPage}
                  totalPages={totalPages}
                  onChange={setPage}
                  totalItems={visibleUsers.length}
                  pageSize={PAGE_SIZE}
                  itemLabel="customers"
                />
              </div>
            </>
          )}
        </>
      )}
    </section>
  )
}

/* ---------- Sub states ---------- */

function TableSkeleton() {
  return (
    <div className="p-5 sm:p-6">
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="h-9 w-9 shrink-0 animate-pulse rounded-full bg-slate-100" />
            <div className="h-4 flex-1 animate-pulse rounded bg-slate-100" />
            <div className="hidden h-4 w-40 animate-pulse rounded bg-slate-100 sm:block" />
            <div className="hidden h-4 w-24 animate-pulse rounded bg-slate-100 sm:block" />
          </div>
        ))}
      </div>
    </div>
  )
}

function ErrorState({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="grid h-12 w-12 place-items-center rounded-full bg-rose-50 text-rose-500">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-6 w-6"
        >
          <path d="M12 9v4M12 17h.01" strokeLinecap="round" />
          <path d="M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
        </svg>
      </div>
      <p className="mt-4 text-sm font-semibold text-ink-900">Couldn't load customers</p>
      <p className="mt-1 max-w-xs text-sm text-ink-500">
        Something went wrong while fetching the data. Check your connection and try again.
      </p>
      <button
        onClick={onRetry}
        className="mt-4 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
      >
        Try again
      </button>
    </div>
  )
}

function EmptyState({ onReset }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="grid h-12 w-12 place-items-center rounded-full bg-slate-100 text-ink-400">
        <SearchIcon className="h-6 w-6" />
      </div>
      <p className="mt-4 text-sm font-semibold text-ink-900">No customers match</p>
      <p className="mt-1 max-w-xs text-sm text-ink-500">
        Try a different search term or clear the filters to see everyone.
      </p>
      <button
        onClick={onReset}
        className="mt-4 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-ink-700 transition hover:bg-slate-50"
      >
        Clear filters
      </button>
    </div>
  )
}
