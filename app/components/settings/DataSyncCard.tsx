import { useState } from "react";

export default function DataSyncCard() {
  const [syncProductDocs, setSyncProductDocs] = useState(true);
  const [syncSupportTasks, setSyncSupportTasks] = useState(true);
  const [frequency, setFrequency] = useState("Every Hour");

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6 space-y-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Data Synchronization
      </h3>

      {/* Product Docs */}
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <div className="font-medium">Sync Product Documents</div>
          <div className="text-sm text-gray-500">
            Automatically sync product documentation and guides
          </div>
        </div>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={syncProductDocs}
            onChange={() => setSyncProductDocs(!syncProductDocs)}
          />
          <div className="w-11 h-6 bg-gray-200 peer-checked:bg-blue-500 rounded-full peer peer-focus:ring-2 ring-blue-300 transition"></div>
        </label>
      </div>

      {/* Support Tasks */}
      <div className="flex justify-between items-start">
        <div>
          <div className="font-medium">Sync Support Tasks from Lark Base</div>
          <div className="text-sm text-gray-500">
            Import resolved support tasks for AI learning
          </div>
          <div className="mt-2">
            <label className="text-sm text-gray-600 mr-2">Sync Frequency:</label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="border px-2 py-1 rounded"
            >
              <option>Every Hour</option>
              <option>Every 6 Hours</option>
              <option>Daily</option>
            </select>
          </div>
        </div>
        <label className="inline-flex items-center cursor-pointer mt-2">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={syncSupportTasks}
            onChange={() => setSyncSupportTasks(!syncSupportTasks)}
          />
          <div className="w-11 h-6 bg-gray-200 peer-checked:bg-blue-500 rounded-full peer transition"></div>
        </label>
      </div>

      <div className="text-right">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          💾 Save Sync Settings
        </button>
      </div>
    </div>
  );
}
