type SupportTask = {
    taskId: string;
    detail: {
      task_url: string;
      description: string;
      members: {
        id: string;
        role: string;
        type: string;
      }[];
    };
    comments: {
      content: string;
      creator: {
        id: string;
        type: string;
      };
      created_at: string;
    }[];
  };
  
  function shortId(id: string): string {
    return id.length > 10 ? `${id.slice(0, 6)}...` : id;
  }
  
  export function formatSupportTaskImproved(data: SupportTask): string {
    const { taskId, detail, comments } = data;
  
    const taskUrl = detail.task_url;
    const descriptionLines = detail.description.trim().split('\n').map(line => line.trim());
  
    const customerLines: string[] = [];
    const internalNotes: string[] = [];
  
    for (const line of descriptionLines) {
      const lower = line.toLowerCase();
      if (
        lower.includes("refund") ||
        lower.includes("asap") ||
        lower.includes("monday") ||
        lower.includes("ending") ||
        lower.includes("store")
      ) {
        customerLines.push(line);
      } else {
        internalNotes.push(line);
      }
    }
  
    const membersGrouped = detail.members.reduce<Record<string, string[]>>((acc, m) => {
      acc[m.role] = acc[m.role] || [];
      acc[m.role].push(shortId(m.id));
      return acc;
    }, {});
  
    const commentLines = comments.map((c) => {
      const who = shortId(c.creator.id);
      const content = c.content.trim().replace(/\n+/g, " ");
      return `- ${who}: "${content}"`;
    });
  
    return [
      `# Task Summary: Customer Refund Request`,
      ``,
      `## Task Info`,
      `- Task ID: ${taskId}`,
      `- Task URL: ${taskUrl}`,
      ``,
      `## Customer Request`,
      customerLines.length > 0
        ? customerLines.map(l => `- ${l}`).join('\n')
        : '- (Không phát hiện yêu cầu khách hàng rõ ràng)',
      ``,
      `## Internal Notes`,
      internalNotes.length > 0
        ? internalNotes.map(l => `- ${l}`).join('\n')
        : '- (Không có ghi chú nội bộ)',
      ``,
      `## Team Involved`,
      Object.entries(membersGrouped)
        .map(([role, ids]) => `- ${role}: ${ids.join(', ')}`)
        .join('\n'),
      ``,
      `## Comments & Actions`,
      commentLines.join('\n')
    ].join('\n');
  }
  