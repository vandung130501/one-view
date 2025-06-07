export default function KnowledgeGaps() {
    const gaps = [
      ["iOS 14.5 tracking issues", "15 searches, 0 successful results", "high"],
      ["Server-side events setup", "12 searches, 2 successful results", "medium"],
      ["GDPR compliance tracking", "8 searches, 1 successful results", "high"],
    ];
  
    return (
      <div className="bg-white rounded-xl border p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Knowledge Gaps to Address</h3>
          <button className="bg-indigo-600 text-white text-sm px-4 py-1.5 rounded hover:bg-indigo-700">
            Create Documentation
          </button>
        </div>
        {gaps.map(([title, stats, priority]) => (
          <div key={title} className="flex justify-between items-center border rounded px-4 py-3 mb-3">
            <div>
              <div className="font-medium text-sm text-gray-900">{title}</div>
              <div className="text-xs text-gray-500">{stats}</div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  priority === "high" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {priority} priority
              </span>
              <button className="text-indigo-600 text-sm hover:underline">Review</button>
            </div>
          </div>
        ))}
      </div>
    );
  }
  