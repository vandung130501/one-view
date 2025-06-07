import type { MetaFunction, LoaderFunction, ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
// import { testConnection, insertSupportKnowledgeBase, querySupportKnowledgeBaseByAppIdAndEmbedding } from "~/database/knowledge";
import { useRef } from "react";
import { useEffect, useState } from "react";
import Sidebar from "~/components/Sidebar";
import SearchConsole from "~/components/SearchConsole";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

// export const loader: LoaderFunction = async () => {
//   const result = await testConnection();
//   return json(result);
// };

// export const action: ActionFunction = async ({ request }) => {
//   const formData = await request.formData();
//   const actionType = formData.get("actionType");

//   if (actionType === "insert") {
//     // Dữ liệu fake
//     const fakeData = {
//       app_id: "00000000-0000-0000-0000-000000000001",
//       task_id: "00000000-0000-0000-0000-000000000002",
//       content: "Nội dung test insert support knowledge base",
//       embedding: Array(1536).fill(0.1234), // mảng 1536 số thực
//     };
//     const result = await insertSupportKnowledgeBase(fakeData);
//     return json({ type: "insert", ...result });
//   }

//   if (actionType === "query") {
//     const app_id = formData.get("app_id") as string;
//     // Dùng embedding fake để test
//     const embedding = Array(1536).fill(0.1234);
//     const result = await querySupportKnowledgeBaseByAppIdAndEmbedding({ app_id, embedding });
//     return json({ type: "query", ...result });
//   }

//   return json({ error: "No actionType" });
// };

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  const appIdRef = useRef<HTMLInputElement>(null);

  const [tasklists, setTasklists] = useState([]);
  const [error, setError] = useState<string | null>(null);

  async function fetchFullTasklists() {
    const res = await fetch('/api/sync-data-list-task-support');
  
    if (!res.ok) {
      throw new Error('Failed to fetch full tasklists');
    }

    const data = await res.json();
    return data;
  }

  useEffect(() => {
    fetchFullTasklists()
      .then((data) => setTasklists(data.tasklists))
      .catch((err) => setError(err.message));
  }, []);

  console.log("tasklists: ", tasklists)

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">AI Search Console</h1>

      <div className="flex flex-col space-y-2 w-1/2">
        <label className="font-medium">Select App:</label>
        <select className="border px-3 py-2 rounded">
          <option>Select applications…</option>
        </select>
      </div>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Describe your issue in Vietnamese or English..."
          className="w-2/3 px-4 py-3 border rounded shadow-sm"
        />
        <button className="ml-2 px-6 py-3 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition">
          Search
        </button>
        <p className="text-gray-400 mt-2 text-sm">
          💡 Try: "pixel không hoạt động", "conversion events", "lỗi cài đặt"
        </p>
      </div>

      <div className="absolute bottom-4 right-6 text-sm text-right text-gray-500">
        <div>✅ 94%</div>
        <div>⏱ 2.3min</div>
      </div>
    </div>
  );
}