interface TabSwitcherProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
  }

export default function TabSwitcher({activeTab, setActiveTab}: TabSwitcherProps) {
    const tabs = ["Hot Issues", "Team Performance", "Knowledge Gaps", "AI Insights"];
  
    return (
      <div className="flex border-b text-sm font-medium text-gray-600">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 -mb-px border-b-2 transition-all duration-150 ${
                activeTab === tab
                  ? "text-indigo-600 border-indigo-600 font-semibold"
                  : "border-transparent hover:text-black hover:border-gray-300"
              }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    );
  }
  