import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function KnowledgeBaseCom() {
  const { state } = useLocation();
  const [search, setSearch] = useState(state?.title || "");
  const [override, setOverride] = useState(state || null);
  const [category, setCategory] = useState("All Categories");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setOverride(null);
  };

  return (
    <div className="flex flex-col h-full px-6 py-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3 text-slate-800">
        <span className="text-blue-600">📘</span> Knowledge Base
        {state?.title && (
          <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
            Filtered by: {state.title}
          </span>
        )}
      </h1>

      <form onSubmit={handleSearch} className="w-full max-w-6xl mx-auto mb-6 flex items-center gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles..."
            className="w-full border border-gray-300 px-10 py-2 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option>All Categories</option>
          <option>Setup</option>
          <option>Troubleshooting</option>
          <option>Integration</option>
          <option>Configuration</option>
        </select>
      </form>

      {override ? (
        <div className="w-full max-w-6xl mx-auto bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <div className="mb-1 text-sm text-gray-500">{override.type}</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">{override.title}</h2>
          <p className="text-sm text-gray-800 bg-gray-50 p-4 rounded mb-4 border border-gray-100">
            {override.summary}
          </p>

          <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
            <span className="text-purple-700 font-medium bg-purple-100 px-2 py-1 rounded-full text-xs">
              {override.source}
            </span>
            <span>👤 {override.author}</span>
            <span>📅 {override.date}</span>
          </div>

          <div className="mt-6">
            <p className="text-sm font-medium text-gray-700 mb-1">Related Keywords:</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {["Pixel installation", "Conversion tracking", "Domain verification", "iOS tracking"].map((kw) => (
                <span
                  key={kw}
                  className="border border-gray-300 px-3 py-1 rounded-full text-xs text-gray-600 bg-gray-100"
                >
                  {kw}
                </span>
              ))}
            </div>

            <p className="text-sm font-medium text-gray-700 mb-1">How helpful was this solution?</p>
            <div className="flex gap-2 text-xl">
              {["😡", "😕", "😐", "😊", "😍"].map((emo, idx) => (
                <button
                  key={idx}
                  className="hover:scale-110 transition-transform"
                  title={`Rating: ${emo}`}
                >
                  {emo}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-3xl bg-white border rounded-lg p-10 text-center shadow-sm">
            <div className="text-5xl text-gray-400 mb-4">🔍</div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Knowledge Base Management
            </h2>
            <p className="text-gray-500">
              Structured documentation and knowledge management tools coming soon.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}