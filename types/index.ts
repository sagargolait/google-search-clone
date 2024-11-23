export interface SearchResult {
  kind: string;
  title: string;
  htmlTitle: string;
  link: string;
  displayLink: string;
  snippet: string;
  htmlSnippet: string;
  cacheId: string;
  formattedUrl: string;
  htmlFormattedUrl: string;
  pagemap?: {
    cse_thumbnail?: any[];
    metatags?: any[];
    cse_image?: any[];
  };
}

export interface SearchResponse {
  items: SearchResult[];
  searchInformation: {
    searchTime: number;
    formattedSearchTime: string;
    totalResults: string;
    formattedTotalResults: string;
  };
  queries: {
    request: any[];
    nextPage: any[];
  };
}
