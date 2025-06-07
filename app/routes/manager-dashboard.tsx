import DashboardHeader from "~/components/DashboardHeader";
import KpiCard from "~/components/KpiCard";
import TabSwitcher from "~/components/TabSwitcher";
import TrendingIssues from "~/components/TrendingIssues";

export default function ManagerDashboard() {
    return (
        <div className="space-y-8">
            <DashboardHeader />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <KpiCard title="847" subtitle="vs last week" icon="✅" growth="+12.5%" />
                <KpiCard title="2.3min" subtitle="improvement" icon="⏱" growth="-18%" />
                <KpiCard title="23" subtitle="reduction" icon="📉" growth="-45%" />
                <KpiCard title="94.2%" subtitle="self-service rate" icon="📈" growth="+7.8%" />
            </div>

            <TabSwitcher />

            <TrendingIssues />
        </div>
    );
}