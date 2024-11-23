"use client";

import { History, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface SuggestionItemProps {
  suggestion: string;
}

export default function SuggestionItem({ suggestion }: SuggestionItemProps) {
  const router = useRouter();

  return (
    <div
      className="flex items-center px-4 py-3 hover:bg-[#303134] cursor-pointer group"
      onClick={() => router.push(`/search?q=${encodeURIComponent(suggestion)}`)}
    >
      <History className="w-5 h-5 text-[#9aa0a6] mr-4 flex-shrink-0" />
      <span className="text-[#e8eaed] flex-grow">{suggestion}</span>
      <div className="flex items-center opacity-0 group-hover:opacity-100">
        <span className="text-[#9aa0a6] text-sm mr-2 underline hover:text-[#8ab4f8]">
          Delete
        </span>
      </div>
    </div>
  );
}
