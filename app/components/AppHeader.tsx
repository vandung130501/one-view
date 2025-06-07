import { useLocation } from "@remix-run/react";

export default function AppHeader() {
  const location = useLocation();

  const pageTitleMap: Record<string, string> = {
    "/": "AI Search Console",
    "/ai-search": "AI Search",
    "/manager-dashboard": "Manager Dashboard",
    "/knowledge-base": "Knowledge Management",
    "/settings": "Settings",
  };

  const pageTitle = pageTitleMap[location.pathname] || "Dashboard";

  return (
    <div className="h-16 flex items-center justify-between px-6 border-b bg-white shadow-sm">
      {/* Logo & Product Info */}
      <div className="flex items-center gap-4">
        <div className="text-xl font-semibold flex items-center gap-2">
          <span role="img">🔍</span>
          <span>CS Support AI</span>
        </div>
        <span className="text-sm text-gray-500">Larksuite Integration</span>
      </div>

      {/* Page Title */}
      {/* <h1 className="text-lg font-semibold text-gray-800">{pageTitle}</h1> */}

      {/* User Info */}
      <div className="flex items-center gap-4">
        <button className="relative">
          <span role="img" className="text-xl">🔔</span>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">2</span>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-200 text-blue-900 rounded-full flex items-center justify-center text-sm font-bold">CS</div>
          <div className="text-sm">
            <div className="font-medium">CS Agent</div>
            <div className="text-green-600 text-xs">Online</div>
          </div>
        </div>
      </div>
    </div>
  );
}
