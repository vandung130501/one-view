// app/routes/api/tasklists.full.ts
import { json } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = async () => {
  const token = process.env.LARK_TOKEN;
//   const token = 'u-c1H4dW2bR2P9uzteMIWbwPghn.Mv04yjpOww15c02dOK';

  if (!token) {
    return json({ error: 'LARK_TOKEN is not set' }, { status: 500 });
  }

  // 1. Lấy tất cả tasklists
  const tasklistsRes = await fetch(
    'https://open.larksuite.com/open-apis/task/v2/tasklists?page_size=50&user_id_type=open_id',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!tasklistsRes.ok) {
    return json({ error: 'Failed to fetch tasklists' }, { status: tasklistsRes.status });
  }

  const tasklistsData = await tasklistsRes.json();
  const tasklists = tasklistsData.data?.items || [];

  // 2. Với mỗi tasklist → lấy tasks + chi tiết + comments
  const results = await Promise.all(
    tasklists.map(async (tasklist: any) => {
      const tasklistId = tasklist.guid;

      // Lấy task trong từng tasklist
      const taskRes = await fetch(
        `https://open.larksuite.com/open-apis/task/v2/tasklists/${tasklistId}/tasks?completed=true&page_size=50&user_id_type=open_id`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!taskRes.ok) {
        return { tasklistId, error: 'Failed to fetch tasks' };
      }

      const taskData = await taskRes.json();
      const tasks = taskData.data?.items || [];

      const detailedTasks = await Promise.all(
        tasks.map(async (task: any) => {
          const taskId = task.guid;

          const [detailRes, commentRes] = await Promise.all([
            fetch(`https://open.larksuite.com/open-apis/task/v2/tasks/${taskId}?user_id_type=open_id`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            fetch(`https://open.larksuite.com/open-apis/task/v2/comments?direction=asc&page_size=50&resource_id=${taskId}&resource_type=task&user_id_type=open_id`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

          const detail = detailRes.ok ? await detailRes.json() : null;
          const comments = commentRes.ok ? await commentRes.json() : null;

          return {
            taskId,
            detail: detail?.data || null,
            comments: comments?.data?.items || [],
          };
        })
      );

      return {
        tasklistId,
        tasklistName: tasklist.summary,
        tasks: detailedTasks,
      };
    })
  );

  return json({ tasklists: results });
};
