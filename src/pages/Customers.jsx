import StatCard from '../components/StatCard'
import UsersTable from '../components/UsersTable'
import { UsersIcon, WalletIcon, ChartIcon } from '../components/Icons'
import { statTint } from '../lib/statTints'

const stats = [
  {
    label: 'Total Customers',
    value: '1,240',
    delta: '3.2%',
    trendUp: true,
    icon: UsersIcon,
    accent: statTint(0),
    trend: [900, 950, 980, 1020, 1050, 1080, 1100, 1140, 1160, 1190, 1210, 1240],
  },
  {
    label: 'Customer LTV',
    value: '$482',
    delta: '5.4%',
    trendUp: true,
    icon: WalletIcon,
    accent: statTint(1),
    trend: [380, 390, 400, 410, 420, 430, 440, 450, 460, 470, 475, 482],
  },
  {
    label: 'Churn Rate',
    value: '2.1%',
    delta: '0.3%',
    trendUp: false,
    icon: ChartIcon,
    accent: statTint(2),
    trend: [2.8, 2.7, 2.6, 2.5, 2.5, 2.4, 2.3, 2.3, 2.2, 2.2, 2.1, 2.1],
  },
]

export default function Customers() {
  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <UsersTable />
    </>
  )
}
