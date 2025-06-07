const issues = [
    { id: 1, title: "Facebook Pixel not tracking", count: 42, priority: "high" },
    { id: 2, title: "TikTok events missing", count: 38, priority: "medium" },
    { id: 3, title: "Shopify checkout error", count: 31, priority: "high" },
  ];
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-400";
      default:
        return "bg-gray-300";
    }
  };
  
  export default function TrendingIssues() {
    return (
      <div>
        <div className="flex justify-between items-center mt-4 mb-2">
          <h2 className="text-lg font-semibold">Trending Issues This Week</h2>
          <button className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200">
            Export Report
          </button>
        </div>
        <div className="space-y-3">
          {issues.map((issue, idx) => (
            <div
              key={issue.id}
              className="bg-white rounded-lg px-4 py-3 border flex justify-between items-center"
            >
              <div>
                <div className="font-semibold">#{idx + 1} {issue.title}</div>
                <div className="text-sm text-gray-500">{issue.count} occurrences</div>
              </div>
              <span className={`text-xs text-white px-2 py-1 rounded-full ${getPriorityColor(issue.priority)}`}>
                {issue.priority}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  