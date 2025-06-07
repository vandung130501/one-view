export default function TabSwitcher() {
    const tabs = ["Hot Issues", "Team Performance", "Knowledge Gaps", "AI Insights"];
  
    return (
      <div className="flex border-b text-sm font-medium text-gray-600">
        {tabs.map((tab) => (
          <button
            key={tab}
            className="px-4 py-2 -mb-px border-b-2 border-transparent hover:text-black hover:border-gray-400"
          >
            {tab}
          </button>
        ))}
      </div>
    );
  }
  