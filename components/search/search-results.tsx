"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { useSearch } from "@/hooks/useSearch";

interface SearchResultsProps {
  query: string;
  searchType: string;
}

export default function SearchResults({
  query,
  searchType,
}: SearchResultsProps) {
  const { results, isLoading, isError } = useSearch(query, 1, searchType);

  if (isError) {
    return <div>Error loading search results</div>;
  }

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4 py-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-[#303134] rounded w-2/3"></div>
            <div className="h-3 bg-[#303134] rounded w-full"></div>
            <div className="h-3 bg-[#303134] rounded w-4/5"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="py-4 space-y-8">
      <p className="text-[#9aa0a6] text-sm">
        About {results.length.toLocaleString()} results (0.42 seconds)
      </p>

      {results.map((result, index) => (
        <div key={index} className="max-w-[652px]">
          <div className="group">
            <a
              href={result.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#9aa0a6] hover:underline mb-1 inline-flex items-center"
            >
              {result.link}
              <ExternalLink className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100" />
            </a>
            <h2 className="text-xl">
              <a
                href={result.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8ab4f8] hover:underline"
              >
                {result.title}
              </a>
            </h2>
            <p className="text-[#bdc1c6] text-sm mt-1">{result.snippet}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
