import PageWrapper from '../components/layout/PageWrapper'
import DashboardHero from '../components/dashboard/DashboardHero'
import QuickActions from '../components/dashboard/QuickActions'
import FocusSection from '../components/dashboard/FocusSection'
import RecentActivity from '../components/dashboard/RecentActivity'

export default function Dashboard() {
  return (
    <PageWrapper>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* HERO */}
        <DashboardHero />

        {/* QUICK ACTIONS */}
        <QuickActions />

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-5">
          <FocusSection />
          <RecentActivity />
        </div>
      </div>
    </PageWrapper>
  )
}