import { useEffect, useState } from "react";
import SearchConsole from "~/components/SearchConsole";

export default function AiSearch() {
    // const [rawData, setRawData] = useState([]);
    //   const [error, setError] = useState<string | null>(null);
    // async function fetchFullTasklists() {
    //     const res = await fetch('/api/wiki-raw-content');
    
    //     if (!res.ok) {
    //       throw new Error('Failed to fetch full tasklists');
    //     }
    
    //     const data = await res.json();
    //     return data;
    //   }
    
    //   useEffect(() => {
    //     fetchFullTasklists()
    //       .then((data) => setRawData(data.tasklists))
    //       .catch((err) => setError(err.message));
    //   }, []);
    
    //   console.log("rawData: ", rawData)
    return (
        <div>
            <h1 className="text-xl font-bold">
                AI Search
            </h1>
            <br />
            <SearchConsole />
        </div>);
}