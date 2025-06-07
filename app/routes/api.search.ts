import { ActionFunction, json } from "@remix-run/node";
import { querySupportKnowledgeBaseByAppIdAndEmbedding } from "~/database/knowledge";
import { getEmbedding } from "~/utils/openai.server";

export const action: ActionFunction = async ({ request }) => {
    try {
        const body = await request.json();
        if (!body?.keyword) {
            return json({ success: false, received: "Không có body" });
        }
        const embedding = await getEmbedding(body?.keyword)
        const database = await querySupportKnowledgeBaseByAppIdAndEmbedding({
            app_id: '6487a209-cd4c-47eb-a148-510553e966e3',
            embedding: embedding,
            limit: 5
        })
        console.log(body, "bodybodybodybodybodybody");
        
        return json({ success: false, received: database });
    } catch (error) {
        return json({ success: false, received: error });
    }
};