export default function TeamPerformance() {
    const data = [
      ["Sarah Chen", 89, 3, "4.8/5.0", "96%"],
      ["Mike Johnson", 76, 8, "4.6/5.0", "91%"],
      ["Lisa Wang", 82, 5, "4.7/5.0", "94%"],
      ["Tom Rodriguez", 71, 12, "4.3/5.0", "86%"],
    ];
  
    return (
      <div className="bg-white rounded-xl border p-6">
        <h3 className="text-lg font-semibold mb-4">Individual Performance</h3>
        <table className="w-full text-sm">
          <thead className="text-left text-gray-500 border-b">
            <tr>
              <th>Agent</th>
              <th>Resolved</th>
              <th>Escalated</th>
              <th>Rating</th>
              <th>Efficiency</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {data.map(([name, resolved, escalated, rating, efficiency]) => (
              <tr key={name} className="border-t">
                <td className="py-2">{name}</td>
                <td>{resolved}</td>
                <td className={+escalated > 10 ? "text-red-500" : "text-green-600"}>{escalated}</td>
                <td>{rating}</td>
                <td>
                  <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-xs">
                    {efficiency}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  