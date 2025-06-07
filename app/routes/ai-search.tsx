import { useEffect, useState } from "react";
import SearchConsole from "~/components/SearchConsole";

export default function AiSearch() {
    
    return (
        <div>
            <h1 className="text-xl font-bold">
                AI Search
            </h1>
            <SearchConsole />
        </div>);
}