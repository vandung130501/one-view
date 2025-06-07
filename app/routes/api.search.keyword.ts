import { ActionFunction, json } from "@remix-run/node";
import { promptOpenAI } from "~/utils/openai.server";
import { promtSearch } from "~/utils/system.promt";

export const action: ActionFunction = async ({ request }) => {
    try {
        const body = await request.json();
        if (!body?.keyword) {
            return json({ success: false, received: "Không có body" });
        }
        const prompt = await promptOpenAI(promtSearch, body?.keyword);
        const raw = prompt.choices[0]?.message?.content?.trim() || "{}"
        const match = raw.match(/\{[\s\S]*\}/)
        if (!match) throw new Error("Không parse được JSON từ kết quả AI.")
        return json({ success: true, received: JSON?.parse(match?.[0]) });
    } catch (error) {
        return json({ success: false, received: error });
    }
};