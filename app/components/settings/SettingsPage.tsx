import SettingsHeader from "./SettingsHeader";
import SettingsTabs from "./SettingsTabs";
import DataSyncCard from "./DataSyncCard";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <SettingsHeader />
      <SettingsTabs />
      <DataSyncCard />
    </div>
  );
}
