import type { MetaFunction, LoaderFunction, ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import { testConnection, insertSupportKnowledgeBase, querySupportKnowledgeBaseByAppIdAndEmbedding } from "~/database/knowledge";
import { useRef } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async () => {
  const result = await testConnection();
  return json(result);
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const actionType = formData.get("actionType");

  if (actionType === "insert") {
    // Dữ liệu fake
    const fakeData = {
      app_id: "00000000-0000-0000-0000-000000000001",
      task_id: "00000000-0000-0000-0000-000000000002",
      content: "Nội dung test insert support knowledge base",
      embedding: Array(1536).fill(0.1234), // mảng 1536 số thực
    };
    const result = await insertSupportKnowledgeBase(fakeData);
    return json({ type: "insert", ...result });
  }

  if (actionType === "query") {
    const app_id = formData.get("app_id") as string;
    // Dùng embedding fake để test
    const embedding = Array(1536).fill(0.1234);
    const result = await querySupportKnowledgeBaseByAppIdAndEmbedding({ app_id, embedding });
    return json({ type: "query", ...result });
  }

  return json({ error: "No actionType" });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  const appIdRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <h1>Hello World</h1>
      <div>
        <h2>Kết quả test kết nối DB:</h2>
        <pre>{JSON.stringify(data)}</pre>
      </div>
==================================
      <fetcher.Form method="post">
        <input type="hidden" name="actionType" value="insert" />
        <button type="submit">Test insertSupportKnowledgeBase</button>
      </fetcher.Form>
      =====================================

      <div style={{ marginTop: 24 }}>
        <fetcher.Form method="post">
          <input type="hidden" name="actionType" value="query" />
          <label>
            App ID:&nbsp;
            <input
              name="app_id"
              ref={appIdRef}
              defaultValue="00000000-0000-0000-0000-000000000001"
              style={{ width: 340 }}
            />
          </label>
          <button type="submit" style={{ marginLeft: 8 }}>
            Query support_knowledge_base (top 5)
          </button>
        </fetcher.Form>
      </div>
      {fetcher.data && fetcher.data.type === "insert" && (
        <div>
          <h2>Kết quả insert:</h2>
          <pre>{JSON.stringify(fetcher.data, null, 2)}</pre>
        </div>
      )}
      {fetcher.data && fetcher.data.type === "query" && (
        <div>
          <h2>Kết quả truy vấn theo app_id & embedding:</h2>
          <pre>{JSON.stringify(fetcher.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}