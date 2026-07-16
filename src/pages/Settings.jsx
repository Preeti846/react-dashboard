import { useState } from 'react'
import Card from '../components/Card'

function Toggle({ checked, onChange, label, description }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="text-sm font-medium text-ink-900">{label}</p>
        {description && <p className="text-xs text-ink-500">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? 'bg-brand-600' : 'bg-slate-200'
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  )
}

export default function Settings() {
  const [name, setName] = useState('Divya R.')
  const [email, setEmail] = useState('divya.r@aforro.com')
  const [emailNotifs, setEmailNotifs] = useState(true)
  const [weeklyReports, setWeeklyReports] = useState(true)
  const [productUpdates, setProductUpdates] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <Card title="Profile" subtitle="Update your personal details" className="lg:col-span-2">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="flex items-center gap-4">
            <img
              src="https://i.pravatar.cc/80?img=12"
              alt=""
              className="h-16 w-16 rounded-xl object-cover"
            />
            <button
              type="button"
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-ink-700 transition hover:bg-slate-50"
            >
              Change photo
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink-700">Full name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-sm text-ink-900 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink-700">Email address</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-sm text-ink-900 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink-700">Role</span>
            <input
              type="text"
              value="Sales Lead"
              disabled
              className="w-full rounded-xl border border-slate-200 bg-slate-100 px-3.5 py-2.5 text-sm text-ink-400"
            />
          </label>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Save changes
            </button>
            {saved && <span className="text-sm font-medium text-emerald-600">Saved!</span>}
          </div>
        </form>
      </Card>

      <div className="space-y-6">
        <Card title="Notifications" subtitle="Choose what you hear about">
          <div className="divide-y divide-slate-100">
            <Toggle
              checked={emailNotifs}
              onChange={setEmailNotifs}
              label="Email notifications"
              description="Order and account activity"
            />
            <Toggle
              checked={weeklyReports}
              onChange={setWeeklyReports}
              label="Weekly reports"
              description="A summary every Monday"
            />
            <Toggle
              checked={productUpdates}
              onChange={setProductUpdates}
              label="Product updates"
              description="New features and changes"
            />
          </div>
        </Card>

        <Card title="Security" subtitle="Keep your account safe">
          <button className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-left text-sm font-medium text-ink-700 transition hover:bg-slate-50">
            Change password
          </button>
          <button className="mt-2.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-left text-sm font-medium text-ink-700 transition hover:bg-slate-50">
            Enable two-factor authentication
          </button>
        </Card>
      </div>
    </div>
  )
}
