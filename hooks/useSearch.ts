import useSWR from "swr";

interface SearchResult {
  items: any[];
  searchInformation: {
    totalResults: string;
    searchTime: number;
  };
  queries: {
    request: any[];
    nextPage: any[];
  };
}

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_SEARCH_API_KEY;
const GOOGLE_CX = process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CX;

const fetcher = async (query: string, start: string, searchType: string) => {
  const res = await fetch(
    `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}&q=${encodeURIComponent(
      query
    )}&start=${start}${searchType ? `&searchType=${searchType}` : ""}`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch search results");
  }

  const data = await res.json();
  return {
    items: data.items || [],
    searchInformation: data.searchInformation,
    queries: data.queries,
  };
};

export function useSearch(query: string, page: number = 1, searchType: string) {
  const start = ((page - 1) * 10 + 1).toString();

  const { data, error, isLoading } = useSWR<SearchResult>(
    query ? [query, start, searchType] : null,
    ([q, s, st]) => fetcher(q as string, s as string, st as string),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    results: data?.items || [],
    searchInfo: data?.searchInformation,
    queries: data?.queries,
    isLoading,
    isError: error,
  };
}
