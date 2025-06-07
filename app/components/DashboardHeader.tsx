interface DashboardHeaderProps {
    timeframe: string;
    setTimeframe: (value: string) => void;
  }
  
  export default function DashboardHeader({ timeframe, setTimeframe }: DashboardHeaderProps) {
    const timeframes = ["Today", "Week", "Month", "Quarter"];
  
    return (
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold flex items-center gap-3">
          Manager Dashboard
          <span className="text-sm bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
            12 Active Issues
          </span>
        </h1>
  
        <div className="flex gap-2">
          {timeframes.map((label) => (
            <button
              key={label}
              onClick={() => setTimeframe(label)}
              className={`px-3 py-1.5 text-sm rounded-full border transition font-medium ${
                timeframe === label
                  ? "bg-black text-white"
                  : "bg-white text-gray-800 hover:bg-gray-100"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    );
  }
  