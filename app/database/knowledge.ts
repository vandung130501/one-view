import { pgClient } from './index';
import { toSql } from 'pgvector/pg';

/**
 * Kiểm tra kết nối với PostgreSQL
 */
export async function testConnection() {
    try {
        const res = await pgClient.query('SELECT NOW()');
        return { success: true, time: res.rows[0] };
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        return { success: false, error: message };
    }
}

export async function insertSupportKnowledgeBase({
    app_id,
    task_id,
    content,
    embedding,
}: {
    app_id: string;
    task_id: string;
    content: string;
    embedding: number[];
}) {
    try {
        const query = `
      INSERT INTO knowledge (app_id, task_id, content, embedding)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
        const values = [app_id, task_id, content, toSql(embedding)];
        const res = await pgClient.query(query, values);
        return { success: true, data: res.rows[0] };
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        return { success: false, error: message };
    }
}

// export async function querySupportKnowledgeBaseByAppIdAndEmbedding({
//     app_id,
//     embedding,
// }: {
//     app_id: string;
//     embedding: number[];
// }) {
//     try {
//         const query = `
//       SELECT id, app_id, task_id, content, created_at,
//              1 - (embedding <#> $1) AS similarity
//       FROM knowledge
//       WHERE app_id = $2
//       ORDER BY embedding <#> $1 ASC
//       LIMIT 5;
//     `;
//         const values = [toSql(embedding), app_id];
//         const res = await pgClient.query(query, values);
//         return { success: true, data: res.rows };
//     } catch (err: unknown) {
//         const message = err instanceof Error ? err.message : String(err);
//         return { success: false, error: message };
//     }
// }

export async function querySupportKnowledgeBaseByAppIdAndEmbedding({
    app_id,
    embedding,
    limit = 5
  }: {
    app_id: string;
    embedding: number[];
    limit?: number;
  }) {
    try {
      const query = `
        SELECT id, app_id, task_id, content, created_at,
               1 - (embedding <#> $1) AS similarity
        FROM knowledge
        WHERE app_id = $2
        ORDER BY embedding <#> $1 ASC
        LIMIT $3;
      `;
  
      const values = [toSql(embedding), app_id, limit];
      const res = await pgClient.query(query, values);
  
      const rows = res.rows;
      const similarities = rows.map(row => row.similarity);
  
      return {
        success: true,
        minSimilarity: Math.min(...similarities),
        maxSimilarity: Math.max(...similarities),
        data: rows // giữ nguyên similarity dạng float
      };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return { success: false, error: message };
    }
  }