import { LoaderFunction, json } from "@remix-run/node";


interface WikiDoc {
    spaceId: string;
    spaceName: string;
    docTitle: string;
    docContent: string;
  }
export const loader: LoaderFunction = async () => {
  const TOKEN = `Bearer ${process.env.LARK_TOKEN}`;
  

  try {
    const spaceRes = await fetch(
      "https://open.larksuite.com/open-apis/wiki/v2/spaces?lang=en&page_size=20",
      {
        method: "GET",
        headers: {
          Authorization: TOKEN,
          "Content-Type": "application/json",
        },
      }
    );
    const spaceData = await spaceRes.json();
    const space = spaceData?.data?.items?.[0];
   
    if (!space?.space_id) throw new Error("No wiki space found");

    const nodesRes = await fetch(
      `https://open.larksuite.com/open-apis/wiki/v2/spaces/${space.space_id}/nodes?page_size=50`,
      {
        method: "GET",
        headers: {
          Authorization: TOKEN,
          "Content-Type": "application/json",
        },
      }
    );
    const nodesData = await nodesRes.json();
    const node = nodesData?.data?.items?.[0];
    if (!node?.obj_token) throw new Error("No document found in wiki node");

    const docRes = await fetch(
      `https://open.larksuite.com/open-apis/docx/v1/documents/${node.obj_token}/raw_content?lang=0`,
      {
        method: "GET",
        headers: {
          Authorization: TOKEN,
          "Content-Type": "application/json",
        },
      }
    );
    const docData = await docRes.json();

    const result: WikiDoc = {
      spaceId: space.space_id,
      spaceName: space.name,
      docTitle: node.title,
      docContent: docData?.data?.content || "(No content)",
    };

    return json({ wiki: result });
  } catch (error) {
    console.error("Wiki fetch failed:", error);
    return json({ wiki: null });
  }
};


