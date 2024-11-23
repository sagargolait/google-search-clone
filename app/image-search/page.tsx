"use client";

import { Suspense } from "react";
import { LoadingSpinner } from "@/components/loading-spinner";
import { useImageUpload } from "@/contexts/ImageUploadContext";
import { useSearch } from "@/hooks/useSearch";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop, { type Crop } from "react-image-crop";
import GoogleLensSearchHeader from "@/components/google-lens-search-header";
import LensResults from "@/components/lensResults";

export default function ImageSearchPage() {
  return (
    <Suspense
      fallback={
        <div>
          <LoadingSpinner />
        </div>
      }
    >
      <ImageSearchComponent />
    </Suspense>
  );
}

function ImageSearchComponent() {
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    x: 25,
    y: 0,
    width: 50,
    height: 100,
  });
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const searchType = searchParams.get("searchType") || "";

  const { results, isLoading, isError } = useSearch(query, 1, searchType);

  const { uploadedFile } = useImageUpload();

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
    <div className="container max-w-[100vw] px-4 py-8 relative">
      <GoogleLensSearchHeader initialQuery={""} />
      <div className="flex relative h-[calc(100vh-148px)] w-full">
        <div className="w-[60%] bg-black">
          <div className="relative flex flex-col justify-center h-full">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
              <div className="relative">
                <div className="inline-block">
                  <button
                    className="group relative flex items-center gap-2 rounded-full px-4 py-2 text-sm shadow border border-[#5f636866] text-white bg-black/50 hover:bg-black/70 transition-colors"
                    aria-describedby="reverse-image-search-tooltip"
                  >
                    <svg
                      enableBackground="new 0 0 24 24"
                      height="18"
                      viewBox="0 0 24 24"
                      width="18"
                      focusable="false"
                      className="mr-1.5 fill-current"
                    >
                      <rect fill="none" height="24" width="24"></rect>
                      <path d="M19.3,16.9c0.4-0.7,0.7-1.5,0.7-2.4c0-2.5-2-4.5-4.5-4.5S11,12,11,14.5s2,4.5,4.5,4.5c0.9,0,1.7-0.3,2.4-0.7l3.2,3.2 l1.4-1.4L19.3,16.9z M15.5,17c-1.4,0-2.5-1.1-2.5-2.5s1.1-2.5,2.5-2.5s2.5,1.1,2.5,2.5S16.9,17,15.5,17z M12,20v2 C6.48,22,2,17.52,2,12C2,6.48,6.48,2,12,2c4.84,0,8.87,3.44,9.8,8h-2.07c-0.64-2.46-2.4-4.47-4.73-5.41V5c0,1.1-0.9,2-2,2h-2v2 c0,0.55-0.45,1-1,1H8v2h2v3H9l-4.79-4.79C4.08,10.79,4,11.38,4,12C4,16.41,7.59,20,12,20z"></path>
                    </svg>
                    <span>Find image source</span>
                  </button>
                  <div
                    id="reverse-image-search-tooltip"
                    role="tooltip"
                    className="absolute left-1/2 -translate-x-1/2 -bottom-12 hidden group-hover:block 
                     bg-gray-900 text-white text-sm px-3 py-1 rounded-md whitespace-nowrap"
                  >
                    See web pages that include this image
                  </div>
                </div>
              </div>
            </div>
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              className="custom-crop-component"
            >
              <div className="flex justify-center items-center h-full">
                <img
                  src={uploadedFile ? URL.createObjectURL(uploadedFile) : ""}
                  alt="Original"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </ReactCrop>
            <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-4">
              <div
                aria-label="Filter chip container"
                role="grid"
                className="flex bg-[#5f636866] h-[32px] rounded-full w-fit"
              >
                <div className="flex items-center -ml-2">
                  {["Search", "Text", "Translate"].map((label, index) => (
                    <span key={index} role="row" className="flex items-center">
                      <button
                        className={`px-3 h-[32px] ml-2 rounded-full shadow-md text-[#e8eaed]
                         focus:bg-white focus:text-[#202124] transition-all`}
                        aria-label={`Switch to ${label} mode`}
                      >
                        {label}
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="transition-all duration-300 overflow-y-auto w-[40%]">
          {results.length > 0 ? (
            <LensResults results={results} />
          ) : (
            <div className="flex justify-center items-center h-full">
              No Results Found
            </div>
          )}
          {loading && (
            <div className="flex justify-center items-center h-full">
              <LoadingSpinner />
            </div>
          )}
          <div ref={loaderRef} className="h-10"></div>
        </div>
      </div>
    </div>
  );
}
