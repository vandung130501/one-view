import axios from "axios";
import { useState } from "react";

const Setting = () => {
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");

  const covertDataToVector = async () => {
    const res = await axios.post('/api/sync-task', data?.[2]);
    console.log(res.data, "Res");
  }
  const fetchFullTasklists = async () => {
    const res = await fetch('/api/sync-data-list-task-support');

    if (!res.ok) {
      throw new Error('Failed to fetch full tasklists');
    }
    
    const data = await res.json();
    console.log(data,"res");
    setData(data?.tasklists?.[0]?.tasks);
    // return data;
  }
  
  const handleKeywordSearch = async () => {
    const res = await axios.post('/api/search', { keyword });
    const data = await res.data;
    console.log(data, "Res");
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <h1>Setting</h1>
      <button onClick={fetchFullTasklists}>Sync</button>
      <br />
      <button onClick={covertDataToVector}>covertDataToVector</button>
      <br />
      <input
        type="text"
        placeholder="Nhập keyword..."
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        style={{ width: 200 }}
      />
      <button onClick={handleKeywordSearch}>Tìm kiếm keyword</button>
    </div>
  )
}

export default Setting