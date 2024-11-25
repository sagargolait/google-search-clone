"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import SearchHeader from "@/components/search/search-header";
import SearchResults from "@/components/search/search-results";
import SearchFilters from "@/components/search/search-filters";
import { LoadingSpinner } from "@/components/loading-spinner";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div>
          <LoadingSpinner />
        </div>
      }
    >
      <SearchComponent />
    </Suspense>
  );
}

function SearchComponent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const searchType = searchParams.get("searchType") || "";
  return (
    <div className="min-h-screen bg-[#202124]">
      <SearchHeader initialQuery={query} />
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <SearchFilters />
        <SearchResults query={query} searchType={searchType} />
      </div>
    </div>
  );
}
