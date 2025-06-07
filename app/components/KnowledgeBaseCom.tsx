import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function KnowledgeBaseCom() {
  const { state } = useLocation();
  const [search, setSearch] = useState("");
  const [override, setOverride] = useState(state || null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string }>({ show: false, message: "" });

  useEffect(() => {
   setSearch(state || "");
   handleSearchKeyword(state || "");
  }, [state]);

  useEffect(() => {
 if(!search){
  setOverride(null);
 }
  }, [search]);

  const handleSearchKeyword = async (keyword: string) => {
    setLoading(true);
    try {
      const res = await axios.post('/api/search/keyword', { keyword: keyword });
      if(res.data?.success){
        setOverride(res.data?.received);
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex flex-col h-full px-6 py-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3 text-slate-800">
        <span className="text-blue-600">📘</span> Knowledge Base
        {state?.title && (
          <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
            Filtered by: {state.title}
          </span>
        )}
      </h1>

      <div className="w-full max-w-6xl mx-auto mb-6 flex items-center gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Any keyword..."
            className="w-full border border-gray-300 px-10 py-2 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>
        <button onClick={() => handleSearchKeyword(search)} className="px-5 py-2 bg-[#a5b4fc] text-white text-sm rounded-md hover:bg-[#818cf8] transition">Search</button>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <svg className="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
          </div>
        </div>
      ) : override?.definition ? (
        <div className="w-full max-w-6xl mx-auto bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <div className="text-sm font-medium text-gray-700 mb-1 mt-4">Định nghĩa:</div>
          <h2 className="text-sm text-gray-800 bg-gray-50 p-4 rounded mb-4 border border-gray-100">{override.definition}</h2>
          <div className="text-sm font-medium text-gray-700 mb-1 mt-4">Ví dụ:</div>
          <p className="text-sm text-gray-700 bg-gray-50 p-4 rounded mb-4 border border-gray-100">
            {override.example}
          </p>

            <p className="text-sm font-medium text-gray-700 mb-1">How helpful was this solution?</p>
            <div className="flex gap-2 text-xl">
              {["😡", "😕", "😐", "😊", "😍"].map((emo, idx) => (
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
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-3xl bg-white border rounded-lg p-10 text-center shadow-sm">
            <div className="text-5xl text-gray-400 mb-4">🔍</div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Knowledge Base Management
            </h2>
            <p className="text-gray-500">
              
            </p>
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
      <style>
      {`
      @keyframes fade-in-up {
        0% { opacity: 0; transform: translateY(40px) scale(0.95); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }
      .animate-fade-in-up {
        animation: fade-in-up 0.3s cubic-bezier(0.4,0,0.2,1);
      }
      `}
      </style>
    </div>
  );
}