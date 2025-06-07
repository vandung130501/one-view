export default function SettingsTabs() {
    const tabs = ["Data Sync", "App Management", "AI Settings"];
  
    return (
      <div className="flex border-b text-sm text-gray-600 font-medium">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            className={`px-4 py-2 border-b-2 ${
              tab === "Data Sync"
                ? "border-gray-800 text-black"
                : "border-transparent hover:border-gray-300 hover:text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    );
  }
  