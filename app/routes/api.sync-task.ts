import { json, ActionFunction } from "@remix-run/node";
import { insertSupportKnowledgeBase } from "~/database/knowledge";
import { formatSupportTaskImproved } from "~/utils/formatUserContent";
import { getEmbedding, promptOpenAI } from "~/utils/openai.server";
import { promtSyncTask } from "~/utils/system.promt";

export const action: ActionFunction = async ({ request }) => {
    try {
        const body = await request.json();
        if (!body?.detail?.task_url) {
            return json({ success: false, received: "Không có task_url" });
        }
        const formatData = formatSupportTaskImproved(body);
        const prompt = await promptOpenAI(promtSyncTask, formatData);
        const raw = prompt.choices[0]?.message?.content?.trim() || "{}"
        const match = raw.match(/\{[\s\S]*\}/)
        if (!match) throw new Error("Không parse được JSON từ kết quả AI.")
        // const result = JSON.parse(match[0])

        const embedding = await getEmbedding(match[0])
        const database = await insertSupportKnowledgeBase({
            app_id: body?.app_id,
            task_id: body?.taskId,
            content: match[0],
            embedding: embedding,
        })
        // Xử lý gì đó...
        return json({ success: true, received: database });
    } catch (error) {
        return json({ success: false, received: error });
    }
};