import TodaysSalesCard from '../components/dashboard/TodaysSalesCard'
import VisitorInsights from '../components/dashboard/VisitorInsights'
import TotalRevenueChart from '../components/dashboard/TotalRevenueChart'
import CustomerSatisfactionChart from '../components/dashboard/CustomerSatisfactionChart'
import TargetVsRealityChart from '../components/dashboard/TargetVsRealityChart'
import TopProductsList from '../components/dashboard/TopProductsList'
import SalesMap from '../components/dashboard/SalesMap'
import VolumeServiceChart from '../components/dashboard/VolumeServiceChart'
import { WalletIcon, BagIcon, UsersIcon, ChartIcon } from '../components/Icons'
import { statTint } from '../lib/statTints'

const stats = [
  {
    label: 'Total Revenue',
    value: '$64,290',
    delta: '12.4%',
    trendUp: true,
    icon: WalletIcon,
    accent: statTint(0),
  },
  {
    label: 'Total Orders',
    value: '4,412',
    delta: '8.1%',
    trendUp: true,
    icon: BagIcon,
    accent: statTint(1),
  },
  {
    label: 'New Customers',
    value: '1,240',
    delta: '3.2%',
    trendUp: false,
    icon: UsersIcon,
    accent: statTint(2),
  },
  {
    label: 'Conversion Rate',
    value: '3.86%',
    delta: '1.9%',
    trendUp: true,
    icon: ChartIcon,
    accent: statTint(3),
  },
]

export default function Dashboard() {
  return (
    <>
      {/* <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 ">
        <div className="lg:col-span-2">
          <TodaysSalesCard stats={stats} />
        </div>
        <VisitorInsights />
      </div> */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
        <TodaysSalesCard stats={stats} />
        <VisitorInsights />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <TotalRevenueChart />
        <CustomerSatisfactionChart />
        <TargetVsRealityChart />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <TopProductsList />
        <SalesMap />
        <VolumeServiceChart />
      </div>
    </>
  )
}
