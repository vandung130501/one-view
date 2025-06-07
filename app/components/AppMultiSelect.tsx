import { useState } from "react";

interface AppMultiSelectProps {
  selectedApps: string[];
  setSelectedApps: (apps: string[]) => void;
}

const apps = [
  "Omega Facebook Pixel",
  "TikTok Analytics",
  "Google Ads Tracker",
  "Shopify Tools",
  "Email Marketing Suite",
];

export default function AppMultiSelect({ selectedApps, setSelectedApps }: AppMultiSelectProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleApp = (app: string) => {
    setSelectedApps((prev) => {
      const updated = prev.includes(app)
        ? prev.filter((a) => a !== app)
        : [...prev, app];
      setDropdownOpen(false);
      return updated;
    });
  };

  return (
    <div className="mb-4 relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">Select App:</label>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="w-full border border-gray-300 px-4 py-2 rounded-md bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm flex justify-between items-center"
      >
        {selectedApps.length === 0 ? (
          <span className="text-gray-400">Select applications...</span>
        ) : (
          <span>{selectedApps.length} application{selectedApps.length > 1 ? "s" : ""} selected</span>
        )}
        <span className="ml-2">▾</span>
      </button>

      {dropdownOpen && (
        <div className="absolute top-[65px] z-50 w-full sm:w-full bg-white border border-gray-200 rounded-md shadow-md">
          {apps.map((app) => (
            <button
              key={app}
              onClick={() => toggleApp(app)}
              className="flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer"
            >
              <span>{app}</span>
              {selectedApps.includes(app) && <span className="text-indigo-600">✔</span>}
            </button>
          ))}
        </div>
      )}

      {selectedApps.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {selectedApps.map((app) => (
            <div
              key={app}
              className="flex items-center bg-indigo-100 text-indigo-700 text-sm px-3 py-1 rounded-full shadow-sm max-w-full overflow-hidden"
            >
              <span className="truncate">{app}</span>
              <button
                onClick={() => toggleApp(app)}
                className="ml-2 text-indigo-500 hover:text-indigo-700"
                aria-label={`Remove ${app}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
