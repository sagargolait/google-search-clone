"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { SearchSuggestions } from "./search-suggestions";
import { useState } from "react";

interface ImageSearchHeaderProps {
    query: string;
}

export function ImageSearchHeader({ query }: ImageSearchHeaderProps) {
    const [searchValue, setSearchValue] = useState(query);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    return (
        <div className="sticky top-0 bg-white border-b px-6 py-3 z-50">
            <div className="flex items-center gap-6">
                <Link href="/" className="shrink-0">
                    <img
                        src="/google-logo.png"
                        alt="Google"
                        className="h-8 w-auto"
                    />
                </Link>

                <div className="relative flex-1 max-w-2xl">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="w-full px-4 py-2 rounded-full border border-gray-200 focus:border-blue-500 focus:outline-none"
                            placeholder="Search images..."
                        />
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>

                    <SearchSuggestions
                        query={searchValue}
                        suggestions={suggestions}
                        onSelect={(suggestion) => setSearchValue(suggestion)}
                    />
                </div>
            </div>
        </div>
    );
} 