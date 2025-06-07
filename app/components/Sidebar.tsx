import { Link, useLocation } from "@remix-run/react";

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { name: "AI Search", path: "/ai-search", icon: "🔍" },
    { name: "Manager Dashboard", path: "/manager-dashboard", icon: "📊", badge: 12 },
    { name: "Knowledge Base", path: "/knowledge-base", icon: "📘" },
    { name: "Settings", path: "/settings", icon: "🦿" },
  ];

  return (
    <aside className="w-64 bg-white border-r shadow-sm h-full">
      <div className="p-4 border-b font-bold text-lg flex items-center space-x-2">
        <span>📎</span>
        <span>CS Support AI</span>
      </div>
      <nav className="mt-4 space-y-2 px-4">
        {navItems.map(({ name, path, icon, badge }) => (
          <Link
            key={path}
            to={path}
            className={`flex justify-between items-center px-2 py-2 rounded cursor-pointer ${
              location.pathname === path ? "bg-blue-100 text-blue-600 font-semibold" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span>{icon} {name}</span>
            {badge && (
              <span className="ml-2 rounded-full bg-red-500 text-white text-xs px-2 py-0.5">
                {badge}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
