interface Props {
    title: string;
    subtitle: string;
    icon: string;
    growth: string;
  }
  
  export default function KpiCard({ title, subtitle, icon, growth }: Props) {
    const isPositive = growth.startsWith("+");
  
    return (
      <div className="bg-white border rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl">{icon}</span>
          <span className={`text-sm ${isPositive ? "text-green-600" : "text-red-500"}`}>
            {growth}
          </span>
        </div>
        <div className="text-2xl font-bold">{title}</div>
        <div className="text-gray-500 text-sm">{subtitle}</div>
      </div>
    );
  }
  