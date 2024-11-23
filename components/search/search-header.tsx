"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Mic, Camera, X, Menu, Settings } from "lucide-react";

interface SearchHeaderProps {
  initialQuery: string;
}

export default function SearchHeader({ initialQuery }: SearchHeaderProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 w-full bg-[#202124] px-4 py-2 z-50">
      <div className="max-w-[1400px] mx-auto flex items-center gap-8">
        <Link href="/" className="flex-shrink-0 ">
          <svg viewBox="0 0 272 92" width="92" height="30">
            <path
              fill="#4285F4"
              d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
            ></path>
            <path
              fill="#EA4335"
              d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
            ></path>
            <path
              fill="#FBBC05"
              d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"
            ></path>
            <path fill="#34A853" d="M225 3v65h-9.5V3h9.5z"></path>
            <path
              fill="#EA4335"
              d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"
            ></path>
            <path
              fill="#4285F4"
              d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z"
            ></path>
          </svg>
        </Link>

        <form onSubmit={handleSearch} className="flex-grow max-w-[692px]">
          <div className="relative flex items-center w-full bg-[#202124] rounded-[24px] border border-[#5f6368] hover:bg-[#5f6368] hover:shadow-none">
            <input
              type="text"
              className="w-full px-4 py-3 bg-transparent outline-none text-[#e8eaed] text-base "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="p-2 hover:bg-[#303134] rounded-full"
              >
                <X className="w-5 h-5 text-[#9aa0a6]" />
              </button>
            )}
            <div className="w-[1px] h-6 bg-[#5f6368] mx-1"></div>
            <button
              title="Search by Voice"
              className="p-2 transition-colors w-[40px] h-[44px]"
            >
              <svg
                focusable="false"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#4285f4"
                  d="m12 15c1.66 0 3-1.31 3-2.97v-7.02c0-1.66-1.34-3.01-3-3.01s-3 1.34-3 3.01v7.02c0 1.66 1.34 2.97 3 2.97z"
                ></path>
                <path fill="#34a853" d="m11 18.08h2v3.92h-2z"></path>
                <path
                  fill="#fbbc04"
                  d="m7.05 16.87c-1.27-1.33-2.05-2.83-2.05-4.87h2c0 1.45 0.56 2.42 1.47 3.38v0.32l-1.15 1.18z"
                ></path>
                <path
                  fill="#ea4335"
                  d="m12 16.93a4.97 5.25 0 0 1 -3.54 -1.55l-1.41 1.49c1.26 1.34 3.02 2.13 4.95 2.13 3.87 0 6.99-2.92 6.99-7h-1.99c0 2.92-2.24 4.93-5 4.93z"
                ></path>
              </svg>
            </button>
            <button
              title="Search by Image"
              className="p-2 transition-colors w-[40px] h-[44px]"
            >
              <svg
                className="Gdd5U"
                focusable="false"
                viewBox="0 0 192 192"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect fill="none" height="192" width="192"></rect>
                <g>
                  <circle fill="#34a853" cx="144.07" cy="144" r="16"></circle>
                  <circle fill="#4285f4" cx="96.07" cy="104" r="24"></circle>
                  <path
                    fill="#ea4335"
                    d="M24,135.2c0,18.11,14.69,32.8,32.8,32.8H96v-16l-40.1-0.1c-8.8,0-15.9-8.19-15.9-17.9v-18H24V135.2z"
                  ></path>
                  <path
                    fill="#fbbc04"
                    d="M168,72.8c0-18.11-14.69-32.8-32.8-32.8H116l20,16c8.8,0,16,8.29,16,18v30h16V72.8z"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="M112,24l-32,0L68,40H56.8C38.69,40,24,54.69,24,72.8V92h16V74c0-9.71,7.2-18,16-18h80L112,24z"
                  ></path>
                </g>
              </svg>
            </button>
            <button
              title="Search"
              type="submit"
              className="p-2 rounded-full mr-2"
            >
              <Search className="w-5 h-5 text-[#9aa0a6]" />
            </button>
          </div>
        </form>

        <div className="flex ml-auto mr-2 items-center gap-4">
          <button className="p-2 hover:bg-[#303134] rounded-full">
            <Settings className="w-6 h-6 text-[#e8eaed]" />
          </button>
          <button className="p-2 hover:bg-[#303134] rounded-full">
            <Menu className="w-6 h-6 text-[#e8eaed]" />
          </button>
          <button className="px-6 py-2 bg-[#8ab4f8] text-[#202124] font-medium rounded-md hover:bg-[#aecbfa]">
            Sign in
          </button>
        </div>
      </div>
    </header>
  );
}
