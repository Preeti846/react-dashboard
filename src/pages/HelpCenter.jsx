import { useState } from 'react'
import Card from '../components/Card'
import { ChevronIcon, MailIcon } from '../components/Icons'

const faqs = [
  {
    q: 'How do I invite teammates to my workspace?',
    a: 'Go to Settings → Team, then click "Invite member" and enter their email address. They\'ll receive a link to join your workspace.',
  },
  {
    q: 'Can I export my sales data?',
    a: 'Yes — every table and chart on the Dashboard has an export option that downloads the underlying data as a CSV file.',
  },
  {
    q: 'How is the conversion rate calculated?',
    a: 'Conversion rate is total orders divided by total sessions for the selected period, shown as a percentage.',
  },
  {
    q: 'What happens if I downgrade my plan?',
    a: 'Your data is kept safely for 30 days. Some advanced reports and integrations become read-only until you upgrade again.',
  },
]

function FaqItem({ item, open, onToggle }) {
  return (
    <div className="border-b border-slate-100 last:border-b-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-ink-900">{item.q}</span>
        <ChevronIcon
          className={`h-4 w-4 shrink-0 text-ink-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && <p className="pb-4 text-sm text-ink-500">{item.a}</p>}
    </div>
  )
}

export default function HelpCenter() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <Card title="Frequently asked questions" subtitle="Quick answers to common questions" className="lg:col-span-2">
        <div>
          {faqs.map((item, i) => (
            <FaqItem
              key={item.q}
              item={item}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </Card>

      <div className="space-y-6">
        <Card title="Contact support" subtitle="We usually reply within a few hours">
          <a
            href="mailto:support@aforro.com"
            className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-ink-700 transition hover:bg-slate-50"
          >
            <MailIcon className="h-4 w-4 text-brand-600" />
            support@aforro.com
          </a>
          <button className="mt-2.5 w-full rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700">
            Start a live chat
          </button>
        </Card>

        <Card title="Resources" subtitle="Learn more about Aforro">
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href="#" onClick={(e) => e.preventDefault()} className="font-medium text-brand-700 hover:underline">
                Getting started guide
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => e.preventDefault()} className="font-medium text-brand-700 hover:underline">
                API documentation
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => e.preventDefault()} className="font-medium text-brand-700 hover:underline">
                Release notes
              </a>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
