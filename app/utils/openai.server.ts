import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function normalizeVector(vec: number[]): number[] {
  const norm = Math.sqrt(vec.reduce((sum, val) => sum + val * val, 0));
  return norm === 0 ? vec : vec.map((v) => v / norm);
}

export async function getEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });

  const raw = response.data[0].embedding;
  const normalized = normalizeVector(raw);
  return normalized;
}

export async function promptOpenAI(systemPrompt: string, userContent: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.3,
      max_tokens: 600,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent }
      ],
    });
    return completion;
  } catch (error) {
    console.error("Lỗi khi gọi OpenAI API:", error);
    throw error;
  }
}
