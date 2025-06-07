import { useEffect, useState } from "react";
import AppMultiSelect from "./AppMultiSelect";
import SearchInputWithSuggestions from "./SearchInputWithSuggestions";
import SearchPerformanceStats from "./SearchPerformanceStats";
import { useNavigate } from "@remix-run/react";

interface SearchResult {
  id: number;
  rank: string;
  confidence: string;
  type: string;
  title: string;
  summary: string;
  source: string;
  author: string;
  date: string;
}

const mockResults: SearchResult[] = [
  {
    id: 1,
    rank: "#1",
    confidence: "HIGH MATCH",
    type: "Product Documentation + Past Task",
    title: "Facebook Pixel Not Tracking Conversions - Cài đặt sai domain verification",
    summary: "Kiểm tra xem pixel đã được cài đặt đúng cách chưa và xác minh các sự kiện conversion được cấu hình chính xác trong Facebook Ads Manager. Thường thì lỗi...",
    source: "AI Comprehensive Answer",
    author: "John Doe",
    date: "2024-06-01",
  },
  {
    id: 2,
    rank: "#2",
    confidence: "MEDIUM MATCH",
    type: "Past Support Task",
    title: "TikTok Analytics Data Discrepancy - Báo cáo không khớp với thực tế",
    summary:
      "Data discrepancies usually occur due to timezone differences or delayed reporting. Wait 24-48 hours for data to reconcile. Also check if attribution w...",
    source: "AI Comprehensive Answer",
    author: "John Doe",
    date: "2024-06-01",
  },
];

export default function SearchConsole() {
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [triggeredBySelect, setTriggeredBySelect] = useState(false);
  const [checkSearchInSelect, setCheckSearchInSelect] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (triggeredBySelect) {
      setResults(mockResults);
      
    } else {
        if(query){
            setResults([])
        }
    }
  }, [triggeredBySelect, query]);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
    }
  }, [query]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, apps: selectedApps }),
      });
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Search API error:", error);
      setResults([]);
    }
  };

  const handleQuery = (val: string, option: string) => {
    setQuery(val);
    if(option == 'text'){
        setTriggeredBySelect(false); // trigger mock if value comes from suggestion
    } else {
      setTriggeredBySelect(true)
    }
  }

  const handleNavigateKnowBase = (result) => {
    navigate('/knowledge-base', { state: result })
  }

  return (
    <div className="bg-[#f9fafb] p-6 rounded-xl border border-[#e5e7eb] w-full max-w-5xl mx-auto">
      <AppMultiSelect selectedApps={selectedApps} setSelectedApps={setSelectedApps} />
      <SearchInputWithSuggestions
        query={query}
        setQuery={handleQuery}
        onSearch={handleSearch}
      />
      <SearchPerformanceStats />

      {results.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Found {results.length} solutions
          </h2>
          <div className="space-y-4">
            {results.map((result) => (
              <div key={result.id} className="bg-white border rounded-lg shadow-sm p-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                  <span className="font-semibold text-indigo-600">{result.rank}</span>
                  <span
                    className={`px-2 py-0.5 text-xs font-semibold rounded-full ${result.confidence === "HIGH MATCH"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {result.confidence}
                  </span>
                  <span>{result.type}</span>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  {result.title}
                </h3>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded mb-3">
                  {result.summary}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <span className="text-purple-700 font-medium bg-purple-100 px-2 py-1 rounded-full text-xs">
                      {result.source}
                    </span>
                    <span>👤 {result.author}</span>
                    <span>📅 {result.date}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="border px-3 py-1 rounded text-sm hover:bg-gray-50">📄 View Task</button>
                    <button className="border px-3 py-1 rounded text-sm hover:bg-gray-50"
                    onClick={() => handleNavigateKnowBase(result)}
                    
                    >📘 Knowledge</button>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-1">Related Keywords:</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['Pixel installation', 'Conversion tracking', 'Domain verification', 'iOS tracking'].map((kw) => (
                      <span key={kw} className="border border-gray-300 px-2 py-0.5 rounded-full text-xs text-gray-600">
                        {kw}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm font-medium text-gray-700 mb-1">How helpful was this solution?</p>
                  <div className="flex gap-2 text-xl">
                    {['😡', '😕', '😐', '😊', '😍'].map((emo, idx) => (
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
