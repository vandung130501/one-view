import { useState } from "react";

interface SearchInputWithSuggestionsProps {
  query: string;
  setQuery: (value: string) => void;
  onSearch: () => void
}

const commonIssues = [
  { text: "pixel not tracking", icon: "↗️" },
  { text: "conversion events missing", icon: "↗️" },
  { text: "analytics discrepancy", icon: "◯" },
  { text: "installation failed", icon: "◯" },
];

const recentSearches = [
  "Facebook pixel integration",
  "TikTok events not firing",
  "Shopify checkout tracking",
];

export default function SearchInputWithSuggestions({ query, setQuery, onSearch }: SearchInputWithSuggestionsProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  return (
    <div className="relative">
       <label className="block text-sm font-medium text-gray-700 mb-1">Describe your issue</label>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <input
          type="text"
          value={query}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Any issue or keyword..."
          className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
        />
        <button 
            className="px-5 py-2 bg-[#a5b4fc] text-white text-sm rounded-md hover:bg-[#818cf8] transition"
            onClick={onSearch}
        >
          Search
        </button>
      </div>

      {showSuggestions && (
        <div className="absolute top-14 w-full bg-white rounded-xl border border-gray-200 shadow-lg z-50">
          <div className="p-4">
            <div className="text-xs font-semibold text-gray-500 mb-1">COMMON ISSUES</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
              {commonIssues.map(({ text, icon }) => (
                <button
                  key={text}
                  onMouseDown={() => setQuery(text)}
                  className="flex items-center gap-1 px-3 py-2 text-sm rounded-md border border-gray-200 hover:border-indigo-500 cursor-pointer"
                >
                  <span className="text-indigo-500 text-base">{icon}</span>
                  <span className="text-gray-700">{text}</span>
                </button>
              ))}
            </div>
            <div className="text-xs font-semibold text-gray-500 mb-1">RECENT SEARCHES</div>
            <div className="space-y-1">
              {recentSearches.map((item) => (
                <button
                  key={item}
                  onMouseDown={() => setQuery(item)}
                  className="flex items-center gap-2 px-2 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md cursor-pointer"
                >
                  <span className="text-gray-400 text-base">◯</span>
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
