export default function DashboardHeader() {
    return (
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold flex items-center gap-3">
          Manager Dashboard
          <span className="text-sm bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
            12 Active Issues
          </span>
        </h1>
  
        <div className="flex space-x-2">
          {["Today", "Week", "Month", "Quarter"].map((label, idx) => (
            <button
              key={label}
              className={`px-3 py-1 rounded-full text-sm ${
                label === "Week"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    );
  }