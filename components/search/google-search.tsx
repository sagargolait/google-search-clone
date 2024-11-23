"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SuggestionItem from "./suggestion-item";
import GoogleLensUploader from "../google-lens-uploader";
import { useRouter } from "next/navigation";

type GoogleSuggestCallback = (data: [string, string[]]) => void;

export default function GoogleSearch() {
  const router = useRouter();
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isImageSearchOpen, setIsImageSearchOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([
    "Trending searches",
    "vadgaon sheri election results",
    "cryptocurrency",
    "bitcoin price",
    "apple stock price",
  ]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const clearSearch = () => {
    setSearchTerm("");
    inputRef.current?.focus();
  };
  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const debounce = <T extends (...args: any[]) => void>(
    func: T,
    delay: number
  ) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const fetchSuggestions = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const callbackName = `googleSuggestCallback_${Date.now()}`;

    const promise = new Promise<string[]>((resolve) => {
      (window as any)[callbackName] = (data: [string, string[]]) => {
        delete (window as any)[callbackName];
        resolve(data[1]);
      };
    });

    const script = document.createElement("script");
    script.src = `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(
      query
    )}&callback=${callbackName}`;
    document.body.appendChild(script);

    try {
      const suggestions = await promise;
      setSuggestions(suggestions.slice(0, 5));
      document.body.removeChild(script);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    }
  }, []);

  const debouncedSetSearchTerm = debounce((value: string) => {
    setSearchTerm(value);
    fetchSuggestions(value);
  }, 300);

  return (
    <div className="w-full max-w-[584px] mx-auto relative">
      {isImageSearchOpen ? (
        <GoogleLensUploader onClose={() => setIsImageSearchOpen(false)} />
      ) : (
        <div className="relative">
          <div
            className={`flex items-center w-full bg-[#202124] ${
              isFocused ? "rounded-[24px_24px_0_0]" : "rounded-[24px]"
            } border ${
              isFocused
                ? "border-[#5f6368] border-b-0 shadow-[0_2px_6px_rgba(0,0,0,0.3)]"
                : "border-[#5f6368] hover:shadow-[0_1px_6px_rgba(0,0,0,0.3)]"
            }`}
          >
            <Search className="w-5 h-5 text-[#9aa0a6] ml-4" />
            <input
              ref={inputRef}
              type="text"
              className="w-full px-4 py-3 bg-transparent outline-none text-[#e8eaed] text-base placeholder-[#9aa0a6]"
              placeholder="Search Google or type a URL"
              defaultValue={searchTerm}
              onChange={(e) => debouncedSetSearchTerm(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onKeyDown={handleKeyDown}
              title="Search"
            />
            <div className="flex items-center mr-4">
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="p-2 hover:bg-[#303134] rounded-full"
                >
                  <X className="w-5 h-5 text-[#9aa0a6]" />
                </button>
              )}
              <button className="p-2 transition-colors w-[40px] h-[44px]">
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
                onClick={() => setIsImageSearchOpen(true)}
                className="p-2 transition-colors w-[40px] h-[44px]"
              >
                <svg
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
            </div>
          </div>
          {isFocused && (
            <div className="border-t border-0 border-[#5f6368] mx-auto w-[calc(100%-48px)]"></div>
          )}

          <AnimatePresence>
            {isFocused && (
              <motion.div
                ref={dropdownRef}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="absolute w-full bg-[#202124] rounded-[0_0_24px_24px] border border-t-0 border-[#5f6368] overflow-hidden z-50 shadow-[0_4px_6px_rgba(0,0,0,0.3)]"
              >
                {suggestions.map((suggestion, index) => (
                  <SuggestionItem key={index} suggestion={suggestion} />
                ))}
                <div className="h-[70px] flex justify-center items-center">
                  <button
                    className="bg-[#303134] border border-[#303134] rounded-md text-[#e8eaed] font-sans text-sm mx-1 py-0 px-4 leading-[27px] h-[36px] min-w-[54px] text-center cursor-pointer select-none hover:shadow-md hover:bg-[#303134] hover:border-[#5f6368] hover:text-[#e8eaed] focus:outline-none focus:border-[#5f6368]"
                    type="submit"
                    aria-label="Google Search"
                  >
                    Google Search
                  </button>
                  <button
                    className="bg-[#303134] border border-[#303134] rounded-md text-[#e8eaed] font-sans text-sm mx-1 py-0 px-4 leading-[27px] h-[36px] min-w-[54px] text-center cursor-pointer select-none hover:shadow-md hover:bg-[#3c4043] hover:border-[#5f6368] hover:text-[#e8eaed] focus:outline-none focus:border-[#5f6368]"
                    type="submit"
                    aria-label="I'm Feeling Lucky"
                  >
                    I'm Feeling Lucky
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
