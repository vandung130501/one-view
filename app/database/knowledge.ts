import { pgClient } from './index';
import { toSql } from 'pgvector/pg';

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
        console.log('insertSupportKnowledgeBase: Bắt đầu insert');
        // Kiểm tra kết nối
        if (!pgClient) {
            console.error('pgClient chưa được khởi tạo!');
            throw new Error('pgClient chưa được khởi tạo!');
        }
        // Kiểm tra trạng thái kết nối
        // @ts-ignore
        if (pgClient._connected === false) {
            console.error('pgClient chưa kết nối!');
            throw new Error('pgClient chưa kết nối!');
        }
        const query = `
      INSERT INTO knowledge (app_id, task_id, content, embedding)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
        const values = [app_id, task_id, content, toSql(embedding)];
        console.log('Query:', query);
        console.log('Values:', values);
        const res = await pgClient.query(query, values);
        console.log('Insert thành công:', res.rows[0]);
        return { success: true, data: res.rows[0] };
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        console.error('Lỗi khi insertSupportKnowledgeBase:', message);
        return { success: false, error: message };
    }
}

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

    return {
      success: true,
      data: res.rows.map((row) => ({
        ...row,
      }))
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: message };
  }
}
