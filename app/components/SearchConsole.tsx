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
  const [additionalInfo, setAdditionalInfo] = useState<any[]>([]);
  const [isShowAdditionalInfo, setIsShowAdditionalInfo] = useState(false);
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
  const handleGenAdditionalInfo = async (result: any) => {
    try {
      setIsShowAdditionalInfo(true);

      const content = result?.content
      const res = await axios.post('/api/additional-info', { content: content });
      if (res.data?.success) {
        console.log(res.data?.received);
        // setToast({ show: true, message: `Thanks your feedback` });
        // setTimeout(() => setToast({ show: false, message: "" }), 2000);
        setAdditionalInfo(res.data?.received);
      }
    } catch (error) {
      setIsShowAdditionalInfo(false);
    } finally {
      setIsShowAdditionalInfo(false);
    }
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
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-2">
                    <button onClick={()=>{handleGenAdditionalInfo(result)}} data-lov-id="src/components/ResultsPanel.tsx:173:18" data-lov-name="Button" data-component-path="src/components/ResultsPanel.tsx" data-component-line="173" data-component-file="ResultsPanel.tsx" data-component-name="Button" data-component-content="%7B%22text%22%3A%22AI%20Comprehensive%20Answer%22%2C%22className%22%3A%22h-8%20text-xs%20bg-gradient-to-r%20from-purple-50%20to-blue-50%20border-purple-200%20hover%3Afrom-purple-100%20hover%3Ato-blue-100%22%7D" class="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border bg-background hover:bg-accent hover:text-accent-foreground rounded-md px-3 h-8 text-xs bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 hover:from-purple-100 hover:to-blue-100"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-brain h-3 w-3 mr-1" data-lov-id="src/components/ResultsPanel.tsx:179:20" data-lov-name="Brain" data-component-path="src/components/ResultsPanel.tsx" data-component-line="179" data-component-file="ResultsPanel.tsx" data-component-name="Brain" data-component-content="%7B%22className%22%3A%22h-3%20w-3%20mr-1%22%7D"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"></path><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"></path><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"></path><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"></path><path d="M3.477 10.896a4 4 0 0 1 .585-.396"></path><path d="M19.938 10.5a4 4 0 0 1 .585.396"></path><path d="M6 18a4 4 0 0 1-1.967-.516"></path><path d="M19.967 17.484A4 4 0 0 1 18 18"></path></svg>AI Comprehensive Answer<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles h-3 w-3 ml-1 text-purple-500"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path></svg></button>
                    {/* <span>👤 {result.author}</span> */}
                    <span>📅 {moment(result.created_at).format('DD/MM/YYYY')}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="border px-3 py-1 rounded text-sm hover:bg-gray-50" onClick={() => window.open(result.task_id, '_blank')}>📄 View Task</button>
                  </div>
                  </div>
                  {isShowAdditionalInfo ?
                    <div className="flex-1 flex items-center justify-center py-16">
                      <div className="flex flex-col items-center gap-4">
                        <svg className="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                      </div>
                    </div>
                    : additionalInfo?.issue && <div data-lov-id="src/components/ResultsPanel.tsx:187:18" data-lov-name="div" data-component-path="src/components/ResultsPanel.tsx" data-component-line="187" data-component-file="ResultsPanel.tsx" data-component-name="div" data-component-content="%7B%22className%22%3A%22bg-gradient-to-r%20from-purple-50%20to-blue-50%20border%20border-purple-200%20rounded-lg%20p-4%20mb-3%22%7D" class="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4 mb-3">
                      <div data-lov-id="src/components/ResultsPanel.tsx:188:20" data-lov-name="div" data-component-path="src/components/ResultsPanel.tsx" data-component-line="188" data-component-file="ResultsPanel.tsx" data-component-name="div" data-component-content="%7B%22className%22%3A%22flex%20items-center%20gap-2%20mb-3%22%7D" class="flex items-center gap-2 mb-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-brain h-4 w-4 text-purple-600" data-lov-id="src/components/ResultsPanel.tsx:189:22" data-lov-name="Brain" data-component-path="src/components/ResultsPanel.tsx" data-component-line="189" data-component-file="ResultsPanel.tsx" data-component-name="Brain" data-component-content="%7B%22className%22%3A%22h-4%20w-4%20text-purple-600%22%7D"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"></path><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"></path><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"></path><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"></path><path d="M3.477 10.896a4 4 0 0 1 .585-.396"></path><path d="M19.938 10.5a4 4 0 0 1 .585.396"></path><path d="M6 18a4 4 0 0 1-1.967-.516"></path><path d="M19.967 17.484A4 4 0 0 1 18 18"></path></svg><span data-lov-id="src/components/ResultsPanel.tsx:190:22" data-lov-name="span" data-component-path="src/components/ResultsPanel.tsx" data-component-line="190" data-component-file="ResultsPanel.tsx" data-component-name="span" data-component-content="%7B%22text%22%3A%22AI-Generated%20Comprehensive%20Solution%22%2C%22className%22%3A%22font-medium%20text-purple-800%20text-sm%22%7D" class="font-medium text-purple-800 text-sm">AI-Generated Comprehensive Solution</span><button data-lov-id="src/components/ResultsPanel.tsx:191:22" data-lov-name="Button" data-component-path="src/components/ResultsPanel.tsx" data-component-line="191" data-component-file="ResultsPanel.tsx" data-component-name="Button" data-component-content="%7B%22className%22%3A%22h-6%20w-6%20p-0%20ml-auto%22%7D" class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground rounded-md h-6 w-6 p-0 ml-auto"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy h-3 w-3" data-lov-id="src/components/ResultsPanel.tsx:197:24" data-lov-name="Copy" data-component-path="src/components/ResultsPanel.tsx" data-component-line="197" data-component-file="ResultsPanel.tsx" data-component-name="Copy" data-component-content="%7B%22className%22%3A%22h-3%20w-3%22%7D"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg></button></div><div data-lov-id="src/components/ResultsPanel.tsx:200:20" data-lov-name="div" data-component-path="src/components/ResultsPanel.tsx" data-component-line="200" data-component-file="ResultsPanel.tsx" data-component-name="div" data-component-content="%7B%22className%22%3A%22text-sm%20text-slate-700%20leading-relaxed%20whitespace-pre-line%22%7D" class="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                        <h3 className="text-base font-semibold text-gray-900 mb-2">
                          {additionalInfo?.issue}
                        </h3>
                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded mb-3">
                          {additionalInfo?.solution}
                        </p>
                      </div>
                    </div>}
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
