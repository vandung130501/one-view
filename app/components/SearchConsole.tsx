import { useNavigate } from "@remix-run/react";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import AppMultiSelect from "./AppMultiSelect";
import SearchInputWithSuggestions from "./SearchInputWithSuggestions";

export default function SearchConsole() {
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string }>({ show: false, message: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
    }
  }, [query]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post('/api/search', { keyword: query.trim() });
      const data = await res.data;
      
      if(data.success){
        setResults(data?.received?.data || []);
      }
      
      // setResults(data.results || []);
    } catch (error) {
      console.error("Search API error:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuery = (val: string) => {
    setQuery(val);
  }

  const handleNavigateKnowBase = (result: string) => {
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
      {/* <SearchPerformanceStats /> */}

      {loading ? (
        <div className="flex-1 flex items-center justify-center py-16">
          <div className="flex flex-col items-center gap-4">
            <svg className="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
          </div>
        </div>
      ) : results.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Found {results.length} solutions
          </h2>
          <div className="space-y-4">
            {results.map((result, index) => {              
              const content = result?.content ? JSON.parse(result.content) :null
              return(
              <div key={result.id} className="bg-white border rounded-lg shadow-sm p-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                  <span className="font-semibold text-indigo-600">#{index + 1}</span>
                  <span
                    className={`px-2 py-0.5 text-xs font-semibold rounded-full ${result.confidence === "HIGH MATCH"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    HIGH MATCH
                  </span>
                  <span>{result.type}</span>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  {content.issue}
                </h3>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded mb-3">
                  {content.solution}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <span className="text-purple-700 font-medium bg-purple-100 px-2 py-1 rounded-full text-xs">
                    AI Comprehensive Answer
                    </span>
                    {/* <span>👤 {result.author}</span> */}
                    <span>📅 {moment(result.created_at).format('DD/MM/YYYY')}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="border px-3 py-1 rounded text-sm hover:bg-gray-50" onClick={() => window.open(result.task_id, '_blank')}>📄 View Task</button>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-1">Related Keywords:</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {content?.keyword?.map((kw: string) => (
                      <button key={kw} className="border border-gray-300 px-2 py-0.5 rounded-full text-xs text-gray-600 hover:bg-gray-100" onClick={() => handleNavigateKnowBase(kw)}>  
                        {kw}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm font-medium text-gray-700 mb-1">How helpful was this solution?</p>
                  <div className="flex gap-2 text-xl">
                    {['😡', '😕', '😐', '😊', '😍'].map((emo, idx) => (
                      <button
                        key={idx}
                        className="hover:scale-110 transition-transform"
                        title={`Rating: ${emo}`}
                        onClick={() => {
                          setToast({ show: true, message: `Thanks your feedback` });
                          setTimeout(() => setToast({ show: false, message: "" }), 2000);
                        }}
                      >
                        {emo}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )})}
          </div>
        </div>
      )}
      {/* Toast Polaris style */}
      {toast.show && (
        <div className="fixed left-1/2 bottom-8 transform -translate-x-1/2 z-50">
          <div className="bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-up min-w-[200px] justify-center">
            <span className="text-lg">🔔</span>
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        </div>
      )}
      {/* Thêm animation cho toast */}
      <style jsx global>{`
      @keyframes fade-in-up {
        0% { opacity: 0; transform: translateY(40px) scale(0.95); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }
      .animate-fade-in-up {
        animation: fade-in-up 0.3s cubic-bezier(0.4,0,0.2,1);
      }
      `}</style>
    </div>
  );
}
