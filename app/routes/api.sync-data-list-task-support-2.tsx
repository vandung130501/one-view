// app/routes/api/tasklists.full.ts
import { json } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';

const BASE_URL = 'https://open.larksuite.com/open-apis';
const USER_ID_TYPE = 'open_id';

export const loader: LoaderFunction = async () => {
  const token = process.env.LARK_TOKEN;
  if (!token) {
    return json({ error: 'LARK_TOKEN is not set' }, { status: 500 });
  }

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // 1. Lấy toàn bộ tasklists bằng phân trang
  async function fetchAllTasklists(): Promise<any[]> {
    let tasklists: any[] = [];
    let pageToken: string | undefined = undefined;

    do {
      const url = new URL(`${BASE_URL}/task/v2/tasklists`);
      url.searchParams.set('page_size', '50');
      url.searchParams.set('user_id_type', USER_ID_TYPE);
      if (pageToken) url.searchParams.set('page_token', pageToken);

      const res = await fetch(url.toString(), { headers });
      if (!res.ok) throw new Error('Lỗi khi gọi API tasklists');

      const data = await res.json();
      tasklists = tasklists.concat(data?.data?.items || []);
      pageToken = data?.data?.page_token;
    } while (pageToken);

    return tasklists;
  }

  // 2. Lấy tất cả task, detail, comment cho mỗi tasklist
  async function fetchTaskDetails(tasklistId: string) {
    const tasks: any[] = [];
    let pageToken: string | undefined = undefined;

    // 2.1 Lặp để lấy hết tasks theo page
    do {
      const url = new URL(`${BASE_URL}/task/v2/tasklists/${tasklistId}/tasks`);
      url.searchParams.set('page_size', '50');
      url.searchParams.set('completed', 'true');
      url.searchParams.set('user_id_type', USER_ID_TYPE);
      if (pageToken) url.searchParams.set('page_token', pageToken);

      const res = await fetch(url.toString(), { headers });
      if (!res.ok) break;

      const data = await res.json();
      tasks.push(...(data?.data?.items || []));
      pageToken = data?.data?.page_token;
    } while (pageToken);

    // 2.2 Lấy detail và comment song song
    const detailedTasks = await Promise.all(
      tasks.map(async (task) => {
        const taskId = task.guid;

        const [detailRes, commentRes] = await Promise.all([
          fetch(`${BASE_URL}/task/v2/tasks/${taskId}?user_id_type=${USER_ID_TYPE}`, { headers }),
          fetch(`${BASE_URL}/task/v2/comments?direction=asc&page_size=50&resource_id=${taskId}&resource_type=task&user_id_type=${USER_ID_TYPE}`, { headers }),
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

    return detailedTasks;
  }

  // 3. Tổng hợp mọi thứ
  try {
    const tasklists = await fetchAllTasklists();

    const results = await Promise.all(
      tasklists.map(async (tasklist) => {
        const tasks = await fetchTaskDetails(tasklist.guid);
        return {
          tasklistId: tasklist.guid,
          tasklistName: tasklist.summary,
          tasks,
        };
      })
    );

    return json({ tasklists: results });
  } catch (error: any) {
    console.error('Lỗi tổng hợp:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
};
